<template>
  <div>
    <x-header :left-options="{backText: ''}">
      我的受助人
    </x-header>
    <div class="box-withheader over-auto bg-f6f5f6 ">
      <!--搜索框-->
      <div class="search-white" style="padding: 12px 15px">
        <x-input title="" placeholder="搜索" v-model.trim="input"  >
          <i slot="label" class="fa fa-search" aria-hidden="true"></i>
        </x-input>
      </div>

      <div class="aid-infoarea">
      <select-tab ref="selectTab" :datas="selects" @getdatas="getdatas"></select-tab>
     </div>
    <!--用户列表-->
      <div class="personlist over-auto xin-widget-citys">
        <!--分组-->
        <div class="list-group ">
          <dl>
            <template v-for="(item, index) in letterList">
              <dt v-if="isNaN(index)" style="padding-left: 0.8rem">
                {{index}}
              </dt>
              <template v-for="(item2, key) in item">
                <dd @click="_chooseOne(item2)" class="list-item bg-ffffff">
                  <personitem :personicon="item2.user_pic" :personname="item2.aided_person_name"
                              :personphone="item2.aided_person_tel" :personaddress="item2.region_name"
                              :user_type="item2.user_type">
                  </personitem>
                </dd>
              </template>
            </template>
          </dl>
        </div>
      </div>
      <div class="xin-widget-citys-searchlist" v-if="input !== ''">
        <ul v-if="searchList.length!==0">
          <li v-for="item in searchList" @click="_chooseOne(item)" style="padding:15px" class="list-item bg-ffffff">
            <personitem :personicon="item.user_pic" :personname="item.aided_person_name"
                        :personphone="item.aided_person_tel" :personaddress="item.region_name"
                        :user_type="item.user_type"></personitem>
          </li>
        </ul>
        <div v-else="" class="nomatch">
          没有找到匹配的受助人
        </div>
      </div>
    </div>
    <div class="xin-widget-citys-letnav" v-if="input == ''" @touchmove="_touchLetters">
      <ul>
        <template v-for="(item, index) in letterList">
          <li @click="_chooseLetter" data-type="letter" style="font-size: 0.8rem;">{{index}}</li>
        </template>
      </ul>
    </div>
  </div>
</template>
<script>
  import selectTab from '@/components/select/selectTab'
  import {XHeader, Flexbox, FlexboxItem, XInput, Badge} from 'vux'
  import personitem from './personitem'

  export default {
    name: 'aidperson_test',
    components: {
      selectTab,
      XHeader,
      Flexbox,
      FlexboxItem,
      XInput,
      Badge,
      personitem
    },
    props: {
      personData: {
        type: Array
      },
      onChoose: {
        type: Function
      },
      initCity: {
        type: Function,
        default: null
      },
      /**
       * call back when click cancel button
       */
      close: {
        type: Function
      }
    },

    data() {
      return {
        selects: [

          {
            title: '用户类型',
            type: 2,
            typefor: 2,
            list_index: 0, // 当前选中item
            list: ['全部', '贫困户', '个人']
          },

          {
            title: '地域',
            type: 2,  // 是否下拉形式
            typefor: 1,  // 下拉样式
            ischeckbox: true, // true 多选   false 单选
            list_index: -1, // 选中默认值
            demand: 1, // 0 需求 1 地域
            list: []  // tree数据，selecthttp.js 加载
          }
        ],
        input: '',
        list: '',
        targetLetter: '',
        searchList: [], // 搜索结果
        hotList: [],
        letterList: [],
        result: '',
        defaultTrigger: true
      }
    },
    watch: {
      personData: function (val,oldval) {
        if (val) {
          this._formatCityList(val)
        }
      },
      input: function (val) {
          this.$nextTick(() => {
        this.input = val.replace(/[^u4e00-u9fa5w]/g,'')
          });
        this._search()
      },
      targetLetter: function () {
        this._scrollView()
      }
    },
    activate: function (done) {
      let _this = this
      done()
      if (this.personData && this.personData.length > 0) {
        this._formatCityList(this.personData)
      }
    },
    methods: {
       valideContent(){
      let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
      this.input = this.input.replace(pattern, ''); 
    },
      getdatas(v) {
        let usertype = v[0]
        let postdata = {}
        if (usertype === '全部') {
          postdata.userType=''
        } else if (usertype === '个人') {
          postdata.userType = 0
        } else {
          postdata.userType = 1
        }
        if (v[1] instanceof Array) {
          let arr = []
          for (let j = 0; j < v[1].length; j++) {
            arr.push(v[1][j].id)
          }
          postdata.countys = arr
        } else {
          let arr = []
          if (v[1].id !== '0000') {
            arr.push(v[1].id)
          }
          postdata.countys = arr
        }

        this.$refs.selectTab.datas[0].title = v[0];
        this.$emit('postsearchdata', postdata)
      },
      show () {
        // this.isShow = true;
      },
      hide () {
        // this.isShow = false;
        this.input = ''
        this.searchList = []
        this.close && this.close()
      },
      _chooseDefault () {
        let _this = this
        let arr = this.list.filter(function (item) {
          return _this.localCity.id === item.id
        })
        if (arr.length > 0) {
          _this._chooseOne(arr[0])
        } else {
          _this._chooseOne(this.list[0])
        }
      },
      /**
       * 点击字母
       */
      _chooseLetter (e) {
        let symbol = e.target.getAttribute('data-type')
        this.targetLetter = e.target.innerText
      },
      /**
       * slide letters list
       */
      _touchLetters: function (e) {
        e.preventDefault()

        let ol = document.querySelector('.xin-widget-citys-letnav ul'),
          liNum = document.querySelectorAll('.xin-widget-citys-letnav li').length,
          olHei = ol.clientHeight, // ol height
          liHei = Math.round(olHei / liNum), // li height
          olTop = ol.offsetTop + ol.offsetParent.offsetTop,
          olBot = olTop + olHei,
          touchY = e.touches[0].pageY,
          $wrapper = document.querySelector('.xin-widget-citys')

        switch (e.type) {
          case 'touchstart':
            if (touchY < olTop) {
              // 回顶
              $wrapper.scrollTop = 0
            } else if (touchY > olBot) {
              // 到底
              $wrapper.scrollTop = 10000
            }
            break
          case 'touchmove':
            if (touchY < olBot && touchY > olTop) {
              let olTouchY = touchY - olTop,
                targetIndex = Math.ceil(olTouchY / liHei),
                target = document.querySelectorAll('.xin-widget-citys-letnav li')[targetIndex - 1]
              this.targetLetter = target.innerText
            } else if (touchY <= olTop) {
              // 回顶
              $wrapper.scrollTop = 0
            } else {
              // 到底
              $wrapper.scrollTop = 10000
            }
            break
        }
      },
      /**
       * 滚动可视区 - Triggered by '_chooseLetter'
       */
      _scrollView () {
        let dtList = document.querySelectorAll('.list-group dt'),
          _this = this,
          _dtList = Array.prototype.slice.call(dtList)

        if (_dtList) {
          _dtList.forEach((value, index, array) => {
            if (value.innerText === _this.targetLetter) {
              let wrapper = document.querySelector('.xin-widget-citys')
              let scrollTop = document.querySelector('.list-group').offsetTop + value.offsetTop

              wrapper.scrollTop = scrollTop

              return false
            }
          })
        }
      },
      /**
       * search city
       */
      _search () {
        
        let reg = new RegExp(this.input === '' ? 'xxyy'
          : this.input, 'ig')

        let _arr = []
        for (let i in this.letterList) {
          for (let j = 0; j < this.letterList[i].length; j++) {
            if (
              reg.test(this.letterList[i][j][
                'aided_person_name'
                ]) ||
              reg.test(this.letterList[i][j][
                'personFirstLetter'
                ]) ||
              reg.test(this.letterList[i][j][
                'personSpell'
                ])
            ) {
              _arr.push(this.letterList[i][j])
            }
          }
        }
        this.searchList = _arr
      },
      /**
       * format data of city
       * @param  {[Array]} arr [cityList]
       */
      _formatCityList (arr) {
        let letterArr = {}

        if (this.simple) {
          for (let i = 0; i < arr.length; i++) {
            letterArr[i] = []
            letterArr[i].push(arr[i])
          }
        } else {
          for (let i = 0; i < arr.length; i++) {
            if (!(arr[i]['personFirstLetter'] in letterArr)) {
              letterArr[arr[i]['personFirstLetter']] = []
              letterArr[arr[i]['personFirstLetter']].push(arr[i])
            } else {
              letterArr[arr[i]['personFirstLetter']].push(arr[i])
            }
          }
        }
        this.letterList = letterArr
      },
      _chooseOne (obj) {
        this.onChoose && this.onChoose(obj)
        // this.hide();
      }
    }
  }
</script>

<style scoped>
  /*搜索框*/
  .search-white >>> .weui-cell {
    border-radius: 5px
  }

  /*搜索结果数}量和筛选*/
  .aid-infoarea {
    position: relative;
    padding: 5px 0;
    background: #fff;
    border-bottom: 1px solid #eee;
  }

  .select_tab {
    justify-content: flex-end
  }

  .select_tab >>>.opac {
    top: 41px !important
  }

  .select_tab >>> .item {
    flex: 0 0 25% !important;
    font-size: 14px !important
  }

  .ser-resnum {
    position: absolute;
    left: 15px;
    top: 13px;
    z-index: 9999
  }

  /*用户列表*/
  .personlist {
    position: absolute;
    top: 110px;
    bottom: 0;
    left: 0;
    right: 0
  }

  .xin-widget-citys-searchlist {
    position: absolute;
    top: 60px;
    width: 100%;
    bottom: 0;
    z-index: 10001;
    background: #fff;
    overflow: auto;
  }
  .nomatch {
    line-height: 0.5rem;
    text-align: center;
    font-size: 0.14rem;
    color: #aaa;
  }


  .xin-widget-citys-letnav {
    position: fixed;
    right: 0;
    bottom: 0;
    top: 7.18rem;
    padding-right: 0.26rem;
    z-index: 999;
    display: -webkit-box;
    -webkit-box-align: center;
  }
  section {
    -webkit-box-flex: 1.0;
  }

  .personlist * {
    box-sizing: border-box
  }

  .vux-badge {
    box-sizing: content-box;
    margin-left: 5px;
    margin-top: 4px
  }

  .list-group .list-letter {
    padding: 2px 15px
  }

  .list-item {
    padding: 12px 40px 12px 15px;
    border-bottom: 1px solid #eee
  }

  .list-item:last-child {
    border-width: 0
  }

  .list-item p {
    padding-top: 6px
  }
</style>
