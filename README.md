# Capstone Project for Oregon State University '25-'26

### CS 46X - Team 24

### Check In / Check Out System for Assets

[EECS Capstone Info Page](https://eecs.engineering.oregonstate.edu/capstone/submission/pages/viewSingleProject.php?id=6RBYZj9tMGMllxTk)

---

### Project Partner

Dean Akin

> Email - dakin@westernu.edu \
> GitHub - Vexlechuga

### Project Members

Artur Dubanaev

> Email - dubanaea@oregonstate.edu \
> GitHub - artur1dubanaev

Ethan Shiota

> Email - shiotae@oregonstate.edu \
> GitHub - EthanShiota

Michael Zandonella

> Email - zandonmi@oregonstate.edu \
> GitHub - zandonella

Mick Forsman

> Email - forsmami@oregonstate.edu \
> GitHub - MickFsmn

Ryan Dobkin

> Email - dobkinr@oregonstate.edu \
> GitHub - ryandobkin

### Project TA

Birat Thapa

> Email - thapabi@oregonstate.edu \
> GitHub - N/A

### Communication Info

Team Discord Server

> https://discord.gg/73yH4WAGxj

<br />

## Setup

The system can be run in two modes:

1. **Production / hardware mode** — runs the full Docker Compose stack with the physical RFID scanner.
2. **Native development mode** — runs individual services locally for development.

### Docker Compose

From the repository root, run:

```
> docker compose up -d --build
> open http://localhost:8080 in a web browser
```

The Docker stack serves the dashboard from one localhost port and starts:

- the frontend web server
- the backend API
- the scanner socket/status server
- the scanner middleware

### Running with the Physical RFID Scanner on Windows

The physical RFID scanner requires USB/HID access from inside the scanner middleware container. On Windows, attach the scanner to Ubuntu WSL first, then run Docker Compose from WSL.

In PowerShell as Administrator, install `usbipd-win`:

```
winget install usbipd
```

Restart PowerShell after installation, then find the scanner:

```
usbipd list
```

Look for the RFIDeas scanner, ours is:

```
1-7    0c27:3bfa  USB Input Device
```

Attach it to WSL:

```
usbipd attach --wsl --busid 1-7
```

Then in Ubuntu WSL, verify the scanner is available:

```
lsusb
ls -l /dev/hidraw*
```

You should see the RFIDeas reader and a HID device such as `/dev/hidraw0`.

From Ubuntu WSL, run the full stack:

```
cd /mnt/c/path/to/OSU_Capstone_Asset_Checking_System
docker compose up -d --build
```

If the scanner appears as something other than `/dev/hidraw0`, update the `scanner-middleware` device mapping in `docker-compose.yml`.

To detach the scanner from WSL later, run this from PowerShell as Administrator:

```
usbipd detach --busid 1-7
```

If you want to override the default compose settings, copy `.env.compose.example`
to your own env file and run:

```
> docker compose --env-file .env.compose up -d --build
```

### Native Development

### Frontend

In a terminal, navigate to the frontend folder, run `npm install`, `npm run dev`, then open the webpage at `http://localhost:5173`.

```
> [User@root ~]$ cd /OSU_Capstone_Asset_Checking_System
> [User@root OSU_Capstone_Asset_Checking_System]$ cd frontend
> [User@root frontend]$ npm install
> [User@root frontend]$ npm run dev
> open http://localhost:5173 in a web browser
```

### Backend

In a terminal, navigate to the backend folder, run `npm install`, `cp .env.example .env`, `npm run dev`, then open in a browser at `http://localhost:3000`.

```
> [User@root ~]$ cd /OSU_Capstone_Asset_Checking_System
> [User@root OSU_Capstone_Asset_Checking_System]$ cd backend
> [User@root backend]$ npm install
> [User@root backend]$ cp .env.example .env
> [User@root backend]$ npm run dev
> open http://localhost:3000 in a web browser
```

### Scanner

In a terminal, navigate to the scanner folder, run `npm install`, `npm run start`, then open `index.html` in a web browser.

```
> [User@root ~]$ cd /OSU_Capstone_Asset_Checking_System
> [User@root OSU_Capstone_Asset_Checking_System]$ cd scanner
> [User@root scanner]$ npm install
> [User@root scanner]$ npm run start
> open index.html in a web browser
> server runs on http://localhost:3003
```
