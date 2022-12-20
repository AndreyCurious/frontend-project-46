const getTree = (gendiff) => {
  const result = gendiff.map((item) => {
    if (item.type === 'nested') {
      return `${item.key}:${getTree(item.children)}`;
    }
    if (item.type === 'change') {
      return `- ${item.key}:${item.value1} \n+ ${item.key}:${item.value2}`;
    }
    if (item.type === 'plus') {
      return `+ ${item.key}:${item.value}`;
    }
    if (item.type === 'minus') {
      return `- ${item.key}:${item.value}`;
    }
    return `${item.key}:${item.value}`;
  });
  return `{\n${result.join('\n')}\n}`;
};

export default getTree;
