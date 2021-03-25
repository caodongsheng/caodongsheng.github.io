<template>
  <div>
    <x-header :left-options="{backText: '',preventGoBack: true}" @on-click-back="backToPre">发布的需求</x-header>
    <div class="box-withheader">
      <!--头部筛选草稿箱-->
      <div class="list-topoperate display-flex f-16 bg-ffffff color-999">
        <selectTab
          ref="selectTab"
          :datas="selects"
          :demandType="demandtype"
          :typeCode="typeCode"
          @getdatas="getFilteredResult"
        ></selectTab>
      </div>
      <!--总计-->
      <div class="box-withheader-nav bg-f6f5f6">
        <scroller
          v-if="mypublist.length!==0"
          :on-refresh="refresh"
          :on-infinite="infinite"
          ref="scroller"
          refresh-layer-color="#4b8bf4"
          loading-layer-color="#ec4949"
        >
          <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
            <g stroke-width="7" stroke-linecap="round">
              <line x1="10" x2="10" y1="27.3836" y2="36.4931">
                <animate
                  attributeName="y1"
                  dur="750ms"
                  values="16;18;28;18;16;16"
                  repeatCount="indefinite"
                ></animate>
                <animate
                  attributeName="y2"
                  dur="750ms"
                  values="48;46;36;44;48;48"
                  repeatCount="indefinite"
                ></animate>
                <animate
                  attributeName="stroke-opacity"
                  dur="750ms"
                  values="1;.4;.5;.8;1;1"
                  repeatCount="indefinite"
                ></animate>
              </line>
              <line x1="24" x2="24" y1="18.6164" y2="45.3836">
                <animate
                  attributeName="y1"
                  dur="750ms"
                  values="16;16;18;28;18;16"
                  repeatCount="indefinite"
                ></animate>
                <animate
                  attributeName="y2"
                  dur="750ms"
                  values="48;48;46;36;44;48"
                  repeatCount="indefinite"
                ></animate>
                <animate
                  attributeName="stroke-opacity"
                  dur="750ms"
                  values="1;1;.4;.5;.8;1"
                  repeatCount="indefinite"
                ></animate>
              </line>
              <line x1="38" x2="38" y1="16.1233" y2="47.8767">
                <animate
                  attributeName="y1"
                  dur="750ms"
                  values="18;16;16;18;28;18"
                  repeatCount="indefinite"
                ></animate>
                <animate
                  attributeName="y2"
                  dur="750ms"
                  values="44;48;48;46;36;44"
                  repeatCount="indefinite"
                ></animate>
                <animate
                  attributeName="stroke-opacity"
                  dur="750ms"
                  values=".8;1;1;.4;.5;.8"
                  repeatCount="indefinite"
                ></animate>
              </line>
              <line x1="52" x2="52" y1="16" y2="48">
                <animate
                  attributeName="y1"
                  dur="750ms"
                  values="28;18;16;16;18;28"
                  repeatCount="indefinite"
                ></animate>
                <animate
                  attributeName="y2"
                  dur="750ms"
                  values="36;44;48;48;46;36"
                  repeatCount="indefinite"
                ></animate>
                <animate
                  attributeName="stroke-opacity"
                  dur="750ms"
                  values=".5;.8;1;1;.4;.5"
                  repeatCount="indefinite"
                ></animate>
              </line>
            </g>
          </svg>
          <slot>
            <div class="f-14 list-total">共{{totalPages}}条</div>
            <!--需求列表-->
            <div class="mypublist bg-ffffff mb-15" v-for="item in mypublist" :key="item.id">
              <div class="list-header clearfix">
                <span class="tit-nowrap color-333 f-16">受助人：{{item.aideder_name}}</span>
              </div>
              <div class="list-content">
                <div class="dis-block linkonly" @click="getHelpType(item.demand_type,item.id)">
                  <div class="flex-tab">
                    <div class="flex-tab-cell tab-left">
                      <img
                        :src="item.img_url ||'../../static/appimg/rec/slh3.png'"
                        width="80"
                        height="80"
                      >
                    </div>
                    <div class="flex-tab-cell tab-right">
                      <h1 class="color-333 f-16 f-normal tit-nowrap">{{item.demand_title}}</h1>
                      <p class="color-999 f-14 tit-2row-nowrap">{{item.demand_coment}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list-state clearfix">
                <span
                  class="f_l f-14"
                  :class="STATUS_MAP_UI[item.demand_status].textColor"
                >{{STATUS_MAP_UI[item.demand_status].statusText}}</span>
                <div class="display-flex right-btn-contatiner">
                  <router-link
                    v-for="(btn,index) in STATUS_MAP_UI[item.demand_status].listButtonArray"
                    :key="index"
                    v-if="isshow(item.is_feedback,btn.text)"
                    :to="{name:btn.url,params:{demandId:item.id,code:demandtype}}"
                    :class="{'btn-bordered-gray':index===0,'btn-bordered-orange':index===1,}"
                    class="ml-10 f-14"
                  >
                    <span v-if="item.demand_status ===3  &&  btn.text.indexOf('信息')>-1 ">3</span>
                    {{btn.text}}
                  </router-link>
                  <router-link
                    v-if="isFshow(item.is_feedback)"
                    :to="{name:'viewlovefeedback',params:{demandId:item.id,code:demandtype}}"
                    class="ml-10 f-14 btn-bordered-orange"
                  >
                    <span>查看感谢回馈</span>
                  </router-link>
                </div>
                <div class="display-flex right-btn-contatiner" v-if="isFshow(item.is_feedback)"></div>
              </div>
            </div>
          </slot>
          <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
            <g>
              <circle cx="16" cy="32" stroke-width="0" r="3">
                <animate
                  attributeName="fill-opacity"
                  dur="750ms"
                  values=".5;.6;.8;1;.8;.6;.5;.5"
                  repeatCount="indefinite"
                ></animate>
                <animate
                  attributeName="r"
                  dur="750ms"
                  values="3;3;4;5;6;5;4;3"
                  repeatCount="indefinite"
                ></animate>
              </circle>
              <circle cx="32" cy="32" stroke-width="0" r="3.09351">
                <animate
                  attributeName="fill-opacity"
                  dur="750ms"
                  values=".5;.5;.6;.8;1;.8;.6;.5"
                  repeatCount="indefinite"
                ></animate>
                <animate
                  attributeName="r"
                  dur="750ms"
                  values="4;3;3;4;5;6;5;4"
                  repeatCount="indefinite"
                ></animate>
              </circle>
              <circle cx="48" cy="32" stroke-width="0" r="4.09351">
                <animate
                  attributeName="fill-opacity"
                  dur="750ms"
                  values=".6;.5;.5;.6;.8;1;.8;.6"
                  repeatCount="indefinite"
                ></animate>
                <animate
                  attributeName="r"
                  dur="750ms"
                  values="5;4;3;3;4;5;6;5"
                  repeatCount="indefinite"
                ></animate>
              </circle>
            </g>
          </svg>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script>
import { XHeader, XImg, Spinner } from "vux";
import STATUS_MAP_UI from "./STATUS_MAP_UI";
import selectTab from "@/components/select/selectTab";
import { getMinPic } from "../../../util/getMin";
import * as types from "../../../store/mutation-types.js";
import { setTimeout } from "timers";
import { get_status_list } from "@/components/select/selectHttp";
export default {
  name: "mypub_list",
  components: { XHeader, XImg, Spinner, selectTab },
  data() {
    return {
      demandStatus: "",
      demandTypes: "",
      pageNum: 1,
      demandtype: "",
      mypublist: [],
      totalPages: 0,
      helpType: "",
      STATUS_MAP_UI: STATUS_MAP_UI,
      selects: [
        {
          title: "需求类型",
          type: 2, // 是否下拉形式
          typefor: 1, // 下拉样式
          ischeckbox: false, // true 多选   false 单选
          list_index: -1, // 选中默认值
          demand: 0, // 0 需求 1 地域
          list: [] // tree数据，selecthttp.js 加载
        },

        {
          title: "状态",
          type: 2,
          typefor: 3,
          list_index: 0,
          list: []
        }
      ]
    };
  },
  computed: {
    typeCode() {
      return (this.demandtype = this.$route.params.typeCode);
    }
  },
  created() {
    //状态根据需求类型不同做相应的调整
    this.demandtype = this.typeCode;
    this.getData();
    this.$store.commit(types.GET_DEMAND_DETAIL, {});
    this.$store.commit(types.GET_AIDEDER_BANKLIST, []);
  },
  methods: {
    isshow(feednum, text) {
      if (text != "填写感谢回馈") {
        return true;
      } else {
        if (feednum && feednum > 0) {
          return false;
        }
        return true;
      }
    },
    isFshow(feednum) {
      if (feednum && feednum > 0) {
        return true;
      }
      return false;
    },
    getFilteredResult(data) {
      console.log(JSON.stringify(data));
      if (this.typeCode == 0 && data[0].help_type_code != "") {
        this.demandtype = data[0].help_type_code;
      }
      if (data[0].help_type_code == 0) {
        this.demandTypes = "";
      } else {
        this.demandTypes = data[0].id;
      }
      let statusText = data[1];
      if (statusText === "全部") {
        this.demandStatus = "";
      } else {
        let list = get_status_list(
          this,
          1,
          this.demandtype,
          this.G("leaderLevel")
        );
        if (list.indexOf(statusText) > -1) {
          for (let key in STATUS_MAP_UI) {
            if (STATUS_MAP_UI[key].statusText === statusText) {
              this.demandStatus = key;
              break;
            }
          }
        } else {
          this.selects[1].title = "状态";
          this.selects[1].list_index = 0;
          this.demandStatus = "";
        }
      }
      this.mypublist = [];
      this.pageNum = 1;
      this.totalPages = 0;
      this.getData();
    },
    async getData(done) {
      try {
        let res = await this.$http.post("hts/myDemand/myDemends", {
          page: this.pageNum,
          helpTypeCode: this.demandtype,
          demandStatus: this.demandStatus,
          demandTypes: this.demandTypes
        });
        this.mypublist = [...this.mypublist, ...res.data.list];
        this.totalPages = res.data.total;
        if (done) {
          done(true);
        }
      } catch (err) {
        if (err.msg) this.showToast("", "text", err.msg, "20em", "", "middle");
      }
    },
    getHelpType(type, id) {
      type === 2
        ? this.$router.push({ name: "mypubcapital", params: { demandId: id } })
        : this.$router.push({ name: "mypubgoods", params: { demandId: id } });
    },
    changetype(imgurl) {
      return getMinPic(imgurl);
    },
    infinite(done) {
      setTimeout(() => {
        if (this.mypublist.length < this.totalPages) {
          this.pageNum++;
          this.getData(done);
        } else {
          done(true);
        }
      });
    },
    refresh(done) {
      setTimeout(() => {
        this.mypublist = [];
        this.pageNum = 1;
        this.totalPages = 0;
        this.getData(done);
      }, 1000);
    },
    backToPre() {
      this.$router.replace("/mypublish");
    }
  }
};
</script>

<style scoped lang="less">
.list-total {
  padding: 5px 15px;
}

.list-topoperate {
  width: 100%;
}

.list-topoperate .select_tab {
  width: 45%;
}

.list-topoperate .select_tab .item {
  font-size: 16px;
  color: #999999;
}

.list-topoperate .draftBtn {
  width: 55%;
  text-align: right;
}

.list-topoperate em {
  padding: 6px 15px;
}

.loading {
  text-align: center;
  color: gray;
}

.list-header {
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
}

.list-content {
  padding: 15px 15px;
}

.list-content .tab-left {
  width: 90px;
  height: 80px;
}

.list-content .tab-right {
  position: relative;
}

.list-content .tab-right h1 {
  line-height: 100%;
}

.list-content .tab-right p {
  position: absolute;
  bottom: 0;
}

.list-content .tab-right p span {
  padding-right: 10px;
}

.list-state {
  padding: 10px 15px;
  border-top: 1px solid #eee;
  .right-btn-contatiner {
    justify-content: flex-end;
  }
}
.box-withheader-nav {
  position: absolute;
  top: 39px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
