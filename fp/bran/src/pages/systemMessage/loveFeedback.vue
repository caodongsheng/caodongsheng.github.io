<template>
  <div>
    <!-- <div class="status-header">
      <div class="dis-flex" style="overflow: auto">
        
        <div class="status-header-title">
          <div class="status-header-text-box bd-radius-cir bg-ffffff">
            <div class="status-header-text color-999  f-12">全部动态</div>
          </div>
        </div> -->
       
        <!-- <div class="photolist">
          <ul class="status-header-list">
            <router-link :to="{path: '/message/tab/0/personal-status'}" class="status-header-item" tag="li">
              <img src="/static/appimg/user-photo01.jpg" class="bd-radius-cir" alt="">
              <span class="item-name f-12 c-c">小明同学</span>
              <span class="item-src following color-white">关注的</span>
              <div class="item-red-point bd-radius-cir"></div>
            </router-link>
            <li class="status-header-item">
              <img src="/static/appimg/user-photo01.jpg" class="bd-radius-cir" alt="">
              <span class="item-name f-12 c-c">小明同学</span>
              <span class="item-src helping color-white">帮扶的</span>
              <div class="item-red-point bd-radius-cir"></div>
            </li>
          </ul>
        </div> -->
        <!-- <div class="morearea">
        <router-link :to="{ path: '/loveStatus' }" tag="div" class="check-more">查看更多</router-link> -->
        <!-- </div> -->
      <!-- </div> -->
    <!-- </div> -->

    <router-view></router-view>

  </div>
</template>

<script>
  import statusList from './statusList'
  import personalStatus from './personalStatus'

  export default {
    name: 'loveFeedback',
    components: {statusList, personalStatus}

  }
</script>

<style scoped lang="less">
  .status-header {
    display: flex;
    align-items: center;
    height: 140px;
    .status-header-title {
      flex:none;
      .status-header-text-box {
        margin: 40px 23px 32px 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 53px;
        height: 53px;
        box-shadow: 0 0 3.5px 0 rgba(0, 0, 0, 0.35);
        border: solid 1px #ffffff;
        .status-header-text {
          width: 24px;
          line-height: 15px;
        }
      }
    }
    .status-header-list {
      display: flex;
      .status-header-item {
        width: 75%;
        position: relative;
        margin: 27px 33px 13px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 53px;
          height: 53px;
          background-color: #ffffff;
          box-shadow: 0 0 3.5px 0 rgba(0, 0, 0, 0.35);
          border: solid 1px #ffffff;
        }
        .item-name {
          padding: 3px 0
        }
        .item-src {
          border-radius: 14px;
          font-size: 11px;
          padding: 0 9px 0 9px
        }
        .following {
          background-color: #f89f54;
        }
        .helping {
          background-color: #f38592;
        }
        .item-red-point {
          position: absolute;
          width: 9px;
          height: 9px;
          left: 42px;
          top: 1px;
          background-color: #f55e30;
        }
      }
    }
    .check-more {
      flex: none;
      padding:20px 10px 10px 10px;
      height: 50px;
      width:28px;
      border: 1px solid #ff8f63;
      color: #ff8f63;
      background-color: #f9f2f1;
      border-radius:4px;
      margin: 32px 0px 20px 0;
    }

  }
.morearea{padding-right:15px;}
  .status-list {
    position: absolute;
    top: 47px;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f6f6f6;
    .status-item-content {
      padding: 15px;
      .status-item-info {
        display: flex;
        padding: 10px 4px;
        .status-item-info-img {
          width: 45px;
          height: 45px;
          padding-right: 7px;
        }
      }
      .forward-message-info {
        color: #39aede;
      }
      .status-item-message {
        display: flex;
        .status-item-message-img {
          margin-right: 7px;
          img {
            width: 60px;
            height: 60px;
          }
        }
      }
    }
    .status-item-handle {
      border-top: 1px solid #e5e5e5;
      padding: 11px 0;
      .status-item-handle-icon {
        padding-right: 6px;
      }
    }
  }

</style>
