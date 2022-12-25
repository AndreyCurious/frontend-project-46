#!/usr/bin/env node
import { Command } from 'commander';
import gendiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const option = program.opts();
    if (option.format === 'stylish') {
      console.log(gendiff(filepath1, filepath2, 'stylish'));
    } else if (option.format === 'plain') {
      console.log(gendiff(filepath1, filepath2, 'plain'));
    }
  });
program.parse();
