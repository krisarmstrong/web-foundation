import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

function record(value: unknown): asserts value is Record<string, unknown> {
  assert(typeof value === 'object' && value !== null && !Array.isArray(value));
}

if (import.meta.main) {
  const tag = process.env.RELEASE_TAG;
  assert(tag, 'RELEASE_TAG is required');
  const metadata: unknown = JSON.parse(
    readFileSync(new URL('../package.json', import.meta.url), 'utf8')
  );
  validateRelease(tag, metadata);
}

export function validateRelease(tag: string, metadata: unknown): void {
  assert(
    tag.trim() === tag && /^v(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)$/u.test(tag),
    'Expected a stable release tag'
  );
  record(metadata);
  assert(metadata.name === '@krisarmstrong/web-foundation', 'Unexpected package name');
  assert(metadata.version === tag.slice(1), 'Tag and package version differ');
  // Delivered only as a GitHub release asset. `private` makes npm refuse to
  // publish it anywhere, and no registry configuration may come back.
  assert(metadata.private === true, 'Package must stay private');
  assert(!('publishConfig' in metadata), 'Package must not configure a registry');
  record(metadata.repository);
  assert(
    metadata.repository.type === 'git' &&
      metadata.repository.url === 'https://github.com/krisarmstrong/web-foundation',
    'Unexpected package repository'
  );
}
