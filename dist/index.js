"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// TypeScript (.ts)
const project_1 = __importDefault(require("./project"));
const commander_1 = require("commander");
let program = new commander_1.Command();
program = (0, project_1.default)(program);
program.parse();
const options = program;
