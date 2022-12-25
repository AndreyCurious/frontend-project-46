const checkType = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return `${value}`;
};

export default (tree) => {
  const iter = (treeDiff, path) => {
    const result = treeDiff.flatMap((item) => {
      const fullpath = (path === '') ? `${item.key}` : `${path}.${item.key}`;
      if (item.type === 'plus') {
        return `Property '${fullpath}' was added with value: ${checkType(item.value)}`;
      }
      if (item.type === 'change') {
        return `Property '${fullpath}' was updated. From ${checkType(item.value1)} to ${checkType(item.value2)}`;
      }
      if (item.type === 'minus') {
        return `Property '${fullpath}' was removed`;
      }
      if (item.type === 'nested') {
        return iter(item.children, fullpath);
      }
      return [];
    });
    return result.join('\n');
  };
  return iter(tree, '');
};
