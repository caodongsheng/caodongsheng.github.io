<template>

  <ul class="bg-ffffff personal-status-container">
    <li>
      <div class="personal-status-header">
        <div class="display-flex bg-f6f6f6">
          <img class="header-img" src="/static/appimg/user-photo01.jpg" alt="">
          <p class="header-title f-15 c-d ">这是我的需求标题，按说这个应该是重点爱神的箭</p>
        </div>
        <div class="header-status-info display-flex f-13 c-c justify-space-between">
          <p>您于2017年12月12日首次帮扶该项目</p>
          <p>当前状态：已完成</p>
        </div>
      </div>
      <div class="personal-status-item">
        <ul class="f-13">
          <li class="item-status-list">
            <div class="status-circle-orange bd-radius-cir"></div>
            <h3 class="c-blue">驻村第一书记 王海兵 代发</h3>
            <p class="c-e">2017-11-8 10:27:47</p>
            <p class="c-d">病好了，又可以去拍电影了，谢谢大家，我有最新的电影一定通知大家。</p>
            <div class="item-img-container mt-10">
              <img class="item-img" src="/static/appimg/user-photo01.jpg" alt="">
              <p class="text-center c-e">共3张</p>
            </div>
          </li>
        </ul>
        <p class="c-e text-center">点击查看更多动态</p>
      </div>
    </li>
    <li>
      <div class="personal-status-header">
        <div class="display-flex bg-f6f6f6">
          <img class="header-img" src="/static/appimg/user-photo01.jpg" alt="">
          <p class="header-title f-15 c-d ">这是我的需求标题，按说这个应该是重点爱神的箭</p>
        </div>
        <div class="header-status-info display-flex f-13 c-c justify-space-between">
          <p>您于2017年12月12日首次帮扶该项目</p>
          <p>当前状态：已完成</p>
        </div>
      </div>
      <div class="personal-status-item">
        <ul class="f-13">
          <li class="item-status-list">
            <div class="status-circle-orange bd-radius-cir"></div>
            <h3 class="c-blue">驻村第一书记 王海兵 代发</h3>
            <p class="c-e">2017-11-8 10:27:47</p>
            <p class="c-d">病好了，又可以去拍电影了，谢谢大家，我有最新的电影一定通知大家。</p>
            <div class="item-img-container mt-10">
              <img class="item-img" src="/static/appimg/user-photo01.jpg" alt="">
              <p class="text-center c-e">共3张</p>
            </div>
          </li>
        </ul>
        <p class="c-e text-center">点击查看更多动态</p>
      </div>
    </li>
    <li>
      <div class="personal-status-header">
        <div class="display-flex bg-f6f6f6">
          <img class="header-img" src="/static/appimg/user-photo01.jpg" alt="">
          <p class="header-title f-15 c-d ">这是我的需求标题，按说这个应该是重点爱神的箭</p>
        </div>
        <div class="header-status-info display-flex f-13 c-c justify-space-between">
          <p>您于2017年12月12日首次帮扶该项目</p>
          <p>当前状态：已完成</p>
        </div>
      </div>
      <div class="personal-status-item">
        <ul class="f-13">
          <li class="item-status-list">
            <div class="status-circle-orange bd-radius-cir"></div>
            <h3 class="c-blue">驻村第一书记 王海兵 代发</h3>
            <p class="c-e">2017-11-8 10:27:47</p>
            <p class="c-d">病好了，又可以去拍电影了，谢谢大家，我有最新的电影一定通知大家。</p>
            <div class="item-img-container mt-10">
              <img class="item-img" src="/static/appimg/user-photo01.jpg" alt="">
              <p class="text-center c-e">共3张</p>
            </div>
          </li>
        </ul>
        <p class="c-e text-center">点击查看更多动态</p>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "status-list"
  }
</script>

<style scoped lang="less">
  .personal-status-container{
    position: absolute;
    top: 187px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
  .personal-status-header {
    padding: 15px 15px 0 15px;
    border-bottom: 1px solid #e5e5e5;
    .header-img {
      width: 70px;
      height: 70px;
    }
    .header-title {
      padding: 12px;
    }
    .header-status-info {
      height: 40px;
      line-height: 40px;
    }
  }

  .personal-status-item {
    padding: 15px;
    .item-status-list {
      position: relative;
      border-left: 1px dashed #d2d2d2;
      padding-left: 20px;
      .status-circle-orange {
        position: absolute;
        left: -4px;
        top: 0;
        width: 7px;
        height: 7px;
        background-color: #ff6c0e;
        box-shadow: 0 0 0 5px rgba(243, 106, 34, .4);
      }
      .status-circle-grey {

      }
      .item-img-container {
        width: 60px;
        .item-img {
          width: 60px;
          height: 60px;
        }
      }
    }
  }
  }
</style>
