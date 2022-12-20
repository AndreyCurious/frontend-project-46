import { readFileSync } from 'node:fs';
import _ from 'lodash';
import parse from './parsers.js';
import getTree from './formatter/stylish.js';

const getDifferences = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  //console.log(keys1);
  const keys2 = Object.keys(obj2);
  //console.log(keys2);
  const keys = _.sortBy(_.union(keys1, keys2));
  console.log(keys);
  const result = keys.map((key) => {
    // console.log(key);
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      //console.log({ key, children: getDifferences(obj1[key], obj2[key]), status: 'nested' });
      return { type: 'nested', key, children: getDifferences(obj1[key], obj2[key]) };
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return {
        type: 'unchange',
        key,
        value: obj1[key]
      };
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      return {
        type: 'change',
        key,
        value1: obj1[key],
        value2: obj2[key]
      };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return {
        type: 'plus',
        key,
        value: obj2[key]
      };
    }
    return  { 
      type: 'minus',
      key,
      value: obj1[key]
    };
  });
  //console.log(result);
  return result;
};


export default (filepath1, filepath2) => {
  const parser1 = parse(filepath1);
  const parser2 = parse(filepath2);

  const obj1 = parser1(readFileSync(filepath1));
  const obj2 = parser2(readFileSync(filepath2));

  const result = getTree(getDifferences(obj1, obj2));
  return result;
};
