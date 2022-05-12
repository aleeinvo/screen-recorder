const { contextBridge, desktopCapturer, ipcRenderer } = require('electron');

async function getUserMedia() {
    const userMedia = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
    });

    console.log(userMedia);
}

contextBridge.exposeInMainWorld('video', {
    getVideoSources: () => ipcRenderer.invoke('get:video-sources')
}
);