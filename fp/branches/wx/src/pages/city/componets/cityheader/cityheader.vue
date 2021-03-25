<template>
  <div>
    <x-header title="slot:overwrite-title" :left-options="{backText: ''}">
      <div class="overwrite-title-demo" slot="overwrite-title">
        <Search v-model="keyword"></Search>
      </div>
    </x-header>
    <div class="box-withheader over-auto">
      <div class="search-cont" v-show="keyword" ref="wrapper">
        <ul class="search-ul">
          <li v-for="(item,index) in list" class="search-li" @click="toggles(item)">
            {{item.all}}
          </li>
          <li v-if="list.length == 0" class="err">
            没有找到你要的结果
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {XHeader, Search} from 'vux'
  import {mapState} from 'vuex'
  import {mapMutations} from 'vuex'
  import Bscroll from 'better-scroll'

  export default {
    data() {
      return {
        list: [],
        keyword: '',
        timer: null,
      }
    },
    methods: {
      ...mapMutations([
        'cityCheck',
        'cityHistoryList'
      ]),
      home() {
        this.$router.push({
          path: '/'
        })
      },
      toggles(item) {
        this.cityCheck(item)
        this.cityHistoryList(item)
        this.$router.push({path: '/recom'})
      }
    },
    props: {
      cities: Object
    },
    components: {
      XHeader,
      Search
    },
    watch: {
      keyword() {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          const result = []
          for (let i in this.cities) {
            this.cities[i].forEach((value) => {
              if (value.spell.indexOf(this.keyword) > -1 || value.name.indexOf(this.keyword) > -1) {
                result.push(value)
              }
            })
          }
          this.list = result
        }, 100)
      }
    },
    mounted() {
      this.scroll = new Bscroll(this.$refs.wrapper, {
        click: true,
      })
    },
  }
</script>

<style lang="less" rel="stylesheet/less">
  .vux-header-title-area {
    margin: 0 40px !important;
  }

  .weui-search-bar {
    background: #fff !important;
  }
  .weui-search-bar__box .weui-icon-search{left:0!important}
  .weui-search-bar:before,.weui-search-bar__form:after,.weui-search-bar:after{border-color:transparent!important}
  .weui-search-bar{padding:8px 15px!important}
  .weui-search-bar__form{background-color: transparent!important;}
.vux-search-fixed{position: absolute!important}
  .search-cont {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    background: #fff;
    z-index: 3;
    padding: 0 15px;
    li.err{
      text-align: center;
      padding: 50px 0;
    }
    .search-li {
      line-height: 3;
      color: #000;
      font-size: 14px;
      padding-left: 0;
      border-bottom: 1px solid #ececec;
    }
  }
</style>
