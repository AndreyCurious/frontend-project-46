import { readFileSync } from 'node:fs';
import _ from 'lodash';

const gendiff = (filepath1, filepath2) => {
  const obj1 = JSON.parse(readFileSync(filepath1));
  const obj2 = JSON.parse(readFileSync(filepath2));

  const result = getDifferences(obj1, obj2);
  return result;
}
export default gendiff;

const getDifferences = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  const keys = _.sortBy(_.union(keys1, keys2));

  const result = keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const keyUpgradeMinus = `- ${key}`;
    const keyUpgradePlus = `+ ${key}`;
    //console.log(key);
    if (_.isEqual(value1, value2)) {
      return `    ${key}: ${value1}`;
    }
    if (value1 && value2 && !_.isEqual(value1, value2)) {
      return `  ${keyUpgradeMinus}: ${value1}\n  ${keyUpgradePlus}: ${value2}`;
    }
    if (!value1 && value2) {
      return `  ${keyUpgradePlus}: ${value2}`
    }
    return `  ${keyUpgradeMinus}: ${value1}`
  });
  
  return `{\n${result.join('\n')}\n}`;
}