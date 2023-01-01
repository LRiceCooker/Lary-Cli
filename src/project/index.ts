import { Command } from 'commander';
import create from './create';

const project = (program: Command) => {
    create(program);
    return program;
}

export default project;