import stylish from './stylish.js';
import plain from './plain.js';

export default (file, format = 'stylish') => {
  if (format === 'stylish') {
    return stylish(file);
  }
  if (format === 'plain') {
    return plain(file);
  }
  throw new Error(console.log(`Unsupported format: ${format}`));
};
