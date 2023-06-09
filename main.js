const { app, BrowserWindow, ipcMain } = require("electron")

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: false, // 高版本的electron默认为true，配合nodeIntegration
      nodeIntegration: true, // 渲染进程运行使用commonjs
      enableRemoteModule: true, // 使用remote模块
    }
  })
  mainWindow.loadFile('./index.html')

  mainWindow.webContents.openDevTools() // 默认打开dev开发者工具

  // 开启 @electron/remote  start
  require("@electron/remote/main").initialize();
  require("@electron/remote/main").enable(mainWindow.webContents);  // 使用remote模块
  // 开启 @electron/remote  end

  ipcMain.on('message', (event, arg) => {
    console.log('show message of ipcRenderer: ', arg)
    console.log('event', event)
    event.reply('reply', 'i get it!')
  })
})


// // Modules to control application life and create native browser window
// const { app, BrowserWindow } = require('electron')
// const path = require('path')

// function createWindow () {
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js')
//     }
//   })

//   // and load the index.html of the app.
//   mainWindow.loadFile('index.html')

//   // Open the DevTools.
//   // mainWindow.webContents.openDevTools()
// }

// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.
// app.whenReady().then(() => {
//   createWindow()

//   app.on('activate', function () {
//     // On macOS it's common to re-create a window in the app when the
//     // dock icon is clicked and there are no other windows open.
//     if (BrowserWindow.getAllWindows().length === 0) createWindow()
//   })
// })

// // Quit when all windows are closed, except on macOS. There, it's common
// // for applications and their menu bar to stay active until the user quits
// // explicitly with Cmd + Q.
// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit()
// })

// // In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
