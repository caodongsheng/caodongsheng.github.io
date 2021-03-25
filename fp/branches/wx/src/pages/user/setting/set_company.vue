<template>
  <div>
    <x-header :left-options="{backText: ''}">工作单位<a slot="right" class="color-orange f-16">保存</a></x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <group class="group-clearbd bg-ffffff" label-width="4em" label-margin-right="2em" label-align="left">
        <cell title="工作单位" align-items="flex-start" primary="content">
        <x-textarea  placeholder="请输入工作单位"></x-textarea>
        </cell>
      </group>
    </div>
  </div>
</template>


<script>
  import {XHeader, Group, Cell, XTextarea} from 'vux'

  export default {
    name: "set_company",
    components: {XHeader, Group, Cell, XTextarea},
    data() {
      return {

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
  .weui-cell>>> input{color:#999;font-size: 15px}
  /*文本域*/
  .vux-x-textarea {
    padding: 4px 0;
    font-size: 14px
  }
</style>
