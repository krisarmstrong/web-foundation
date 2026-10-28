import { expect, test } from 'vitest';
import { validateRelease } from './release-policy';

const metadata = {
  name: '@krisarmstrong/web-foundation',
  version: '0.9.13',
  private: true,
  repository: { type: 'git', url: 'https://github.com/krisarmstrong/web-foundation' },
};

test('accepts the exact stable release and package identity', () => {
  expect(() => validateRelease('v0.9.13', metadata)).not.toThrow();
});

test.each(['0.9.13', 'v0.9.14', 'v0.9.13-beta.1', 'v00.9.13', 'v0.9.13\n'])(
  'rejects mismatched or non-stable tag %j',
  (tag) => {
    expect(() => validateRelease(tag, metadata)).toThrow();
  }
);

test.each([
  null,
  {},
  { ...metadata, private: false },
  { ...metadata, private: undefined },
  { ...metadata, name: '@other/web-foundation' },
  {
    ...metadata,
    repository: { ...metadata.repository, url: 'https://github.com/other/web-foundation' },
  },
  { ...metadata, publishConfig: { access: 'public', registry: 'https://registry.npmjs.org/' } },
])('rejects metadata that could reach a registry or names another package %#', (value) => {
  expect(() => validateRelease('v0.9.13', value)).toThrow();
});
