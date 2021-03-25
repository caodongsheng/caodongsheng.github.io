<template>
  <div>
    <x-header :left-options="{backText: ''}">系统设置</x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <group class="group-clearbd bg-ffffff"  label-align="left">
        <cell class="f-16" title="版本信息">
          <span class="color-999">{{version}}</span>
        </cell>
        <!--<cell class="f-16" title="清除缓存" is-link>-->
          <!--<span class="color-999">45.9M</span>-->
        <!--</cell>-->
      </group>
    </div>
  </div>
</template>


<script>
  import {XHeader, Group, Cell} from 'vux'

  export default {
    name: "set_system",
    components: {XHeader, Group, Cell},
    data() {
      return {


      }
    },
    computed: {
      version:function(){
        if(window.api){
          return api.appVersion
        }
      }
    }

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
    padding: 14px 15px
  }

  .weui-cell:before {
    left: 0
  }

  .weui-cell >>> input {
    color: #999;
    font-size: 15px
  }

  .weui-cell >>> .weui-cell__ft {
    font-size: 14px;
    padding-right: 0
  }

  .weui-cell.vux-tap-active >>> .weui-cell__ft {
    padding-right: 18px
  }

  .weui-cell_access >>> .weui-cell__ft:after {
    margin-top: -3px
  }

</style>
