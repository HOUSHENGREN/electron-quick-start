/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

const { ipcRenderer } = require('electron')

const remote = require('@electron/remote') // <==> 老版本 require('electron').remote
const { BrowserWindow } = require('@electron/remote')

console.log('eee', BrowserWindow, remote)

window.addEventListener('DOMContentLoaded', () => {
    const mesBnt = document.getElementById('mesBnt')
    mesBnt.addEventListener('click', () => {
      console.log(5454)
      ipcRenderer.send('message', 'hahaha from renderer')

      let win = new BrowserWindow({
        with: 500,
        height: 800
      })
      win.loadURL('https://baidu.com')
    })

    ipcRenderer.on('reply', (event, arg) => {
      console.log('i get your reply:', arg)  
      document.getElementById('mesBackBnt').innerHTML = arg 
    })
})
