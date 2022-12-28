import yaml from 'js-yaml';
import { extname } from 'path';

export default (filepath) => {
  const extension = extname(filepath);
  if (extension === '.json') {
    return JSON.parse;
  } if (extension === '.yml' || extension === '.yaml') {
    return yaml.load;
  }
  throw new Error(`Unsupported extension:${extension}`);
};
