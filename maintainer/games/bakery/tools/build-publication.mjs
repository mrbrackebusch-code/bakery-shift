// Game-scoped local packaging. No network, credentials, git writes, releases or promotion.
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildBakery, gameRoot, generatedRoot} from './build.mjs';

const self = fileURLToPath(import.meta.url);
const repositoryRoot = path.resolve(gameRoot, '../..');
const digest = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const posix = value => value.replaceAll('\\', '/');
const json = value => JSON.stringify(value, null, 2) + '\n';
export const destination = Object.freeze({
  repository_owner: 'mrbrackebusch-code',
  repository_name: 'bakery-shift',
  repository_url: 'https://github.com/mrbrackebusch-code/bakery-shift',
  serving_branch: 'main',
  tutorial_path: 'README.md',
  stable_student_url: 'https://arcade.makecode.com/?nocdn=1#tutorial:https://github.com/mrbrackebusch-code/bakery-shift/README',
  resolution_status: 'ESTABLISHED_PUBLIC_REPOSITORY_UNPROMOTED_CANDIDATE',
  recorded_before_external_write: false,
  read_only_check: {
    date: '2026-09-22',
    transport: 'Existing authenticated GitHub release and public-identity records; no V9 external write',
    authenticated_login: 'mrbrackebusch-code',
    canonical_remote: 'https://github.com/mrbrackebusch-code/makecode-arcade-tutorials.git',
    target_repository_result: 'Established public repository mrbrackebusch-code/bakery-shift; V7 release and official no-CDN public identity verified in current records'
  },
  existing_release: {tag:'v0.3.0',release_url:'https://github.com/mrbrackebusch-code/bakery-shift/releases/tag/v0.3.0',payload_commit:'22068fbf54e0fd81be2fb88af545e4a6592ec15d',served_commit:'ebe3e9612d86391ae21a1cd8d2a6e3575c739ea1'},
  existing_public_identity: {stable_url:'https://arcade.makecode.com/?nocdn=1#tutorial:https://github.com/mrbrackebusch-code/bakery-shift/README',served_commit:'ebe3e9612d86391ae21a1cd8d2a6e3575c739ea1',release:'V7',media_revision:'c0590805184b5b9a',historical_cache_release:'V5',historical_cache_commit:'3340e81fd43547c7b4c17560a75f344aa91a29b0'}
});

const canonicalGameFiles = [
  'copy/tutorial-template.md',
  'implementation/learner-states/catalog.json',
  'implementation/supplied-world/icons.ts',
  'implementation/supplied-world/engine.ts',
  'implementation/supplied-world/art.ts',
  'implementation/manifest.json',
  'tools/build.mjs',
  'tools/build-publication.mjs',
  'design/pedagogy/FACTORY_SOURCE_PACKET_2026-09-21.md',
  'design/pedagogy/MIXER_SOURCE_ADDENDUM_V7.md',
  'design/pedagogy/WORLD_SOURCE_ADDENDUM_V9.md',
  'design/FACTORY_MIXER_REVISION_V7.md',
  'design/RESOLUTION_REVISION_V8.md',
  'design/WORLD_REVISION_V9.md',
  'design/pedagogy/MICROSOFT_MIT_NOTICE.txt'
];
const sourceFiles = [
  'docs/pedagogy/corpus/sources/makecode-arcade-csintro/raw/production/1A-005/variable-math.md',
  'docs/pedagogy/corpus/sources/makecode-arcade-csintro/raw/production/1A-041/repository/docs/courses/csintro2/logic/intro.md',
  'docs/pedagogy/corpus/sources/makecode-arcade-csintro/raw/production/1A-043/repository/docs/courses/csintro2/logic/multiplayer.md',
  'docs/pedagogy/corpus/sources/makecode-ap-csp/raw/production/1C-039/boolean-variables.md',
  'docs/pedagogy/corpus/sources/makecode-arcade-csintro/raw/LICENSE-MIT.txt'
];

function readOrdinaryFile(file) {
  assert(fs.lstatSync(file).isFile(), `Package input must be an ordinary file: ${file}`);
  return fs.readFileSync(file);
}

function targetFile(root, relative) {
  assert(relative && !relative.includes('\\') && !path.isAbsolute(relative) && !relative.split('/').some(p => !p || p === '.' || p === '..'), `Invalid package path: ${relative}`);
  const result = path.resolve(root, relative);
  assert(result.startsWith(root + path.sep), `Package path escapes its root: ${relative}`);
  return result;
}

function filesBelow(root, prefix = '') {
  return fs.readdirSync(root, {withFileTypes: true}).flatMap(entry => {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    assert(!entry.isSymbolicLink(), `Package contains a symbolic link: ${relative}`);
    return entry.isDirectory() ? filesBelow(path.join(root, entry.name), relative) : (assert(entry.isFile(), `Unsupported package entry: ${relative}`), [relative]);
  }).sort();
}

const maintainers = `# Maintaining Cake Factory

This is one independent MakeCode tutorial package. The student project is the root pxt.json plus comment-only main.ts and README.md. Both main.ts and the tutorial template contain only // Cake Factory followed by a newline: no executable learner code. README.md contains the hidden customts game resource, fourteen recoverable Blocks hints, and 17 demos. The complete game under review/solution is an informed review aid, outside the student project file list.

Canonical authoring inputs are preserved under maintainer/games/bakery, with only the narrowly required source texts under maintainer/docs. They can rebuild the tutorial and solution without another game's source or the complete curriculum corpus. Node.js supplies the dependency-free authoring tools.

From this package root:

    node maintainer/games/bakery/tools/build.mjs --model-only
    node maintainer/games/bakery/tools/build-publication.mjs --plan

The builder stages a new package under maintainer/games/bakery/generated/publication. It never updates this root in place, writes to GitHub or approves a release. Edit the named authoring inputs and rebuild; do not patch generated README.md. Keep main.ts and the template comment-only so the learner's Blocks workspace starts empty.

Carry the Microsoft MIT notice and source attributions forward. Preserve old Git commits, releases and content-addressed media revision directories when integrating a new package. This candidate remains unpromoted pending current runtime/instruction/GIF review, authenticated destination checks, exact versioned MakeCode release payload verification, and focused public startup/assets/affected-behavior review. Informed developer QA and the owner-cancelled learner audit are distinct; this package makes no human-learning claim.

The existing destination is ${destination.repository_url}. Its intended explicit-path tutorial identity is ${destination.stable_student_url}. This generated V9 candidate is unpromoted until its exact payload, conflict state, public startup, assets and affected behavior are checked.
`;

const notices = `# Source attribution and notices

Cake Factory adapts arithmetic source from Microsoft MakeCode Arcade CS Intro [Math Operators with Variables](https://arcade.makecode.com/courses/csintro1/intro/variable-math), strict comparison definitions from [CSIntro2 Logic Intro](https://arcade.makecode.com/courses/csintro2/logic/intro), inclusive comparison context from [CSIntro2 Multiplayer](https://arcade.makecode.com/courses/csintro2/logic/multiplayer), and Boolean variable material from [AP CSP Unit 3 Day 11: Boolean Variables](https://microsoft.github.io/makecode-csp/unit-3/day-11/boolean-variables/). AP-CSP prose is used under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Microsoft-authored material is attributed to Microsoft and retained with its source notice.

The CSIntro source and MakeCode code material are retained under the MIT notices in LICENSES/Microsoft-MIT.txt and maintainer/docs. AP-CSP prose is attributed separately under CC BY 4.0. The package includes only the named source texts and the project factory source packet.

Changes adapt the source to a moving cake factory with tiny whole numbers, eight arithmetic expressions, five ordered comparisons, and Boolean reports. Learner code excludes AND, OR, if statements, loops and modulus. Game art and mechanics are this project's authored implementation. The adapted game is not represented as authored, reviewed or endorsed by Microsoft. No MakeCode Share payload or third-party image is included.
`;

export function assemblePublication({requireMedia = true, checkGenerated = true} = {}) {
  const built = buildBakery({write: false, check: checkGenerated, requireMedia});
  assert.equal(built.starterSource, '// Cake Factory\n', 'The tutorial starter must retain exactly the harmless Cake Factory comment and no executable learner code.');
  assert.equal((built.tutorial.match(/^```customts$/gm) || []).length, 1);
  assert.equal((built.tutorial.match(/^```template$/gm) || []).length, 1);
  assert.match(built.tutorial, /^```template\r?\n\/\/ Cake Factory\r?\n\s*```$/m, 'The tutorial template must contain only the harmless Cake Factory comment.');
  assert.equal((built.tutorial.match(/^```blocks$/gm) || []).length, built.catalog.states.length);
  const allMedia = [...built.manifest.demonstrations, ...(built.manifest.instruction_media || [])];
  const missingMedia = allMedia.filter(item => !item.present).map(item => item.path);
  const mediaIdentity = allMedia.map(item => [item.path, item.sha256]);
  const mediaRevision = digest(JSON.stringify(mediaIdentity)).slice(0, 16);
  const prefix = `assets/${mediaRevision}`;
  const publicBase = `https://raw.githubusercontent.com/${destination.repository_owner}/${destination.repository_name}/${destination.serving_branch}/${prefix}`;
  const outputs = new Map();
  let tutorial = built.tutorial;
  const mediaMappings = [];
  for (const item of allMedia) {
    const relative = item.path.replace(/^assets\//, '');
    const publicPath = `${prefix}/${relative}`;
    const marker = `](${item.path})`;
    assert.equal(tutorial.split(marker).length, 2, `Expected one reference to ${item.path}.`);
    const url = `${publicBase}/${relative}`;
    tutorial = tutorial.replace(marker, `](${url})`);
    mediaMappings.push({canonical_path: item.path, publication_path: publicPath, url, sha256: item.sha256});
    if (item.present) {
      const bytes = readOrdinaryFile(path.join(gameRoot, item.path));
      assert.equal(digest(bytes), item.sha256);
      outputs.set(publicPath, bytes);
      outputs.set(`maintainer/games/bakery/${item.path}`, bytes);
    }
  }
  assert(!/\]\(assets\/(?:demos|instructions)\//.test(tutorial), 'All publication media must use their frozen public revision.');
  assert(!/https:\/\/(?:arcade\.)?makecode\.com\/_/.test(tutorial), 'Tutorial cannot carry a MakeCode Share publication link.');
  outputs.set('README.md', Buffer.from(tutorial));
  outputs.set('main.ts', Buffer.from(built.starterSource));
  outputs.set('pxt.json', Buffer.from(json({name: destination.repository_name, description: 'A moving cake-factory MakeCode Arcade tutorial for tiny arithmetic and Boolean comparisons.', version: '0.0.0', dependencies: {device: '*'}, files: ['main.ts', 'README.md'], preferredEditor: 'blocksprj', supportedTargets: ['arcade'], testDependencies: {}})));
  outputs.set('MAINTAINING.md', Buffer.from(maintainers));
  outputs.set('THIRD_PARTY_NOTICES.md', Buffer.from(notices));
  outputs.set('LICENSES/Microsoft-MIT.txt', readOrdinaryFile(path.join(gameRoot, 'design/pedagogy/MICROSOFT_MIT_NOTICE.txt')));
  outputs.set('review/README.md', Buffer.from('# Informed game review\n\nThe solution folder contains a separate complete MakeCode project for reviewing gameplay. It is not the tutorial starter and is not a learner journey. The student tutorial begins with comment-only main.ts and template resources with an empty on-start block and title comment in the native editor. No executable learner code is supplied in those starter resources. To inspect the solution, use its own pxt.json, main.ts and engine.ts together in a separate disposable review project.\n'));
  for (const name of ['main.ts', 'engine.ts', 'pxt.json']) outputs.set(`review/solution/${name}`, built.files.get(`solution/${name}`));
  const canonicalHashes = {};
  for (const relative of canonicalGameFiles) {
    const bytes = readOrdinaryFile(path.join(gameRoot, relative));
    const canonical = `games/bakery/${relative}`;
    canonicalHashes[canonical] = digest(bytes);
    outputs.set(`maintainer/${canonical}`, bytes);
  }
  for (const relative of sourceFiles) {
    const bytes = readOrdinaryFile(path.join(repositoryRoot, relative));
    canonicalHashes[relative] = digest(bytes);
    outputs.set(`maintainer/${relative}`, bytes);
  }
  const captureManifest = path.join(gameRoot, 'assets/demos/manifest.json');
  if (fs.existsSync(captureManifest)) {
    const bytes = readOrdinaryFile(captureManifest);
    canonicalHashes['games/bakery/assets/demos/manifest.json'] = digest(bytes);
    outputs.set(`assets/demos/${mediaRevision}/manifest.json`, bytes);
    outputs.set('maintainer/games/bakery/assets/demos/manifest.json', bytes);
  }
  outputs.set('maintainer/BUILD_MANIFEST.json', Buffer.from(json(built.manifest)));
  const manifest = {
    schema_version: 1, manifest_id: 'BAKERY-PUBLICATION-PACKAGE-V9', game_id: 'GAME-BAKERY',
    status: 'NOT_FOR_DISTRIBUTION', ...destination,
    external_publication_performed: false, student_distribution_ready: false,
    local_tutorial_sha256: digest(built.tutorial), canonical_tutorial_sha256: digest(built.tutorial),
    tutorial_sha256: digest(tutorial), media_revision: mediaRevision, media_mappings: mediaMappings,
    canonical_source_sha256: canonicalHashes,
    source_build_manifest_sha256: digest(json(built.manifest)),
    output_sha256: Object.fromEntries([...outputs].sort(([a], [b]) => a.localeCompare(b)).map(([relative, bytes]) => [relative, digest(bytes)])),
    learner_starter: {main_ts_bytes: Buffer.byteLength(built.starterSource), source_policy: 'COMMENT_ONLY_NO_EXECUTABLE_LEARNER_CODE', template_comment_only: true, no_prebuilt_learner_calculations: true, customts_resources: 1, complete_solution_in_student_project: false},
    missing_media: missingMedia,
    missing_demonstrations: missingMedia.filter(item => item.startsWith('assets/demos/')),
    missing_instruction_media: missingMedia.filter(item => item.startsWith('assets/instructions/')),
    remaining_release_gates: ['Current runtime, instruction and GIF review', 'Final authenticated destination/conflict verification and authorized repository write', 'Versioned MakeCode release with exact payload verification', 'Focused public startup, assets and affected-behavior review'],
    claim_boundary: 'Deterministic local package only. No external publication, learner pass, student readiness, human review, enjoyment, accessibility or classroom claim. Later promotion facts belong in new immutable promotion records.'
  };
  outputs.set('RELEASE_MANIFEST.json', Buffer.from(json(manifest)));
  return {outputs, manifest, built};
}

// Dependency-free deterministic ZIP (stored entries). No shell archiver or media transformation.
function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
export function reviewZipBytes(outputs) {
  const data = [], directory = [];
  let offset = 0;
  for (const [relative, value] of [...outputs].sort(([a], [b]) => a.localeCompare(b))) {
    const name = Buffer.from(relative), bytes = Buffer.isBuffer(value) ? value : Buffer.from(value), crc = crc32(bytes);
    const header = Buffer.alloc(30);
    header.writeUInt32LE(0x04034b50); header.writeUInt16LE(20, 4); header.writeUInt16LE(0x800, 6); header.writeUInt16LE(33, 12);
    header.writeUInt32LE(crc, 14); header.writeUInt32LE(bytes.length, 18); header.writeUInt32LE(bytes.length, 22); header.writeUInt16LE(name.length, 26);
    data.push(header, name, bytes);
    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50); central.writeUInt16LE(20, 4); central.writeUInt16LE(20, 6); central.writeUInt16LE(0x800, 8); central.writeUInt16LE(33, 14);
    central.writeUInt32LE(crc, 16); central.writeUInt32LE(bytes.length, 20); central.writeUInt32LE(bytes.length, 24); central.writeUInt16LE(name.length, 28); central.writeUInt32LE(offset, 42);
    directory.push(central, name); offset += header.length + name.length + bytes.length;
  }
  const central = Buffer.concat(directory), end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50); end.writeUInt16LE(outputs.size, 8); end.writeUInt16LE(outputs.size, 10); end.writeUInt32LE(central.length, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...data, central, end]);
}

export function buildPublication({id, mode, zip = false} = {}) {
  assert(['plan', 'record', 'check'].includes(mode), 'Choose exactly one of --plan, --record or --check.');
  if (mode !== 'plan') assert(/^[a-z0-9][a-z0-9-]{2,63}$/.test(id || ''), 'Use --id=<versioned-candidate-name>.');
  const result = assemblePublication({requireMedia: mode !== 'plan', checkGenerated: mode !== 'plan'});
  if (mode === 'plan') return {...result, mode, packageRoot: null};
  const allowedRoot = path.resolve(generatedRoot, 'publication');
  const packageRoot = targetFile(allowedRoot, id);
  if (mode === 'record') {
    assert(!fs.existsSync(packageRoot), 'Candidate packages are immutable. Choose a new --id; do not replace a prior directory.');
    assert(!fs.existsSync(packageRoot + '.zip'), 'An archive already uses this candidate name.');
    fs.mkdirSync(packageRoot, {recursive: true});
    for (const [relative, bytes] of result.outputs) {
      const file = targetFile(packageRoot, relative);
      fs.mkdirSync(path.dirname(file), {recursive: true});
      fs.writeFileSync(file, bytes, {flag: 'wx'});
    }
    if (zip) fs.writeFileSync(packageRoot + '.zip', reviewZipBytes(result.outputs), {flag: 'wx'});
  }
  assert.deepEqual(filesBelow(packageRoot), [...result.outputs.keys()].sort(), 'The package contains missing or unbound files.');
  for (const [relative, bytes] of result.outputs) assert.equal(digest(readOrdinaryFile(targetFile(packageRoot, relative))), digest(bytes), `Candidate is stale or changed: ${relative}`);
  if (zip) assert.equal(digest(readOrdinaryFile(packageRoot + '.zip')), digest(reviewZipBytes(result.outputs)), 'The review ZIP differs from the exact package.');
  return {...result, mode, packageRoot};
}

if (process.argv[1] && path.resolve(process.argv[1]) === self) {
  const args = process.argv.slice(2), modes = ['plan', 'record', 'check'].filter(mode => args.includes(`--${mode}`));
  assert.equal(modes.length, 1, 'Choose exactly one of --plan, --record or --check.');
  assert(args.every(arg => ['--plan', '--record', '--check', '--zip'].includes(arg) || arg.startsWith('--id=')), 'Unknown publication option.');
  const result = buildPublication({id: args.find(arg => arg.startsWith('--id='))?.slice(5), mode: modes[0], zip: args.includes('--zip')});
  console.log(json({mode: result.mode, package: result.packageRoot ? posix(path.relative(repositoryRoot, result.packageRoot)) : null, files: result.outputs.size, missing_demonstrations: result.manifest.missing_demonstrations, starter_source_comment_only: true, no_prebuilt_learner_calculations: true, external_publication_performed: false, distribution_status: result.manifest.status}));
}
