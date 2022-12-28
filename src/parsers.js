import yaml from 'js-yaml';

export default (file, extension) => {
  if (extension === 'json') {
    return JSON.parse(file);
  } if (extension === 'yml' || extension === 'yaml') {
    return yaml.load(file);
  }
  throw new Error(`Unsupported extension:${extension}`);
};
