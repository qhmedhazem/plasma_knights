require("dotenv").config();

const { app, BrowserWindow, protocol, ipcMain } = require("electron");
const path = require("node:path");
const url = require("url");
const Analyzer = require("./analyzer_communication");
const Predictior = require("./prediction_communication");

const NEXTJS_PORT = process.env.PORT || 3000;

const isDev =
  process.env.NODE_ENV?.trim() === "development" ||
  process.env.NODE_ENV?.trim() === '"development"';
const isProd = !isDev;

const analyzer = new Analyzer();
const predictior = new Predictior();
app.setName("Plasma Knights");

const PrRequestData = (event, duration) => {
  predictior.createProcess(duration);
  predictior.on("packet", (packet) => {
    event.reply("app-events-delivery", ["pr", packet]);
  });
};

const PrShowPlot = (event, value) => {
  predictior.plot();
  return true;
};

const PrExitProcess = (event) => {
  predictior.destroy();
  return true;
};

const MrShowPlot = (event, value) => {
  analyzer.showPlot();
  return true;
};

const MrRequestProbabilityData = (event, { start_date, end_date, probe }) => {
  analyzer.createProcess(start_date, end_date, probe);
  analyzer.on("packet", (packet) => {
    event.reply("app-events-delivery", ["mr", packet]);
  });
};

const MrExitProcess = (event) => {
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
    icon: isProd ? "icons/favicon.icon" : "src/app/favicon.ico",
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

  // callback
  ipcMain.on("callback-registered", callbackRegistered);

  // magnetic reconnection
  ipcMain.on("mr-request-probability-data", MrRequestProbabilityData);
  ipcMain.on("mr-request-plot", MrShowPlot);
  ipcMain.on("mr-show-plot", MrShowPlot);
  ipcMain.on("mr-exit-process", MrExitProcess);
  ipcMain.handle("mr-request-lmn-plot-img", async (event, data) => {
    const result = await analyzer.requestLmnPlotImg(data);
    return result;
  });
  ipcMain.handle("mr-request-plot-img", async (event, data) => {
    const result = await analyzer.requestPlotImg(data);
    return result;
  });

  // prediction
  ipcMain.on("pr-request-probability-data", PrRequestData);
  ipcMain.on("pr-request-plot", PrShowPlot);
  ipcMain.on("pr-show-plot", PrShowPlot);
  ipcMain.on("pr-exit-process", PrExitProcess);
  ipcMain.handle("pr-request-plot-img", async (event, data) => {
    const result = await predictior.requestPlotImg(data);
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
