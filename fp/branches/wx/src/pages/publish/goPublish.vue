<template>
  <div class="education bg-f6f6f6">
    <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="confirmBack">发布需求</x-header>
    <div class="box-withheader over-auto">
      <transition name="bounce">
        <div v-show="imgBig" class="imgModal" @click="modalCloseOpen">
          <img :src="imgBigSrc" style="margin: 0 auto;width: 100%;display: inline-block">
        </div>
      </transition>
      <div class="item chooseWhat">您选择的是 {{demandType[this.G('id')-1]}}</div>
      <div class="item" @click="isactionSheetShow=!isactionSheetShow" v-if="isShow">
        <x-input title="需求类型" disabled placeholder="请选择>" v-model="name"></x-input>
      </div>
      <div v-if="isCapitalDemand" class="item">
        <x-input
          title="目标金额"
          type="number"
          :required="true"
          placeholder="请输入金额"
          v-model="money"
          @on-blur="moneyInputBlur"
         
        ></x-input>
      </div>
      <div class="item">
        <x-input
          title="需求标题"
          :required="true"
          :min="4"
          :max="20"
          placeholder="请输入需求标题"
          v-model="title"
          :is-type="checkTitleFun"
          @on-blur="changevx"
       
        ></x-input>
      </div>
      <div class="flex">
        <div>需求详情</div>
        <div class="tpl" @click="useTpl">使用快捷模版</div>
      </div>
      <div class="textarea">
        <x-textarea
          style="font-size: 1.4rem;"
          :max="5000"
          :min="10"
          :rows="8"
         
          v-model="description"
          :class="getClass"
          placeholder="建议详细描述您的需求：如家庭背景，收入情况，需求原因等，请输入至少20个字的内容"
          @on-blur="changevx"
        ></x-textarea>
      </div>

      <div class="imgTitle">点击下方添加图片说明（最多9张）</div>
      <div>
        <div class="item">
          <div style="display: flex;flex-wrap: wrap;padding:1em .6em">
            <div
              v-for="value in imgArr"
              style="width: 33%;margin-bottom:5px;text-align: center;position: relative"
            >
              <div
                @click="imgToBig(value)"
                style="width: 90%;height: 7em;"
                :style="{backgroundImage:'url('+value+')',backgroundSize:'cover',backgroundPosition:'center'}"
              ></div>
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
                <div class="iconfont icon-f-cam" style="font-size: 2.7em" @click="showMenu"></div>
                <!-- <div class="iconfont icon-f-cam" style="font-size: 2.7em"></div> -->
                <div>{{this.imgArr.length==0?"添加图片":this.imgArr.length+"/9"}}</div>
              </div>
              <input
                type="file"
                style="height: 100%;width: 90%;position: absolute;top:0;left: 0;opacity: 0;-ms-filter: 'alpha(opacity=0)'"
                @change="getFile"
                ref="file"
                accept="image/*"
                id="fileinput"
              >
              <actionsheet
                v-model="showmenu"
                :menus="menus1"
                show-cancel
                @on-click-menu-album="fromalbum"
                @on-click-menu-camera="fromcamera"
              ></actionsheet>
            </div>
          </div>
        </div>
      </div>

      <!--收货地址-->
      <group v-if="!isCapitalDemand" class="group-clearbd">
        <group-title slot="title" class="over-hidden">
          收货地址
          <router-link
            v-if="!aidederAddressList.length"
            class="color-orange f-14 right_ope"
            :to="addaddress()"
          >+ 添加地址</router-link>
        </group-title>
        <template v-if="address">
          <cell is-link value-align="left" @click.native="goToAddressList()">
            <i slot="icon" class="iconfont icon-f-map f-20"></i>
            <div class="addinfo color-333">
              <h1 class="clearfix f-15 f-normal">
                <span class="f_r color-999 f-14">{{address.link_tel}}</span>
                {{address.linkman}}
              </h1>
              <p class="f-14">{{address.detail_addr}}</p>
            </div>
          </cell>
        </template>
      </group>

      <div class="tip">
        <check-icon :value.sync="checked" type="plain"></check-icon>已阅读并同意
        <span class="book" @click="goClause">《中国社会扶贫网需求发起条款》</span>及
        <span @click="goPromise" class="book">《发起人承诺书》</span>
      </div>
      <div class="btn">
        <div @click="publish" class="btn-orange-lg">发布</div>
      </div>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="isAgreement" class="dialog-demo">
        <div class="img-box" style="padding: 2em 0">这是测试数据，后期需要给我</div>
        <div @click="isAgreement=false">
          <span class="vux-close"></span>
        </div>
      </x-dialog>
    </div>

    <div v-transfer-dom>
      <div v-if="showTpl" class="dialog-demo2">
        <div class="img-box" v-for="(item,index) in tplArr" style="padding: 1em" :key="index">
          <div style="display: flex;" @click="tplToTextera(item)">
            <div>{{(index+1)+"、"+item.demand_template_content}}</div>
            <div v-show="false">{{item.demand_template_name}}</div>
          </div>
        </div>
        <div @click="showTpl=false,showPrompt=false">
          <p
            style="background-color:#04BE02;color:#FFF1E8;margin:0px 30px 10px 30px;padding:10px 0px 10px 0px;border-radius:10px;text-align: center;"
          >关闭</p>
        </div>
      </div>
      <!--<x-dialog v-model="showTpl" class="dialog-demo">-->
      <!--<div class="img-box" v-for="(item,index) in tplArr" style="padding: 1em" :key="index">-->
      <!--<div style="display: flex;" @click="tplToTextera(item)">-->
      <!--<div>{{(index+1)+"、"+item.demand_template_content}}</div>-->
      <!--<div>{{item.demand_template_name}}</div>-->
      <!--</div>-->
      <!--</div>-->
      <!--<div @click="showTpl=false">-->
      <!--<p style="background-color:#04BE02;color:#FFF1E8;margin:0px 30px 10px 30px;padding:10px 0px 10px 0px;border-radius:10px">关闭</p>-->
      <!--</div>-->
      <!--</x-dialog>-->
    </div>

    <div v-if="isactionSheetShow" class="actionSheet">
      <div class="body">
        <div class="top">
          <div @click="closeActionSheet" style="color:#999999">取消</div>
          <div @click="sureActionSheet" style="color:#ff8226">确定</div>
        </div>
        <div
          style="padding:0.7em 1em;font-size: 0.9em;color:#999999;border-top:1px solid #f1f1f1;border-bottom:1px solid #f1f1f1"
        >请选择{{typeTitle}}种类</div>

        <div class="content display-flex">
          <div class="list1">
            <div
              v-for="item in nodes1"
              @click="getClickedItemDetail(item,1)"
              class="list1-item"
              :class="selectedItem1 === item.id ? 'active' : ''"
            >{{item.category_name}}</div>
          </div>
          <div v-if="nodes2" :class="nodes2.length!==0? ['list1','list2'] :''">
            <div
              v-for="value in nodes2"
              @click="getClickedItemDetail(value,2)"
              class="list1-item"
              :class="selectedItem2 === value.id ? 'active' : ''"
            >{{value.category_name}}</div>
          </div>
          <div v-if="nodes3" :class="nodes3.length!==0? ['list1','list3'] :''">
            <div
              v-for="v in nodes3"
              @click="getClickedItemDetail(v,3)"
              class="list1-item"
              :class="selectedItem3 === v.id ? 'active' : ''"
            >{{v.category_name}}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- <p class="loading" style="text-align:center;" v-show="showLoading">
      <inline-loading></inline-loading>
    </p>-->

    <!--关闭需求弹窗-->
    <div v-transfer-dom>
      <confirm
        v-model="showconfirm"
        title
        confirm-text="继续编辑"
        cancel-text="放弃编辑"
        @on-confirm="continueEdit()"
        @on-cancel="onCancel()"
        style="height:auto;overflow: auto"
      >
        <p style="text-align:center;">此时返回，已编辑的内容会丢失，建议您继续完成编辑</p>
      </confirm>
    </div>

    <!--协议弹窗-->
    <proxqfq ref="protocolcon"></proxqfq>
    <procnsh ref="protocolcon2"></procnsh>
    <div class="lightBox" v-show="showPrompt" @click="none"></div>
  </div>
</template>

<script>
import {
  Actionsheet,
  XTextarea,
  XInput,
  XHeader,
  PopupPicker,
  CheckIcon,
  XDialog,
  InlineLoading,
  Group,
  GroupTitle,
  Cell,
  TransferDom,
  Confirm
} from "vux";
import { mapState } from "vuex";
import * as types from "../../store/mutation-types.js";
import { depthFirstSearch } from "../../util/dfs";
import proxqfq from "@/pages/protocol/proxqfq";
import procnsh from "@/pages/protocol/procnsh";
import Exif from "exif-js";
import {checkTitle,checkDesc} from '@/util/validFun.js';

export default {
  name: "goPublish",
  directives: {
    TransferDom
  },
  data() {
    return {
      isappback:false,
      titlefail:true,
      descfail:true,
      showmenu: false,
      name: "",
      end_money: "",
      demand_types: "",
      selectedItem1: "",
      selectedItem2: "",
      selectedItem3: "",
      isShow: true,
      nodes1: [],
      nodes2: [],
      nodes3: [],
      temp_name: "",
      temp_end_money: "",
      temp_demand_types: "",
      money: "",
      title: "",
      checked: true,
      isAddImgShow: true,
      showTpl: false,
      imgArr: [],
      imgBig: false,
      imgBigSrc: "",
      demandType: ["教育帮扶", "健康帮扶", "住房帮扶", "物品帮扶", "民生帮扶"],
      description: "",
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
      originUrl: "",
      picValue: null,
      Orientation: "",
      isAgreement: false,
      tplArr: [],
      isactionSheetShow: false,
      typeTitle: "",
      showLoading: false,
      menus1: {
        album: "从相册选择",
        camera: "拍照"
      },
      isCapitalDemand: false,
      address: "",
      helpId: "",
      showconfirm: false,
      showPrompt: false,
      regionIdObj: {
        province_region_id: "",
        city_region_id: "",
        county_region_id: "",
        village_region_id: "",
        hamlet_region_id: ""
      },
      isLastType: false,
      isPublishing: false
    };
  },
  components: {
    XTextarea,
    XInput,
    XHeader,
    CheckIcon,
    XDialog,
    PopupPicker,
    InlineLoading,
    Group,
    GroupTitle,
    Actionsheet,
    Cell,
    Confirm,
    proxqfq,
    procnsh
  },
  beforeRouteEnter(to, from, next) {
    //console.log('进来')
    next(vm => {
      //console.log('进来2')
      if (
        from.path.includes("aidedAddressList") &&
        vm.$route.meta.addressIndex !== -1
      ) {
        //console.log('进来3')
        vm.getAddress();
      }
      if (
        from.path.includes("aidedaddress") &&
        vm.$route.meta.addressIndex !== -1
      ) {
        //console.log('进来3')
        vm.getAddress();
      }
    });
  },
  beforeRouteLeave(to, from, next) {
    //console.log('离开', to.path)
    if (
      !to.path.includes("aidedAddressList") &&
      !to.path.includes("aidedaddress")
    ) {
      delete this.$route.meta.addressIndex;
      this.$store.commit(types.DEL_CACHE_VIEWS, this.$route);
      this.deleteVuexData();
    }
    next();
  },
  activated(){
   if (window.history && window.history.pushState) {
    history.pushState(null, null, document.URL);
    window.addEventListener('popstate',e=>{
      this.confirmBack()
      this.isappback = true;
    }
    , false);
  }

  },
  destroyed(){
  window.removeEventListener('popstate', e=>{
      this.confirmBack()
      this.isappback = true;
    }
    , false);
    this.isappback = false;
},

  created() {
    this.getIsEmptytype();
    if (this.demandId) {
      this.getDemandDetail();
    }
    this.checkDemandType();
    if (this.aidpersondata) {
      this.getHelpId();
      this.getdemandType(this.aidpersondata);
      if (
        !this.isCapitalDemand &&
        this.$route.meta.addressIndex === undefined
      ) {
        this.getAddrAddressList();
      }
    }
  },
  computed: {
    demandId() {
      return this.$route.params.demandId;
    },
    getClass() {
      if (this.description.replace(/(^\s*)|(\s*$)/g, "").length < 10) {
        return "redfont";
      } else {
        return "";
      }
    },
    ...mapState(["aidederAddressList", "aidpersondata", "demandDetail"])
  },
  watch: {
     money(val){
      this.$nextTick(() => {
          this.money = val.replace(/[^\0-9\.]/g,'')
       
        })
    },
       title(val){
             this.$nextTick(() => {
           let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
           this.title = val.replace(pattern, "");
             })
       },
        description(val){
             this.$nextTick(() => {
           let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
           this.description = val.replace(pattern, "");
             })
       }
  },

  methods: {
    continueEdit(){
      if(this.isappback){
    history.pushState(null, null, document.URL);
      }
    },
    checkTitleFun(value){
    let validobj = checkTitle(value,4,20,"需求标题")
        if(!validobj.valid){
            this.titlefail = true
            
        }
        else{
           this.titlefail = false
            
        }
        return validobj;
    },
  
    changevx() {
      setTimeout(() => {
        const scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
    },
      valideContent(value){
      let pattern =  /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
      value = value.replace(pattern, ''); 
    },
    getIsEmptytype() {
      let selects = this.$store.state.select;
      if (selects.length !== 0) {
        selects.forEach(item => {
          if (item.help_type_code === Number(this.G("id"))) {
            if (item.nodes.length === 0) {
              this.isShow = false;
              // this.name = item.category_name
              //判断如果当前需求类型没有二级分类时获取限额
              let demandId = Number(this.G("id"));
              if (demandId == 1) {
                this.demand_types = "448071783933804544";
              } else if (demandId == 2) {
                this.demand_types = "448502271404146688";
              } else if (demandId == 3) {
                this.demand_types = "448502355504136192";
              } else if (demandId == 4) {
                this.demand_types = "448502411594563584";
              }
              let arg = {};
              arg.category_code = this.demand_types;
              arg.province_region_id = this.regionIdObj.province_region_id;
              arg.city_region_id = this.regionIdObj.city_region_id;
              arg.county_region_id = this.regionIdObj.county_region_id;
              arg.village_region_id = this.regionIdObj.village_region_id;
              arg.hamlet_region_id = this.regionIdObj.hamlet_region_id;
              this.$http.post("hts/getRegionLimit", arg).then(res => {
                this.end_money = res.data.end_money;
              });
            }
          }
        });
      }
    },
    //
    getHelpId() {
      //console.log('获取helpId')
      this.helpId = this.aidpersondata.helpId;
    },
    checkDemandType() {
      this.isCapitalDemand = this.G("id") !== "4";
    },

    /*获取需求类型相关操作*/
    getdemandType(data) {
      for (let key in this.regionIdObj) {
        this.regionIdObj[key] = data[key];
      }
      let arg = {};
      arg.help_type_code = this.G("id");
      //arg = Object.assign(arg, this.regionIdObj)

      this.$http
        .post("hts/demand/classify", arg)
        .then(data => {
          this.nodes1 = data.data.vos[0].nodes;
          if (data.data.vos[0].nodes.length == 0) {
            this.isShow = false;
          }
          this.typeTitle = data.data.vos[0].category_name;
          if (this.demand_types) {
            this.getDemandTypeDetail();
          }
        })
        .catch(err => {
          //   this.showToast('', 'text', '加载需求类型失败，请重新进入')
        });
    },
    getDemandTypeDetail() {
      let root = { nodes: this.nodes1 };
      let result = [];
      let found = false;
      depthFirstSearch(root, {
        /*          enterNode: (node) => {
                        console.log('enterNode', node.category_name)
                      },*/
        leaveNode: node => {
          //console.log('leaveNode', node.category_name)
          if (node.id === this.demand_types) {
            found = true;
          }
          if (found) {
            result.push(node);
          }
        },
        allowTraversal: node => !found
      });
      result = result.reverse();
      this.name = result[result.length - 1].category_name;
      this.end_money = result[result.length - 1].end_money;
      //console.log('result:', result)
      for (let i = 1; i <= 3; i++) {
        if (result[i]) {
          this["selectedItem" + i] = result[i].id;
          this["nodes" + (i + 1)] = result[i].nodes;
          //console.log(i, result[i], this['selectedItem' + i], this['nodes' + (i + 1)])
        }
      }
    },
    getClickedItemDetail(item, nth) {
      for (let i = nth; i < 3; i++) {
        this["nodes" + (i + 1)] = [];
      }
      this["selectedItem" + nth] = item.id;
      this["selectedItem" + (nth + 1)] = "";
      if (item.nodes.length > 0) {
        this["nodes" + (nth + 1)] = item.nodes;
        this.isLastType = false;
      } else {
        /*          this.demand_types = item.id
                      this.end_money = item.end_money
                      this.name = item.category_name*/
        this.isLastType = true;
        this.temp_demand_types = item.id;
        //this.temp_end_money = item.end_money
        this.temp_name = item.category_name;
      }
    },
    closeActionSheet() {
      if (this.demand_types) {
        this.getDemandTypeDetail();
      } else {
        this.end_money = "";
        this.name = "";
      }
      this.isactionSheetShow = false;
    },
    async sureActionSheet() {
      if (this.isLastType) {
        this.demand_types = this.temp_demand_types;
        this.name = this.temp_name;
        //this.end_money = this.temp_end_money
        let arg = {};
        arg.category_code = this.demand_types;
        arg = Object.assign(arg, this.regionIdObj);
        let res;
        try {
          res = await this.$http.post("hts/getRegionLimit", arg);
        } catch (e) {
          //   this.showToast('', 'text', '加载失败，请重新选择需求类型')
        }
        this.end_money = res.data.end_money;
        this.isactionSheetShow = false;
      } else {
        this.showToast("", "text", "请选到最后一级");
      }
    },

    /*金额相关的判断*/
    moneyInputBlur() {
      if (this.money == "") {
        this.showToast("", "text", "请选择目标金额");
        return;
      }
      if (this.money > this.end_money && this.end_money) {
        this.showToast("", "text", "金额不得大于" + this.end_money);
        this.money = this.end_money;
        return;
      }
      if (this.money <= 0) {
        this.showToast("", "text", "金额应大于0");
      }
      this.money = parseInt(this.money);
    },
    none() {
      this.showPrompt = false;
      this.showTpl = false;
    },
    /*快捷模板相关操作*/
    tplToTextera(e) {
      this.showTpl = false;
      this.showPrompt = false;
      this.description = e.demand_template_content;
    },
    useTpl() {
      let arg = {};
      arg.id = this.G("id");
      this.$http
        .post("hts/demand/getDemandTemplate", arg)
        .then(data => {
          this.showTpl = true;
          this.showPrompt = true;
          this.tplArr = data.data.vos;
        })
        .catch(err => {
          this.showToast("", "text", "获取快捷模板失败");
        });
    },

    /*收货地址相关的操作*/
    async getAddrAddressList() {
      //console.log('发送dispatch')
      try {
        await this.$store.dispatch("getAidederAddressList", {
          _this: this,
          aidedId: this.helpId
        });
      } catch (e) {
        this.showToast("", "text", "获取地址失败");
        return;
      }
      this.getAddress();
    },
    getAddress() {
      //console.log('单个address')
      let index = this.$route.meta.addressIndex;
      if (index >= 0) {
        this.address = this.aidederAddressList[index];
        return;
      }
      this.address = this.aidederAddressList.find(
        item => item.is_default === 1
      );
      if (!this.address) {
        this.address = this.aidederAddressList[0];
      }
    },
    goToAddressList() {
      this.$router.push({ name: "aidedAddressList" });
    },
    addaddress() {
      this.$store.state.addressdetail = null;
      return "/aidedaddress/"+this.helpId;
    },
    /*图片处理相关操作*/
    getFile(e) {
      let reader = new FileReader();
      let img = new Image();
      let _this = this;
      let file = e.target.files[0];
      reader.readAsDataURL(file);

      reader.onload = function(e) {
        img.setAttribute("src", this.result);
        //    _this.imgArr.push(this.result)
        //  if (_this.imgArr.length > 8) {
        //    _this.isAddImgShow = false
        //  }
      };
      let width = 640; // 图像大小
      let quality = 0.7; // 图像质量
      let canvas = document.createElement("canvas");
      let drawer = canvas.getContext("2d");
      let base64;
      _this.$refs.file.value = "";
      img.onload = function() {
        canvas.width = width;
        canvas.height = width * (img.height / img.width);
        drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
        base64 = canvas.toDataURL("image/jpeg", quality);

        _this.imgArr.push(base64);
        _this.imgArr = _this.uniq();
        if (_this.imgArr.length > 8) {
          _this.isAddImgShow = false;
        }
      };
    },
    imgToBig(e) {
      this.imgBigSrc = e;
      this.imgBig ? (this.imgBig = false) : (this.imgBig = true);
    },
    modalCloseOpen() {
      this.imgBig ? (this.imgBig = false) : (this.imgBig = true);
    },
    imgDelete(value) {
      let leftImg = this.imgArr.filter(function(e) {
        return e != value;
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

    /*承诺书相关操作*/
    goClause() {
      this.$refs.protocolcon.showpop();
    },
    goPromise() {
      this.$refs.protocolcon2.showpop();
    },

    async publish() {
      if (this.isPublishing) {
        return;
      }

      if (this.isCapitalDemand) {
        if (!this.money) {
          this.showToast("", "text", "请输入金额");
          return;
        }
        if (this.money > this.end_money && this.end_money) {
          this.showToast("", "text", "金额不得大于" + this.end_money);
          this.money = this.end_money;
          return;
        }
        if (this.money <= 0) {
          this.showToast("", "text", "金额应大于0");
          return;
        }
      } else {
        if (!this.name) {
          this.showToast("", "text", "请先选择物品需求的类型");
          return;
        }
      }

      if (this.titlefail) {
        let msg = checkTitle(this.title,4,20,"需求标题").msg
        this.showToast("", "text",msg);
        return;
      }
      if (this.descfail) {
        let obj = checkDesc(this.description,10,5000,"需求详情")
        if(!obj.valid){
         this.showToast("", "text",obj.msg);
        return;
        }else{
          if (!/[^\x00-\xff]{10,5000}$/.test(this.description.replace(/(^\s*)|(\s*$)/g, "")))
          {
            this.showToast("", "text","需求详情输入有误，必须是中文字符");
           return
          }
        }
      }
     
      if (this.imgArr.length === 0) {
        this.showToast("", "text", "请上传图片");
        return;
      } else if (this.imgArr.length > 9) {
        this.showToast("", "text", "上传图片不能多于9张");
        return;
      }
      if (!this.address && !this.isCapitalDemand) {
        this.showToast("", "text", "请增加收货地址");
        return;
      }
      if (!this.checked) {
        this.showToast("", "text", "请阅读并同意相关条款");
        return;
      }
      //this.showLoading = true
      this.showPrompt = true;
      this.isPublishing = true;
      let arg = {};
      let imgArrBase64 = this.imgArr.filter(item => item.includes("base64"));
      let imgArrHttp = this.imgArr.filter(item => item.includes("http"));

      if (imgArrBase64.length !== 0) {
        let imgUploadArg = {};
        imgUploadArg.imgStr = imgArrBase64.join("-");
        try {
          let res = await this.$http.post(
            "uts/file/bfFilesUpload",
            imgUploadArg
          );
          arg.img = [...imgArrHttp, ...res.data].join(",");
        } catch (err) {
          if (err.code === "10290") {
            this.showToast("", "text", "图片上传失败，请重新上传");
          }
          return;
        }
      } else {
        arg.img = imgArrHttp.join(",");
      }
      arg.help_type_code = this.G("id");
      arg.demand_title = this.title;
      arg.demand_coment = this.description;
      if (this.name == "") {
        let demandId = this.G("id");
        if (demandId == 1) {
          this.name = "教育";
        } else if (demandId == 2) {
          this.name = "医疗";
        } else if (demandId == 3) {
          this.name = "住房";
        } else if (demandId == 4) {
          this.name = "物品";
        }
      }
      arg.demand_use = this.name;
      arg.demand_types = this.demand_types; // id

      /*demandId不存在就是首次发布，存在就是重新编辑*/
      if (!this.demandId) {
        arg.helpId = this.helpId;
        arg.category_code = this.name;
        // 1是物品，2是资金
        if (this.G("id") === "4") {
          arg.demand_type = "1";
          arg.user_addr_id = this.address.id;
          this.publishDemand(arg);
        } else {
          arg.demand_type = "2";
          arg.target_amount = this.money;
          arg.demand_use_money = this.name + "," + this.end_money;
          this.publishDemand(arg);
        }
      } else {
        // 1是物品，2是资金
        let demandTypeArg = "";
        if (this.G("id") === "4") {
          arg.demandId = this.demandId;
          arg.user_addr_id = this.address.id;
          demandTypeArg = "1";
          this.updateDemand(arg, demandTypeArg);
        } else {
          arg.demandId = this.demandId;
          arg.target_amount = this.money;
          arg.demand_use_money = this.name + "," + this.end_money;
          demandTypeArg = "2";
          this.updateDemand(arg, demandTypeArg);
        }
      }
    },

    /*首次发布需求调用接口*/
    async publishDemand(arg) {
      let res = {};
      try {
        if (arg.demand_type === "1") {
          res = await this.$http.post("hts/demand/educationGoods", arg);
        } else {
          res = await this.$http.post("hts/demand/educationCapital", arg);
        }
      } catch (err) {
        this.isPublishing = false;
        this.showLoading = false;
        this.showPrompt = false;
        if (err.msg) this.showToast("", "text", err.msg);
        return false;
      }
      this.deleteVuexData();
      this.$router.push({
        name: "publishSuccess",
        query: { demandId: res.data, demand_type: arg.demand_type }
      });
    },

    /*重新编辑调用接口*/
    async updateDemand(arg, demandTypeArg) {
      try {
        await this.$http.post("hts/myDemand/updateDemand", arg);
      } catch (err) {
        if (err.code === "D1006") {
          this.showToast("", "text", "重新编辑失败");
        }
        return;
      } finally {
        this.showLoading = false;
        this.showPrompt = false;
        this.isPublishing = false;
      }
      this.deleteVuexData();
      this.$router.push({
        name: "publishSuccess",
        query: { demandId: this.demandId, demand_type: demandTypeArg }
      });
    },

    /*重新编辑获取数据*/
    async getDemandDetail() {
      try {
        await this.$store.dispatch("getDemandDetail", {
          _this: this,
          demandId: this.demandId
        });
        if (this.demandDetail.demand_imgs.length >= 9) {
          this.isAddImgShow = false;
        }
      } catch (e) {
        this.showToast("", "text", "获取需求失败");
        return;
      }

      this.L("id", this.demandDetail.help_type_code);
      this.helpId = this.demandDetail.aideder_user_id;
      this.checkDemandType();
      if (!this.isCapitalDemand) {
        this.getAddrAddressList();
      }
      this.money = this.demandDetail.target_amount;
      this.title = this.demandDetail.demand_title;
      this.titlefail = false;
      this.descfail = false;
      this.description = this.demandDetail.demand_coment;
      this.imgArr = this.demandDetail.demand_imgs;
      this.demand_types = this.demandDetail.demand_types;
      this.getdemandType(this.demandDetail);
    },

    /*导航返回相关操作*/
    onCancel() {
      this.$router.go(-1);
    },
    confirmBack() {
      this.showconfirm = true;
    },

    deleteVuexData() {
      this.$store.commit(types.SET_AIDEDPERSON_DATA, null);
      this.$store.commit(types.GET_AIDEDER_ADDRESS_LIST, []);
      this.$store.commit(types.GET_DEMAND_DETAIL, {});
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
      if (!this.ishtml5) {
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
              for (let localimg of ret.list) {
                let img = new Image();
                img.src = localimg.path;
                let width = 640; // 图像大小
                let quality = 0.7; // 图像质量
                let canvas = document.createElement("canvas");
                let drawer = canvas.getContext("2d");
                let base64;
                self.$refs.file.value = "";
                img.onload = function() {
                  canvas.width = width;
                  canvas.height = width * (img.height / img.width);
                  drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
                  base64 = canvas.toDataURL("image/jpeg", quality);

                  self.imgArr.push(base64);
                  self.imgArr = self.uniq();
                  if (self.imgArr.length > 8) {
                    self.isAddImgShow = false;
                    //多余9张不显示
                    // self.imgArr = 9,self.imgArr.length-1)
                  }
                };
              }
            }
          }
        );
      } else {
        let els = document.querySelectorAll("input[type=file]");
        //  els[0].removeAttribute("capture");
        // if(self.isWeixinCient()){
        els[0].accept = "image/*";
        // }
        // else els[0].accept = 'image/jpeg,image/png,images/jpg,images/gif'
        els[0].click();
      }
    },
    //打开相机拍照
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
      if (!this.ishtml5) {
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
                //多余9张不显示
                // self.imgArr = 9,self.imgArr.length-1)
              }
            } else {
              if (ret) {
                self.showToast("", "text", "取消拍照", "20em", "bottom");
              }
              //   else{
              //       self.showToast('', 'text', JSON.stringify(err), '20em', 'bottom')
              //   }
            }
          }
        );
      } else {
        let els = document.querySelectorAll("input[type=file]");
        els[0].accept = "image/*";
        //     els[0].capture = 'camera'
        els[0].click();
      }
    },

    showMenu() {
      if (!this.ishtml5) {
        this.showmenu = true;
      } else {
        this.showmenu = false;
      }
    },

    onChange() {},
    onHide() {},
    onShow() {}
  },
  mounted() {
    if (window.api != undefined) {
      this.ishtml5 = false;
      // var ua = navigator.userAgent.toLowerCase()
      // var isiOS = ua.indexOf('iphone') != -1 || ua.indexOf('ipad') != -1 // ios终端
      // if (!isiOS) {
      //   document.getElementById('fileinput').capture = 'camera'
      // }
      document.getElementById("fileinput").style.display = "none";
    }
  }
};
</script>

<style lang="less">
@import "../../less/base.less";
.weui-dialog {
}
.education {
  .imgModal {
    position: fixed;
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

  .chooseWhat {
    .color(#ff8226);
    .p2(0.8em, 1em);
    .fs(13px);
  }
  /*    .demandType .vux-x-input.disabled .weui-input{
            -webkit-text-fill-color:#000000;
          }*/
  .item {
    .bb(10px, solid, #f6f6f6);
    .bg(#ffffff);
  }
  .flex {
    .flex();
    .jc(space-between);
    .fs(14px);
    .p2(0.4em, 1em);
    .color(#666666);
    .tpl {
      .color(#ff8226);
      .fs(13px);
      text-decoration: underline;
    }
  }
  .tip {
    .color(#999999);
    .fs(12px);
    .p2(1em, 1em);
    .book {
      .color(#ff8226);
    }
  }
  .imgTitle {
    .color(#999);
    .fs(14px);
    .p2(0.6em, 1em);
  }
  .weui-cell__hd {
    //.w(28%);
    .fs(15px);
    .color(#666666);
  }
  .weui-input {
    .fs(14px);
    .ta(right);
  }
  .textarea {
    .bg(#ffffff);
    .weui-cell__hd {
      .w(0%);
    }
  }
  .weui-textarea {
    .color(#999999);
    .fs(0.8em);
  }
  .btn {
    .mb(2em);
    div {
      .bg(#ff8226);
      .color(#ffffff);
      .p2(0.6em, 0);
      .ta(center);
      .br(2em);
      .m2(0, 14%);
    }
  }
  .vux-check-icon > .weui-icon-success:before,
  .vux-check-icon > .weui-icon-success-circle:before {
    color: #ff8226;
  }
  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }
  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }
  .redfont /deep/ span {
    color: red;
  }
  .actionSheet {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.5);
    .body {
      position: absolute;
      height: 345px;
      bottom: 0;
      .w(100%);
      .bg(#ffffff);
      .top {
        .flex();
        .fs(1.1em);
        justify-content: space-between;
      }
      .content {
        .item3 {
          flex-grow: 1;
        }
        .list1 {
          height: 265px;
          width: 100%;
          overflow: scroll;
          -webkit-overflow-scrolling: touch;
          //flex-grow: 1;
          .list1-item {
            width: 100%;
            height: 44px;
            line-height: 44px;
            box-sizing: border-box;
            padding-left: 20px;
          }
          .active {
            background: #f7f9f8;
            color: #ed6b2b;
          }
        }
        .list2 {
          background: #f7f9f8;
          .active {
            color: #ed6b2b;
            background: #ededed;
          }
        }
        .list3 {
          background: #ededed;
          .active {
            color: #ed6b2b;
            background: #ededed;
          }
        }
      }
    }
  }
  /*动画设计*/
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
}
</style>
<style scoped>
/*收货地址*/

/*group header右侧操作*/
.group-clearbd >>> .weui-cells {
  margin-top: 0 !important;
  font-size: 15px;
}

.group-clearbd >>> .weui-cells:after {
  border: 0 none;
}

.group-clearbd >>> .weui-cells:before {
  border: 0 none;
}

.weui-cells__title {
  margin: 0;
  padding: 12px 15px;
  position: relative;
  font-size: 15px;
}

.right_ope {
  position: absolute;
  right: 15px;
}

/*cell部分*/
.weui-cell {
  padding: 14px 15px;
  font-size: 15px;
}

.weui-cell:before {
  right: 15px;
}

.weui-cell >>> .weui-cell__ft {
  font-size: 14px;
  padding-right: 0;
}

.weui-cell.vux-tap-active >>> .weui-cell__ft {
  padding-right: 18px;
}

/*地址*/
.addinfo {
  padding: 4px 0 4px 15px;
}

.addinfo p {
  padding-top: 6px;
}
.lightBox {
  position: absolute;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}
.dialog-demo2 {
  position: fixed;
  z-index: 11111;
  top: 50%;
  right: 0;
  left: 0;
  bottom: 0;
  width: 69%;
  margin: -50% auto;
  height: 400px;
  overflow: scroll;
  background: #fff;
}
</style>