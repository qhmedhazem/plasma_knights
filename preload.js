const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("eventsDelivery", {
  setupDataListner: (callback) => {
    ipcRenderer.removeAllListeners("app-events-delivery");
    return ipcRenderer.on("app-events-delivery", (event, data) =>
      callback(data)
    );
  },
});

contextBridge.exposeInMainWorld("magneticReconnection", {
  requestData: (start_date, end_date, probe) => {
    ipcRenderer.send("mr-request-probability-data", {
      start_date,
      end_date,
      probe,
    });
  },
  requestLmnPlotImg: (data) => {
    return ipcRenderer.invoke("mr-request-lmn-plot-img", data);
  },
  requestPlotImg: async (data) => {
    return ipcRenderer.invoke("mr-request-plot-img", data);
  },
  plot: () => {
    ipcRenderer.send("mr-request-plot");
  },
  showPlot: () => {
    ipcRenderer.send("mr-show-plot");
  },
  exitProcess: () => {
    ipcRenderer.send("mr-exit-process");
  },
});

contextBridge.exposeInMainWorld("prediction", {
  requestData: (duration) => {
    ipcRenderer.send("pr-request-probability-data", duration);
  },
  requestPlotImg: async (data) => {
    return ipcRenderer.invoke("pr-request-plot-img", data);
  },
  plot: () => {
    ipcRenderer.send("pr-request-plot");
  },
  showPlot: () => {
    ipcRenderer.send("pr-show-plot");
  },
  exitProcess: () => {
    ipcRenderer.send("pr-exit-process");
  },
});
