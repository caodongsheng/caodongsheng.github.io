<template>
  <div class="box">
    <x-header :left-options="{backText: ''}">
      填写不通过原因
      <a slot="right" @click="btn6" class="color-orange f-16">提交</a>
    </x-header>
    <div class="box-withheader over-auto">
      <group class="group-clearbd mt-12">
        <x-textarea
          class="f-14"
          :height="300"
          :class="getClass"
          :min="5" 
          :max="500"
          placeholder="请填写不通过的原因"
          @on-blur="changevx"
          v-model="nopassreason"
      
        ></x-textarea>
      </group>
    </div>
  </div>
</template>
<script>
import { XHeader, Timeline, TimelineItem, XTextarea, Group, XInput } from "vux";
import {checkDesc} from '@/util/validFun.js';

export default {
  components: { XHeader, Timeline, TimelineItem, XTextarea, Group, XInput },
  name: "notpass",
  data() {
    return {
      nopassreason: ""
    };
  },
      watch: {
       nopassreason(val) {
        this.$nextTick(() => {
          let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
          this.nopassreason = val.replace(pattern, ''); 
       
        })
      }

    },
  computed:{
 getClass(){
      if(this.nopassreason.replace(/(^\s*)|(\s*$)/g, "").length<5){
        return "redfont"
      }
      else{
        return ""
      }
    }
  },
  methods: {
    changevx() {
      setTimeout(() => {
        const scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
    },
    valideContent() {
      let pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/;
      this.nopassreason = this.nopassreason.replace(pattern, "");
    },
    btn6() {
      let obj = checkDesc(this.nopassreason, 5, 500, "不通过原因内容");
      if (!obj.valid) {
        this.showToast("", "text", obj.msg);
        return;
      } else {
        if (!/[^\x00-\xff]{5,500}$/.test( this.nopassreason.replace(/(^\s*)|(\s*$)/g, ""))) {
          
            this.showToast("", "text", "不通过原因输入有误，必须是中文字符");
            return;
          
        }
      }

      this.$http
        .post("hts/management/isPass", {
          id: this.$route.params.id,
          isCheck: 0,
          opinion: this.nopassreason.replace(/(^\s*)|(\s*$)/g, "")
        })
        .then(res => {
          if (res.msg == "请求成功") {
            this.$router.push("/waitCheckDemand");
          }
        });
    }
  }
};
</script>
<style scoped>
.box {
  width: 100%;
  height: 100%;
  background: #eee;
}
/*清除group默认边线及边距*/
.group-clearbd >>> .weui-cells {
  margin-top: 0;
}

.group-clearbd >>> .weui-cells:before,
.group-clearbd >>> .weui-cells:after {
  border: 0 none;
}
.redfont >>> span{
  color:#ff0000;
}
.vux-x-textarea >>> .weui-textarea-counter {
  font-size: 14px;
}
</style>
