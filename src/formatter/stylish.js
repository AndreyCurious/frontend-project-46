const makeSpaces = (file, amount = 4) => {
  const space = ' '.repeat(amount);
  const resultFile = file.split('\n');
  // console.log(file)
  return resultFile.map((str) => {
    if (str !== resultFile[0]) {
      // console.log(str);
      if (str === '}') {
        return `  ${str}`;
      }
      return `${space}${str}`;
    }
    return str;
  }).join('\n');
};

const getConvertValue = (file) => {
  const newFile = JSON.stringify(file, null, 4);
  // console.log(newFile);
  const quoted = newFile.replaceAll('"', '');
  const result = makeSpaces(quoted, 2);
  return result.replaceAll(',', '');
};

const getTree = (gendiff) => {
  const result = gendiff.map((item) => {
    if (item.type === 'nested') {
      return `  ${item.key}: ${makeSpaces(getTree(item.children), 4)}`;
    }
    if (item.type === 'change') {
      return `- ${item.key}: ${getConvertValue(item.value1)}\n+ ${item.key}: ${getConvertValue(item.value2)}`;
    }
    if (item.type === 'plus') {
      return `+ ${item.key}: ${getConvertValue(item.value)}`;
    }
    if (item.type === 'minus') {
      return `- ${item.key}: ${getConvertValue(item.value)}`;
    }
    return `  ${item.key}: ${getConvertValue(item.value)}`;
  });
  return `{\n${result.join('\n')}\n}`;
};

export default getTree;
