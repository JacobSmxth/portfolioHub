"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simple_git_1 = __importDefault(require("simple-git"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
const REPO_DIR = path_1.default.join(__dirname, '../repos');
app.use((0, cors_1.default)());
app.use(express_1.default.json());
fs_1.default.mkdirSync(REPO_DIR, { recursive: true });
app.get('/', (req, res) => {
    res.json({ status: "Running..." });
});
app.get('/api/repos', (req, res) => {
    const repos = fs_1.default.readdirSync(REPO_DIR).filter(name => {
        return fs_1.default.existsSync(path_1.default.join(REPO_DIR, name, '.git'));
    });
    res.json(repos);
});
app.get('/api/repos/:repo/commits', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const git = (0, simple_git_1.default)(path_1.default.join(REPO_DIR, req.params.repo));
    let result;
    try {
        const log = yield git.log();
        result = log.all;
    }
    catch (err) {
        console.error("error: ", err);
        result = `No commit history for ${req.params.repo}`;
    }
    res.json(result);
}));
app.get('/api/repos/:repo/commits/:hash', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const git = (0, simple_git_1.default)(path_1.default.join(REPO_DIR, req.params.repo));
    const commit = yield git.show([req.params.hash]);
    res.type('text/plain').send(commit);
}));
app.listen(PORT, () => {
    console.log(`Backend runs on port ${PORT}`);
});
