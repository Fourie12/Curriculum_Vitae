# Personal Website – CS343 Project 1

## 📌 Overview
This is a **React.js personal website project** that includes:
- **Profile Section** (Photo, Interests, Future Plans)  
- **Education & Skills**  
- **Login functionality** for secure editing  

---

## ⚙️ Prerequisites

Make sure your system has the following installed:

1. **Git** – [Download here](https://git-scm.com/)  
   ```bash
   git --version
   ```

2. **Node.js v24 and npm v11**  

   - **Windows (Recommended via nvm-windows)**:  
     1. Download [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)  
     2. Install and restart your terminal  
     3. Run:
        ```bash
        nvm install 24
        nvm use 24
        ```
     4. Verify:
        ```bash
        node -v    # should print v24.x.x
        npm -v     # should print v11.x.x
        ```

   - **Linux/macOS**:
     ```bash
     curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
     source ~/.nvm/nvm.sh
     nvm install 24
     nvm use 24
     ```

3. **Make utility (optional on Windows)**:  
   - Linux/macOS: Pre-installed  
   - Windows: Either install `make` via:
     - [GnuWin32 Make](http://gnuwin32.sourceforge.net/packages/make.htm), or
     - Use Git Bash / WSL (Windows Subsystem for Linux)
   - Alternatively, you can just run `npm install` and `npm run dev` manually without `make`.

---

## 🚀 Quick Start

### 1️⃣ Clone the repository

```bash
git clone git@git.cs.sun.ac.za:Computer-Science/rw334/2025/projects/project-1/24784001-rw343-project1.git
cd 24784001-rw343-project1/Code
```

---

### 2️⃣ Install dependencies

- **Linux/macOS**:
  ```bash
  make install
  ```
- **Windows** (without make):
  ```bash
  npm install
  ```

---

### 3️⃣ Start the development server

- **Linux/macOS**:
  ```bash
  make start
  ```
- **Windows**:
  ```bash
  npm run dev
  ```

If **port 5173 is already in use**, Vite will automatically try the next available port (e.g., `5174`).

The app will launch at:

```
http://localhost:5173
```

---

### 4️⃣ Stop the server

Press:

```
CTRL + C
```
in the terminal where the server is running.

---

## 📂 Project Structure

```
├── Code
│   ├── index.html
│   ├── Makefile
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── profile.json
│   │   └── profile.jpg
│   └── src
│       ├── App.css
│       ├── App.jsx
│       ├── assets
│       │   ├── delete.png
│       │   ├── edit.png
│       │   └── profile.png
│       ├── components
│       │   ├── HomePage.css
│       │   └── HomePage.jsx
│       ├── index.css
│       └── main.jsx
└── README.md
```

---

## ⚠️ Important Notes

- This project **requires Node v24 and npm v11**.  
  If multiple versions are installed, switch using:
  ```bash
  nvm use 24
  ```
- On **Windows**, you can skip `make` and use:
  ```bash
  npm install
  npm run dev
  ```

## 🤖 AI decleration
- Help with spellchecking: I code in text editors
- Debugging: error decoding and fault finding
