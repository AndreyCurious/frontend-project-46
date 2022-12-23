import { readFileSync } from 'fs';
import parse from './parsers.js';
import buldDiff from './buildDiff.js';
import stylish from './formatter/stylish.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const parser1 = parse(filepath1);
  const parser2 = parse(filepath2);

  const obj1 = parser1(readFileSync(filepath1));
  const obj2 = parser2(readFileSync(filepath2));
  if (format === 'stylish') {
    return stylish(buldDiff(obj1, obj2));
  }
  // console.log(result);
  return stylish(buldDiff(obj1, obj2));
};
