import yaml from 'js-yaml';
import { extname } from 'path';

export default (filepath) => {
  const format = extname(filepath);
  // console.log(format);
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  } else {
    throw new Error(`Unsupported format:${format}`);
  }
  return parse;
};
// console.log(get('__fixtures__/file1.yml'));
