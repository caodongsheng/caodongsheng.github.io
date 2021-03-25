<template>
  <!--质疑/举报-->
  <div style="background: #ffffff;overflow: hidden;">
    <!--头部-->
    <div class="header-wrap">
      <x-header :left-options="{backText: ''}">
        {{headerTitle}}
        <a slot="right" @click="pro_push">提交</a>
      </x-header>
    </div>
    <div class="box-withheader over-auto">
      <div class="jb-header">
        <h4>质疑内容</h4>
      </div>

      <div class="textarea">
        <x-textarea
          :max="500"
          :min="10"
          :rows="5"
          :class="changeColor"
          v-model="description"
             @on-focus="inputFocus"
           @on-blur="inputFocusout"
          name="description"
          placeholder="请填写您所质疑的内容和依据"
        ></x-textarea>
      </div>
      <div class="jb-header">
        <h4>质疑证据图片</h4>
        <p>(图片必须清晰可见以保证您所述信息的真实性)</p>
      </div>
      <!--图片上传-->
      <div>
        <div class="item">
          <div style="display: flex;flex-wrap: wrap;padding: .6em">
            <div v-for="value in imgArr" style="width: 33%;text-align: center;position: relative">
              <img
                :src="value"
                alt="user image"
                @click="imgToBig(value)"
                style="width: 90%;height: 7em;"
              >
              <x-icon
                @click="imgDelete(value)"
                type="ios-close"
                size="30"
                style="position: absolute;top:0;right: .4em"
              ></x-icon>
            </div>
            <div
              class="addImg"
              v-if="isAddImgShow"
              style="height:7em;position: relative;color:#cccccc;width: 33%;display: flex;align-items: center;justify-content: center;"
            >
              <div
                style="border:1px dotted #f1f1f1;height: 100%;width: 90%;display: flex;align-items: center;justify-content: center;flex-direction: column"
              >
                <div class="iconfont icon-f-cam" style="font-size: 2.7em" @click="showAction"></div>
                <div>{{this.imgArr.length==0?"添加图片":this.imgArr.length+"/9"}}</div>
                <div></div>
              </div>
              <input
                type="file"
                style="height: 100%;width: 90%;position: absolute;top:0;left: 0;opacity: 0;-ms-filter: 'alpha(opacity=0)'"
           
                ref="file"
                accept="image/*"
                id="fileinput"
              >
            </div>
            <!-- <actionsheet
              v-model="showmenu"
              :menus="menus1"
              show-cancel
              @on-click-menu-album="fromalbum"
              @on-click-menu-camera="fromcamera"
            ></actionsheet> -->
          </div>
        </div>
      </div>
      <!--联系方式-->
      <div style="background: #f1f1f1;height: 10px"></div>

      <div style="background: #ffffff">
        <x-input title="手机号码" readonly v-model="tel"></x-input>
      </div>
      <!--底部-->
      <div style="background: #f1f1f1;height: 12px"></div>
    </div>
    <!--弹窗-->
    <div class="alert_show" v-if="al_show">
      <div>
        <div class="tit_p">提交成功</div>
        <div class="tit_cont">感谢您提供的信息。若提供的信息有效，工作人员将在7个工作日内联系您进行核实。</div>
        <div class="tit_but" @click="go_">确定</div>
      </div>
    </div>
    <!-- <p class="loading" style="text-align:center;" v-show="showLoading">
      <inline-loading></inline-loading>
    </p>-->
    <!-- <div class="lightBox" v-show="showPrompt"></div> -->
  </div>
</template>

<script>
//import headerBackTitle from '../../../../components/header/headerBackTitle'
import {
  XTextarea,
  XHeader,
  XInput,
  XButton,
  Actionsheet,
  InlineLoading
} from "vux";
//	import repot from '../../../../store/relation.json'
import {checkDesc} from '@/util/validFun.js';
import Bus from "@/pages/home/Bus"

export default {
  components: {
    XTextarea,
    XHeader,
    XInput,
    XButton,
    Actionsheet,
    InlineLoading
  }, //headerBackTitle
  data() {
    return {
      timer:null,
      phonefail: true,
      headerTitle: "举报",
      description: "",
      phone: "",
      al_show: false,
      imgArr: [],
   //   showmenu: false,
      ishtml5: true,
      showLoading: false,
      showPrompt: false,
      //定义的宽高比
      widthRate: {
        type: Number,
        default: 1
      },
      heightRate: {
        type: Number,
        default: 1
      },
      originUrl: "",
      picValue: null,
      Orientation: "",
      menus1: {
        album: "从相册选择",
        camera: "拍照"
      },
      isAddImgShow: true
    };
  },
   computed:{
    changeColor(){
          if(this.description.replace(/(^\s*)|(\s*$)/g, "").length<10){
            return "redfont"
      }
      else{
          return ""
      }
    },
    tel(){
      return this.$store.state.user?this.$store.state.user.mobile:""
    }
  },
  watch:{
       description(val){
             this.$nextTick(() => {
           let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
           this.description = val.replace(pattern, "");
             })
       }
  },
    destroyed() {
     clearTimeout(this.timer);
   },
  methods: {
        inputFocus() {
       clearTimeout(this.timer);
     },

     inputFocusout() {
      this.timer = setTimeout(() => {
        const scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
    },
    // async getUser() {
    //   await this.$store.dispatch('getUser', { _this: this.$http })
    // },
    changevx() {
      let reg = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
      let flag = reg.test(this.tel);
      if (!flag) {
        this.showToast("", "text", "请输入正确手机号！", "20em", "", "middle");
        this.phonefail = true;
      } else {
        this.phonefail = false;
      }
      setTimeout(() => {
        const scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
    },
    checkphonefun(value) {
      let reg = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
      if (reg.test(value)) {
        this.phonefail = false;
        return { valid: true };
      } else {
        this.phonefail = true;
        return { valid: false };
      }
    },
    getFile(file) {
      let _this = this;
       let  base64 = file;
        _this.imgArr.push(base64);
        _this.imgArr = _this.uniq();
       if (_this.imgArr.length > 8) {
          _this.isAddImgShow = false;
        }
    },
    valideContent() {
      let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
      this.description = this.description.replace(pattern, "");
    },
    showAction() {
      //  window.pictures.revertwangda()
      let data={
        maxSize:3072,       //图片最大
        allowPreview:1,  //1可预览 0不可裁剪
        allowCustom:1    //必穿参数 1 普通获取 0 证件照
      }
      this.ModuleNative('AppRegulePhoto',data)
    },
    uniq() {
      var temp = []; //一个新的临时数组
      for (let i = 0; i < this.imgArr.length; i++) {
        if (temp.indexOf(this.imgArr[i]) == -1) {
          temp.push(this.imgArr[i]);
        }
      }
      return temp;
    },
    //从相册中选择
    fromalbum() {
      let self = this;
      if (window.api) {
        let selectnum = 9 - this.imgArr.length;
        var UIMediaScanner = api.require("UIMediaScanner");
        UIMediaScanner.open(
          {
            type: "picture",
            column: 4,
            classify: true,
            max: selectnum,
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
            if (ret && ret.list.length > 0) {
              for (let localimg of ret.list) {
                let img = new Image();
                img.src = localimg.path;
                let width = 640; // 图像大小
                let quality = 0.7; // 图像质量
                let canvas = document.createElement("canvas");
                let drawer = canvas.getContext("2d");
                let base64;
                img.onload = function() {
                  canvas.width = width;
                  canvas.height = width * (img.height / img.width);
                  drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
                  base64 = canvas.toDataURL("image/jpeg", quality);
                  self.imgArr.push(base64);
                  self.imgArr = self.uniq();
                  if (self.imgArr.length > 8) {
                    self.isAddImgShow = false;
                  }
                };
              }
            } else {
            }
          }
        );
      } else {
        let els = document.querySelectorAll("input[type=file]");
        els[0].removeAttribute("capture");
        if (self.isWeixinCient()) {
          els[0].accept = "image/*";
        } else els[0].accept = "image/jpeg,image/png,images/jpg,images/gif";
        els[0].click();
      }
    },
    //点击拍照
    fromcamera() {
      let self = this;
      // this.$refs.file.accept = "image/*";
      // this.$refs.file.capture = "camera";
      // // console.log('触发拍照功能')
      // let els =document.querySelectorAll('input[type=file]')
      // els[0].click()

      // let els = document.querySelectorAll('input[type=file]')
      // els[0].accept = 'image/*'
      // els[0].capture = 'carema'
      // els[0].click()
      if (window.api) {
        api.getPicture(
          {
            sourceType: "camera",
            allowEdit: true,
            mediaValue: "pic",
            destinationType: "base64",
            quality: 70
          },
          function(ret, err) {
            if (ret && ret.data != "") {
              self.imgArr.push(ret.base64Data);
              if (self.imgArr.length > 8) {
                self.isAddImgShow = false;
              }
            } else {
              if (ret) {
                self.showToast("", "text", "取消拍照", "20em", "bottom");
              } else {
                self.showToast(
                  "",
                  "text",
                  JSON.stringify(err),
                  "20em",
                  "bottom"
                );
              }
            }
          }
        );
      } else {
        let els = document.querySelectorAll("input[type=file]");
        els[0].accept = "image/*";
        els[0].capture = "carema";
        els[0].click();
      }
    },
    // 删除上传的图片
    imgDelete(value) {
      let leftImg = this.imgArr.filter(function(e) {
        return e !== value;
      });
      this.imgArr = leftImg;
      if (this.imgArr.length < 9) {
        this.isAddImgShow = true;
        this.$nextTick(() => {
          if (window.api) {
            document.getElementById("fileinput").style.display = "none";
          }
        });
      }
    },
    // 点击图片放大
    imgToBig(e) {
      this.imgBigSrc = e;
      this.imgBig ? (this.imgBig = false) : (this.imgBig = true);
    },
    async go_() {
      this.$router.push("/loveNeed/" + this.$route.params.id);
    },
    async pro_push() {
      let _this = this;
        let obj = checkDesc(this.description,10,500,"举报内容")
        if(!obj.valid){
         this.showToast("", "text",obj.msg);
        return;
        }else{
          if (!/[^\x00-\xff]{10,500}$/.test(this.description.replace(/(^\s*)|(\s*$)/g, ""))) {
          
            this.showToast("", "text","举报内容输入有误，必须是中文字符");
           return
          
          }
        }

      // if (this.phonefail) {
      //   this.showToast("", "text", "请输入正确的手机号码");
      //   return;
      // }
      // if (this.imgArr.length === 0) {
      //   this.showToast('', 'text', '请上传图片')
      //   return
      // }
      // this.showLoading = true
      this.showPrompt = true;
      let imgArrBase64 = this.imgArr.filter(item => item.includes("base64"));
      let imgArrHttp = this.imgArr.filter(item => item.includes("http"));
      let arg = {};

      arg.demand_id = this.$route.params.id;
      arg.publisher_tel = this.tel;
      arg.userid = this.name;
      arg.report_content = this.description.replace(/(^\s*)|(\s*$)/g, "");
      if (imgArrBase64.length > 0) {
        let obj = {};
        obj.imgStr = imgArrBase64.join("-");
        this.$http.post("uts/file/bfFilesUpload", obj).then(data => {
          arg.img = [...data.data, ...imgArrHttp].join(",");
          this.$http
            .post("hts/help/report", arg)
            .then(data => {
              _this.al_show = true;
              this.showLoading = false;
              this.showPrompt = false;
            })
            .catch(error => {
              _this.showToast("", "text", "证明失败");
              this.showLoading = false;
              this.showPrompt = false;
            });
        });
      } else {
       arg.img = imgArrHttp.join(",");
        this.$http
          .post("hts/help/report", arg)
          .then(data => {
            _this.al_show = true;
            this.showLoading = false;
            this.showPrompt = false;
          })
          .catch(error => {
            _this.showToast("", "text", "证明失败");
            this.showLoading = false;
            this.showPrompt = false;
          });
      }
    }
  },
  // created(){
  //   this.getUser();

  // },
  mounted() {
    this.tel = this.$store.state.user.mobile;
      if (!this.isWeixinCient()) {
      this.ishtml5 = false;
      // let ua = navigator.userAgent.toLowerCase()
      // let isiOS = ua.indexOf('iphone') !== -1 || ua.indexOf('ipad') !== -1 // ios终端
      // if (!isiOS) {
      //   document.getElementById('fileinput').capture = 'camera'
      // }
      document.getElementById("fileinput").style.display = "none";
       Bus.$on("getpicture",uploadpic=>{      
       if(uploadpic&&uploadpic!=""){   
           this.getFile(uploadpic);  
       }
    });
    }
  }
};
</script>

<style scoped>
.alert_show {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert_show > div {
  width: 80%;
  height: auto;
  background: #fff;
  border-radius: 10px;
}

.alert_show > div > .tit_p {
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  padding-top: 10px;
}

.alert_show > div > .tit_cont {
  font-size: 14px;
  color: #666;
  padding: 10px 15px;
}

.alert_show > div > .tit_but {
  font-size: 14px;
  line-height: 44px;
  color: #f46a00;
  text-align: center;
  border-top: 1px solid #e4e4e4;
}

.jb-header {
  line-height: 30px;
  height: 30px;
  background: #f1f1f1;
}

.jb-header h4 {
  float: left;
  color: #333;
  padding-left: 15px;
}

.jb-header p {
  float: left;
  font-size: 12px;
  color: #888;
}

.vux-header-right a {
  font-weight: bold;
  font-size: 16px;
  color: #f37306 !important;
}

.textarea {
  width: 100%;
  margin: 0 auto;
}

.jb-textarea {
  width: 100%;
  border: 1px solid #c6c6c6;
  margin: 0 auto;
  height: 100px;
  color: #888;
  background: #ffffff;
  font-size: 14px;
}

.jb-textarea placeholder {
  padding-left: 15px;
}

.weui-cell >>> .weui-label {
  color: #333 !important;
}
.redfont >>> span{
color:red
}
  
.button-submit {
  width: 100%;
  position: fixed;
  bottom: 0px;
  background: #ee8753;
}

.weui-btn_default {
  background: #ee8753 !important;
  color: #ffffff;
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
.lightBox {
  position: absolute;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
}
</style>
