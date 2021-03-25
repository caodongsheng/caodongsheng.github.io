<template>
  <div>
    <x-header :left-options="{backText: ''}">
      修改密码
      <a slot="right" class="color-orange f-16" @click="saveNewP">保存</a>
    </x-header>
    <div class="box-withheader over-auto bg-ffffff">
      <div class="form-list">
        <group title class="f-16" label-width="5.5em">
          <x-input
            title="旧密码"
            placeholder="请输入旧密码"
            v-model="oldpassword"
            required
            type="password"
            @on-blur="issame"
          >
            <span slot="right" style="color:red" v-if="state==1">旧密码不对！</span>
          </x-input>
          <x-input
            title="新密码"
            placeholder="请输入新密码"
            v-model="newpassword"
            :min="8"
            :max="20"
            @on-blur="makeusre"
            :required="true"
            type="password"
          >
            <span slot="right" style="color:red" v-if="state==3">新旧密码一致！</span>
          </x-input>
          <x-input
            title="确认新密码"
            placeholder="确认新密码"
            v-model="surepassword"
            :min="8"
            :max="20"
            :required="true"
            @on-blur="makeusre"
            type="password"
          ></x-input>
        </group>
      </div>
    </div>
  </div>
</template>


<script>
import { XHeader, Group, Cell, XInput } from "vux";
import {checkpasswordStr} from '@/util/validFun.js';

export default {
  name: "set_password",
  components: { XHeader, Group, Cell, XInput },
  data() {
    return {
      state: "",
      oldpassword: "",
      newpassword: "",
      surepassword: "",
      passwordfail: true
    };
  },
  methods: {
    saveNewP() {
      // let regPass = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/
      // var flagPass = regPass.test(this.newpassword)
      if (
        this.newpassword.replace(/(^\s*)|(\s*$)/g, "") == "" ||
        this.oldpassword.replace(/(^\s*)|(\s*$)/g, "") == "" ||
        this.surepassword.replace(/(^\s*)|(\s*$)/g, "") == ""
      ) {
        this.showToast(
          "",
          "text",
          "请确保输入完成后再保存",
          "20em",
          "",
          "middle"
        );
        return false;
      }
      // else if (this.newpassword.length < 8 || this.oldpassword.length < 8) {
      //   this.showToast('', 'text', '密码长度不小于8位', '20em', '', 'middle')
      // }
       if (this.passwordfail) {
         debugger
        let msg = checkpasswordStr(this.newpassword, 8, 20, "新密码").msg;
        this.showToast('', 'text', msg, '20em', '', 'middle')
        return false;
      }
      if (this.newpassword !== this.surepassword) {
        this.showToast(
          "",
          "text",
          "确认密码与新密码不一致",
          "20em",
          "",
          "middle"
        );
        return false;
      }
     
      let self = this;
      this.$http
        .post("uts/user/changePass", {
          oldPass: this.oldpassword,
          pass: this.newpassword,
          rePass: this.surepassword
        })
        .then(function(response) {
          self.showToast("", "text", "密码修改成功", "", "", "middle");
          self.state = 0;
          self.$router.push("/login");
        })
        // else{
        //  self.state = 1;
        // }

        .catch(function(error) {
          if (error.code == "10001") {
            self.state = 1;
          }
          if (error.msg)
            self.showToast("", "text", error.msg, "20em", "", "middle");
        });
    },
    issame() {
      if (this.newpassword == this.oldpassword) {
        this.state = 3;
      } else {
        this.state = "";
      }
    },
    makeusre() {
        let validobj = checkpasswordStr(this.newpassword, 8, 20, "新密码");
        if (!validobj.valid) {
          this.passwordfail = true;

          this.showToast("", "text", validobj.msg, "20em", "", "middle");
          return;
        } else {
          this.passwordfail = false;
        }
        if(!this.passwordfail){
      if (this.newpassword != this.surepassword) {
        this.state = 2;
      } else if (this.newpassword == this.oldpassword) {
        this.state = 3;
      } else {
        // if (this.newpassword.length < 8) {
        //   this.showToast('', 'text', '密码长度不小于8位', '20em', '', 'middle')
        //   return
        // }
        // let regPass = /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/
        // let flagPass = regPass.test(this.newpassword)
        // if (!flagPass) {
        //   this.showToast('', 'text', '密码必须为字母加数字且长度不小于8位', '20em', '', 'middle')
        // }
     
        this.state = "";
      }
        }
    }
  }
};
</script>

<style scoped>
.form-list {
  padding: 0;
}
.form-list >>> .weui-cells__title {
  font-size: 16px;
  color: #333;
  margin-bottom: 0;
}
.form-list >>> .weui-cells {
  margin-top: 0;
}
.form-list >>> .weui-cells:before {
  border: 0 none;
}

.form-list >>> .weui-cells:after {
  left: 15px;
  right: 15px;
}

/*cell*/
.weui-cell,
.vux-cell-box >>> .weui-cell {
  padding: 18px 15px;
}

.weui-cell:before {
  left: 15px;
  right: 15px;
}

.weui-cell >>> input {
  color: #999;
  font-size: 15px;
}

.weui-cell >>> .weui-cell__ft {
  font-size: 14px;
  padding-right: 0;
}

.weui-cell.vux-tap-active >>> .weui-cell__ft {
  padding-right: 18px;
}

.weui-cell_access >>> .weui-cell__ft:after {
  margin-top: -3px;
}
</style>

