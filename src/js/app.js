const app = Vue.createApp({
    data() {
        return {
            appName: 'Video Recorder',
            videoSources: [],
            selectedVideoSource: null,
            videoStream: null
        }
    },
    watch: {
        async selectedVideoSource(sourceId) {
            try {
                const video = this.$refs.video;
                video.srcObject = await navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: {
                        mandatory: {
                            chromeMediaSource: 'desktop',
                            chromeMediaSourceId: sourceId
                        }
                    }
                });

                video.onloadedmetadata = (e) => video.play();
            } catch (error) {
                console.error(error);
            }
        }
    },
    async created() {
        this.videoSources = await window.video.getVideoSources();
    }
});

app.mount('#app');