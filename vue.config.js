const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/wand-app/' : '/',
  pwa: {
    name: 'Wand App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      background_color: '#ffffff'
    },
    icons: [
      {
        "purpose": "maskable",
        "sizes": "512x512",
        "src": "img/icons/icon512_maskable.png",
        "type": "image/png"
      },
      {
        "purpose": "any",
        "sizes": "512x512",
        "src": "img/icons/icon512_rounded.png",
        "type": "image/png"
      }
    ],
  }
})
