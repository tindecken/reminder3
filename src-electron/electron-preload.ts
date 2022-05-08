/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 */

import { BrowserWindow } from '@electron/remote';

const { contextBridge, ipcRenderer } = require('electron');

// Set up context bridge between the renderer process and the main process
contextBridge.exposeInMainWorld('myShell', {
  readText: (path) => ipcRenderer.invoke('myShell:readText', path),
  writeText: (path) => ipcRenderer.invoke('myShell:writeText', path),
  startTimer: (number: string) =>
    ipcRenderer.invoke('myShell:startTimer', number),
  minimize() {
    BrowserWindow.getFocusedWindow().minimize();
  },

  toggleMaximize() {
    const win = BrowserWindow.getFocusedWindow();

    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  },

  close() {
    BrowserWindow.getFocusedWindow().close();
  },
});
