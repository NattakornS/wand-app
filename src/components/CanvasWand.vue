<template>
    <div class="container is-fluid">
      <div ref="cursor" class="custom-cursor" v-if="selectedWand" />
      <video ref="video" class="video" autoplay style="display: none;"></video>
      <canvas
        ref="canvas"
        @click="onClick"
        @mousemove="handleMouseMove"
        @touchmove="handleTouchMove"
        @mouseleave="hideCursor"
        @mouseover="showCursor"
        class="canvas"
      />
    </div>
    <div class="toolbox box">
      <div class="buttons">
        <!-- <div class="file is-info">
          <label class="file-label">
            <input class="file-input" type="file" @change="uploadBackground" />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload"></i>
              </span>
              <span class="file-label">
                Upload Background
              </span>
            </span>
          </label>
        </div> -->
        <button class="button is-primary" @click="showWandDialog">
          เลือกไม้กายสิทธิ์
        </button>
        <button class="button is-info" @click="toggleCamera">
          {{ isCameraActive ? "ปิดกล้อง" : "เปิดกล้อง" }}
        </button>
      </div>
    </div>

    <!-- Modal for Wand Selection -->
    <div class="modal" :class="{ 'is-active': isWandDialogActive }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">เลือกไม้กายสิทธิ์</p>
          <button class="delete" aria-label="close" @click="hideWandDialog"></button>
        </header>
        <section class="modal-card-body">
          <div class="columns is-multiline">
            <div class="column is-one-quarter" v-for="(wand, index) in wands" :key="index">
              <button class="button is-fullwidth" @click="selectWand(index)">
                <img :src="wand.cursor" alt="Wand Image" style="width: 100px; height: auto;">
                <span>{{ wand.name }}</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        wands: [
          { name: 'คลื่นพลังบุญ', sound: 'wand1.wav', cursor: require('@/assets/wand1.png') },
          { name: 'ปากกาคุณหนุ่ม', sound: 'wand2.wav', cursor: require('@/assets/wand2.png') },
        ],
        selectedWand: null,
        audio: null,
        isCursorVisible: false,
        isWandDialogActive: false,
        isCameraActive: true,
      };
    },
    methods: {
      selectWand(index) {
        this.selectedWand = this.wands[index];
        this.audio = new Audio(require(`@/assets/${this.selectedWand.sound}`));
        this.updateCursor();
        this.hideWandDialog();
      },
      updateCursor() {
        const cursor = this.$refs.cursor;
        if (cursor && this.selectedWand) {
          cursor.style.backgroundImage = `url(${this.selectedWand.cursor})`;
          cursor.style.width = '300px';
          cursor.style.height = '300px';
        }
      },
      handleMouseMove(event) {
        this.updateCursorPosition(event.clientX, event.clientY);
      },
      handleTouchMove(event) {
        const touch = event.touches[0];
        this.updateCursorPosition(touch.clientX, touch.clientY);
      },
      updateCursorPosition(x, y) {
        const cursor = this.$refs.cursor;
        if (cursor && this.selectedWand) {
          cursor.style.left = `${x}px`;
          cursor.style.top = `${y}px`;
        }
      },
      onClick() {
        if (this.audio) {
          this.audio.play();
        }
      },
      hideCursor() {
        const cursor = this.$refs.cursor;
        if (cursor) {
          cursor.style.display = 'none';
        }
      },
      showCursor() {
        const cursor = this.$refs.cursor;
        if (cursor) {
          cursor.style.display = 'block';
        }
      },
      uploadBackground(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            const canvas = this.$refs.canvas;
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          };
        };
        reader.readAsDataURL(file);
      },
      showWandDialog() {
        this.isWandDialogActive = true;
      },
      hideWandDialog() {
        this.isWandDialogActive = false;
      },
      toggleCamera() {
        this.isCameraActive = !this.isCameraActive;
        if (this.isCameraActive) {
          this.openCamera();
        } else {
          this.closeCamera();
        }
      },
      openCamera() {
        const video = this.$refs.video;
        video.style.display = 'block';
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            video.srcObject = stream;
            video.play();
            this.captureCameraFrame();
          })
          .catch((err) => {
            console.error("Error accessing camera: ", err);
          });
      },
      closeCamera() {
        const video = this.$refs.video;
        const stream = video.srcObject;
        const tracks = stream.getTracks();
  
        tracks.forEach(function (track) {
          track.stop();
        });
  
        video.srcObject = null;
        video.style.display = 'none';
      },
      captureCameraFrame() {
        const video = this.$refs.video;
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext('2d');
        const drawFrame = () => {
          if (!this.isCameraActive || video.paused || video.ended) return;
          const videoAspectRatio = video.videoWidth / video.videoHeight;
          const canvasAspectRatio = canvas.width / canvas.height;
          let drawWidth, drawHeight, offsetX, offsetY;
  
          if (canvasAspectRatio > videoAspectRatio) {
            drawWidth = canvas.height * videoAspectRatio;
            drawHeight = canvas.height;
            offsetX = (canvas.width - drawWidth) / 2;
            offsetY = 0;
          } else {
            drawWidth = canvas.width;
            drawHeight = canvas.width / videoAspectRatio;
            offsetX = 0;
            offsetY = (canvas.height - drawHeight) / 2;
          }
  
          ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);
          requestAnimationFrame(drawFrame);
        };
        drawFrame();
      }
    },
    mounted() {
      const canvas = this.$refs.canvas;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.selectedWand = this.wands[0];
      this.openCamera(); // Open the camera by default
    },
  };
  </script>
  
  <style>
  .container  {
    overflow: hidden;
    position: relative;
    height: 100vh;
    width: 100vw;
  }
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    background-color: aliceblue;
    height: 100%;
    width: 100%;
  }
  
  .custom-cursor {
    z-index: 100;
    position: absolute;
    pointer-events: none;
    transform: translate(-50%, -50%);
    background-size: contain;
    background-repeat: no-repeat;
    display: none;
  }
  
  .toolbox {
    margin: 0!important;
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #f5f5f5;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 10;
  }
  
  .modal-card-body {
    display: flex;
    flex-wrap: wrap;
  }
  
  .modal-card-body .column {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .modal-card-body .button {
    flex-direction: column;
  }
  
  .video {
    display: none;
    width: 100%;
    height: 100%;
  }
  </style>
  