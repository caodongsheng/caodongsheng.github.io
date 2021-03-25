
<template lang="html">
    <div class="" >
        <!-- <header-search title="审核需求" @search="getsearch"></header-search> -->
        <div class="header" @click="end">
            title
        </div>
        <!-- <keep-alive> -->
        <div class="">

        </div>
        <div style="position:relative;width:100%;">
            <div class="" @click="end2">
                <select-tab ref="selectTab" :datas='selects' @getdatas="getdatas" style="border-bottom:1px solid #e5e5e5; float:left;width:50%" ></select-tab>
            </div>
            <div class="" @click="end">
                <select-tab ref="selectTab2" :datas='selects2' @getdatas="getdatass" style="border-bottom:1px solid #e5e5e5; float:left;width:50%;" ></select-tab>
            </div>

        </div>

        <!-- </keep-alive> -->


    </div>
</template>

<script>
import selectTab from '@/components/select/selectTab'
export default {
  components: {
    selectTab,
  },
  data(){
      return {

          selects:[
              // {
              //     title:'本人审核',
              //     type:1, // tab类型
              //     active:true,//是否选中
              // },

              {
                  title:'状态',
                  type:2,
                  typefor:3,
                  list_index:0,
                  list:[],
              },
              {
                  title:'需求类型',
                  type:2,  //是否下拉形式
                  typefor:1,  //下拉样式
                  ischeckbox:false, // true 多选   false 单选
                  list_index:-1, //选中默认值
                  demand:0, //0 需求 1 地域
                  parmas_id:448071783933804544,
                  list:[],  //tree数据，selecthttp.js 加载
              },

          ],
          selects2:[
              {
                  title:'用户类型',
                  type:2,
                  typefor:2,
                  list_index:0,//当前选中item
                  list:['全部','贫困户','非贫困户']
              },
              {
                  title:'地域',
                  type:2,  //是否下拉形式
                  typefor:1,  //下拉样式
                  ischeckbox:false, // true 多选   false 单选
                  list_index:-1, //选中默认值
                  demand:1, //0 需求 1 地域
                  list:[],  //tree数据，selecthttp.js 加载
              },

          ],

      }
  },
  methods:{
      getdatas(v){
          console.log(v)
      },
      getdatass(v){
          console.log('vvvv',v)
      },
      getsearch(v){
          // console.log(v)
      },
      end(){ //关闭select
          this.$refs.selectTab.end()
      },
      end2(){ //关闭select
          console.log(2222)
          this.$refs.selectTab2.end()
      },

  },
  watch:{
    //   selects:{
    //     handler: function (val, oldVal){
    //           // console.log('***********',val);
    //           for(let i=0;i<this.selects.length;i++){
    //               if(this.selects[i].type==2){//下拉形式
    //                   console.log(this.selects[i].list[this.selects[i].list_index])
    //               }else{
    //
    //               }
    //
    //           }
    //     },
    //     deep: true
    // }
    },
    mounted(){
        this.$https.get('https://www.zgshfp.com.cn/support/interfaces/user/getUserInfo.action?token=2d7fed8d044e695b9e4768a79957638ae79b635871de488c03b5978b47d10d07651549b62aee559df06d7e9b640dce03a106ff8da37303a8ffa8303234e5cf0ded7281bdccfb607061&user_id=4476887')
		  .then(function (response) {
		    console.log(response);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
          console.log('/////////////////////',this.$children)
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
