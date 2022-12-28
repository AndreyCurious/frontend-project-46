const makeSpaces = (value) => {
  const resultFile = value.split('\n');
  return resultFile.map((str) => {
    if (str !== resultFile[0]) {
      return `    ${str}`;
    }
    return str;
  }).join('\n');
};

const makeString = (value) => {
  const newFile = JSON.stringify(value, null, 4);
  const quoted = newFile.replaceAll('"', '');
  const result = makeSpaces(quoted);
  return result.replaceAll(',', '');
};

const getTree = (differences) => {
  const result = differences.map((item) => {
    if (item.type === 'nested') {
      return `    ${item.key}: ${makeSpaces(getTree(item.children))}`;
    }
    if (item.type === 'change') {
      return `  - ${item.key}: ${makeString(item.value1)}\n  + ${item.key}: ${makeString(item.value2)}`;
    }
    if (item.type === 'add') {
      return `  + ${item.key}: ${makeString(item.value)}`;
    }
    if (item.type === 'delete') {
      return `  - ${item.key}: ${makeString(item.value)}`;
    }
    return `    ${item.key}: ${makeString(item.value)}`;
  });
  return `{\n${result.join('\n')}\n}`;
};

export default getTree;
