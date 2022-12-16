import yaml from 'js-yaml';
import { extname } from 'path';
export default (filepath) => {
  const format = extname(filepath);
  //console.log(format);
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml' || format === '.yaml') {
    parse = yaml.load;
  } else if (format === '.ini') {
    parse = ini.parse;
  }
  return parse;
};
// console.log(get('__fixtures__/file1.yml'));