const { app, BrowserWindow, screen } = require("electron");
const path = require("path");

// Prevent garbage collection
let mainWindow;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true, 
      preload: path.join(__dirname, "preload.js"), // Optional: For safe IPC
    },
  });

  const isDev = !app.isPackaged;

  if (isDev) {
    
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  } else {
   
    const localIndex = path.join(__dirname, "out", "index.html");
    const parentIndex = path.join(__dirname, "..", "out", "index.html");
    
    mainWindow.loadFile("out/index.html").catch(() => {
        console.log("Could not find out/index.html, trying parent...");
        mainWindow.loadFile("../out/index.html");
    });
  }

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});
