<template>
  <div>
    <x-header :left-options="{backText: ''}">第三方账号</x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <group class="group-clearbd bg-ffffff" label-width="4em" label-margin-right="2em" label-align="left">
        <cell   class="f-16" :title="item.title" v-for="(item,index) in thirdaccounts" :key="index">
          <i slot="icon" :class="item.class" class="iconfont  f-16 color-white  bd-radius-cir" style="padding: 5px;margin-right:10px"></i>
         <template v-if="isBinded(item.type)">
           <div>
             <badge text="已绑定" style="margin-right: 10px;line-height: 22px;height:22px;border-radius: 22px;"></badge>
           <!-- <router-link to="" class="btmopebtn f-16 text-center color-999"  @click.native="unbindtypeOf(item.type)">{{isBind}}</router-link> -->
           </div>
         </template>
          <template v-else>
            <span class="color-999 f-16" @click="bindTypeof(item.type)">绑定</span>
          </template>
        </cell>
      </group>
    </div>
     <div v-transfer-dom>
      <confirm
        v-model="showconfirmPhone"
        title
        confirm-text="确定"
        cancel-text="取消"
        @on-confirm="onConfirmPhone()"
        @on-cancel
      >
        <p style="text-align:center;">请先绑定手机号！</p>
      </confirm>
    </div>
    <div v-transfer-dom>
      <confirm v-model="show"
               title="操作提示"
               @on-cancel="onCancel"
               @on-confirm="onConfirm"
               @on-show="onShow"
               @on-hide="onHide">
        <p style="text-align:center;">确定解绑</p>
      </confirm>
    </div>
  </div>
</template>


<script>
  import {XHeader, Group, Cell, XInput, Confirm, TransferDomDirective as TransferDom, Badge} from 'vux'

  export default {
    name: 'set_thirdaccounts',
      inject:['reload'],
    components: {XHeader, Group, Cell, XInput, Confirm, Badge},
    directives: {
      TransferDom
    },
    data () {
      return {
        unbindtype: '',
        bind: false,
        show: false,
        showconfirmPhone:false,
        // isBind: '解绑',
        bindedtypes: [],
        type: '',
        ishtml5:true,
        thirdaccounts: [{type: 4, title: '微信', class: 'icon-f-weixin bg-green'}, {type: 5, title: '微博', class: 'icon-f-weibo bg-red'}]
      }
    },
    computed: {

    },
    created () {
      this.getBindedTypes()
      this.getUserBindingInfo()
  },
  mounted() {
    if (window.api != undefined) {
      this.ishtml5 = false
    }
    // 将thirdLogin方法绑定到window下面，提供给外部调用
    window['thirdDo'] = (type) => {
      this.thirdBinding(window.userID, type)
    }
  },

    methods: {
          onConfirmPhone() {
          this.$router.push('/FirstBind')
      },
      getBindedTypes () {
        // this.bindedtypes=[{type:"weibo",title:"微博"}];
        // this.bindedtypes=[{type:"weixin",title:"微信"}];
      },
      //获取用户账号是否绑定第三方账号
      getUserBindingInfo() {
          this.$http.post('uts/user/getBound')
            .then(res => {
                console.log(res)
                if(res.data.length > 0) {
                    res.data.forEach((item) => {
                        if(item.third_type === 4) {
                            this.bindedtypes.push(this.thirdaccounts[0])
                        }
                         if(item.third_type === 5) {
                            this.bindedtypes.push(this.thirdaccounts[1])
                        }
                    })
                }
            })
      },
      //第三方账号绑定
      thirdBinding(openId,type) {
          let self = this;
          let postdata = {}
          postdata.token = this.G('token')
          if(type == 4) {
              postdata.thirdCode = openId
              postdata.type = type
          }else {
              postdata.thirdCode = openId
              postdata.type = type
          }
          this.$http.post('uts/user/thirdBinding',postdata)
            .then(res => {
                let code = res.code.substring(res.code.length - 5);
                if(code=="I0000"){
                this.showToast('','text','绑定成功','20em','','middle');
                if(type == 4) {
                    this.bindedtypes.push(this.thirdaccounts[0])
                }
                if(type == 5) {
                    this.bindedtypes.push(this.thirdaccounts[1])
                }
                 self.reload()                
                }
                else if(code=="T0001"){
                   this.showToast('','text','该第三方账号已绑定其他手机号','20em','','middle');
                }
                else{
                     this.showToast('','text',"绑定失败",'20em','','middle')
                }

            })
            .catch(err => {
                if(err.msg)
                this.showToast('','text',err.msg,'20em','','middle')
            })
      },
      unbindtypeOf (type) {
        this.unbindtype = type
        this.show = true
      },
      bindTypeof (type) {
        if (this.$store.state.user.mobile == null) {
          this.showconfirmPhone = true;
          return;
        } 
          //type为4时微信绑定
        if(type === 4) {
            let _this = this;
            if(!this.ishtml5) {
                let wx = api.require('wx')
                wx.isInstalled(function(ret, err) {
                    if (!ret.installed) {
                        alert('当前设备未安装微信客户端')
                    } else {
                        wx.auth(
                            // { apiKey: 'wxae8803ed717eb1af', scope: 'snsapi_userinfo' },
                             function(ret, err) {
                            if(ret.status) {
                                wx.getToken(
                                    {
                                        // apiKey: 'wxae8803ed717eb1af',
                                        // apiSecret: 'c2298473b5a3f0dd1988253c9fdf5ed6',
                                        code: ret.code
                                    },
                                    function(ret, err) {
                                        if (ret.status) {
                                            api.showProgress({
                                                style: 'default',
                                                animationType: 'fade',
                                                title: '授权成功',
                                                text: '绑定处理中...',
                                                modal: true
                                            })
                                            let loginParam = {}
                                            loginParam.accessToken = ret.accessToken
                                            loginParam.refreshToken = ret.dynamicToken
                                            wx.getUserInfo(
                                                {
                                                    accessToken: ret.accessToken,
                                                    openId: ret.openId
                                                },
                                                function(ret, err) {
                                                    loginParam.openId = ret.unionid
                                                    if (ret.status) {
                                                        // 实现绑定动作
                                                        // _this.thirdLogin(loginParam, '4')

                                                        _this.thirdBinding(ret.unionid,'4')

                                                        api.hideProgress()
                                                    }
                                                }
                                            )
                                        }
                                    }
                                )
                            }
                        })
                    }
                })
            }
        }
        //type为5时微博绑定
        else if(type === 5) {
            let _this = this
            if (!this.ishtml5) {
                let weiboPlus = api.require('weiboPlus')
                weiboPlus.isInstalled(
                    // {apiKey:"2458166125"},
                    function(ret) {
                    if (ret.status) {
                        weiboPlus.auth(
                            // {apiKey:"2458166125",registUrl:"https://www.zgshfp.com.cn/?w=1"},
                            function(ret, err) {
                            if (ret.status) {
                                // let loginParam = {}
                                // loginParam.openId = ret.userId
                                window.userID = ret.userId
                                weiboPlus.getUserInfo(
                                    {
                                        token: ret.token,
                                        userId: ret.userId
                                    },
                                    function(ret, err) {
                                        if (ret.status) {
                                            // 实现绑定动作
                                            // _this.thirdLogin(loginParam, '5')
                                          window.thirdDo('5')
                                        }
                                    }
                                )
                            }else {
                             const code = err.code;
                             let msg = ""
                             switch(code){
                                 case 1:
                                 msg = "取消授权";
                                 break;
                                 case 2:
                                 msg = "发送失败";
                                 break;
                                  case 3:
                                 msg = "授权失败";
                                 break;
                                   case 5:
                                 msg = "未知错误";
                                 break;

                             }
                                _this.showToast('', 'text',msg)
                            }
                        })
                    }else {
                        _this.showToast('', 'text', '请安装新浪微博客户端')
                    }
                })
            }
        }


        // if (type === 2) {
        //   this.bindedtypes = [this.thirdaccounts[0]]
        // } else if (type === 3) {
        //   this.bindedtypes = [this.thirdaccounts[1]]
        // }
      },
      isBinded (itemtype) {
          
        let index = this.bindedtypes.findIndex((element) => (element.type == itemtype))
        if (index !== -1) return true
        // return false
      },
      onCancel () {

      },
      onConfirm (msg) {
        this.$http.post('uts/user/thirdUntie',
          {'type': this.unbindtype})
          .then(res => {
              this.showToast('','text','解绑成功','20em','','middle')
              this.bindedtypes = [];
            this.getUserBindingInfo()
          }).catch(err => {
              if(err.msg)
              this.showToast('','text',err.msg,'20em','','middle')
          })
      },
      onHide () {
        // console.log('on hide')
      },
      onShow () {
        // console.log('on show')
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
