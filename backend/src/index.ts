import simpleGit, { SimpleGit } from 'simple-git';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import express from 'express';

const app = express();
const PORT = 3000;
const REPO_DIR = path.join(__dirname, '../repos');

app.use(cors());
app.use(express.json());

fs.mkdirSync(REPO_DIR, { recursive: true });

app.get('/', (req, res) => {
  res.json({ status: "Running..."});
})

app.get('/api/repos', (req, res) => {
  const repos = fs.readdirSync(REPO_DIR).filter(name => {
      return fs.existsSync(path.join(REPO_DIR, name, '.git'));
  });
  res.json(repos);
});

app.get('/api/repos/:repo/commits', async (req, res) => {
  const git: SimpleGit = simpleGit(path.join(REPO_DIR, req.params.repo));
  let result;

  try {
    const log = await git.log();
    result = log.all;
  } catch (err) {
    console.error("error: ", err);
    result = `No commit history for ${req.params.repo}`
  }

  res.json(result)
});

app.get('/api/repos/:repo/commits/:hash', async (req, res) => {
  const git: SimpleGit = simpleGit(path.join(REPO_DIR, req.params.repo));
   
  const commit = await git.show([req.params.hash])
  
  res.type('text/plain').send(commit);


})


app.listen(PORT, () => {
  console.log(`Backend runs on port ${PORT}`)
})



