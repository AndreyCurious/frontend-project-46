import yaml from 'js-yaml';
import { extname } from 'path';

export default (filepath) => {
  const extension = extname(filepath);
  // console.log(format);
  let parse;
  if (extension === '.json') {
    parse = JSON.parse;
  } else if (extension === '.yml' || extension === '.yaml') {
    parse = yaml.load;
  } else {
    throw new Error(`Unsupported extension:${extension}`);
  }
  return parse;
};
// console.log(get('__fixtures__/file1.yml'));
