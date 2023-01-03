import _ from 'lodash';

const makeSpaces = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const makeString = (data, depth = 1) => {
  // console.log(data)
  if (!_.isObject(data)) {
    // console.log(String(data));
    return String(data);
  }
  const result = Object.entries(data);
  const r1 = result.map(([key, value]) => `  ${makeSpaces(depth + 1)}${key}: ${makeString(value, depth + 1)}`);
  // console.log(result)
  return `{\n${r1.join('\n')}\n${makeSpaces(depth)}  }`;
};

const getTree = (differences, depth = 1) => {
  const result = differences.map((item) => {
    if (item.type === 'nested') {
      return `${makeSpaces(depth)}  ${item.key}: {${makeString(getTree(item.children, depth + 1))}${makeSpaces(depth)}  }`;
    }
    if (item.type === 'change') {
      return `${makeSpaces(depth)}- ${item.key}: ${makeString(item.value1, depth)}\n${makeSpaces(depth)}+ ${item.key}: ${makeString(item.value2, depth)}`;
    }
    if (item.type === 'add') {
      return `${makeSpaces(depth)}+ ${item.key}: ${makeString(item.value, depth)}`;
    }
    if (item.type === 'delete') {
      return `${makeSpaces(depth)}- ${item.key}: ${makeString(item.value, depth)}`;
    }
    return `${makeSpaces(depth)}  ${item.key}: ${makeString(item.value, depth)}`;
  });
  return `\n${result.join('\n')}\n`;
};

export default (tree) => `{${getTree(tree)}}`;
