<template>
    <div id="app">
      <input type="file" @change="uploadBackground" />
      <div>
        <button v-for="(wand, index) in wands" :key="index" @click="selectWand(index)">
          {{ wand.name }}
        </button>
      </div>
      <canvas ref="canvas" @mousemove="playSound" />
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        wands: [
          { name: "Wand 1", sound: "wand1.wav" },
          { name: "Wand 2", sound: "wand2.wav" }
        ],
        selectedWand: null,
        audio: null
      };
    },
    methods: {
      selectWand(index) {
        this.selectedWand = this.wands[index];
        this.audio = new Audio(require(`@/assets/${this.selectedWand.sound}`));
      },
      playSound() {
        if (this.audio) {
          this.audio.play();
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
            const ctx = canvas.getContext("2d");
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          };
        };
        reader.readAsDataURL(file);
      }
    },
    mounted() {
      const canvas = this.$refs.canvas;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  };
  </script>
  
  <style>
  #app {
    overflow: hidden;
  }
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
  </style>
  