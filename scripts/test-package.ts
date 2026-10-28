import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const name = '@krisarmstrong/web-foundation';
const consumer = mkdtempSync(join(tmpdir(), 'web-foundation-consumer-'));
const npmCli = process.env.npm_execpath;
assert(npmCli, 'Run this check with npm run test:package');

function npm(args: string[], cwd?: string): string {
  return execFileSync(process.execPath, [npmCli as string, ...args], { cwd, encoding: 'utf8' });
}

try {
  npm(['run', 'build']);
  const result: unknown = JSON.parse(npm(['pack', '--json', '--pack-destination', consumer]));
  assert(Array.isArray(result) && result.length === 1);
  const artifact: unknown = result[0];
  assert(typeof artifact === 'object' && artifact !== null);
  assert('name' in artifact && artifact.name === name);
  assert('filename' in artifact && typeof artifact.filename === 'string');
  assert('files' in artifact && Array.isArray(artifact.files));
  const files = new Set(
    artifact.files.map((file: unknown) => {
      assert(typeof file === 'object' && file !== null && 'path' in file);
      assert(typeof file.path === 'string');
      return file.path;
    })
  );
  for (const path of [
    'LICENSE',
    'README.md',
    'package.json',
    'dist/index.js',
    'dist/index.cjs',
    'dist/index.d.ts',
    'dist/tokens.js',
    'dist/tokens.cjs',
    'dist/tokens.d.ts',
  ]) {
    assert(files.has(path), `Tarball is missing ${path}`);
  }
  // Sites scan the shipped sources for Tailwind classes.
  assert([...files].some((path) => path.startsWith('src/components/')));

  writeFileSync(join(consumer, 'package.json'), JSON.stringify({ private: true, type: 'module' }));
  npm(
    ['install', '--ignore-scripts', '--package-lock=false', join(consumer, artifact.filename)],
    consumer
  );
  writeFileSync(
    join(consumer, 'consumer.ts'),
    `
import { createRequire } from 'node:module';
import { ContactForm, PageShell, ThemeProvider, defaultDarkTheme, type NavItem } from '${name}';
import { colorTokens, layoutTokens, typographyTokens } from '${name}/tokens';
const item: NavItem = { label: 'Home', path: '/' };
for (const value of [ContactForm, PageShell, ThemeProvider]) {
  if (typeof value !== 'function') throw new Error('Missing component export');
}
if (!defaultDarkTheme || !colorTokens || !layoutTokens || !typographyTokens || !item) {
  throw new Error('Missing value export');
}
const require = createRequire(import.meta.url);
const cjs: unknown = require('${name}');
const cjsTokens: unknown = require('${name}/tokens');
if (typeof cjs !== 'object' || cjs === null || !('PageShell' in cjs)) throw new Error('CJS entry');
if (typeof cjsTokens !== 'object' || cjsTokens === null || !('colorTokens' in cjsTokens)) {
  throw new Error('CJS tokens entry');
}
`
  );
  execFileSync(
    process.execPath,
    [
      resolve('node_modules/typescript/bin/tsc'),
      '--strict',
      '--module',
      'NodeNext',
      '--target',
      'ES2022',
      '--jsx',
      'react-jsx',
      '--skipLibCheck',
      '--typeRoots',
      resolve('node_modules/@types'),
      '--types',
      'node',
      '--noEmit',
      'consumer.ts',
    ],
    { cwd: consumer, stdio: 'inherit' }
  );
  execFileSync(process.execPath, ['consumer.ts'], { cwd: consumer, stdio: 'inherit' });
  // The release attaches this exact verified tarball, never a second pack.
  const artifactPath = process.env.RELEASE_ARTIFACT_PATH;
  if (artifactPath) copyFileSync(join(consumer, artifact.filename), artifactPath);
} finally {
  rmSync(consumer, { recursive: true, force: true });
}
