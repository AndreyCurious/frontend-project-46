import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import { test } from '@jest/globals';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test.each([
  {
    file1: getFixturePath('file1.json'),
    file2: getFixturePath('file2.json'),
    expected: readFileSync(getFixturePath('stylishResult'), 'utf-8'),
  },
  {
    file1: getFixturePath('file1.yml'),
    file2: getFixturePath('file2.yml'),
    expected: readFileSync(getFixturePath('stylishResult'), 'utf-8'),
  },
  {
    file1: getFixturePath('file1.yaml'),
    file2: getFixturePath('file2.yaml'),
    expected: readFileSync(getFixturePath('stylishResult'), 'utf-8'),
  },
])('extensions', ({ file1, file2, expected }) => {
  expect(gendiff(file1, file2)).toEqual(expected);
});

test.each([
  {
    file1: getFixturePath('file1.json'),
    file2: getFixturePath('file2.json'),
    format: 'stylish',
    expected: readFileSync(getFixturePath('stylishResult'), 'utf-8'),
  },
  {
    file1: getFixturePath('file1.json'),
    file2: getFixturePath('file2.json'),
    format: 'json',
    expected: readFileSync(getFixturePath('jsonResult'), 'utf-8'),
  },
  {
    file1: getFixturePath('file1.json'),
    file2: getFixturePath('file2.json'),
    format: 'plain',
    expected: readFileSync(getFixturePath('plainResult'), 'utf-8'),
  },
])('extensions', ({
  file1, file2, format, expected,
}) => {
  expect(gendiff(file1, file2, format)).toEqual(expected);
});
