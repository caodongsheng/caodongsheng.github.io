<template>
  <div>
    <x-header :left-options="{backText: '',preventGoBack: true}" @on-click-back="backToPre">手机号绑定</x-header>
    <div class="box-withheader over-auto bg-ffffff">
      <div class="form-list">
        <group title="" class="f-16 " label-width="5.5em">
          <x-input title="手机号" placeholder="请输入11位手机号码" v-model="telphone" disabled>
              <!-- 修改手机号按钮先注释 -->
             <router-link slot="right" class="btn-getcode dis-inline bg-orange color-white text-center f-14" to="/CheckOldPhone" @click.native="toBindPhone" replace>{{msg}}</router-link>
          </x-input>
        </group>

      </div>
    </div>
  </div>
</template>


<script>
  import {XHeader, Group, Cell, XInput} from 'vux'

  export default {
    name: "ReBind",
    components: {XHeader, Group, Cell, XInput},
    data() {
      return {
        telphone:"",
        msg: '修改手机号'
      }
    },
    created(){
      this.telphone = this.$store.state.usersetting.mobile;
    //   if(this.telphone == null) {
    //       this.msg = '绑定手机号'
    //   }
    },
    methods: {
        toBindPhone() {
            // if(this.msg == '修改手机号') {
                this.$router.push('/CheckOldPhone');
            // }
            // else if(this.msg == '绑定手机号') {
            //     this.$router.push('/FirstBind');
            // }
        },
        backToPre() {
            this.$router.replace('/setting')
        }
    }
  }
</script>

<style scoped>

  .form-list{padding: 0 }
  .form-list >>> .weui-cells__title {
    font-size: 16px;
    color: #333;
    margin-bottom: 0;
  }
  .form-list >>> .weui-cells
  {margin-top:0}
  .form-list >>> .weui-cells:before {
    border: 0 none;
  }

  .form-list >>> .weui-cells:after {
    left: 15px;
    right: 15px;
  }

  /*cell*/
  .weui-cell, .vux-cell-box >>> .weui-cell {
    padding: 18px 15px
  }

  .weui-cell:before {
    left: 15px;
    right:15px
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
  /*小按钮*/
  .btn-getcode {
    position: absolute;
    right: 15px;
    bottom: 15px;
    padding: 6px 12px;
    border-radius: 30px
  }
</style>

