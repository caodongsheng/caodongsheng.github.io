<template>
  <div class="bg-f6f5f6 h-full" style="overflow: auto;">
    <div style="background-color: #f6f6f6;overflow: hidden;position: relative;width: 100%;height: 100%">
      <x-header :left-options="{backText: ''}">
        <tab :line-width="3" active-color='#ed6b2b' custom-bar-width="70px">
          <tab-item :selected="index === listIndex" v-for="(item, listIndex) in list2" @on-item-click="index=listIndex" :key="listIndex">
            {{item}}
          </tab-item>
        </tab>
        <a slot="right" v-if="index===1" class="f-16" style="color:#f89f54!important" @click = 'switchName' ></a>
      </x-header>

      <div v-if="index === 0" class="child-wrapper">
        <loveFeedback></loveFeedback>
      </div>
      <div v-if="index === 1" class="child-wrapper">
        <systemInfo :isManage="isManage" ref="systemInfo"></systemInfo>
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, ButtonTab, ButtonTabItem, Tab, TabItem, CheckIcon} from 'vux'
  import loveFeedback from './loveFeedback'
  import systemInfo from './systemInfo'

  export default {
    components: {XHeader, ButtonTab, ButtonTabItem, Tab, TabItem, loveFeedback, systemInfo, CheckIcon},
    data () {
      return {
        list2: list(),
        demo1: '爱心反馈',
        index: 0,
        isManage: true,
        // manageName: '管理'
      }
    },

    methods: {
      switchName () {
        this.isManage = !this.isManage
        this.isManage === true ? this.manageName = '管理' : this.manageName = '取消'
        // console.log(this.$refs.systemInfo.messages)
        //this.$refs.systemInfo.methods.delete()
      }
    }

  }
  const list = () => ['爱心反馈']
</script>

<style scoped >
.message-delete-btn{
  height:47px;
  line-height:47px;
  box-shadow: 0px -1px 20px 0px  rgba(0, 0, 0, 0.2);
}
.child-wrapper{
  position: absolute;
  top: 47px;
  bottom: 0;
  width: 100%;
  overflow: auto;
}

.vux-header{padding: 0}
.vux-header>>>.vux-header-title{height:46px}
.vux-tab-item{background:none;font-size: 16px!important}

.vux-tab-wrap>>>.vux-tab{height:46px}
.vux-tab-wrap>>>.vux-tab-container{overflow: auto;height:46px}
.vux-tab-wrap>>>.vux-tab .vux-tab-item{background: none}
</style>
