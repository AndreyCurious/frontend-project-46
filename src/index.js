import { readFileSync } from 'fs';
import { extname } from 'path';
import parse from './parsers.js';
import buldDiff from './buildDiff.js';
import getFormatTree from './formatter/index.js';

export default (filepath1, filepath2, format) => {
  const extension1 = extname(filepath1).slice(1);
  const extension2 = extname(filepath2).slice(1);

  const file1 = readFileSync(filepath1);
  const file2 = readFileSync(filepath2);

  const obj1 = parse(file1, extension1);
  const obj2 = parse(file2, extension2);

  return getFormatTree(buldDiff(obj1, obj2), format);
};
