const stringify = (value) => {
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
      if (item.type === 'add') {
        return `Property '${fullpath}' was added with value: ${stringify(item.value)}`;
      }
      if (item.type === 'change') {
        return `Property '${fullpath}' was updated. From ${stringify(item.value1)} to ${stringify(item.value2)}`;
      }
      if (item.type === 'delete') {
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
