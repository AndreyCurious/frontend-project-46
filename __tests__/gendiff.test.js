import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('check', () => {
  const expected = readFileSync(getFixturePath('4stepTest'), 'utf-8');
  const result = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toEqual(expected);
});
