(function(){var e={257:function(e,n,o){"use strict";var t=o(5130),s=o(6768);function i(e,n,o,t,i,a){const r=(0,s.g2)("CanvasWand");return(0,s.uX)(),(0,s.Wv)(r)}var a=o(4232);const r={class:"container is-fluid"},c={key:0,ref:"cursor",class:"custom-cursor"},d={ref:"video",class:"video",autoplay:"",style:{display:"none"}},l={class:"toolbox box"},u={class:"buttons"},h=(0,s.Lk)("div",{class:"modal-background"},null,-1),v={class:"modal-card"},f={class:"modal-card-head"},p=(0,s.Lk)("p",{class:"modal-card-title"},"เลือกไม้กายสิทธิ์",-1),g={class:"modal-card-body"},w={class:"columns is-multiline"},m=["onClick"],C=["src"];function k(e,n,o,t,i,k){return(0,s.uX)(),(0,s.CE)(s.FK,null,[(0,s.Lk)("div",r,[i.selectedWand?((0,s.uX)(),(0,s.CE)("div",c,null,512)):(0,s.Q3)("",!0),(0,s.Lk)("video",d,null,512),(0,s.Lk)("canvas",{ref:"canvas",onClick:n[0]||(n[0]=(...e)=>k.onClick&&k.onClick(...e)),onMousemove:n[1]||(n[1]=(...e)=>k.handleMouseMove&&k.handleMouseMove(...e)),onTouchmove:n[2]||(n[2]=(...e)=>k.handleTouchMove&&k.handleTouchMove(...e)),onMouseleave:n[3]||(n[3]=(...e)=>k.hideCursor&&k.hideCursor(...e)),onMouseover:n[4]||(n[4]=(...e)=>k.showCursor&&k.showCursor(...e)),class:"canvas"},null,544)]),(0,s.Lk)("div",l,[(0,s.Lk)("div",u,[(0,s.Lk)("button",{class:"button is-primary",onClick:n[5]||(n[5]=(...e)=>k.showWandDialog&&k.showWandDialog(...e))}," เลือกไม้กายสิทธิ์ "),(0,s.Lk)("button",{class:"button is-info",onClick:n[6]||(n[6]=(...e)=>k.toggleCamera&&k.toggleCamera(...e))},(0,a.v_)(i.isCameraActive?"ปิดกล้อง":"เปิดกล้อง"),1)])]),(0,s.Lk)("div",{class:(0,a.C4)(["modal",{"is-active":i.isWandDialogActive}])},[h,(0,s.Lk)("div",v,[(0,s.Lk)("header",f,[p,(0,s.Lk)("button",{class:"delete","aria-label":"close",onClick:n[7]||(n[7]=(...e)=>k.hideWandDialog&&k.hideWandDialog(...e))})]),(0,s.Lk)("section",g,[(0,s.Lk)("div",w,[((0,s.uX)(!0),(0,s.CE)(s.FK,null,(0,s.pI)(i.wands,((e,n)=>((0,s.uX)(),(0,s.CE)("div",{class:"column is-one-quarter",key:n},[(0,s.Lk)("button",{class:"button is-fullwidth",onClick:e=>k.selectWand(n)},[(0,s.Lk)("img",{src:e.cursor,alt:"Wand Image",style:{width:"100px",height:"auto"}},null,8,C),(0,s.Lk)("span",null,(0,a.v_)(e.name),1)],8,m)])))),128))])])])],2)],64)}var b={data(){return{wands:[{name:"คลื่นพลังบุญ",sound:"wand1.wav",cursor:o(7025)},{name:"ปากกาคุณหนุ่ม",sound:"wand2.wav",cursor:o(6858)}],selectedWand:null,audio:null,isCursorVisible:!1,isWandDialogActive:!1,isCameraActive:!0}},methods:{selectWand(e){this.selectedWand=this.wands[e],this.audio=new Audio(o(290)(`./${this.selectedWand.sound}`)),this.updateCursor(),this.hideWandDialog()},updateCursor(){const e=this.$refs.cursor;e&&this.selectedWand&&(e.style.backgroundImage=`url(${this.selectedWand.cursor})`,e.style.width="300px",e.style.height="300px")},handleMouseMove(e){this.updateCursorPosition(e.clientX,e.clientY)},handleTouchMove(e){const n=e.touches[0];this.updateCursorPosition(n.clientX,n.clientY)},updateCursorPosition(e,n){const o=this.$refs.cursor;o&&this.selectedWand&&(o.style.left=`${e}px`,o.style.top=`${n}px`)},onClick(){this.audio&&this.audio.play()},hideCursor(){const e=this.$refs.cursor;e&&(e.style.display="none")},showCursor(){const e=this.$refs.cursor;e&&(e.style.display="block")},uploadBackground(e){const n=e.target.files[0],o=new FileReader;o.onload=e=>{const n=new Image;n.src=e.target.result,n.onload=()=>{const e=this.$refs.canvas,o=e.getContext("2d");e.width=window.innerWidth,e.height=window.innerHeight,o.drawImage(n,0,0,e.width,e.height)}},o.readAsDataURL(n)},showWandDialog(){this.isWandDialogActive=!0},hideWandDialog(){this.isWandDialogActive=!1},toggleCamera(){this.isCameraActive=!this.isCameraActive,this.isCameraActive?this.openCamera():this.closeCamera()},openCamera(){const e=this.$refs.video;e.style.display="block",navigator.mediaDevices.getUserMedia({video:!0}).then((n=>{e.srcObject=n,e.play(),this.captureCameraFrame()})).catch((e=>{console.error("Error accessing camera: ",e)}))},closeCamera(){const e=this.$refs.video,n=e.srcObject,o=n.getTracks();o.forEach((function(e){e.stop()})),e.srcObject=null,e.style.display="none"},captureCameraFrame(){const e=this.$refs.video,n=this.$refs.canvas,o=n.getContext("2d"),t=()=>{if(!this.isCameraActive||e.paused||e.ended)return;const s=e.videoWidth/e.videoHeight,i=n.width/n.height;let a,r,c,d;i>s?(a=n.height*s,r=n.height,c=(n.width-a)/2,d=0):(a=n.width,r=n.width/s,c=0,d=(n.height-r)/2),o.drawImage(e,c,d,a,r),requestAnimationFrame(t)};t()}},mounted(){const e=this.$refs.canvas;e.width=window.innerWidth,e.height=window.innerHeight,this.selectedWand=this.wands[0],this.openCamera()}},y=o(1241);const W=(0,y.A)(b,[["render",k]]);var x=W,L={name:"App",components:{CanvasWand:x}};const A=(0,y.A)(L,[["render",i]]);var O=A,D=o(4458);(0,D.k)("/wand-app/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}}),(0,t.Ef)(O).mount("#app")},290:function(e,n,o){var t={"./logo.png":3153,"./wand1.png":7025,"./wand1.wav":806,"./wand2.png":6858,"./wand2.wav":1921};function s(e){var n=i(e);return o(n)}function i(e){if(!o.o(t,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t[e]}s.keys=function(){return Object.keys(t)},s.resolve=i,e.exports=s,s.id=290},3153:function(e,n,o){"use strict";e.exports=o.p+"img/logo.75e95202.png"},7025:function(e,n,o){"use strict";e.exports=o.p+"img/wand1.75e95202.png"},806:function(e,n,o){"use strict";e.exports=o.p+"media/wand1.1024b49b.wav"},6858:function(e,n,o){"use strict";e.exports=o.p+"img/wand2.aeb28bff.png"},1921:function(e,n,o){"use strict";e.exports=o.p+"media/wand2.d23614eb.wav"}},n={};function o(t){var s=n[t];if(void 0!==s)return s.exports;var i=n[t]={exports:{}};return e[t].call(i.exports,i,i.exports,o),i.exports}o.m=e,function(){var e=[];o.O=function(n,t,s,i){if(!t){var a=1/0;for(l=0;l<e.length;l++){t=e[l][0],s=e[l][1],i=e[l][2];for(var r=!0,c=0;c<t.length;c++)(!1&i||a>=i)&&Object.keys(o.O).every((function(e){return o.O[e](t[c])}))?t.splice(c--,1):(r=!1,i<a&&(a=i));if(r){e.splice(l--,1);var d=s();void 0!==d&&(n=d)}}return n}i=i||0;for(var l=e.length;l>0&&e[l-1][2]>i;l--)e[l]=e[l-1];e[l]=[t,s,i]}}(),function(){o.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(n,{a:n}),n}}(),function(){o.d=function(e,n){for(var t in n)o.o(n,t)&&!o.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:n[t]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){o.p="/wand-app/"}(),function(){var e={524:0};o.O.j=function(n){return 0===e[n]};var n=function(n,t){var s,i,a=t[0],r=t[1],c=t[2],d=0;if(a.some((function(n){return 0!==e[n]}))){for(s in r)o.o(r,s)&&(o.m[s]=r[s]);if(c)var l=c(o)}for(n&&n(t);d<a.length;d++)i=a[d],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0;return o.O(l)},t=self["webpackChunkwand_app"]=self["webpackChunkwand_app"]||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))}();var t=o.O(void 0,[504],(function(){return o(257)}));t=o.O(t)})();
//# sourceMappingURL=app.dc7890e9.js.map