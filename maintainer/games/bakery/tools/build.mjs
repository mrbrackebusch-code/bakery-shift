import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

export const gameRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const generatedRoot = path.join(gameRoot, 'generated');
const repoRoot = path.resolve(gameRoot, '../..');
const normalize = s => s.replace(/\r\n/g, '\n');
const readText = p => normalize(fs.readFileSync(p, 'utf8'));
export const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
const readJson = p => JSON.parse(readText(p));
const expectedActions = [null, null, 'AddOne', 'EqualCheck', 'RemoveOne', 'GreaterCheck', 'Double', 'LessCheck', 'Halve', 'AddModifier', 'SubtractModifier', 'MultiplyModifier', 'DivideModifier', 'LessEqualCheck', 'GreaterEqualCheck', 'SetBatch'];
const expectedKinds = ['startup', 'startup', ...Array(14).fill('event')];
const expectedVariables = ['batch', 'modifierNumber', 'deliveredNumber', 'orderTarget', 'ready'];
const expectedComparisons = ['==', '>', '<', '<=', '>='];
const allowedCall = /^(?:bakery\.(?:showTray|applyResult|showCheck)\([A-Za-z][A-Za-z0-9]*\)|bakery\.setConveyor\(true\)|[A-Za-z][A-Za-z0-9]* = (?:[123]|[A-Za-z][A-Za-z0-9]* [\+\-*\/] (?:[A-Za-z][A-Za-z0-9]*|[123])|[A-Za-z][A-Za-z0-9]* (?:==|<=|>=|<|>) [A-Za-z][A-Za-z0-9]*|bakery\.(?:trayAmount|modifierNumber|leftAmount|rightAmount)\(\)))$/;

export function validateCatalog(catalog) {
  if (catalog.catalog_id !== 'BAKERY-CUMULATIVE-STATES-V12' || catalog.activity_contract_id !== 'GLAC.BAKERY.V12' || catalog.states?.length !== 16 || !/^\/\/ Cake Factory\n?$/.test(catalog.starter_source)) throw Error('Bakery catalog must contain sixteen V12 constructions and the Cake Factory comment-only starter carrier.');
  if (JSON.stringify(catalog.variable_order) !== JSON.stringify(expectedVariables)) throw Error('The catalog must preserve the five reviewed variable names and order.');
  if (JSON.stringify(catalog.variable_types) !== JSON.stringify({batch:'number',modifierNumber:'number',deliveredNumber:'number',orderTarget:'number',ready:'Boolean'})) throw Error('The catalog must declare the V7 variable types.');
  const introduced = new Set();
  const counts = {'+':0, '-':0, '*':0, '/':0};
  for (const [index, state] of catalog.states.entries()) {
    if (state.through !== index + 1 || state.tutorial_step !== index + 1 || state.kind !== expectedKinds[index] || state.action !== expectedActions[index] || !/^(?:0[1-9]|1[0-6])-[a-z][a-z-]+$/.test(state.id)) throw Error(`Unexpected state identity/order: ${state.id}`);
    for (const name of state.introduces_variables) {
      if (introduced.has(name) || !expectedVariables.includes(name)) throw Error(`Invalid first-use variable: ${name}`);
      introduced.add(name);
    }
    for (const name of state.uses_variables) if (!introduced.has(name)) throw Error(`${state.id} uses ${name} before its explicit creation step.`);
    if (!state.statements.length || state.statements.some(line=>line !== 'bakery.setConveyor(true)' && !allowedCall.test(line))) throw Error(`${state.id} contains an unreviewed learner statement or concept.`);
    const joined = state.statements.join('\n');
    for (const name of expectedVariables) {
      // A property reporter of the same name is not a learner-variable access.
      const accesses = joined.replace(/bakery\.[A-Za-z][A-Za-z0-9]*/g, 'BAKERY_API');
      if (new RegExp(`\\b${name}\\b`).test(accesses) && !state.uses_variables.includes(name)) throw Error(`${state.id} omits ${name} from its declared variable use.`);
    }
    const arithmetic = state.statements.filter(line=>/ = [A-Za-z][A-Za-z0-9]* [\+\-*\/] /.test(line));
    if (state.operator === null ? arithmetic.length !== 0 : arithmetic.length !== 1 || !arithmetic[0].includes(` ${state.operator} `)) throw Error(`${state.id} must contain exactly its declared one-operation expression.`);
    const comparison = state.statements.filter(line=>/ = [A-Za-z][A-Za-z0-9]* (?:==|<=|>=|<|>) [A-Za-z][A-Za-z0-9]*$/.test(line));
    if (state.comparison === null ? comparison.length !== 0 : comparison.length !== 1 || !comparison[0].includes(` ${state.comparison} `)) throw Error(`${state.id} must contain exactly its declared comparison expression.`);
    if (state.operator) counts[state.operator]++;
  }
  if (introduced.size !== 5 || Object.values(counts).some(n=>n!==2) || JSON.stringify(catalog.states.filter(s=>s.comparison!==null).map(s=>s.comparison)) !== JSON.stringify(expectedComparisons)) throw Error('Five variables, two authored uses per arithmetic operator and EQ/LT/GT/LE/GE comparisons are required.');
  if (!Array.isArray(catalog.experiments) || catalog.experiments.length !== 0) throw Error('V12 must not contain experiments.');
  return {states:16, experiments:0, variables:[...introduced], arithmetic_constructions:counts, comparison_constructions:{'==':1,'<':1,'>':1,'<=':1,'>=':1}, starter_comment_only:true, starter_executable_code:false};
}

const handler = (state, skipSeed=false) => state.kind === 'startup' ? state.statements.filter(line=>!(skipSeed && line==='batch = 2')).join('\n') : `bakery.onAction(BakeryAction.${state.action}, function () {\n${state.statements.map(line=>'    '+line).join('\n')}\n})`;
const declarations = (names, catalog) => names.map(name=>`let ${name} = ${catalog.variable_types?.[name] === 'Boolean' ? 'false' : '0'}`).join('\n');
export function cumulativeSource(catalog, through) {
  const active = catalog.states.slice(0, through);
  const names = catalog.variable_order.filter(name=>active.some(s=>s.introduces_variables.includes(name)));
  const startups=active.filter(s=>s.kind==='startup'), events=active.filter(s=>s.kind!=='startup');
  const declarationText=declarations(names, catalog).replace(/^let batch = 0$/m, starts=>through>=1?'let batch = 2':starts);
  return [declarationText, ...startups.map(state=>handler(state, state.id==='01-show-batch')), ...events.map(handler)].filter(Boolean).join('\n\n') + (through ? '\n' : '');
}
export function hintSource(catalog, state) {
  const names = catalog.variable_order.filter(name=>state.uses_variables.includes(name));
  if (state.kind === 'startup') return cumulativeSource(catalog, state.through);
  return [declarations(names, catalog), handler(state)].filter(Boolean).join('\n\n') + '\n';
}

function safeWrite(relative, bytes) {
  const output = path.resolve(generatedRoot, relative);
  if (!output.startsWith(path.resolve(generatedRoot) + path.sep)) throw Error(`Generated path escapes bakery: ${relative}`);
  fs.mkdirSync(path.dirname(output), {recursive:true});
  fs.writeFileSync(output, bytes);
}

export function buildBakery(options = {}) {
  const catalogPath = path.join(gameRoot, 'implementation/learner-states/catalog.json');
  const catalog = readJson(catalogPath);
  const modelChecks = validateCatalog(catalog);
  if (options.modelOnly) return {catalog, modelChecks};
  const enginePath = path.join(gameRoot, 'implementation/supplied-world/engine.ts');
  if (!fs.existsSync(enginePath)) throw Error('Canonical bakery engine is not ready; model-only validation is available.');
  const iconsPath = path.join(gameRoot, 'implementation/supplied-world/icons.ts');
  if (!fs.existsSync(iconsPath)) throw Error('Canonical bakery icons are not ready; model-only validation is available.');
  const engineSource = readText(iconsPath).trimEnd() + '\n\n' + readText(path.join(gameRoot, 'implementation/supplied-world/art.ts')).trimEnd() + '\n\n' + readText(enginePath).trimEnd() + '\n';
  const copyPath = path.join(gameRoot, 'copy/tutorial-template.md');
  const learnerCopy = readText(copyPath).trimEnd();
  const implementationManifestPath = path.join(gameRoot, 'implementation/manifest.json');
  const implementationManifest = readJson(implementationManifestPath);
  if (implementationManifest.asset_transport !== 'INLINE_TYPESCRIPT_IMAGES' || implementationManifest.asset_factory_dependencies.length) throw Error('Bakery art must remain inline in the supplied engine without assets factories.');
  if (/^```(?:blocks|template|customts|package|assetjson)\b/m.test(learnerCopy)) throw Error('Canonical copy must not contain generated code/resource fences.');
  for (const action of expectedActions.filter(Boolean)) if (!new RegExp(`\\b${action}\\b`).test(engineSource)) throw Error(`Engine lacks the reviewed action ${action}.`);
  for (const name of expectedVariables) if (new RegExp(`\\b(?:let|var|const)\\s+${name}\\b`).test(engineSource)) throw Error(`Supplied engine redeclares learner-owned ${name}.`);
  if (/\bassets\s*\./.test(engineSource)) throw Error('Unexpected asset factory in the inline-art engine.');
  const stateOutputs = {}, hintOutputs = {}, experimentOutputs = {};
  for (const state of catalog.states) {
    stateOutputs[state.id] = cumulativeSource(catalog, state.through);
    hintOutputs[state.id] = hintSource(catalog, state);
  }
  for (const experiment of catalog.experiments) {
    const original = stateOutputs[experiment.base_state];
    const event = handler(catalog.states.find(state=>state.action === experiment.action));
    if (original.split(event).length !== 2 || event.split(experiment.from).length !== 2) throw Error('Experiment must modify exactly one statement in its declared existing handler.');
    experimentOutputs[experiment.id] = original.replace(event, event.replace(experiment.from, experiment.to));
  }
  const seen = [];
  const seenExperiments = [];
  const seenPractice = [];
  const visibleCopy = learnerCopy.split(/(?=^## )/m).map(section=>{
    const number = section.match(/^## (\d+)\./);
    if (!number || Number(number[1]) === catalog.final_play_step) return section.trimEnd();
    if ((catalog.practice_steps || []).includes(Number(number[1]))) {
      if (seenPractice.includes(Number(number[1]))) throw Error('Duplicate practice heading.');
      seenPractice.push(Number(number[1]));
      return section.trimEnd();
    }
    const experiment = catalog.experiments.find(item=>item.tutorial_step === Number(number[1]));
    if (experiment) {
      if (seenExperiments.includes(experiment.id)) throw Error('Duplicate experiment heading.');
      seenExperiments.push(experiment.id);
      return section.trimEnd();
    }
    const state = catalog.states.find(s=>s.tutorial_step===Number(number[1]));
    if (!state || seen.includes(state.id)) throw Error(`Unexpected or duplicate construction heading: ${number[0]}`);
    seen.push(state.id);
    return `${section.trimEnd()}\n\n#### ~ tutorialhint\n\n\`\`\`blocks\n${hintOutputs[state.id].trimEnd()}\n\`\`\``;
  }).join('\n\n');
  if (JSON.stringify(seen) !== JSON.stringify(catalog.states.map(s=>s.id))) throw Error('The sixteen numbered learner constructions must match catalog order.');
  if (JSON.stringify(seenExperiments) !== JSON.stringify(catalog.experiments.map(item=>item.id))) throw Error('Declared experiment headings must match the catalog.');
  if (JSON.stringify(seenPractice) !== JSON.stringify(catalog.practice_steps || [])) throw Error('Declared gameplay practice headings must match the catalog.');
  const starterSource = catalog.starter_source;
  const solutionSource = stateOutputs[catalog.final_play_state];
  const tutorial = `${visibleCopy}\n\n\`\`\`template\n${starterSource}\n\`\`\`\n\n\`\`\`customts\n${engineSource.trimEnd()}\n\`\`\`\n`;
  if ((tutorial.match(/^```customts$/gm)||[]).length!==1 || (tutorial.match(/^```template$/gm)||[]).length!==1 || (tutorial.match(/^```blocks$/gm)||[]).length!==16) throw Error('Tutorial resource cardinality changed.');
  const files = new Map([['tutorial/README.md', tutorial]]);
  for (const [id, source] of Object.entries(stateOutputs)) files.set(`learner-states/${id}.ts`, source);
  for (const [id, source] of Object.entries(hintOutputs)) files.set(`hints/${id}.ts`, source);
  for (const [id, source] of Object.entries(experimentOutputs)) files.set(`experiments/${id}.ts`, source);
  for (const [project, main] of [['starter', starterSource], ['solution', solutionSource]]) {
    files.set(`${project}/main.ts`, main);
    files.set(`${project}/engine.ts`, engineSource);
    files.set(`${project}/pxt.json`, JSON.stringify({name:`bakery-${project}`,version:'0.0.0',dependencies:{device:'*'},files:['engine.ts','main.ts'],preferredEditor:'blocksprj',supportedTargets:['arcade'],testDependencies:{}},null,2)+'\n');
  }
  const media = [];
  for (const relative of [...new Set([...learnerCopy.matchAll(/!\[[^\]]*\]\((assets\/(?:demos\/[a-z0-9-]+\.gif|instructions\/[a-z0-9-]+\.(?:svg|png)))\)/g)].map(m=>m[1]))].sort()) {
    const source = path.join(gameRoot, relative);
    const present = fs.existsSync(source);
    const bytes = present ? fs.readFileSync(source) : null;
    media.push({path:relative,present,sha256:bytes?sha256(bytes):null});
    if (present) files.set(`tutorial/${relative}`, bytes);
  }
  const demonstrations = media.filter(item=>item.path.startsWith('assets/demos/'));
  const instructionMedia = media.filter(item=>item.path.startsWith('assets/instructions/'));
  if (demonstrations.some(item=>!item.path.endsWith('.gif'))) throw Error('Demonstrations must remain GIF-only.');
  if (options.requireMedia && media.some(item=>!item.present)) throw Error('Current referenced media files are incomplete.');
  const canonicalPaths = ['copy/tutorial-template.md','implementation/learner-states/catalog.json','implementation/supplied-world/icons.ts','implementation/supplied-world/engine.ts','implementation/supplied-world/art.ts','implementation/manifest.json','tools/build.mjs'];
  const sourceHashes = Object.fromEntries(canonicalPaths.map(relative=>[`games/bakery/${relative}`,sha256(readText(path.join(gameRoot,relative)))]));
  const manifest = {schema_version:1,manifest_id:'BAKERY-BUILD-V12',game_id:'GAME-BAKERY',catalog_id:catalog.catalog_id,asset_transport:'INLINE_TYPESCRIPT_IMAGES',learner_variables:catalog.variable_order,model_checks:modelChecks,source_hashes:sourceHashes,output_hashes:{tutorial:sha256(tutorial),starter:sha256(starterSource),solution:sha256(solutionSource),engine:sha256(engineSource),states:Object.fromEntries(Object.entries(stateOutputs).map(([id,s])=>[id,sha256(s)])),hints:Object.fromEntries(Object.entries(hintOutputs).map(([id,s])=>[id,sha256(s)])),experiments:Object.fromEntries(Object.entries(experimentOutputs).map(([id,s])=>[id,sha256(s)]))},outputs:Object.fromEntries([...files.entries()].map(([relative,bytes])=>[relative,{sha256:sha256(bytes),bytes:Buffer.byteLength(bytes)}])),demonstrations,instruction_media:instructionMedia,claim_boundary:'Deterministic V12 assembly and declared scope only; missing referenced media remain explicit. Compile, Blocks, runtime, browser and learner evidence are separate.'};
  files.set('build-manifest.json',JSON.stringify(manifest,null,2)+'\n');
  if (options.check) {
    const mismatches=[];
    for (const [relative,expected] of files) {
      const target=path.join(generatedRoot,relative);
      if (!fs.existsSync(target) || sha256(fs.readFileSync(target))!==sha256(expected)) mismatches.push(relative);
    }
    if (mismatches.length) throw Error(`Generated outputs are missing or stale: ${mismatches.join(', ')}`);
  } else if (options.write!==false) for (const [relative,bytes] of files) safeWrite(relative,bytes);
  return {gameRoot,generatedRoot,catalog,manifest,modelChecks,learnerCopy,tutorial,engineSource,starterSource,mainSource:solutionSource,solutionSource,stateOutputs,hintOutputs,experimentOutputs,files};
}

if (process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  const args=new Set(process.argv.slice(2));
  const built=buildBakery({modelOnly:args.has('--model-only'),check:args.has('--check'),requireMedia:args.has('--require-media')});
  console.log(JSON.stringify({game:'Bakery Shift',mode:args.has('--model-only')?'model-only':args.has('--check')?'read-only generated check':'build',states:built.catalog.states.length,hints:built.hintOutputs?Object.keys(built.hintOutputs).length:0,model_checks:built.modelChecks,missing_media:built.manifest?.demonstrations.filter(m=>!m.present).map(m=>m.path)||[],manifest:built.manifest?'games/bakery/generated/build-manifest.json':null}));
}
