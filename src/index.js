import { readFileSync } from 'fs';
import parse from './parsers.js';
import buldDiff from './buildDiff.js';
import getFormatTree from './formatter/index.js';

export default (filepath1, filepath2, format) => {
  const parser1 = parse(filepath1);
  const parser2 = parse(filepath2);

  const obj1 = parser1(readFileSync(filepath1));
  const obj2 = parser2(readFileSync(filepath2));

  return getFormatTree(buldDiff(obj1, obj2), format);
};
