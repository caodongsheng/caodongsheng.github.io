<template>
  <!---扶贫干部管理-->
  <div>
    <x-header :left-options="{backText: ''}">{{headerTitle}}</x-header>
    <div class="box-withheader bg-f6f5f6">
      <div v-bind:class="{ 'dh-bg': toOpen, 'dh-tab': true }">
        <ul class="clearfix" v-if="leadLevel == 1 || leadLevel == 2 || leadLevel == 3">
          <li @click="change(5,1)" :class="{'li-l':true,'li-hover':lia}">村级待审核</li>
          <li @click="change(4,1)" :class="{'li-r':true,'li-hover':lib}">乡级待审核</li>
        </ul>
        <div class="title" v-else>
          <span>村级待审核</span>
        </div>
      </div>
      <!--乡级待审核-->
      <div class="list-wrap">
        <scroller
          :on-refresh="refresh"
          :on-infinite="infinite"
          refresh-layer-color="#4b8bf4"
          loading-layer-color="#ec4949">
          <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
            <g stroke-width="7" stroke-linecap="round">
              <line x1="10" x2="10" y1="27.3836" y2="36.4931">
                <animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate>
                <animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate>
                <animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1"
                         repeatCount="indefinite"></animate>
              </line>
              <line x1="24" x2="24" y1="18.6164" y2="45.3836">
                <animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate>
                <animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate>
                <animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1"
                         repeatCount="indefinite"></animate>
              </line>
              <line x1="38" x2="38" y1="16.1233" y2="47.8767">
                <animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate>
                <animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate>
                <animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8"
                         repeatCount="indefinite"></animate>
              </line>
              <line x1="52" x2="52" y1="16" y2="48">
                <animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate>
                <animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate>
                <animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5"
                         repeatCount="indefinite"></animate>
              </line>
            </g>
          </svg>
          <slot>
            <div v-if="index === 4" class="opelist">
              <group label-width="4.5em" label-margin-right="2em" label-align="left"
                     v-for="(item , index) in leaderCheckList" :key="index">
                <cell :title="item.realname" :value="item.region_name" is-link
                      :link="{name: 'leaderVerify', params: {id: item.id}}" value-align="right"></cell>
              </group>
            </div>
            <!--村级待审核-->
            <div v-if="index === 5" class="opelist">
              <group label-width="4.5em" label-margin-right="2em" label-align="left"
                     v-for="(item,index) in leaderCheckList" :key="index">
                <cell :title="item.realname" :value="item.region_name" is-link
                      :link="{name: 'leaderVerify', params: {id: item.id,num: 5}}" value-align="left"></cell>
              </group>
            </div>
          </slot>
          <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
            <g>
              <circle cx="16" cy="32" stroke-width="0" r="3">
                <animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5"
                         repeatCount="indefinite"></animate>
                <animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate>
              </circle>
              <circle cx="32" cy="32" stroke-width="0" r="3.09351">
                <animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5"
                         repeatCount="indefinite"></animate>
                <animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate>
              </circle>
              <circle cx="48" cy="32" stroke-width="0" r="4.09351">
                <animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6"
                         repeatCount="indefinite"></animate>
                <animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate>
              </circle>
            </g>
          </svg>
        </scroller>
      </div>
    </div>
  </div>
</template>

<script>
  import headerBackTitle from '../../../components/header/headerBackTitle'
  import scrolltemplate from "@/components/scroll/scrollcomponent"
  import {Group, Cell, XHeader} from 'vux'
  import VueScroller from 'vue-scroller'
  import {setTimeout} from 'timers';

  export default {
    components: {
      headerBackTitle,
      Group,
      scrolltemplate,
      Cell,
      XHeader
    },
    name: 'leaderManage',
    data() {
      return {
        headerTitle: '扶贫干部管理',
        index: 5,
        toOpen: true,
        lia: true,
        lib: false,
        page: 1,
        end: false,
        noDataText: '没有更多数据',
        leaderCheckList: [],
        totalPage: 0,
        leadLevel: this.G('leaderLevel')
      }
    },
    methods: {
      change(num,page) {
        this.index = num;
        if (num === 4) {
          this.lia = false;
          this.lib = true;
          this.$http.post("hts/management/isCheck",{
            level: this.index,
            page: page
          })
            .then(res => {
              this.leaderCheckList = res.data.list;
            })

        }
        if (num === 5) {
          this.lia = true
          this.lib = false;
          this.$http.post('hts/management/isCheck', {
            level: this.index,
            page: page
          }).then(res => {
            this.leaderCheckList = res.data.list;
          })
        }
      },
      getCheckLeaders(done) {
        this.$http.post('hts/management/isCheck', {
          level: this.index,
          page: this.page
        }).then(res => {
          this.leaderCheckList = [...this.leaderCheckList, ...res.data.list];
          this.totalPage = res.data.total
          if (done) {
            done(true);
          }
        })
        .catch(err => {
          if(err.msg)
          this.showToast('', 'text', err.msg, '20em', '', 'middle');
        })
      },
      infinite(done) {
        setTimeout(() => {
          if (this.leaderCheckList.length < this.totalPage) {
            this.page++;
            this.getCheckLeaders(done);
          } else {
            done(true);
          }

        }, 1500)
      },
      refresh(done) {
        setTimeout(() => {
          this.leaderCheckList = [];
          this.page = 1;
          this.getCheckLeaders();
          done();
        }, 1500)
      },
   
    },
    created() {
      this.getCheckLeaders();
    }
  }
</script>

<style scoped>
  .dh-tab {
    width: 100%;
    height: 70px;
    background: #f6f6f6;
    text-align: center;
  }
  .dh-bg {
    background: #f6f6f6;
  }

  .dh-tab ul {
    padding-top: 18px;
    width: 60%;
    margin: 0 auto;
    color: #fd6d0a;
    box-sizing: border-box;
  }

  .dh-tab ul li {
    width: 50%;
    height: 34px;
    float: left;
    border: 1px solid #fd6d0a;
    line-height: 34px;
    display: block;
    box-sizing: border-box;
  }

  .li-l {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .li-r {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .li-hover {
    background: #fd6d0a;
    color: #ffffff
  }

  .list-wrap {
    position: absolute;
    left: 0;
    right: 0;
    top: 70px;
    bottom: 0;
    overflow: auto;
    background: #fff;
  }

  .weui-cells .weui-cell_access .weui-cell__ft {
    text-align: left !important;
  }

  /*列表样式  */

  /*操作列表区域*/
  .opelist >>> .weui-cells {
    margin-top: 0 !important;
    font-size: 15px
  }

  .opelist >>> .weui-cells:before {
    border: 0 none
  }

  .weui-cell_access >>> .weui-cell__ft:after {
    margin-top: -3px
  }

  .weui-cell:before {
    right: 15px
  }

  .weui-cell {
    padding: 14px 15px
  }

  .weui-cell >>> .weui-cell__ft {
    font-size: 14px;
    padding-right: 18px
  }

  .vux-cell-box >>> .weui-cell_access .weui-cell__ft {
    padding-right: 18px;
    font-size: 14px
  }

  .title {
    width: 60%;
    margin: 0 auto;
    color: #fd6d0a;
    box-sizing: border-box;
    padding-top: 18px;
  }

  .title span {
    display: block;
    width: 50%;
    height: 34px;
    border: 1px solid #fd6d0a;
    background: #fd6d0a;
    color: #fff;
    line-height: 34px;
    box-sizing: border-box;
    border-radius: 5px;
    margin: 0 auto;
  }
</style>
