<template lang="html">
<div class="ajax-loading">
    <div class=""
        style="position:absolute;top:0px;left:0;width:100%;height:100%;background:#000; opacity:0.3;z-index:99999"
      
      ></div>
      <p
      class="loading"
      style="text-align:center;"
    >
      <inline-loading></inline-loading>
      <span style="color: #999">加载中...</span>
    </p>
</div>
</template>
<script>
import {
  InlineLoading
} from "vux";
export default {
  components: {
      InlineLoading
  },
    data(){
        return {
       
        }
    }, 
   


}
</script>
<style  lang="less" scoped>
@import "../../less/base.less";
.loading {
  width: 100px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  .weui-loading {
    width: 50px;
    height: 50px;
  }
}
</style>


