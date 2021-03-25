<template>
  <div>
    <div class="box-withbar over-auto bg-f6f5f6" style="bottom:55px">
      <!--发布文字区域-->
      <div class="pubtext">
        <h1 class="f-14 color-999 f-normal">{{dynamic}}（100字以内）</h1>
        <p class="bg-ffffff f-14">
          <group class="group-clearbd">
            <x-textarea class="f-14" v-model="selectText" :min="5" :max="500"   :class="getClass" placeholder="写点什么吧，请输入至少5个字的内容"></x-textarea>
          </group>
        </p>
      </div>
      <transition name="bounce">
        <div v-show="imgBig" class="imgModal" @click="modalCloseOpen">
          <img :src="imgBigSrc" style="margin: 0 auto;width: 70%;display: inline-block" />
        </div>
      </transition>
      <!--上传图片区域-->
      <div class="pubimg">
        <h1 class="f-14 color-999 f-normal">上传图片（最多9张）</h1>
        <div class="imgbox bg-ffffff">
          <div class="imguploads clearfix ">
            <div class="imguploads-item" v-for="(iu,index) in imgUrls" :key="index">
              <div class="item-wrap" style="position: relative;">
                <img :src="iu" @click="imgToBig(iu)">
                <x-icon @click="imgDelete(iu,index)" type="ios-close" size="20" style="position: absolute;top:0;right: .4em"></x-icon>
              </div>
            </div>

            <!--上传图片-->
            <div class="imguploads-item" v-if="isAddImgShow">
              <div class="item-wrap addimg" @click="showMenu">
                <p>
                  <input type="file"  ref="file" @change="getFile" accept="image/*" id="fileinput" style="height: 100%;width: 100%;position: absolute;top:0;left: 0;opacity: 0;-ms-filter: 'alpha(opacity=0)'">
                  <i class="iconfont icon-f-cam"></i>
                  <span>{{this.imgUrls.length==0?"添加图片":this.imgUrls.length+"/9"}}</span>
                </p>
                <!-- <actionsheet v-model="showmenu" :menus="menus1" show-cancel @on-click-menu-album="fromalbum" @on-click-menu-camera="fromcamera"></actionsheet> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="loading" style="text-align:center;" v-show="show2">
      <inline-loading></inline-loading>
      <span style="color:#999">发布中...</span>
    </p>
    <div class="lightBox" v-show="showPrompt"></div>
    <!--底部按钮-->
    <a class="btn-lovedynwrite btn-orange-lg dis-block text-center color-white">
      <p @click="publish">{{button}}</p>
    </a>
  </div>
</template>

<script>
import { XHeader, Group, XTextarea, InlineLoading, Actionsheet } from 'vux'
import { setTimeout } from 'timers'
import { mapState, mapGetters } from 'vuex'
import {checkDesc} from '@/util/validFun.js';
import wx from 'weixin-js-sdk'
import Bus from "@/pages/home/Bus"

export default {
  props: ['button', 'dynamic'],
  name: 'love_dyn_write',
  components: { XHeader, Group, XTextarea, InlineLoading, Actionsheet },
  data() {
    return {
      imgUrls: [],
      previewImg: '',
      isPreview: false,
      selectText: '',
      id: '',
      show2: false,
      imgBigSrc: '',
      showPrompt: false,
      imgBig: false,
      isAddImgShow: true,
   //   showmenu: false,
      ishtml5: true,
      //定义的宽高比
      widthRate: {
        type: Number,
        default: 1
      },
      heightRate: {
        type: Number,
        default: 1
      },
      originUrl: '',
      picValue: null,
      Orientation: '',
      menus1: {
        album: '从相册选择',
        camera: '拍照'
      },
      type: 2
    }
  },
  created() {
    if (this.button == '提交') {
      this.type = 4
    }
  },
     watch: {
       selectText(val) {
        this.$nextTick(() => {
          let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
          this.selectText = val.replace(pattern, ''); 
       
        })
      }

    },
  computed: {
    ...mapState(['demandDetail']),
    demandId() {
      return this.$route.params.demandId
    },
     getClass() {
      if (this.selectText.replace(/(^\s*)|(\s*$)/g, "").length < 5) {
        return "redfont";
      } else {
        return "";
      }
    },
  },
  methods: {
     valideContent(){
      let pattern =  /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
      this.selectText = this.selectText.replace(pattern, ''); 
    },
    getFile(file) {
      let _this = this;
       let  base64 = file;
        _this.imgUrls.push(base64);
        _this.imgUrls = _this.uniq();
       if (_this.imgUrls.length > 8) {
          _this.isAddImgShow = false;
        }
    },
    async publish() {
     
          let obj = checkDesc(this.selectText, 5, 500, "反馈内容");
      if (!obj.valid) {
        this.showToast("", "text", obj.msg);
        return;
      } else {
        if (!/[^\x00-\xff]{5,500}$/.test( this.selectText.replace(/(^\s*)|(\s*$)/g, ""))) 
          {
            this.showToast("", "text", "反馈输入有误，必须是中文字符");
            return;
          }
        
      }

     
        this.show2 = true
        this.showPrompt = true
        let img
        if (this.imgUrls.length > 0) {
          let arg = {}
          arg.imgStr = this.imgUrls.join('-')
          arg.sign = "mark"

          let isUploader = await this.$http.post('uts/file/bfFilesUpload', arg)
          img = isUploader.data
        }
        this.$http
          .post('hts/management/addDynamic', {
            demandId: this.demandId,
            comment: this.selectText.replace(/(^\s*)|(\s*$)/g, ""),
            imgUrl: img ? img.join(',') : '',
            type: this.type
          })
          .then(res => {
            if (res.msg == '请求成功') {
              this.show2 = false
              this.showPrompt = false
              if (this.type == 2) {
                this.$router.replace({
                  name: 'lovedynamics',
                  params: {
                    demandId: this.demandId,
                   
                  }
                })
              } else {
                this.$router.push({
                  name: 'viewlovefeedback',
                  params: {
                    demandId: this.demandId,
                 
                  }
                })
              }
            }
          })
          .catch(error => {
             this.show2 = false
              this.showPrompt = false
              if(error.msg)
              this.showToast('','text',error.msg,'20em','','middle')
            //   let _this = this
            // setTimeout(() => {
            //   this.show2 = false
            //   this.showPrompt = false
            //   this.showToast('', 'text', '图片上传失败')
            // }, 10000)
          })  
     
    },
    showMenu() {
      // if (!this.ishtml5) {
      //   this.showmenu = true
      // } else {
      //   this.showmenu = false
      // }
          // window.pictures.revertwangda()
          let data={
            maxSize:3072,       //图片最大
            allowPreview:1,  //1可预览 0不可裁剪
            allowCustom:1    //必穿参数 1 普通获取 0 证件照
          }
          this.ModuleNative('AppRegulePhoto',data)

    },
     uniq() {
      var temp = []; //一个新的临时数组
      for (let i = 0; i < this.imgUrls.length; i++) {
        if (temp.indexOf(this.imgUrls[i]) == -1) {
          temp.push(this.imgUrls[i]);
        }
      }
      return temp;
    },
    //从相册中选择
    fromalbum: function() {
      //   this.$refs.file.accept = "image/jpg,image/png,image/jpeg,image/gif";
      //   let els = document.querySelectorAll("input[type=file]");
      //   els[0].click();
      let self = this
      if (window.api) {
        let selectnum = 9 - this.imgUrls.length;
        var UIMediaScanner = api.require('UIMediaScanner')
        UIMediaScanner.open(
          {
            type: 'picture',
            column: 4,
            classify: true,
            max: selectnum,
            sort: {
              key: 'time',
              order: 'desc'
            },
            texts: {
              stateText: '已选择*项',
              cancelText: '取消',
              finishText: '完成'
            },
            styles: {
              bg: '#fff',
              mark: {
                icon: '',
                position: 'bottom_left',
                size: 20
              },
              nav: {
                bg: '#eee',
                stateColor: '#000',
                stateSize: 18,
                cancelBg: 'rgba(0,0,0,0)',
                cancelColor: '#000',
                cancelSize: 18,
                finishBg: 'rgba(0,0,0,0)',
                finishColor: '#000',
                finishSize: 18
              }
            },
            // 打开媒体资源界面后间隔一段时间开始自动滚动到底部设置
            // scrollToBottom: {
            //   intervalTime: 3,
            //   anim: true
            // },
            exchange: true,
            rotation: true
          },
          function(ret) {
            if (ret) {
                for(let localimg of ret.list) {
                     let img = new Image()
                    img.src = localimg.path
                    var width = 640 // 图像大小
                    var quality = 0.7 // 图像质量
                    var canvas = document.createElement('canvas')
                    var drawer = canvas.getContext('2d')
                    var base64
                    self.$refs.file.value = ''
                    img.onload = function() {
                        canvas.width = width
                        canvas.height = width * (img.height / img.width)
                        drawer.drawImage(img, 0, 0, canvas.width, canvas.height)
                        base64 = canvas.toDataURL('image/jpeg', quality)
                        self.imgUrls.push(base64)
                        self.imgUrls = self.uniq()
                        if (self.imgUrls.length > 8) {
                            self.isAddImgShow = false
                        }
                    }
                }
             
            }
          }
        )
      } else {

          let els = document.querySelectorAll('input[type=file]')
          els[0].removeAttribute('capture')
          if (self.isWeixinCient()) {
            els[0].accept = 'image/*'
          } else
          els[0].accept = 'image/jpeg,image/png,images/jpg,images/gif'
          els[0].click()

      }
    },
    //点击拍照
    fromcamera() {
      let self = this
      // this.$refs.file.accept = "image/*";
      // this.$refs.file.capture = "camera";
      // // console.log('触发拍照功能')
      // let els =document.querySelectorAll('input[type=file]')
      // els[0].click()

      // let els = document.querySelectorAll('input[type=file]')
      // els[0].accept = 'image/*'
      // els[0].capture = 'camera'
      // els[0].click()
      if (window.api) {
        api.getPicture(
          {
            sourceType: 'camera',
            allowEdit: true,
            mediaValue: 'pic',
            destinationType: 'base64',
            quality: 70
          },
          function(ret, err) {
            if (ret && ret.data != '') {
              self.imgUrls.push(ret.base64Data)
              if (self.imgUrls.length > 8) {
                self.isAddImgShow = false
              }
            } else {
              if (ret) {
                self.showToast('', 'text', '取消拍照', '20em', 'bottom')
              } else {
                self.showToast('', 'text', JSON.stringify(err), '20em', 'bottom')
              }
            }
          }
        )
      } else {

          let els = document.querySelectorAll('input[type=file]')
          els[0].accept = 'image/*'
          els[0].capture = 'camera'
          els[0].click()

      }
    },
    imgToBig(e) {
      this.imgBigSrc = e
      this.imgBig = !this.imgBig
    },

    modalCloseOpen() {
      this.imgBig ? (this.imgBig = false) : (this.imgBig = true)
    },
    imgDelete(value, index) {
      this.imgUrls.splice(index, 1)
      if (this.imgUrls.length < 9) {
        this.isAddImgShow = true
          this.$nextTick(()=>{
             if(window.api){
         document.getElementById("fileinput").style.display = 'none';
             }
        })
        
      }
    }
  },
  mounted() {
     if (!this.isWeixinCient()) {
      this.ishtml5 = false
      // var ua = navigator.userAgent.toLowerCase()
      // var isiOS = ua.indexOf('iphone') != -1 || ua.indexOf('ipad') != -1 // ios终端
      // if (!isiOS) {
      //   document.getElementById('fileinput').capture = 'camera'
      // }
      document.getElementById('fileinput').style.display = 'none'
            Bus.$on("getpicture",uploadpic=>{      
       if(uploadpic&&uploadpic!=""){   
           this.getFile(uploadpic);  
       }
    });
    }
  }
}
</script>

<style scoped>
/*清除group默认边线及边距*/
.group-clearbd >>> .weui-cells {
  margin-top: 0;
}

.group-clearbd >>> .weui-cells:before,
.group-clearbd >>> .weui-cells:after {
  border: 0 none;
}

.vux-x-textarea >>> .weui-textarea-counter {
  font-size: 14px;
}

.pubtext h1,
.pubimg h1 {
  padding: 10px 15px;
}

.pubimg .imgbox {
  padding: 15px;
}

.imgbox * {
  box-sizing: border-box;
}
.weui-loading {
  width: 50px;
  height: 50px;
}
.loading {
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
/*上传部分*/
.imguploads {
  margin: -8px;
}

.imguploads-item {
  width: 33.333333%;
  float: left;
  padding: 8px;
}

.imguploads-item .item-wrap {
  border: 1px solid transparent;
  height: 95px;
  width: 100%;
  display: table;
}

.imguploads-item .item-wrap img {
  width: 100%;
  height: 100%;
}
.imguploads-item .item-wrap.addimg p {
  position: relative;
}
.imguploads-item .item-wrap.addimg p input {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  opacity: 0;
}
.imguploads-item .item-wrap.addimg,
.imguploads-item .item-wrap.addvideo {
  border: 1px dotted #ddd;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
.imgModal {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
  display: flex;
}
.imguploads-item .item-wrap.addimg p {
  display: table-cell;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  text-align: center;
}
.imguploads-item .item-wrap.addimg p i {
  font-size: 40px;
  color: #ddd;
  line-height: normal;
}
.imguploads-item .item-wrap.addimg p span {
  font-size: 14px;
  color: #ddd;
  display: block;
  line-height: normal;
}
.imguploads-item .item-wrap.addvideo p {
  display: table-cell;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  text-align: center;
}
.imguploads-item .item-wrap.addvideo p i {
  font-size: 40px;
  color: #ddd;
  line-height: normal;
}
.imguploads-item .item-wrap.addvideo p span {
  font-size: 14px;
  color: #ddd;
  display: block;
  line-height: normal;
}
/*底部按钮*/
.btn-lovedynwrite {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 0 !important;
  height: 55px !important;
  line-height: 55px !important;
  box-shadow: none;
}
.lightBox{
    position: absolute;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
  }
.loading {
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .loading .weui-loading {
      width: 50px;
      height: 50px;
    }
    .redfont /deep/ span {
    color: red;
  }
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>


