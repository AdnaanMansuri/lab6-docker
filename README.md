# Lab 6 — Containerization using Docker

A small Node.js + Express web app, containerized with Docker, plus a MySQL
database running in its own container. This repo is the submission for Lab 6.

## What's here

| File | Purpose |
|------|---------|
| `Dockerfile` | Builds the app into a Docker image (Task 2) |
| `server.js` | The Express web server (the "project" we containerize) |
| `public/index.html` | Front-end page the app serves |
| `package.json` | App manifest + dependencies |
| `.dockerignore` | Keeps `node_modules`, screenshots, etc. out of the image |
| `screenshots/` | The three required deliverable screenshots |

---

## Task 1 — Install Docker Desktop

1. Download: https://www.docker.com/products/docker-desktop/
2. Windows install steps: https://docs.docker.com/desktop/setup/install/windows-install/
3. During setup keep **"Use WSL 2 instead of Hyper-V"** checked.
4. Reboot if asked, then **launch Docker Desktop** and wait for the whale icon
   in the system tray to say *"Docker Desktop is running."*
5. Verify in a terminal:

   ```powershell
   docker --version
   docker run hello-world
   ```

> If `wsl` isn't recognized after enabling the feature, see the troubleshooting
> link in the assignment PDF (run `wsl --install` in an **admin** PowerShell).

---

## Task 2 — Build & run the app image

From **this folder** (`lab6`), with Docker Desktop running:

```powershell
# Build the image (tag it "lab6-app")
docker build -t lab6-app .

# Run a container, mapping host port 3000 -> container port 3000
docker run --name lab6-app -p 3000:3000 -d lab6-app
```

Open http://localhost:3000 in a browser — you should see the 🐳 page.
Check http://localhost:3000/health for JSON showing the container hostname.

Useful commands:

```powershell
docker ps                 # list running containers
docker logs lab6-app      # view app logs
docker stop lab6-app      # stop it
docker rm lab6-app        # remove it
```

📸 **Screenshot:** capture the successful `docker build` output →
`screenshots/docker-build.png`

---

## Task 3 — Run MySQL in a container

```powershell
docker pull mysql

docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -p 3306:3306 -d mysql:latest
```

The `-p 3306:3306` mapping links host port **3306** to the container's MySQL
port **3306**, so tools on your laptop can reach the database.

Verify it's up:

```powershell
docker ps
docker logs some-mysql        # wait for "ready for connections"
```

📸 **Screenshot:** Docker Desktop → **Containers** tab showing `some-mysql`
(and `lab6-app`) running → `screenshots/docker-desktop-container.png`

---

## Task 4 — Connect with MySQL Workbench

1. Download & install MySQL Workbench: https://dev.mysql.com/downloads/workbench/
2. Open Workbench → **+** (new connection) with:
   - **Connection Name:** `Docker MySQL`
   - **Hostname:** `127.0.0.1`
   - **Port:** `3306`
   - **Username:** `root`
   - **Password:** `my-secret-pw` (click *Store in Vault* and enter it)
3. Click **Test Connection** → should succeed → **OK** → open the connection.
4. Run a quick query to prove it's live:

   ```sql
   SHOW DATABASES;
   SELECT VERSION();
   ```

📸 **Screenshot:** Workbench connected, query result visible →
`screenshots/mysql-workbench-connected.png`

---

## Task 5 — Push to GitHub

```powershell
# (first time only) create the repo on github.com, then:
git remote add origin https://github.com/<your-username>/lab6-docker.git
git add .
git commit -m "Lab 6: Dockerized app + MySQL container + screenshots"
git branch -M main
git push -u origin main
```

Submit the **GitHub repo URL** on Canvas.

---

## Deliverables checklist

- [ ] `Dockerfile` committed
- [ ] `screenshots/docker-build.png` — build succeeded
- [ ] `screenshots/docker-desktop-container.png` — container running
- [ ] `screenshots/mysql-workbench-connected.png` — Workbench connected to MySQL
- [ ] Repo pushed to GitHub; URL submitted
