<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topBottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper" style="width: 100%;" @click="Gps">
            <div class="button old">{{citys}}<span>GPS定位</span></div>
          </div>
        </div>
      </div>
      <div class="area clas">
        <div class="title border-topBottom">历史记录</div>
        <div class="button-list">
          <div class="button-wrapper" v-for="(list,index) in cityHistory" @click="toggles(list)">
            <div class="button">{{list.name}}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topBottom">热门城市</div>
        <div class="button-list">
          <div class="button-wrapper" v-for="(list,index) in hotCities" @click="toggles(list)">
            <div class="button">{{list.name}}</div>
          </div>
        </div>
      </div>
      <div class="area" v-for="(item,index) in cities" :ref="index" :key="index">
        <div class="title border-topBottom">{{index}}</div>
        <div class="item-list" v-for="(list,index) in item" @click="toggles(list)">
          <div class="item">{{list.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Bscroll from 'better-scroll'
  import {mapMutations} from 'vuex'
  import {Confirm} from 'vux'
  import {mapState} from 'vuex'
  import getCurrentCityName from '../../getUserLocation'

  export default {
    props: {
      hotCities: Array,
      cities: Object,
      letter: String
    },
    computed: {
      ...mapState([
        'cityHistory',
        'city'
      ]),
    },
    data() {
      return {
        citys: ''
      }
    },
    methods: {
      Gps() {
        let ci = this.citys.split(' ')
        let c = ci[0]
        for (let i in this.cities) {
          let name = this.cities[i]
          for (let k in name) {
            if (c === name[k].name) {
              this.cityCheck(name[k])
              this.cityHistoryList(name[k])
              this.$router.push({path: localStorage.getItem('path')})
            }
          }
        }
      },
      toggles(city) {
        this.cityCheck(city)
        this.cityHistoryList(city)
        this.$router.push({path: localStorage.getItem('path')})
      },
      _getCurrentCityName() {
        getCurrentCityName().then(res => {
          this.citys = `${res.province} ${res.district}`
        })
      },
      ...mapMutations([
        'cityCheck',
        'cityHistoryList'
      ])
    },
    mounted() {
      this._getCurrentCityName()
      this.scroll = new Bscroll(this.$refs.wrapper, {
        click: true,
      })
    },
    watch: {
      letter() {
        if (this.letter) {
          const element = this.$refs[this.letter][0]
          this.scroll.scrollToElement(element, 300)
        }
      }
    },
    components: {
      Confirm
    },
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .list {
    position: absolute;
    left: 0;
    top: 0;
    right: 1.5rem;
    bottom: 0;
    overflow: hidden;

    *{
      box-sizing: border-box;
    }
    .area {
      &.clas {
        border-bottom: 12px solid #f5f5f5;
        .button-list {
          overflow: hidden;
          .button-wrapper {
            float: left;
            width: auto;
          }
        }
      }
      .title {
        padding:10px  12px;
        color: #666;
        font-size: 14px;
        margin: 0;
        border-bottom:1px solid #f6f6f6;
      }
      .button-list {
        overflow: hidden;
        padding: 12px 6px;
        .button-wrapper {
          padding: 5px;
          float: left;
          width: 33.333333%;
          .button {
            margin: 0;
            text-align: center;
            border: 1px solid #eee;
            padding: 5px 10px;
            border-radius: .06rem;
            font-size: 14px;
            &.old {
              border: 0;
              font-size: 16px;
              color: #ffa700;
              span {
                font-size: 13px;
                color: #666;
                padding-left: .5rem;
              }
            }
          }
        }
      }
      .item-list {
        .item {
          margin: 0 .5rem;
          line-height: 3;
          color: #0f0f0f;
          font-size: 14px;
          padding-left: .2rem;
          border-bottom: 1px solid #efefef;
        }
      }
    }
  }
</style>
