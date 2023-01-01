"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const git_clone_1 = __importDefault(require("git-clone"));
const fs_1 = require("fs");
const child_process_1 = require("child_process");
const process_1 = require("process");
const pullLaryScafoldFromGit = (projectName) => {
    const projectFolder = `${(0, process_1.cwd)()}/${projectName}`;
    console.log(`create project...`);
    (0, git_clone_1.default)(`https://github.com/RiceCooker-dev/Lary-Scafold.git`, projectFolder);
    while (!(0, fs_1.existsSync)(`${projectFolder}/package.json`)) { }
    console.log('done.');
};
const configureProject = (projectName) => {
    const projectFolder = `${(0, process_1.cwd)()}/${projectName}`;
    const packageJson = (0, fs_1.readFileSync)(`${projectFolder}/package.json`).toString();
    (0, fs_1.writeFileSync)(`${projectFolder}/package.json`, packageJson.replace('lary-poc', projectName));
    const appJson = (0, fs_1.readFileSync)(`${projectFolder}/app.json`).toString();
    (0, fs_1.writeFileSync)(`${projectFolder}/app.json`, appJson.replace('My app', projectName).replace('my-app', projectName));
    (0, fs_1.rmSync)(`${projectFolder}/.git`, { recursive: true, force: true });
};
const installDependencies = (projectName) => {
    const projectFolder = `${(0, process_1.cwd)()}/${projectName}`;
    console.log('installing dependencies...');
    (0, child_process_1.execSync)(`cd ${projectFolder} && yarn`, { stdio: 'inherit' });
    console.log('done.');
};
const create = (program) => {
    program.command('app')
        .description('Create a new lary project')
        .argument('<projectName>', 'Project name')
        .action((projectName) => {
        pullLaryScafoldFromGit(projectName);
        configureProject(projectName);
        installDependencies(projectName);
    });
    return program;
};
exports.default = create;
