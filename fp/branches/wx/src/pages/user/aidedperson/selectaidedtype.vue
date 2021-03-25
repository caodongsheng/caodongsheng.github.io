
<template lang="html">
  <div class="" >
    <!-- <header-search title="审核需求" @search="getsearch"></header-search> -->

  <!-- <keep-alive> -->
  <div style="border-bottom:1px solid #e5e5e5;">
    <select-tab ref="selectTab" :datas='selects' @getdatas="getdatas"></select-tab>
  </div>
  <!-- <div style="border-bottom:1px solid #e5e5e5;">
      <select-tab ref="selectTab" :datas='selects2' @getdatas="getdatas"></select-tab>
  </div> -->
  <!-- </keep-alive> -->


  </div>
  </template>

<script>
import selectTab from '@/components/select/selectTab'
export default {
  components: {
    selectTab
  },
  data(){
    return {

      selects:[

        {
          title:'用户类型',
          type:2,
          typefor:2,
          list_index:1,//当前选中item
          list:['全部','贫困户','非贫困户']
        },

        {
          title:'地域',
          type:2,  //是否下拉形式
          typefor:1,  //下拉样式
          ischeckbox:true, // true 多选   false 单选
          list_index:-1, //选中默认值
          demand:1, //0 需求 1 地域
          list:[],  //tree数据，selecthttp.js 加载
        },

      ],

    }
  },
  methods:{
    getdatas(v){

    },
    getsearch(v){

    },
    end(){ //关闭select
      this.$refs.selectTab.end()
    },

  },
  watch:{

  }
}
</script>

<style lang="less">
.header{
  width: 100%;
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid #666;
}
</style>
