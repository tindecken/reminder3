import { log } from 'console';
import path from 'path';
import {
  ipcMain,
  clipboard,
  Menu,
  Tray,
  nativeImage,
  BrowserWindow,
  Notification,
} from 'electron';

let timer = null;
let tray: Tray = null;
const contextMenu = Menu.buildFromTemplate([
  {
    label: 'Exit',
    type: 'normal',
    role: 'quit',
    icon: nativeImage.createFromPath(
      path.resolve(
        __dirname,
        process.env.QUASAR_PUBLIC_FOLDER,
        'icons',
        'exit.png'
      )
    ),
  },
  {
    label: 'Show App',
    type: 'normal',
    click: () => {
      BrowserWindow.getAllWindows()[0].show();
    },
    icon: nativeImage.createFromPath(
      path.resolve(
        __dirname,
        process.env.QUASAR_PUBLIC_FOLDER,
        'icons',
        'app.png'
      )
    ),
  },
]);

export function useHandler() {
  ipcMain.handle('myShell:readText', async (event, path) => {
    return await clipboard.readText();
  });
  ipcMain.handle('myShell:writeText', async (event, path) => {
    return await clipboard.writeText(path);
  });
  ipcMain.handle('myShell:startTimer', async (event, number) => {
    BrowserWindow.getFocusedWindow().hide();
    const icon = nativeImage.createFromPath(
      path.resolve(
        __dirname,
        process.env.QUASAR_PUBLIC_FOLDER,
        'icons',
        'icon_normal.ico'
      )
    );
    if (tray === null) {
      tray = new Tray(icon);
    }
    tray.setContextMenu(contextMenu);
    tray.on('double-click', () => {
      if (timer) {
        clearInterval(timer);
        startCounting(number, tray);
      }
    });
    startCounting(number, tray);
  });
}

function startCounting(number: number, tray: Tray) {
  console.log('__dirname', __dirname);
  if (timer !== null) clearInterval(timer);
  tray.setImage(
    nativeImage.createFromPath(
      path.resolve(
        __dirname,
        process.env.QUASAR_PUBLIC_FOLDER,
        'icons',
        'icon_normal.ico'
      )
    )
  );
  timer = setInterval(() => {
    number--;
    tray.setToolTip(' ' + number + 's left');
    if (number === 0) {
      tray.setToolTip('Time is up!');
      if (Notification.isSupported()) {
        new Notification({ title: 'Time is up!' }).show();
      } else {
        console.log('Notification is not supported');
      }
      tray.setImage(
        nativeImage.createFromPath(
          path.resolve(
            __dirname,
            process.env.QUASAR_PUBLIC_FOLDER,
            'icons',
            'icon_alert.ico'
          )
        )
      );
      clearInterval(timer);
    }
  }, 1000);
}
