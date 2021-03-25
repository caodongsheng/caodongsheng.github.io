<template>
  <div>
    <div id="clip_container" class="container over-auto bg-f6f5f6" v-show="getmask">
      <div>
        <img id="clip_image" :src="originUrl">
      </div>
      <button type="button" id="cancel_clip" @click.stop.prevent="destoried" v-show="!isposting">取消</button>
      <button type="button" id="clip_button" @click.stop.prevent="crop"  v-show="!isposting">确定</button>
      <div class="crop_loading" v-show="showloading">
        <div class="crop_content">
          <div class="crop_text">图片修剪中...</div>
        </div>
      </div>
    </div>
    <!-- <div class="container" v-show="panel">
      <div>
        <img id="image" :src="url" alt="Picture">
      </div>
      <button type="button" id="button" @click="crop">确定</button>
    </div>
    -->
    <group>
   
       <div @click="setShowMenu" id="divinput">
      
        <input
          type="file"
          accept="image/*"
          @change="change"
          ref="changetype"
          id="fileinput"
          style="height:50px;position: absolute; right:0px;opacity: 0;-ms-filter: 'alpha(opacity=0)'"
        >
       </div>
 
    </group>

    <actionsheet
      v-model="showmenu"
      :menus="menus1"
      show-cancel
      @on-click-menu-album="fromalbum"
      @on-click-menu-camera="fromcamera"
    ></actionsheet>
  </div>
</template>

<script>
import { Group, Cell, Actionsheet } from "vux";
import Cropper from "cropperjs";
import Exif from "exif-js";
import wx from "weixin-js-sdk";

export default {
  name: "UploadIcon",
  components: { Cell, Actionsheet, Group },
  data() {
    return {
      isposting:false,
      showmenu: false,
      ishtml5: true,
      widthRate: {
        type: Number,
        default: 1
      },
      // 定义的宽高比
      heightRate: {
        type: Number,
        default: 1
      },
      originUrl: "",
      options: null,
      preview: null,
      cropper: null,
      getmask: false,
      showloading: false,
      Orientation: "",
      menus1: {
        album: "从相册选择",
        camera: "拍照"
      }
    };
  },

  computed: {
    usericon: {
      get: function() {
        let url =
          this.$store.state.usersetting.user_pic &&
          this.$store.state.user.user_pic;
        if (url == "" || url == null || url == undefined) {
          url = require("../../../../assets/images/fpw_logo_small.png");
        }
        return url;
      },
      set: function(value) {
        this.$store.state.usersetting.user_pic = value;
        this.$store.state.user.user_pic = value;
      }
    }
  },
  mounted() {
    if (window.api != undefined) {
      this.ishtml5 = false;
      document.getElementById("fileinput").style.display = "none";
    }
    document.getElementById("divinput").onclick();
    window["chooseImg"] = data => {
      let self = this;
      const opt = {
        aspectWithRatio: Number(self.widthRate),
        aspectHeightRatio: Number(self.heightRate)
      };
      self.initilize(opt);
      // 去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(data, function() {
        self.Orientation = Exif.getTag(data, "Orientation");
      });

      // 调用方法转成url格式
      self.originUrl = data;
      // 每次替换图片要重新得到新的url
      if (self.cropper) {
        self.cropper.replace(self.originUrl);
      }
    };
  },

  methods: {
    isiOS() {
      let ua = navigator.userAgent.toLowerCase();
      return ua.indexOf("iphone") !== -1 || ua.indexOf("ipad") !== -1; // ios终端
    },

    setShowMenu() {
      //  if(this.isiOS()&&this.isWeixinCient()){

      //   this.showmenu=false
      //  }
      //  else this.showmenu=true
      if (!this.ishtml5) {
        this.showmenu = true;
      } else {
        this.showmenu = false;
      }
    },
    change(event) {
      let self = this;
      this.clip(event, {
        aspectWithRatio: Number(self.widthRate),
        aspectHeightRatio: Number(self.heightRate)
      });
    },
    // 初始化方法
    initilize(opt) {
      let self = this;
      this.options = opt;
      // 创建dom
      this.createElement();
      // 初始化裁剪对象
      this.cropper = new Cropper(this.preview, {
        aspectRatio: opt.aspectWithRatio / opt.aspectHeightRatio,
        // aspectRatio: 1/1,
        autoCropArea: opt.autoCropArea || 0.8,
        viewMode: 2,
        guides: true,
        cropBoxResizable: true, // 是否通过拖动来调整剪裁框的大小
        cropBoxMovable: true, // 是否通过拖拽来移动剪裁框。
        dragCrop: false,
        dragMode: "move", // ‘crop’: 可以产生一个新的裁剪框3 ‘move’: 只可以移动3 ‘none’: 什么也不处理
        zoomOnTouch: true, // 是否可以通过拖动触摸来放大图像。
        scalable: true,
        // minCropBoxHeight: 750,
        // minCropBoxWidth: 750,
        background: false,
        checkOrientation: true,
        checkCrossOrigin: true,
        zoomable: false, // 是否允许放大图像。
        zoomOnWheel: false,
        center: false,
        toggleDragModeOnDblclick: false,
        ready: function() {
          if (opt.aspectRatio === "Free") {
            let cropBox = self.cropper.cropBox;
            cropBox.querySelector("span.cropper-view-box").style.outline =
              "none";
            self.cropper.disable();
          }
        }
      });
    },
    // 创建一些必要的DOM，用于图片裁剪
    createElement() {
      this.preview = null;
      this.getmask = true;
      let self = this;
      self.preview = document.getElementById("clip_image");

      // 绑定一些方法
      self.initFunction();
    },
    // 初始化一些函数绑定
    initFunction() {
      const fileObj = document.getElementById("fileinput");
      // 清空input的值
      this.addEvent(fileObj, "click", function() {
        this.value = "";
      });
    },
    // 外部接口，用于input['file']对象change时的调用
    clip(e, opt) {
      let self = this;
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return false; // 不是图片直接返回
      // 获取图片文件资源
      this.originUrl = this.getObjectURL(files[0]);
      // 调用初始化方法
      this.initilize(opt);

      // 去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(files[0], function() {
        self.Orientation = Exif.getTag(files[0], "Orientation");
      });

      // 调用方法转成url格式

      // 每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(this.originUrl);
      }
    },
    // 图片转码方法
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL !== undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL !== undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL !== undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }

      return url;
    },
    // 点击确定进行裁剪
    crop() {
      this.showloading = true;
      let self = this;
      let image = new Image();
      let croppedCanvas;
      let roundedCanvas;
      setTimeout(function() {
        const cancelBtn = document.getElementById("cancel_clip");
        self.isposting = true;
        // Crop
        croppedCanvas = self.cropper.getCroppedCanvas();
        // Round
        roundedCanvas = self.getRoundedCanvas(croppedCanvas);
        let imgData = roundedCanvas.toDataURL("image/png");
        image.setAttribute("src", imgData);
        // 判断图片是否大于100k,不大于直接上传，反之压缩
        if (imgData.length < 100 * 1024) {
          // 图片上传
          self.postImg(imgData);
        } else {
          image.onload = function() {
            // 压缩处理
            let data = self.compress(image, self.Orientation);
            // 图片上传
            self.postImg(data);
          };
        }
      }, 20);
    },
    // 获取裁剪图片资源
    getRoundedCanvas(sourceCanvas) {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      let width = sourceCanvas.width;
      let height = sourceCanvas.height;
      canvas.width = width;
      canvas.height = height;
      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = "destination-in";
      context.beginPath();
      context.rect(0, 0, width, height);
      context.fill();
      return canvas;
    },
    // 销毁原来的对象
    destoried() {
      this.isposting = false;
      if (this.cropper) {
        this.cropper.destroy();
        this.cropper = null;
      }
      // 移除裁剪框
      this.showloading = false;
      this.getmask = false;
      // 销毁裁剪对象
    },

    // 图片旋转
    rotateImg(img, direction, canvas) {
      // 最小与最大旋转方向，图片旋转4次后回到原方向
      const minStep = 0;
      const maxStep = 3;
      if (img == null) return;
      // img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height;
      let width = img.width;
      let step = 2;
      if (step == null) {
        step = minStep;
      }
      if (direction === "right") {
        step++;
        // 旋转到原位置，即超过最大值
        step > maxStep && (step = minStep);
      } else {
        step--;
        step < minStep && (step = maxStep);
      }
      // 旋转角度以弧度值为参数
      let degree = (step * 90 * Math.PI) / 180;
      let ctx = canvas.getContext("2d");
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    },
    // 图片压缩
    compress(img, Orientation) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      // 瓦片canvas
      //   let tCanvas = document.createElement('canvas')
      //   let tctx = tCanvas.getContext('2d')
      // let initSize = img.src.length
      let width = img.width;
      let height = img.height;

      // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = (width * height) / this.compresslimit) > 1) {
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      //        铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // 如果图片像素大于100万则使用瓦片绘制
      // let count
      // if ((count = width * height / 100000) > 1) {
      //   count = ~~(Math.sqrt(count) + 1) //计算要分成多少块瓦片
      //   //            计算每块瓦片的宽和高
      //   let nw = ~~(width / count)
      //   let nh = ~~(height / count)
      //   tCanvas.width = nw
      //   tCanvas.height = nh
      //   for (let i = 0; i < count; i++) {
      //     for (let j = 0; j < count; j++) {
      //       tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
      //       ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
      //     }
      //   }
      // } else {
      ctx.drawImage(img, 0, 0, width, height);
      // }
      // 修复ios上传图片的时候 被旋转的问题
      if (Orientation !== "" && Orientation !== 1) {
        switch (Orientation) {
          case 6: // 需要顺时针（向左）90度旋转
            this.rotateImg(img, "left", canvas);
            break;
          case 8: // 需要逆时针（向右）90度旋转
            this.rotateImg(img, "right", canvas);
            break;
          case 3: // 需要180度旋转
            this.rotateImg(img, "right", canvas); // 转两次
            this.rotateImg(img, "right", canvas);
            break;
        }
      }
      // 进行最小压缩
      // let ndata = canvas.toDataURL( 'image/jpeg' , 0.1);
      let ndata = canvas.toDataURL("image/png", 0.1);
      //  alert('压缩前：' + initSize)
      //  alert('压缩后：' + ndata.length)
      //   alert('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + '%')
      // tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
      canvas.width = canvas.height = 0;
      return ndata;
    },
    // 添加事件
    addEvent(obj, type, fn) {
      if (obj.addEventListener) {
        obj.addEventListener(type, fn, false);
      } else {
        obj.attachEvent("on" + type, fn);
      }
    },
    // 移除事件
    removeEvent(obj, type, fn) {
      if (obj.removeEventListener) {
        obj.removeEventListener(type, fn, false);
      } else {
        obj.detachEvent("on" + type, fn);
      }
    },
    requestImgUrl(imgurl) {
      let self = this;
      this.$http
        .post("uts/user/userEdit", { user_pic: imgurl })
        .then(function(response) {
          if (response.data === "SUCCESS") {
            self.usericon = imgurl;
            self.destoried();
            window.localStorage.setItem("user_pic", imgurl);
          } else {
            // alert(response.msg)
            this.showToast("", "text", response.msg, "20em", "top");
          }
        }).catch(err =>{
          if(err.msg){
            this.showToast("", "text", err.msg, "20em", "top");
          }
        })
     
    },
    postImg(data) {
      let self = this;
      this.$http
        .post("uts/file/txFilesUpload", { imgStr: data })
        .then(function(response) {
          if (response.msg === "请求成功") {
            self.requestImgUrl(response.data);
          } else {
           
            self.showToast("", "text", response.msg, "20em", "middle");
            self.isposting = false
            self.showloading = false
          }
        })
        .catch(function(error) {
            self.isposting = false
         self.showloading = false
         if(error.msg)
         self.showToast("", "text", error.msg, "20em", "middle"); 
       
        });
    },

    fromalbum: function() {
      let self = this;
      if (!this.ishtml5) {
        var UIMediaScanner = api.require("UIMediaScanner");
        UIMediaScanner.open(
          {
            type: "picture",
            column: 4,
            classify: true,
            max: 1,
            sort: {
              key: "time",
              order: "desc"
            },
            texts: {
              stateText: "已选择*项",
              cancelText: "取消",
              finishText: "完成"
            },
            styles: {
              bg: "#fff",
              mark: {
                icon: "",
                position: "bottom_left",
                size: 20
              },
              nav: {
                bg: "#eee",
                stateColor: "#000",
                stateSize: 18,
                cancelBg: "rgba(0,0,0,0)",
                cancelColor: "#000",
                cancelSize: 18,
                finishBg: "rgba(0,0,0,0)",
                finishColor: "#000",
                finishSize: 18
              }
            },
            scrollToBottom: {
              intervalTime: 3,
              anim: true
            },
            exchange: true,
            rotation: true
          },
          function(ret) {
            if (ret) {
              if (ret.list.length > 0) {
                window.chooseImg(ret.list[0].path);
              } else {
                self.destoried();
              }
            } else {
              self.destoried();
            }
          }
        );
      } else {
        let els = document.querySelectorAll("input[type=file]");
        // els[0].removeAttribute('capture')
        // if (self.isWeixinCient()) {
        els[0].accept = "image/*";
        // } else
        // els[0].accept = 'image/jpeg,image/png,images/jpg,images/gif'
        els[0].click();
      }
    },

    fromcamera() {
      let self = this;
      // this.$refs.file.accept = "image/*";
      // this.$refs.file.capture = "camera";
      // // console.log('触发拍照功能')
      // let els =document.querySelectorAll('input[type=file]')
      // els[0].click()

      // let els = document.querySelectorAll('input[type=file]')
      // els[0].accept = 'image/*'
      // els[0].capture = 'camera'
      // els[0].click()
      if (!this.ishtml5) {
        api.getPicture(
          {
            sourceType: "camera",

            mediaValue: "pic",
            destinationType: "url",
            quality: 90,        
             saveToPhotoAlbum: true
          },
          function(ret, err) {
            if (ret && ret.data != "") {
              window.chooseImg(ret.data);
            } else {
                self.destoried();
              if (ret) {
               
                self.showToast("", "text", "取消拍照", "20em", "bottom");
              } else {
              
                self.showToast("", "text", "取消拍照", "20em", "bottom");
              }
            }
          }
        );
      } else {
        let els = document.querySelectorAll("input[type=file]");
        els[0].accept = "image/*";
        // els[0].capture = 'camera'
        els[0].click();
      }
    }
  },
  props: {
    compresslimit: {
      type: Number,
      default: 300000
    },
    isavata:{
      type:Boolean,
      default:false
    }
  }
};
</script>

<style scoped>
.weui-cell {
  padding: 14px 15px;
}

#clip_button {
  position: absolute;
  right: 10%;
  bottom: 20px;
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 2px;
  background: #1aad19;
  color: #fff;
}

#cancel_clip {
  position: absolute;
  left: 10%;
  bottom: 20px;
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 2px;
  color: #fff;
  background: #e64340;
}

#clip_container.container {
  z-index: 999;
  position: fixed;
  padding-top: 60px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 1);
}

#clip_container.container > div {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#clip_image {
  max-width: 100%;
}
.crop_loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
}

.crop_loading .crop_content {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  background: #000;
  opacity: 0.9;
  height: 66px;
  width: 140px;
  vertical-align: middle;
  color: #fff;
  padding-top: 20px;
  font-size: 16px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.crop_loading .crop_content img {
  margin-top: 15px;
  margin-bottom: 10px;
}

.cropper-container img {
  /* Avoid margin top issue (Occur only when margin-top <= -height) */
  display: block;
  min-width: 0 !important;
  max-width: none !important;
  min-height: 0 !important;
  max-height: none !important;
  width: 100%;
  height: 100%;
  image-orientation: 0deg;
}
</style>
<style>
.cropper-container {
  font-size: 0;
  line-height: 0;
  position: relative;
  direction: ltr;
  -ms-touch-action: none;
  touch-action: none;
}

.cropper-wrap-box,
.cropper-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.cropper-wrap-box {
  overflow: hidden;
}

.cropper-drag-box {
  opacity: 0;
  background-color: #fff;
}

.cropper-modal {
  opacity: 0.5;
  background-color: #000;
}

.cropper-view-box {
  display: block;
  overflow: hidden;

  width: 100%;
  height: 100%;

  outline: 1px solid #39f;
  outline-color: rgba(51, 153, 255, 0.75);
}

.cropper-dashed {
  position: absolute;

  display: block;

  opacity: 0.5;
  border: 0 dashed #eee;
}

.cropper-dashed.dashed-h {
  top: 33.33333%;
  left: 0;
  width: 100%;
  height: 33.33333%;
  border-top-width: 1px;
  border-bottom-width: 1px;
}

.cropper-dashed.dashed-v {
  top: 0;
  left: 33.33333%;
  width: 33.33333%;
  height: 100%;
  border-right-width: 1px;
  border-left-width: 1px;
}

.cropper-center {
  position: absolute;
  top: 50%;
  left: 50%;

  display: block;

  width: 0;
  height: 0;

  opacity: 0.75;
}

.cropper-center:before,
.cropper-center:after {
  position: absolute;
  display: block;
  content: " ";
  background-color: #eee;
}

.cropper-center:before {
  top: 0;
  left: -3px;
  width: 7px;
  height: 1px;
}

.cropper-center:after {
  top: -3px;
  left: 0;
  width: 1px;
  height: 7px;
}

.cropper-face,
.cropper-line,
.cropper-point {
  position: absolute;

  display: block;

  width: 100%;
  height: 100%;

  opacity: 0.1;
}

.cropper-face {
  top: 0;
  left: 0;

  background-color: #fff;
}

.cropper-line {
  background-color: #39f;
}

.cropper-line.line-e {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: e-resize;
}

.cropper-line.line-n {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: n-resize;
}

.cropper-line.line-w {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: w-resize;
}

.cropper-line.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: s-resize;
}

.cropper-point {
  width: 5px;
  height: 5px;

  opacity: 0.75;
  background-color: #39f;
}

.cropper-point.point-e {
  top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: e-resize;
}

.cropper-point.point-n {
  top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize;
}

.cropper-point.point-w {
  top: 50%;
  left: -3px;
  margin-top: -3px;
  cursor: w-resize;
}

.cropper-point.point-s {
  bottom: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize;
}

.cropper-point.point-ne {
  top: -3px;
  right: -3px;
  cursor: ne-resize;
}

.cropper-point.point-nw {
  top: -3px;
  left: -3px;
  cursor: nw-resize;
}

.cropper-point.point-sw {
  bottom: -3px;
  left: -3px;
  cursor: sw-resize;
}

.cropper-point.point-se {
  right: -3px;
  bottom: -3px;
  width: 20px;
  height: 20px;
  cursor: se-resize;
  opacity: 1;
}

@media (min-width: 768px) {
  .cropper-point.point-se {
    width: 15px;
    height: 15px;
  }
}

@media (min-width: 992px) {
  .cropper-point.point-se {
    width: 10px;
    height: 10px;
  }
}

@media (min-width: 1200px) {
  .cropper-point.point-se {
    width: 5px;
    height: 5px;
    opacity: 0.75;
  }
}

.cropper-point.point-se:before {
  position: absolute;
  right: -50%;
  bottom: -50%;
  display: block;
  width: 200%;
  height: 200%;
  content: " ";
  opacity: 0;
  background-color: #39f;
}

.cropper-invisible {
  opacity: 0;
}

.cropper-bg {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
}

.cropper-hide {
  position: absolute;

  display: block;

  width: 0;
  height: 0;
}

.cropper-hidden {
  display: none !important;
}

.cropper-move {
  cursor: move;
}

.cropper-crop {
  cursor: crosshair;
}

.cropper-disabled .cropper-drag-box,
.cropper-disabled .cropper-face,
.cropper-disabled .cropper-line,
.cropper-disabled .cropper-point {
  cursor: not-allowed;
}
</style>
