import _ from 'lodash';

const getKeys = (obj1, obj2) => {
  // console.log(obj1, obj2)
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  return _.sortBy(_.union(keys1, keys2));
};

const getDifferences = (obj1, obj2) => {
  const keys = getKeys(obj1, obj2);
  // console.log(keys);
  const result = keys.map((key) => {
    // console.log(key);
    if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
      // console.log({ key, children: getDifferences(obj1[key], obj2[key]), status: 'nested' });
      return { type: 'nested', key, children: getDifferences(obj1[key], obj2[key]) };
    }
    if (_.isEqual(obj1[key], obj2[key])) {
      return { type: 'unchange', key, value: obj1[key] };
    }
    if (_.has(obj1, key) && _.has(obj2, key)) {
      return {
        type: 'change', key, value1: obj1[key], value2: obj2[key],
      };
    }
    if (!_.has(obj1, key) && _.has(obj2, key)) {
      return { type: 'plus', key, value: obj2[key] };
    }
    return { type: 'minus', key, value: obj1[key] };
  });
    // console.log(result);
  return result;
};

export default getDifferences;
