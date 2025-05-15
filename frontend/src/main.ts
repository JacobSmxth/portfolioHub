import './style.scss';


const BASE_URL = 'http://localhost:3000';

const fetchRepos = async () => {
  const response = await fetch(`${BASE_URL}/api/repos`)
  const data = await response.json();
  return data;
}


const fetchRepoCommits = async (repoThing: string) => {
  const response = await fetch(`${BASE_URL}/api/repos/${repoThing}/commits`);
  const commits = await response.json();
  return commits;
}


