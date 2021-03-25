<template>
  <!--扶贫干部管理入口  -->
  <div class="helpManage">
    <headerBackPre :headerTitle='headerTitle' :routePath="routepath"></headerBackPre>
    <div class="colorBlock"></div>
    <div>
      <group class="group-clearbd bg-ffffff"  label-margin-right="2em" label-align="left">
        <!-- <cell title="扶贫干部审核" value="" link="/leaderManage" is-link ref = "cvs" v-show="leadLevel == 5 ? false : true">{{this.data}}</cell> -->
        <cell title="扶贫干部查询" value="" link="/leaderSearch" is-link></cell>
      </group>
    </div>
  </div>
</template>
<script>
  import headerBackPre from '../../../components/header/headerBackPre'
  import {Group, Cell} from 'vux'
  export default {
    components: {
      headerBackPre,
      Group,
      Cell

    },
    data() {
      return {
        headerTitle: '扶贫干部管理',
        data: null,
        routepath: 'homeWork',
        leadLevel: this.G('leaderLevel')
      }
    },
    created() {
      this.$http.post("hts/management/num")
        .then(res => {
          this.data = res.data;

        }).catch(err =>{
          if(!err.data){
            this.data = 0;
          }
        })
    },
  }
</script>
<style scoped>
  /*group去掉边线*/

  .group-clearbd >>> .weui-cells {
    margin-top: 0;
    background: transparent;
  }

  .group-clearbd >>> .weui-cells:before, .group-clearbd >>> .weui-cells:after {
    border: 0 none
  }

  .group-clearbd >>> .weui-cells {
    margin-top: 12px
  }

  .weui-cell, .vux-cell-box >>> .weui-cell {
    padding: 14px 15px;
    font-size: 15px;
  }

  .weui-cell:before {
    left: 0
  }
  .weui-cell>>> input{color:#999;font-size: 15px}

  .helpManage{
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;
  }
  .colorBlock{
    width: 100%;
    height: 3px;
  }

</style>


