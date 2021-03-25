<template>
  <div class="header-wrap" style="height: 100%;background: #fff;">
    <div class="header-wrap">
      <x-header :left-options="{backText: ''}">{{headerTitle}}
        <!--<a slot="right" @click="">提交</a>-->
      </x-header>
    </div>

    <div class="title">
      <marquee behavior="scroll" direction="left" loop="infinite" scrollamount="5" scrolldelay="30">
        {{alleviation}}
      </marquee>
    </div>

    <div class="zmbox"></div>
    <popup-picker title="您与受助人的关系" :data="list" v-model="relation" value-text-align="right"></popup-picker>
    <div class="zmbox"></div>
    <x-input title="您的姓名" placeholder="请填写真实姓名"  placeholder-align="left" v-model="name" class="par_inp" :disabled="isdisabled" :is-type="checkName" :required="true"></x-input>
    <div class="zmbox"></div>
    <x-input title="您的电话" placeholder="请输入正确的11位手机号码"    :is-type="checkphonefun" :required="true" v-model="tel" placeholder-align="left" :disabled="isdisableds"  keyboard="number" :max="11"></x-input>

    <div class="list_litle list_litle_f6">证明内容</div>
    <x-textarea :max="500" :min="10" name="description" :rows="4" :class="getClass" v-model="description"   placeholder="请输入不低于十个汉字的内容"></x-textarea>
    <div class="list_litle list_litle_f6">证明图片(最多9张)</div>
    <!--上传图片-->
    <div style="width: 100%;height: auto; background: #cccccc">
      <div class="item">
        <div style="display: flex;flex-wrap: wrap;padding: .6em">
          <div v-for="value in imgArr" style="width: 33%;text-align: center;position: relative">
            <img :src="value" alt="user image" @click="imgToBig(value)" style="width: 90%;height: 7em;">
            <x-icon @click="imgDelete(value)" type="ios-close" size="30" style="position: absolute;top:0;right: .4em"></x-icon>
          </div>
          <div class="addImg" v-if="isAddImgShow" style="height:7em;position: relative;color:#cccccc;width: 33%;display: flex;align-items: center;justify-content: center;" @click="showAction">
            <div style="border:1px dotted #f1f1f1;height: 100%;width: 90%;display: flex;align-items: center;justify-content: center;flex-direction: column">
              <div class="iconfont icon-f-cam" style="font-size: 2.7em"></div>
              <div>{{this.imgArr.length==0?"添加图片":this.imgArr.length+"/9"}}</div>
              <div></div>
            </div>
            <input type="file" style="height: 100%;width: 90%;position: absolute;top:0;left: 0;opacity: 0;-ms-filter: 'alpha(opacity=0)'" @change="getFile" ref="file"  accept="image/*" id="fileinput">
          </div>
          <actionsheet v-model="showmenu" :menus="menus1" show-cancel @on-click-menu-album="fromalbum" @on-click-menu-camera="fromcamera"></actionsheet>
        </div>

      </div>

    </div>

    <!--实名认证（身份证）-->
    <div class="zmbox"></div>
    <x-input title="实名认证" v-model="witness_idcard" placeholder="请输入您的身份证号" placeholder-align="right" :required="true" :is-type="checkIDCard" :disabled="isdisabled" v-if="is_certification === 0" ></x-input>
    <div class="message" v-if="is_certification === 0">
      <div class="mess-l">
        <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
      </div>
      <div class="mess-r">
        <span>您的身份证信息将会严格保密,不会展示给其他人。</span>
      </div>
    </div>

    <div class="tip">
      <check-icon :value.sync="checked" type="plain"></check-icon>
     已阅读并同意
   
       <span class="book"   @click="toIntroduction()">《需求发起人承诺书》</span>
     
    </div>

    <div class="button-submit" @click="pro_push">
      <x-button>提交</x-button>
    </div>

     <!--协议弹窗-->
    <proreg ref="protocolcon"></proreg>
  </div>
</template>

<script>
import { Group, XHeader, PopupPicker, XInput, XTextarea, CheckIcon, XButton, Actionsheet } from 'vux'
import Exif from 'exif-js'
import { mapState, mapActions } from 'vuex'
import * as types from '@/store/mutation-types.js'
import wx from 'weixin-js-sdk'
import proreg from '@/pages/protocol/proreg'
  import {checkPhoneStr,checkNameStr,checkDesc,checkIDCardStr} from '@/util/validFun.js';
  import open from '@/assets/js/openWin'

export default {
  components: { Group, XHeader, PopupPicker, XInput, XTextarea, CheckIcon, XButton, Actionsheet },
  data() {
    return {
      namefail:true,
      phonefail:true,
      provefail:true,
      idcardfail:true,
      certifier: this.$store.state.alljson.certifier,
      showmenu: false,
      imgArr: [],
      name: '',
      tel: '',
      is_certification:'',
      description: '',
      witness_idcard: '',
      isAddImgShow: true,
      isdisabled: false,
      isdisableds: false,
      checked: true,
      checked1: true,
      headerTitle: '我来证明',
      alleviation: '有您的证明,求助会取得更多人的信任,为您点赞！',
      show2: false,
      ishtml5: true,
      args: {},
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
      list: [this.$store.state.alljson.certifier],
      //   relation: ['请选择'],
      relation: [],
      isAgreement: false
    }
  },
  computed:{
    getClass(){
      if(this.description.replace(/(^\s*)|(\s*$)/g, "").length<10){
        return "redfont"
      }
      else{
        return ""
      }
    }
  },
  watch:{
  description(val) {
        this.$nextTick(() => {
          let pattern =    /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
          this.description = val.replace(pattern, ''); 
       
        })
      },
      witness_idcard(val){
        this.$nextTick(() => {
          this.witness_idcard = val.replace(/[^\a-\z\A-\Z0-9]/g,'')
       
        })
      },
        tel(val){
        this.$nextTick(() => {
          this.tel = val.replace(/[^0-9]/g,'')
       
        })
      }
  },
  methods: {
    ...mapActions(['getUser']),
    async getUser() {
      await this.$store.dispatch('getUser', { _this: this.$http })
            console.log(this.$store.state.user)

      //若已实名则禁用姓名和身份证号输入框
      if(this.$store.state.user.realname && this.$store.state.user.realname !== '') {
          this.name = this.$store.state.user.realname
        this.witness_idcard = this.$store.state.user.idcard
          this.isdisabled = true
          this.namefail = false;
          this.idcardfail = false;
      }
      if(this.$store.state.user.mobile && this.$store.state.user.mobile != '') {
            this.tel = this.$store.state.user.mobile;
            this.isdisableds = true
            this.phonefail = false
      }
      this.is_certification = this.$store.state.user.is_certification

    },
    checkIDCard(value){
     let validobj =  checkIDCardStr(value,"身份证号")
      if(!validobj.valid){
            this.idcardfail = true
            
        }
        else{
           this.idcardfail = false
        }
        return validobj  
    },

     checkphonefun(value){
         let validobj = checkPhoneStr(value,"您的电话")
        if(!validobj.valid){
            this.phonefail = true
            
        }
        else{
           this.phonefail = false
        }
        return validobj   
      },

    goClause() {
      this.isAgreement = true
    },
    goPromise() {
      this.isAgreement = true
    },
      checkName(value) {
        let validobj = checkNameStr(value,2,15,"您的姓名")
        if(!validobj.valid){
            this.namefail = true
            
        }
        else{
           this.namefail = false
        }
        return validobj
      },
    imgToBig(e) {
      this.imgBigSrc = e
      this.imgBig ? (this.imgBig = false) : (this.imgBig = true)
    },
    imgDelete(value) {
      let leftImg = this.imgArr.filter(function(e) {
        return e != value
      })
      this.imgArr = leftImg
       if(this.imgArr.length<9){
        this.isAddImgShow = true
          this.$nextTick(()=>{
             if(window.api){
         document.getElementById("fileinput").style.display = 'none';
             }
        })
      }
    },
    toIntroduction(){
      let item ={
          title:"发起人承诺书",
          link_url: process.env.DJRES_URL+'appia630/pages/protocol/fqrcns.html'
        }
      //  this.$router.push({ path: "/proveintroduction" });
     //   http://djres.fpmai.com/appia630/pages/protocol/fqrcns.html
        
              if(!window.api){
            this.$router.push({
              path:'/empty',
              query:{
                title:item.title,
                url:item.link_url
              }
            })
          }
          else{
            open(item.link_url,item.title)
          }
    },
    getFile(e) {
     let reader = new FileReader();
      let img = new Image();
      let _this = this;
      let file = e.target.files[0];
      reader.readAsDataURL(file);


      reader.onload = function(e) {
        img.setAttribute('src', this.result)
      }
      var width = 640 // 图像大小
      var quality = 0.7 // 图像质量
      var canvas = document.createElement('canvas')
      var drawer = canvas.getContext('2d')
      var base64
      img.onload = function() {
        canvas.width = width
        canvas.height = width * (img.height / img.width)
        drawer.drawImage(img, 0, 0, canvas.width, canvas.height)
        base64 = canvas.toDataURL('image/jpeg', quality)

        _this.imgArr.push(base64)
         _this.imgArr = _this.uniq();
         if (_this.imgArr.length > 8) {
          _this.isAddImgShow = false;
        }
      }
    
    },
    showAction() {
      if (!this.ishtml5) {
        this.showmenu = true
      } else {
        this.showmenu = false
      }
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
    fromalbum: function() {
      // this.$refs.file.accept="image/jpg,image/png,image/jpeg,image/gif"
      // let els =document.querySelectorAll('input[type=file]')
      // els[0].click()
      let self = this
      if (!this.ishtml5) {
        let selectnum = 9 - this.imgArr.length;
        var UIMediaScanner = window.api.require('UIMediaScanner')
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
                    var width = 480 // 图像大小
                    var quality = 0.7 // 图像质量
                    var canvas = document.createElement('canvas')
                    var drawer = canvas.getContext('2d')
                    var base64
                    img.onload = function() {
                        canvas.width = width
                        canvas.height = width * (img.height / img.width)
                        drawer.drawImage(img, 0, 0, canvas.width, canvas.height)
                        base64 = canvas.toDataURL('image/jpeg', quality)
                        self.imgArr.push(base64)
                        self.imgArr = self.uniq()
                        if (self.imgArr.length > 8) {
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
        } else els[0].accept = 'image/jpeg,image/png,images/jpg,images/gif'
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
      if (!this.ishtml5) {
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
              self.imgArr.push(ret.base64Data)
              if (self.imgArr.length > 8) {
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
    //调用实名认证
    setRealNamefun() {
      let arg = {}
      arg.name = this.name
      arg.idCard = this.witness_idcard
      arg.state = 2
      this.$http
        .post('hts/demand/realNameAuthentication', arg)
        .then(res => {
          // 实名认证成功后变更user is_certification 属性
          this.$store.state.user.is_certification = 1
          this.getProveList()
        })
        .catch(err => {
            if (err.code == "O3000") {
              this.showToast('', 'text', '身份证号输入有误','20em','','middle')
              return
            }else {
              if(err.msg)
                this.showToast('', 'text', err.msg, '20em', '', 'middle')
            }
        })
    },
    getProveList() {
      this.args.demand_code = this.$route.params.id
      this.args.witness_tel = this.tel
      this.args.witness_name = this.name
      this.args.comments = this.description.replace(/(^\s*)|(\s*$)/g, "")
      // args.img = [...data.data, ...imgArrHttp].join(',')
      // if(!this.witness_idcard.indexOf('*')) {
      //    this.args.witness_idcard = this.witness_idcard
      // }
      this.args.witness_idcard = this.witness_idcard
      this.args.relationship = this.relation[0]
      this.$http
        .post('hts/help/prove', this.args)
        .then(data => {
          this.$router.push('/proveList/' + this.$route.params.id)
        })
        .catch(err => {
          if (err.code === '03012') {
            this.showToast('', 'text', err.msg, '20em', '', 'middle')
          } else if (err.code === 'D1005') {
            this.showToast('', 'text', '证明失败', '20em', '', 'middle')
          } else {
            if(err.msg)
            this.showToast('', 'text', err.msg, '20em', '', 'middle')
          }
        })
    },
    async pro_push() {
      if (!this.relation || this.relation == '') {
        this.showToast('', 'text', '请选择与受助人关系', '20em', '', 'top')
        return
      }
      if (this.namefail) {
        this.showToast('', 'text', '请输入正确的姓名', '', 'middle')
        return
      }
      if (this.phonefail) {
        this.showToast('', 'text', '请输入正确手机号码', '20em', '', 'middle')
        return
      }
      if (this.provefail) {
           let obj = checkDesc(this.description,10,500,"证明内容")
        if(!obj.valid){
         this.showToast("", "text",obj.msg);
        return;
        }else{
          if (!/[^\x00-\xff]{10,500}$/.test(this.description.replace(/(^\s*)|(\s*$)/g, "")))
          {
            this.showToast("", "text","证明内容输入有误，必须是中文字符");
           return
          }
   
        }
      }
      //   if (this.imgArr.length === 0) {
      //     this.showToast('', 'text', '请先上传图片','','bottom')
      //     return
      //   }
      //   if (!this.checked1) {
      //     this.showToast('', 'text', '请阅读并同意上传服务协议','20em','','bottom')
      //     return
      //   }
      if (!this.checked) {
        this.showToast('', 'text', '请勾选确认为其证明', '20em', '', 'middle')
        return
      }
    if(this.idcardfail) {
         this.showToast('', 'text', '请检查身份证号是否输入正确！', '20em', '', 'middle')
        return
    }
      if (this.imgArr.length !== 0 && this.witness_idcard !== '' ) {
        let imgArrBase64 = this.imgArr.filter(item => item.includes('base64'))
        let imgArrHttp = this.imgArr.filter(item => item.includes('http'))
        let arg = {}
        arg.imgStr = imgArrBase64.join('-')
        this.$http.post('uts/file/bfFilesUpload', arg).then(data => {
          this.args.img = [...data.data, ...imgArrHttp].join(',')
          //this.getProveList()
          if(this.is_certification==0){
            this.setRealNamefun()
          }
          else{
            this.getProveList()
          }
        })
      }else{
          this.getProveList()
      }
    //   if (this.witness_idcard !== '' && this.$store.state.user.is_certification !== 1) {
    //     this.setRealNamefun()
    //   } 
    //   else {
    //     this.getProveList()
    //   }
      //   else {
      //     this.getProveList()
      //   }
    },
    //判断用户是否实名认证 若已实名则显示用户名和身份号
    // getIsCertification() {
    //   if (this.$store.state.user.is_certification == 1) {
    //     this.getUser()
    //   }
    // }
  },
  created() {
    console.log(this.$store.state.alljson.certifier)
    this.getUser()
    // this.list[0].unshift({ value: '请选择', name: '请选择' })
  },
  mounted() {
    if (window.api) {
      this.ishtml5 = false
      document.getElementById('fileinput').style.display = 'none'
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../less/base.less';
.vux-header-right a {
  color: #f37306 !important;
}
.weui-cell {
  padding: 11px 15px;
}
.weui-cell:before {
  border-top: 0px;
}
.vux-popup-picker-value {
  font-size: #919090;
}
.header-wrap {
  overflow-x: hidden;
}
.par_inp > .weui-cell__bd > input {
  font-size: 13px !important;
}
.title {
  height: 30px;
  background: #fff2e9;
  line-height: 30px;

  marquee {
    color: #ee6b2b;
    font-size: 14px;
  }
}
.heardr2-color {
  background-color: #fff1e8;
}

.weui-cells .weui-cell {
  margin-top: 0px !important;
}

.list_litle {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: left;
  padding-left: 15px;
}
.list_litle_f6 {
  background: #f6f6f6;
}

.zmbox {
  border-top: 10px solid #f6f6f6 !important;
}

.message {
  color: #f37306;
  width: 350px;
  margin: 0 auto;
  .mess-l {
    /*padding-top: 7.5px;*/
    width: 12px;
    float: left;
  }
  .mess-r {
    width: 333px;
    float: left;
    padding-left: 5px;
  }
  .i {
    float: left;
  }
  .span {
    float: left;
  }
}
.tip {
  .color(#999999);
  margin-top: 10px;
  margin-bottom: 50px;
  .fs(0.75em);
  .p2(1em, 1em);
  .book {
    .color(#ff8226);
  }
}

.button-submit {
  width: 100%;
  position: absolute;
  bottom: 0px;
  background: #ee8753;
}

.weui-btn_default {
  background: #e27a30 !important;
  color: #ffffff;
}
.redfont /deep/ span{
color:red
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

