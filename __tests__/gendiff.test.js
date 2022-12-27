import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'node:fs';
import { test } from '@jest/globals';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

test('json', () => {
  const expected = readFileSync(getFixturePath('stylishResult'), 'utf-8');
  const result = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toEqual(expected);
});

test('yml', () => {
  const expected = readFileSync(getFixturePath('stylishResult'), 'utf-8');
  const result = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(result).toEqual(expected);
});

test('yaml', () => {
  const expected = readFileSync(getFixturePath('stylishResult'), 'utf-8');
  const result = gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'));
  expect(result).toEqual(expected);
});

test('plainFormat', () => {
  const expected = readFileSync(getFixturePath('plainResult'), 'utf-8');
  const result = gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain');
  expect(result).toEqual(expected);
});

test('stylishFormat', () => {
  const expected = readFileSync(getFixturePath('stylishResult'), 'utf-8');
  const result = gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'stylish');
  expect(result).toEqual(expected);
});

test('jsonFormat', () => {
  const expected = readFileSync(getFixturePath('jsonResult'), 'utf-8');
  const result = gendiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'json');
  expect(result).toEqual(expected);
});
