const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("mrProbability", {
  setupDataListner: (callback) => {
    ipcRenderer.send("callback-registered");

    return ipcRenderer.on("probability-app-events-delivery", (event, data) => {
      callback(data);
    });
  },
  requestData: (start_date, end_date, probe) => {
    ipcRenderer.send("request-probability-data", {
      start_date,
      end_date,
      probe,
    });
  },
  showPlot: () => {
    return ipcRenderer.send("request-plot", "request-plot");
  },
  exitProcess: () => {
    return ipcRenderer.send("exit-process", "exit-process");
  },
});
