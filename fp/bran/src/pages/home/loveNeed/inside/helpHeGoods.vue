<template>
  <div class="helpgoodsWrapper">
    <x-header
      :left-options="{backText: ''}"
      style="border: 0 none"
     @on-click-back="goodBackTip">帮助TA</x-header>
    <!--主体区域-->
    <div class="box-withheader over-auto bg-f6f6f6">
      <!--写描述-->
      <div class="help_info bg-ffffff mb-12">
        <h3 class="f-normal color-orange f-16">帮扶详情</h3>
        <x-textarea
          class="f-14 liuyan"
          :class="changeColor"
          :max="500"
          :min="10"
          :rows="5"
          v-model="bf_detail"
          placeholder="描述下你要捐助的物品，并对TA说几句话吧~"
          @on-change="filterFun"
           @on-focus="inputFocus"
           @on-blur="inputFocusout"
        ></x-textarea>
      </div>
      <h3 class="f-normal bg-ffffff color-orange f-16">上传图片</h3>
      <!--图片上传-->
      <div
        class="mb-12 goods_well"
        style="width: 100%;height: auto; background: #fff"
      >
        <div class="item">
          <div style="display: flex;flex-wrap: wrap;padding:1em .6em">
            <div
              v-for="value in imgArr"
              style="width: 30%;margin:3px;text-align: center;position: relative"
            >
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
              <div style="border:1px dotted #f1f1f1;height: 100%;width: 90%;display: flex;align-items: center;justify-content: center;flex-direction: column">
                <div
                  class="iconfont icon-f-cam"
                  style="font-size: 2.7em"
                  @click="showAction"
                ></div>
                <div>添加图片</div>
                <!--<div>{{this.imgArr.length==0?"添加图片":this.imgArr.length+"/9"}}</div>-->
                <div></div>
              </div>
              <input
                type="file"
                accept="image/*"
                style="height: 100%;width: 90%;position: absolute;top:0;left: 0;opacity: 0;-ms-filter: 'alpha(opacity=0)'"
          
                ref="file"
                id="fileinput"
              >
            </div>
           
          </div>
        </div>
      </div>

      <!--选择帮助方式-->
      <div class="choose_way bg-ffffff mb-12">
        <group class="group-clearbd">
          <radio
            class="cir-radio"
            :options="wayradio"
            v-model="defaultway"
          ></radio>
        </group>
      </div>

      <!--底部按钮-->
      <div class="submitContainer">
        <!--<p class="pocotol color-999 f-13">我已阅读并同意（用户协议）</p>-->
        <a @click="pro_push">
          <x-button
            class="paySubmit"
            type="submit"
          >提交</x-button>
        </a>
      </div>

    </div>

    <!--提示弹窗-->
    <div v-transfer-dom>
      <confirm
        v-model="showconfirm"
        title="提交成功"
        confirm-text="查看捐赠详情"
        cancel-text="填写信息"
        @on-confirm="viewdetail"
        @on-cancel="tohelprecord"
      >
        <p
          class="f-14 text-center"
          style="line-height: 24px;margin: 15px 0"
        >
          当前需求为待送出状态，您有3天时间填写送出信息（快递单号或面对面赠送的联系方式等），请尽快填写哦~</p>
      </confirm>
    </div>
   <!--  <div v-transfer-dom>
      <confirm
        v-model="confirmBack"
        title="提交"
        confirm-text="确认"
        cancel-text="取消"
        show-cancel-button="false"
        @on-confirm="confirmBackFun"
        @on-cancel="cancelBackFun"
      >
        <p
          class="f-14 text-center"
          style="line-height: 24px;margin: 15px 0;font-size: 15px;color: #353535;"
        >您尚未填写快递信息，是否确认退出后续添加或查看收货人姓名及地址信息，请在三天内到“我的-帮扶记录-物品帮扶”中进行</p>
      </confirm>
    </div> -->
    <!-- <p
      class="loading"
      style="text-align:center;"
      v-show="showLoading"
    >
      <inline-loading></inline-loading>
      <span style="color: #999">加载中...</span>
    </p> -->
    <!-- <div
      class="lightBox"
      v-show="showPrompt"
    ></div> -->
  </div>
</template>

<script>
import {
  XHeader,
  Group,
  Radio,
  XInput,
  XButton,
  XTextarea,
  Confirm,
  Actionsheet,
  TransferDom,
  InlineLoading
} from "vux";
import wx from "weixin-js-sdk";
import {checkDesc} from '@/util/validFun.js';
import Bus from "@/pages/home/Bus"
export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Group,
    Radio,
    XInput,
    XButton,
    XTextarea,
    Actionsheet,
    Confirm,
    InlineLoading
  },
  watch:{
         bf_detail(val){
             this.$nextTick(() => {
           let pattern =  /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
           this.bf_detail = val.replace(pattern, ''); 
             })
         }
  },
  data() {
    return {
      timer:null,
      bf_detail: "",
      isAddImgShow: true,
      imgArr: [],
      helpId: "",
      ishtml5: true,
      // 定义的宽高比
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
      helpPattern: "",
     
      wayradio: ["快递配送", "面对面配送"],
      defaultway: "面对面配送",
      showconfirm: false,
      showLoading: false,
      showPrompt: false,
      confirmBack: false
    };
  },
   destroyed() {
     clearTimeout(this.timer);
   },
  computed:{
    changeColor(){
          if(this.bf_detail.replace(/(^\s*)|(\s*$)/g, "").length<10){
            return "redfont"
      }
      else{
          return ""
      }
    }
  },
  methods: {
    goodBackTip(){
      this.confirmBack = true
    },
    confirmBackFun(){
      this.$router.go(-1)
    },
    cancelBackFun(){
      this.confirmBack = false
    },
      valideContent(){
      let pattern =  /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
      this.bf_detail = this.bf_detail.replace(pattern, ''); 
    },
    viewdetail() {
      //   this.$router.replace('/helpHeGoodsDetail/' + this.helpId)
      this.$router.replace({
        name: "helpHeGoodsDetail",
        params: { id: this.helpId, helppattern: this.helpPattern }
      });
    },
    tohelprecord() {
    //   if (this.defaultway == "快递配送") {
        // this.$router.replace('/helpHeWriteExp/'+ this.helpId + this.$route.params.id +'/2')//填写快递单
        this.$router.replace({
          name: "helpHeWriteExp",
          params: { id: this.helpId, demandId: this.$route.params.id, type: 2 }
        }); // 填写快递单
    //   } 
    },
    filterFun() {
        //过滤部分表情
        if(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g.test(this.bf_detail)) {
            this.$nextTick(function () {
                this.bf_detail = this.bf_detail.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, '')
            })
        }
            
    },
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
    goClause() {
      this.isAgreement = true;
    },
    goPromise() {
      this.isAgreement = true;
    },
    imgToBig(e) {
      this.imgBigSrc = e;
      this.imgBig ? (this.imgBig = false) : (this.imgBig = true);
    },
    imgDelete(value) {
      let leftImg = this.imgArr.filter(function(e) {
        return e !== value;
      });
      this.imgArr = leftImg;
      if (this.imgArr.length < 9) {
        this.isAddImgShow = true;
        this.$nextTick(() => {
          if (!this.isWeixinCient()) {
            document.getElementById("fileinput").style.display = "none";
          }
        });
      }
    },
    getFile(file) {
    //   let reader = new FileReader();
   //   let img = new Image();
      let _this = this;
      console.log(file)
     // let file = e.target.files[0];
   //   reader.readAsDataURL(file);
     // reader.onload = function(e) {
    //    img.setAttribute("src", file);
     // };
      // let width = 640; // 图像大小
      // let quality = 0.7; // 图像质量
      // let canvas = document.createElement("canvas");
      // let drawer = canvas.getContext("2d");
      // let base64;
      // img.onload = function() {
      //   console.log("载入图片")
      //   canvas.width = width;
      //   canvas.height = width * (img.height / img.width);
      //    console.log("裁剪图片")
      //   drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
       let  base64 = file;
        _this.imgArr.push(base64);
        _this.imgArr = _this.uniq();
       if (_this.imgArr.length > 8) {
          _this.isAddImgShow = false;
        }
     // };
      // img.onerror = function(e){
      //   console.log(JSON.stringify(e))
      // }
  
    },
    showAction() {
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
      for (let i = 0; i < this.imgArr.length; i++) {
        if (temp.indexOf(this.imgArr[i]) == -1) {
          temp.push(this.imgArr[i]);
        }
      }
      return temp;
    },
    // // 从相册中选择
    // fromalbum: function() {
  
    //      let els = document.querySelectorAll("input[type=file]");
    //     els[0].removeAttribute("capture");
    //     if (this.isWeixinCient()) {
    //       els[0].accept = "image/*";
    //     } else els[0].accept = "image/jpeg,image/png,images/jpg,images/gif";
    //     els[0].click();
    //      window.pictures.revertwangda()
    // },
    // // 点击拍照
    // fromcamera() {

     
    //    let els = document.querySelectorAll("input[type=file]");
    //     els[0].accept = "image/*";
    //     els[0].capture = "camera";
    //     //    alert("22222222222")
    //     els[0].click();
    // },
    async pro_push() {
      let obj = checkDesc(this.bf_detail,10,500,"帮扶详情")
        if(!obj.valid){
         this.showToast("", "text",obj.msg);
        return;
        }else{
          if (!/[^\x00-\xff]{10,500}$/.test(this.bf_detail.replace(/(^\s*)|(\s*$)/g, ""))) {
          
            this.showToast("", "text","帮扶详情输入有误，必须是中文字符");
           return
       
         }
        } 
      
      if (this.imgArr.length === 0) {
        this.showToast("", "text", "请先上传图片");
        return;
      }
    //  this.showLoading = true;
       this.showPrompt = true;
      let imgArrBase64 = this.imgArr.filter(item => item.includes("base64"));
      let imgArrHttp = this.imgArr.filter(item => item.includes("http"));
      let arg = {};
      arg.imgStr = imgArrBase64.join("-");
      this.$http.post("uts/file/bfFilesUpload", arg).then(data => {
        let arg = {};
        arg.demend_code = this.$route.params.id;
        arg.bf_detail = this.bf_detail.replace(/(^\s*)|(\s*$)/g, "")
        arg.img = [...data.data, ...imgArrHttp].join(",");
        arg.witness_idcard = this.witness_idcard;
        this.defaultway === "快递配送"
          ? (arg.help_pattern = 2)
          : (arg.help_pattern = 1);
        this.helpPattern = arg.help_pattern;
        this.$http
          .post("hts/help/objectHelp", arg)
          .then(data => {
              this.showLoading = false;
            this.showPrompt = false;
            this.helpId = data.data;
            if(this.defaultway == '快递配送') {
                this.showconfirm = true
            }else {
                // 面对面
                this.$router.replace({
                    name: "helpHeWriteExp",
                    params: { id: this.helpId, demandId: this.$route.params.id, type: 1 }
                }); 
            }
            
          })
          .catch(err => {
            this.showLoading = false;
            this.showPrompt = false;
            if(err.msg)
            this.showToast("", "text", err.msg, "20em", "", "middle");
          });
      });
    }
  },
  mounted() {
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

<style lang="less" scoped>
@import "../../../../less/base.less";

h3 {
  padding: 10px 15px;
}
.submitContainer {
  margin-top: 50px;
  padding-bottom: 26px;
  .pocotol {
    margin: 0 0 20px 0;
    text-align: center;
  }
  .paySubmit {
    width: 70%;
    background: linear-gradient(
      -180deg,
      rgba(253, 139, 42, 1),
      rgba(255, 129, 37, 1)
    );
    border-radius: 24px;
    box-shadow: 0 6px 38px rgba(255, 104, 37, 0.33);
  }
}

/*group去掉边线*/
.group-clearbd /deep/ .weui-cells {
  margin-top: 0 !important;
  font-size: 15px;
}

.group-clearbd /deep/ .weui-cells {
  margin-top: 0;
  background: transparent;
}

.group-clearbd /deep/ .weui-cells:before,
.group-clearbd /deep/ .weui-cells:after {
  border: 0 none;
}

.weui-cells_radio /deep/ .weui-cell {
  padding: 12px 15px;
}

.weui-cells_radio /deep/ .weui-cell:before {
  right: 15px;
}
.redfont /deep/ span{
color:red
}
  

.weui-cell /deep/ .weui-cell__ft {
  font-size: 14px;
  padding-right: 0;
}

/*上传部分样式*/
.pubimg .imgbox {
  * {
    box-sizing: border-box;
  }
  position: relative;
  padding: 15px;
  &:before {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    left: 15px;
    right: 15px;
    border-top: 1px solid #d9d9d9;
    color: #d9d9d9;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }
}

.imguploads {
  margin: -8px;
}

.imguploads-item {
  width: 33.333333%;
  float: left;
  padding: 8px;
  .item-wrap {
    position: relative;
    border: 1px solid transparent;
    height: 95px;
    width: 100%;
    display: table;
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.imguploads-item .item-wrap.addimg {
  p {
    position: relative;
    input {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      opacity: 0;
    }
  }
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

.imguploads-item .item-wrap.addimg {
  p {
    display: table-cell;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    text-align: center;
    i {
      font-size: 40px;
      color: #ddd;
      line-height: normal;
    }
    span {
      font-size: 14px;
      color: #ddd;
      display: block;
      line-height: normal;
    }
  }
}
.goods_well {
  position: relative;
}
.goods_well:before {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  border-top: 1px solid #d9d9d9;
  color: #d9d9d9;
  transform: scaleY(0.5);
  left: 15px;
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
  .weui-loading {
    width: 50px;
    height: 50px;
  }
}
.lightBox {
  position: absolute;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
}
.header-wrap {
  .weui-cell__hd {
    .w(28%);
    .fs(0.915em);
    .color(#666666);
  }
  .weui-input {
    .fs(0.875em);
  }
  .item {
    .bb(10px, solid, #f3f3f3);
    .bg(#ffffff);
  }
  .flex {
    .flex();
    .jc(space-between);
    .fs(0.875em);
    .p2(0.4em, 1em);
    .color(#666666);
    .tpl {
      .color(#ff8226);
      .fs(0.75em);
      text-decoration: underline;
    }
  }
}
</style>
