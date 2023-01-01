// TypeScript (.ts)
import project from './project';
import { Command } from 'commander';
let program = new Command();

program = project(program);

program.parse();

const options = program;