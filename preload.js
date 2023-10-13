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
  requestPlotImg: async (data) => {
    console.log(data);
    return ipcRenderer.invoke("request-plot-img", data);
  },
  showPlot: () => {
    ipcRenderer.send("request-plot", "request-plot");
  },
  exitProcess: () => {
    ipcRenderer.send("exit-process", "exit-process");
  },
});
