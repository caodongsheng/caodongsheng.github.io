<template>
  <div>
    <x-header :left-options="{backText: ''}">选择付款方式</x-header>
    <div class="box-withheader over-auto bg-f6f5f6">
      <!--打款方式-->
        <group class="group-clearbd cash-way mt-12">
          <radio :options="waylist" class="way-list-item">
            <div slot-scope="props" slot="each-item">
              <cell style="position: static">
                <h1 slot="title" class="f-16 color-333 f-normal">
                  {{props.label.optionleft}}
                </h1>
                <p  class="color-999 f-14">{{props.label.optionright}}</p>
              </cell>

            </div>
          </radio>
        </group>

      </div>
    </div>
</template>

<script>
  import {XHeader,Group,Cell,Radio,CheckIcon} from 'vux'
    export default {
        name: "cash_way",
      components:{XHeader,Group,Cell,Radio,CheckIcon},
      data(){
          return{
            picked:'1',
            waylist:[{
              key: '001',
              value: {
                optionleft: '系统自动打款',
                optionright: '快速到账，有手续费'}
            },
              {
              key: '002',
                value: {
                  optionleft: '人工打款',
                  optionright: '无手续费'}
            }]
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

  /*银行账号列表*/
  .way-list-item >>> .weui-cell__bd .weui-cell{}

  .way-list-item >>> .weui-cell_radio  {
    background: #fff;
    padding: 15px;
  }

  /*单选按钮居左反向*/
  .way-list-item>>>.weui-cell{flex-direction: row-reverse}
  /*内置cell恢复方向*/
  .way-list-item >>> .weui-cell_radio .weui-cell {
    padding: 0;
    flex-direction: row
  }

  .way-list-item >>> .weui-cell:before {
    left:0
  }

  .way-list-item >>> .weui-cell_radio .weui-cell__ft{
    padding-left: 0;
  }

  .way-list-item >>> .vux-cell-primary {
    padding: 0 0px 0 10px
  }




  /*单选按钮*/
  .weui-cells_radio >>> .weui-check + .weui-icon-checked {
    font-size: 23px;
    color: #ccc
  }

  .weui-cells_radio >>> .weui-check + .weui-icon-checked:before {
    content: "\EA01";
    margin-left: 0;
  }

  .weui-cells_radio >>> .weui-check:checked + .weui-icon-checked:before {
    content: "\EA06";
    font-size: 23px;
    color: #fd8b2a;
    margin-left: 0;
  }

  /*选中状态*/
  .vux-check-icon >>> .weui-icon-success:before, .vux-check-icon >>> .weui-icon-success-circle:before {
    color: #fd8b2a
  }

</style>
