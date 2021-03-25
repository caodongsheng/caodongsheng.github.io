<template>
  <div>
    <x-header :left-options="{backText: ''}">修改用户名<a slot="right" class="color-orange f-16" @click="saveusername">保存</a></x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <group class="group-clearbd bg-ffffff" label-width="4em" label-margin-right="2em" label-align="left">
        <x-input class="f-16" title="用户名" placeholder="请输入用户名" type="text" v-model="username"></x-input>
      </group>
      <!--说明信息-->
      <div class="tipmsg f-14 color-orange">
        <i class="fa fa-exclamation-circle f-16" style="padding-top: 2px"></i>
        <div class="text">
          <p>您只有一次修改用户名的机会哦</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, Group, Cell, XInput} from 'vux'

  export default {
    name: 'set_username',
    components: {XHeader, Group, Cell, XInput},
    data () {
      return {
        username: ''
      }
    },
    created () {
      this.setUsername()
    },
    methods: {
      setUsername () {
        this.username = this.$route.params.username
      },
      saveusername () {
        if (this.username.length >= 20 || this.username.length === 0) {
        //   alert('长度不允许超过10并且不能为空')
            this.showToast('','text','长度不允许超过20并且不能为空','20em','','middle')
        } else {
          let self = this
          this.$http.post('uts/user/updateUsername', {username: self.username})
            .then((res) => {
              this.showToast('', 'text', '修改成功', '20em', '', 'top')
              this.$router.go(-1)
            }).catch(error => {
              if(error.msg)
              this.showToast('', 'text', error.msg, '20em', 'top')
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
