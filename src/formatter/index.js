import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (file, format = 'stylish') => {
  if (format === 'stylish') {
    return stylish(file);
  }
  if (format === 'plain') {
    return plain(file);
  }
  if (format === 'json') {
    return json(file);
  }
  throw new Error(console.log(`Unsupported format: ${format}`));
};
