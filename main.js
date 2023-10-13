require("dotenv").config();

const { app, BrowserWindow, protocol, ipcMain } = require("electron");
const path = require("node:path");
const url = require("url");
const Analyzer = require("./analyzer_communication");

const NEXTJS_PORT = process.env.PORT || 3000;

const isDev =
  process.env.NODE_ENV?.trim() === "development" ||
  process.env.NODE_ENV?.trim() === '"development"';
const isProd = !isDev;

const analyzer = new Analyzer();
app.setName("Plasma Knights");

const showPlot = (event, value) => {
  analyzer.plot();
  return true;
};

const requestProbabilityData = (event, { start_date, end_date, probe }) => {
  analyzer.createProcess(start_date, end_date, probe);
  analyzer.on("packet", (packet) => {
    event.reply("probability-app-events-delivery", packet);
  });
};

const exitProcess = (event) => {
  analyzer.destroy();
  return true;
};

const callbackRegistered = (event) => {
  const last_sent_event = analyzer.getLastEvent();
  if (event) {
    event.reply("message", last_sent_event);
  }
};

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    title: "Plasma Knights",
    icon: isProd ? "icons/favicon.icon" : "src/favicon.ico",
    autoHideMenuBar: true,
    backgroundColor: "hsl(224,71%,4%)",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isProd) {
    mainWindow.loadURL(
      url.format({
        pathname: "/",
        protocol: "file",
        slashes: true,
      })
    );
  } else {
    mainWindow.loadURL(`http://localhost:${NEXTJS_PORT}`);
  }
};

app.whenReady().then(() => {
  protocol.interceptFileProtocol(
    "file",
    (request, callback) => {
      const isWin = process.platform === "win32";
      const url = request.url.substr(isWin ? 8 : 7);

      if (url === "") {
        callback({
          path: path.join(__dirname, "out", "index.html"),
        });
      } else if (!url.includes(".")) {
        callback({
          path: path.join(__dirname, "out", `${url}.html`),
        });
      } else {
        callback({
          path: path.join(__dirname, "out", `${url}`),
        });
      }
    },
    (err) => {
      if (err) console.error("Failed to register protocol");
    }
  );

  ipcMain.on("request-plot", showPlot);
  ipcMain.on("request-probability-data", requestProbabilityData);
  ipcMain.on("exit-process", exitProcess);
  ipcMain.on("callback-registered", callbackRegistered);
  ipcMain.handle("request-plot-img", async (event, data) => {
    console.log(data);
    const result = await analyzer.requestPlotImg(data);
    return result;
  });

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
