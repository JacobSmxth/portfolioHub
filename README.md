# portfolioHub

> A self‑hosted, dynamically‑updating personal portfolio dashboard.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
[![Build Status](https://img.shields.io/github/actions/workflow/status/JacobSmxth/portfolioHub/ci.yml?branch=main&logo=github)](https://github.com/JacobSmxth/portfolioHub/actions)  
![Demo GIF](./docs/demo.gif)

## Table of Contents

- [About](#about)  
- [Features](#features)  
- [Project Structure](#project-structure)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Configuration](#configuration)  
  - [Running the App](#running-the-app)  
- [Usage](#usage)  
- [License](#license)  
- [Contact](#contact)

## About

**portfolioHub** is a self‑hosted Node.js + frontend project that automatically pulls in your GitHub repositories and displays them as a sleek, responsive portfolio site. Perfect for showcasing your work in real time.

## Features

- 🔄 Auto‑syncs with your GitHub account  
- 📈 Displays repo stats (stars, forks, last update)  
- ⚙️ RESTful API backend (Express)  
- 🎨 Responsive frontend (React/Vite or plain HTML/CSS/JS)  
- 🔒 Easy environment‑variable configuration  
- 🚀 Ready for deployment on Netlify, Vercel, or any static host  

## Project Structure

```
portfolioHub/
├── backend/      # Express API, data fetch & processing
├── frontend/     # Static or SPA code (React/Vite, etc.)
├── public/       # Static assets (images, favicon, etc.)
├── .gitignore
├── README.md
└── package.json  # root-level scripts (optional)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14+  
- npm or yarn  
- Git  

### Installation

```bash
# 1. Clone the repo
git clone git@github.com:JacobSmxth/portfolioHub.git
cd portfolioHub

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install
```

### Configuration

Copy the example env and update:

```bash
cp backend/.env.example backend/.env
```

Then edit `backend/.env`:

```env
PORT=3000
GITHUB_USERNAME=JacobSmxth
# any other tokens or config
```

### Running the App

```bash
# Start the backend API
cd backend
npm run dev

# In a new terminal, start the frontend
cd ../frontend
npm run dev
```

Open <http://localhost:3000> in your browser.

## Usage

- **View Repos**  
  ```
  GET /api/repos
  ```
- **View Commits**  
  ```
  GET /api/repos/:repoName/commits
  ```
- Customize the frontend components in `frontend/src/` to change layout, colors, etc.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## Contact

Jacob Smxth – [GitHub](https://github.com/JacobSmxth) • jacobsmith@jsmitty.com  
Project Link: [https://github.com/JacobSmxth/portfolioHub](https://github.com/JacobSmxth/portfolioHub)
