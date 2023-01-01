import { Command } from "commander";
import clone from 'git-clone';
import { readFileSync, writeFileSync, existsSync, rmSync } from "fs";
import { execSync } from "child_process";
import { cwd } from "process";

const pullLaryScafoldFromGit = (projectName: string) => {
    const projectFolder = `${cwd()}/${projectName}`;
    console.log(`create project...`)
    clone(`https://github.com/RiceCooker-dev/Lary-Scafold.git`, projectFolder)
    while(!existsSync(`${projectFolder}/package.json`)){}
    console.log('done.')
}

const configureProject = (projectName: string) => {
    const projectFolder = `${cwd()}/${projectName}`;
    const packageJson = readFileSync(`${projectFolder}/package.json`).toString();
    writeFileSync(`${projectFolder}/package.json`, packageJson.replace('lary-poc', projectName));
    const appJson = readFileSync(`${projectFolder}/app.json`).toString();
    writeFileSync(`${projectFolder}/app.json`, appJson.replace('My app', projectName).replace('my-app', projectName));
    rmSync(`${projectFolder}/.git`, {recursive: true, force: true});
}

const installDependencies = (projectName: string) => {
    const projectFolder = `${cwd()}/${projectName}`;
    console.log('installing dependencies...')
    execSync(`cd ${projectFolder} && yarn`, {stdio: 'inherit'});
    console.log('done.')
}

const create = (program: Command) => {
    program.command('app')
        .description('Create a new lary project')
        .argument('<projectName>', 'Project name')
        .action((projectName: string) => {
            pullLaryScafoldFromGit(projectName)
            configureProject(projectName)
            installDependencies(projectName)
        })
    
    return program;
}

export default create;