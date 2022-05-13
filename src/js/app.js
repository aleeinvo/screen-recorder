const app = Vue.createApp({
    data() {
        return {
            videoSources: [],
            selectedVideoSource: null,
            mediaRecorder: null,
            recordedChunks: [],
            mimeType: 'video/webm; codecs=vp9',
            recording: false
        }
    },
    watch: {
        async selectedVideoSource(sourceId) {
            try {
                const video = this.$refs.video;
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: {
                        mandatory: {
                            chromeMediaSource: 'desktop',
                            chromeMediaSourceId: sourceId
                        }
                    }
                });

                if (stream) {
                    video.srcObject = stream;

                    video.onloadedmetadata = (e) => video.play();

                    this.mediaRecorder = new MediaRecorder(stream, {
                        mimeType: this.mimeType
                    });

                    this.mediaRecorder.addEventListener('dataavailable', e => {
                        this.recordedChunks.push(e.data);
                    });

                    this.mediaRecorder.addEventListener('stop', async e => {
                        const blob = new Blob(this.recordedChunks, {
                            type: this.mimeType
                        });

                        const arrayBuffer = await blob.arrayBuffer();

                        window.video.saveVideo(arrayBuffer);
                    });
                }

            } catch (error) {
                console.error(error);
            }
        }
    },
    methods: {
        start() {
            if (this.mediaRecorder) {
                this.mediaRecorder.start();
                this.recording = true;
            }
        },
        stop() {
            if (this.mediaRecorder && this.recording) {
                this.mediaRecorder.stop();
                this.recording = false;
            }
        }
    },
    async created() {
        this.videoSources = await window.video.getVideoSources();
    }
});

app.mount('#app');