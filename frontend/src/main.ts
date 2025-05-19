// Imports here

import './style.scss';


interface Repo {
  name: string;
  html_url: string;
  description?: string;
  updated_at?: string;
}



// DOM Elements

const sideToggle = document.getElementById('sidebar-toggle');
const repoListEl = document.getElementById('repo-list');


// Event Listeners


// Sidebar Collapse animation
sideToggle.addEventListener('click', () => {
  sideToggle.style.opacity = '0';
});

sideToggle.addEventListener('transitionend', (evt) => {
  if (evt.propertyName !== 'opacity') return;

  if (getComputedStyle(sideToggle).opacity === '0') {
    sideToggle.innerText =
      sideToggle.innerText === 'Jacob Smith' ? 'JS' : 'Jacob Smith';

    document.body.classList.toggle('sidebar-collapsed');

    requestAnimationFrame(() => {
      sideToggle.style.opacity = '1';
    });
  }
});


// fetch repos from Backend

async function fetchRepos(): Promise<Repo[]> {
  const res = await fetch('http://localhost:3000/api/repos');
  if (!res.ok) {
    throw new Error(`Failed to load repos (${res.status})`);
  }
  return await res.json();
}

// render repo cards

function renderRepos(repos: Repo[]) {
  repoListEl.innerHTML = ``;

  repos.forEach(repo => {
    const card = document.createElement('div');
    card.className = "repo-card";

    card.innerHTML = `
    <h3><a href="${repo.html_url}" target="_blank" rel="noopener">${formatRepoName(repo.name)}</a></h3>
    <p>${repo.description ?? 'No description provided.'}</p>
    <div class="meta">
      ${formatDateTime(repo.updated_at)}
    </div>
`;
    repoListEl.appendChild(card);
  })
}

// format function

function formatRepoName(raw: string):string {
  return raw.split(/[-_]/g).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}




window.addEventListener('DOMContentLoaded', async () => {
  repoListEl.textContent = 'Loading Repositories';
  try {
    const repos = await fetchRepos();
    renderRepos(repos);
  } catch (err) {
    console.error(err);
    repoListEl.textContent = "Could not load repositories.";
  }
});
  
