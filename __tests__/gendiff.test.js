import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import gendiff from '../src/index.js';
import { test } from '@jest/globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('json', () => {
  const expected = readFileSync(getFixturePath('resultTests'), 'utf-8');
  const result = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toEqual(expected);
});

test('yml', () => {
  const expected = readFileSync(getFixturePath('resultTests'), 'utf-8');
  const result = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(result).toEqual(expected);
});
