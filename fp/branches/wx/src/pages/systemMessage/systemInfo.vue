<template>
  <div>
    <!-- <ul  class="over-auto"   :class="isManage?'box-withheader':'box-withbar'"  style="overflow-x: hidden">
      <li class="c-f mt-15" v-for="(message,index) in messages" :key="index">
        <p class="c-e f-12 text-center" style="margin-bottom: 10px">{{message.time}}</p>
        <div class="display-flex">
          <div v-if="!isManage" style="width:40px;padding:0 0 0 8px;flex:none">
            <check-icon :value.sync="message.isChecked" class="c-b-x"></check-icon>
          </div>
          <div class="message-item" style="flex:none">
            <div class="message-item-title">
              <div class="mb-15" style="display: flex;justify-content: space-between">
                <h4 class="c-e f-14 ">{{message.type}}</h4>
                <span v-if="message.isRead" class="f_r f-13 " style="color: #ef6b2a">未读</span>
              </div>
              <p class="c-c f-15 f-bold">
                {{message.title}}
              </p>
            </div>
            <router-link  :to="{name:'messageDetails',params:{}}">
              <p class="check-detail c-e f-12">查看详情<i class="fa fa-angle-right f_r f-15" aria-hidden="true"></i></p>
            </router-link>
          </div>
        </div>
      </li>

    </ul>
    <div v-if="!isManage" class="delete-all fix-bottom text-center c-b-o">删除需求</div> -->

  </div>
</template>

<script>
  import {CheckIcon} from 'vux'

  export default {
    name: 'systemInfo',
    components: {CheckIcon},
    props: {
      isManage: {
        type: Boolean
      }
    },
    data() {
      return {
        messages: [
          {
            time: '17/4/18 09:30',
            type: '重大更新',
            isRead: true,
            title: '中国社会扶贫网APP 3.0版本 火爆上线，请用户尽快更新，未更新的将无法继续使用。',
            isChecked: false
          },
          {
            time: '17/4/18 09:30',
            type: '重大更新',
            isRead: true,
            title: '中国社会扶贫网APP 3.0版本 火爆上线，请用户尽快更新，未更新的将无法继续使用。',
            isChecked: false
          }
        ]
      }
    },
    /*    computed: {
          checkedMessages: function () {
            return this.messages.filter(item => item.isChecked === true)
          }
        }, */
    methods: {
      delete () {
        this.messages = this.messages.filter(item => item.isChecked === false)
      }
    }

  }
</script>

<style scoped lang="less">
  .message-item {
    margin: 0  auto;
    width: 345px;
    background-color: #ffffff;
    box-shadow: 0 0 8px 0 rgba(14, 14, 14, 0.08);
    border-radius: 7px;
    .message-item-title {
      padding: 15px 15px 10px 15px;
      border-bottom: 1px solid #e5e5e5;
    }
    .check-detail {
      padding: 11px 15px;
    }
  }

  .delete-all {
    font-size: 16px;
    height: 50px;
    line-height: 50px;
    box-shadow: 0px -1px 20px 0px rgba(0, 0, 0, 0.2);
    background: #fff;
  }

  .c-b-x{position: relative;top:50%;transform: translateY(-50%)}
</style>
