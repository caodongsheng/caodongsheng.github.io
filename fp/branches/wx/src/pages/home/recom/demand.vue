<template>
  <div class="bg-f6f5f6">
    <div class="tabdiv">
      <selectTab ref="selectTab" :datas='selects' @getdatas="getdatas"></selectTab>
      <selectTab ref="selectTab" :datas='selects2' @getdatas="getdatas"></selectTab>
    </div>
    <scrolltemplate :infinitefun="infinitefun" :end="end" :refreshfun="refreshfun" ref="myscroller" style="padding-top: 39px"  class="bg-f6f5f6">
      <recommand  :item="item1" :type="item1.re_template" v-for="(item1,index) in demandlist" :key="index" ></recommand>
    </scrolltemplate>
  </div>
</template>
<script>
  import recommand from '@/components/recommand/recommand'
  import selectTab from '@/components/select/selectTab'
  import scrolltemplate from '@/components/scroll/scrollcomponent'
  import { mapState } from 'vuex'

  export default {
    components: {
      selectTab,
      recommand,
      scrolltemplate

    },
    data () {
      return {
        help_type_code: '',
        page: 1,
        end: false,
        demandlist: [],
        selects: [
          {
            title: '综合排序',
            type: 2,
            typefor: 2,
            list_index: 1, // 当前选中item
            list: ['综合排序', '即将完成']
          },
          {
            title: '分类',
            type: 2,  // 是否下拉形式
            typefor: 1,  // 下拉样式
            ischeckbox: false, // true 多选   false 单选
            list_index: -1, // 选中默认值
            demand: 0, // 0 需求 1 地域
            parmas_id:1,
            list: []  // tree数据，selecthttp.js 加载
          }

        ],
        selects2: [
          {
            title: '地域',
            type: 2,  // 是否下拉形式
            typefor: 1,  // 下拉样式
            ischeckbox: false, // true 多选   false 单选
            list_index: -1, // 选中默认值
            demand: 1, // 0 需求 1 地域
            parmas_id:'',
            list: []  // tree数据，selecthttp.js 加载
          }

        ],

      }
    },
    methods: {
      getdatas (aaa) {

      },
      getdemandlist (data, callback) {;
        if (data.vos.length < 10) {
          this.end = true
        } else {
          this.end = false
        }
        let arr = data.vos
        for (let j = 0; j < arr.length; j++) {
          this.demandlist.push(arr[j])
        }
        if (callback) callback()
      },

      infinitefun (callback) {
        if (!this.end) {
          this.page++
          this.getDemands(callback)
        }
      },

      refreshfun(){
        this.page = 1;
        this.demandlist = [];
        this.getDemands()
      },
      getDemands (callback) {
        let self = this
        this.$http.post('hts/help/allDemandByRegex', {
          'page': this.page,
          'pagesize':10,
          'help_type_code': this.help_type_code,
          'region_id':this.

        })
          .then(function (response) {
            if (typeof response.data === 'object') {
              self.getdemandlist(response.data, callback)
            } else {
              alert(response.msg)
            }
          })
      }
    },
    computed: {
      ...mapState(['city']),
    },
    created () {
      this.page = 1
      this.demandlist = []
      this.help_type_code = this.$route.params.id
      this.getDemands()
    },
    watch: {
      '$route' (to, from) {
        this.page = 1
        this.demandlist = []
        this.help_type_code = to.params.id;
        this.getDemands();
      }
    },
  }
</script>

<style scoped>
  .tabdiv{
    width: 100%;
    display: flex;
  }
</style>
