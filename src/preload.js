const { contextBridge, desktopCapturer, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('video', {
    getVideoSources: () => ipcRenderer.invoke('get:video-sources'),
    saveVideo: (arrayBuffer) => ipcRenderer.send('save-video', arrayBuffer)
}
);