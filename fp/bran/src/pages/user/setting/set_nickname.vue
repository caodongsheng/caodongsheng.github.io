<template>
  <div>
    <x-header :left-options="{backText: ''}">修改昵称<a slot="right" class="color-orange f-16" @click="savenickname">保存</a></x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <group class="group-clearbd bg-ffffff" label-width="4em" label-margin-right="2em" label-align="left">
        <x-input class="f-16" title="昵称" placeholder="请输入昵称" type="text" v-model="nickname"  :is-type="checkNickfun"
          :min="2"
          :max="20"
          :required="true"></x-input>
      </group>
    </div>
  </div>
</template>


<script>
  import {XHeader, Group, Cell, XInput} from 'vux'
import {checkNickStr} from '@/util/validFun.js';

  export default {
    name: "set_nickname",
    components: {XHeader, Group, Cell, XInput},
    data() {
      return {
        nickname:"",
        nickfail:true
      }
    },
    created(){
      this.setNickname()
    },
   watch:{
        nickname(nval){
           var ranges = [

            '\ud83c[\udf00-\udfff]',

            '\ud83d[\udc00-\ude4f]',

            '\ud83d[\ude80-\udeff]'

        ];
        this.$nextTick(() => {
        this.nickname = nval .replace(new RegExp(ranges.join('|'), 'g'), '');

        })
        }
   },
    methods:{
      setNickname(){
        if(this.$route.params.nickname != 'null'){
            this.nickname = this.$route.params.nickname;
        }else{

        }

      },
         checkNickfun(value) {
          let validobj = checkNickStr(value,2,20,"昵称")
        if(!validobj.valid){
            this.nickfail = true
            
        }
        else{
           this.nickfail = false
        }
        return validobj
    },
      savenickname(){
        let self = this
        //let nickok = this.checkNick();
        if(this.nickfail){
         let msg =  checkNickStr(this.nickname,2,20,"昵称").msg
           self.showToast('','text',msg,'20em','','middle');
           return false;
        }
        else{
        this.$http.post('uts/user/updateNickname',{nick_name:self.nickname})
          .then(function (response) {
              window.localStorage.setItem('nick_name', self.nickname);
              self.$store.state.user.nick_name = self.nickname;
              self.$store.state.usersetting.nick_name = self.nickname;
              self.showToast('','text','昵称修改成功','20em','','middle');
               self.$router.history.go(-1);
          }).
          catch(e=>{
            if(e.msg){
               self.showToast('','text',e.msg,'20em','','middle');
            }
          })
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
  .weui-cell>>> input{color:#999;font-size: 15px}

  /*底部提示信息*/

  .tipmsg{
    padding: 15px;
    display: flex
  }
  .tipmsg  .text{
    flex: 1;
    padding-left: 8px}
  .tipmsg  .text p{margin-bottom:6px}
</style>
