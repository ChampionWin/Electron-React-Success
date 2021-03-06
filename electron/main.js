const { electron, app, BrowserWindow, ipcMain } = require("electron");
const fs = require("fs");
const { channels } = require("../src/shared/constants");
const path = require("path");
const url = require("url");

let mainWindow;

// let rawdata = fs.readFileSync(
//   path.resolve(__dirname, "../extraResources/config.json")
// );

let rawdata = fs.readFileSync(
  path.resolve(app.getPath("exe"), "../resources/extraResources/config.json")
);

let config = JSON.parse(rawdata);

console.log("======>>>", config);
// const config = (app.getPath("exe"), "../resources/extraResources");

function createWindow() {
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "../index.html"),
      protocol: "file:",
      slashes: true,
    });
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.loadURL(startUrl);
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on(channels.APP_INFO, (event) => {
  event.sender.send(channels.APP_INFO, {
    appName: app.getName(),
    appVersion: app.getVersion(),
    aaa: config,
  });
});
