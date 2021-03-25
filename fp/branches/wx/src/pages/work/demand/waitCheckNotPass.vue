<template>
  <div class="">
    <headerBackTitleSearch :headerTitle='headerTitle'></headerBackTitleSearch>
    <div class="box-withheader over-auto bg-f6f6f6">
    <div class="nav bg-ffffff">
        <p><input type="checkbox"><span>本人审核</span></p>
        <p><span>审核状态</span><i>^</i></p>
        <p><span>用户类型</span><i>^</i></p>
    </div>
    <div class="tiao color-999">共<span>1</span>条</div>
    <div class="box">
        <div class="box1 box-szr"><p>受助人：杨晓明</p><p class="color-999">01-02 14:00</p></div>
        <div class="box1 box-sfz">身份证明：<span>1634983247982749798</span></div>
        <div class="box1 dq">地区：<span>河北省 石家庄市 无极县</span></div>
    </div>
    <div class="info-base bg-ffffff mb-12">
      <div class="demanditem">
        <div class="flex-tab">
          <div class="flex-tab-cell tab-left linkonly">
            <img src="../../../../static/appimg/pro-img.jpg" width="80" height="80">
          </div>
          <div class="flex-tab-cell tab-right">
            <h1 class="color-333 f-16 f-normal tit-nowrap">孩子上学喝水难，谁给买个杯子</h1>
            <p class="color-999 f-14 tit-2row-nowrap">我叫陈英水，家庭条件困难，为了孩子更好的教育，希望爱心人士帮助!</p>
          </div>
        </div>
      </div>
        <ul>
          <li class="color-orange f-15">审核不通过</li>
          <li>审核人:<span>张小三</span></li>
        </ul>
      </div>
  </div>
  </div>
</template>

<script>
import headerBackTitleSearch from "../../../components/header/headerBackTitleSearch";
export default {
  components: {
    headerBackTitleSearch
  },
  data() {
    return {
      headerTitle: "审核需求"
    };
  }
};
</script>

<style lang="less" scoped>
.nav {
  width: 100%;
  height: 45px;
  display: flex;
  border-bottom: 1px solid #e5e5e5;
  p {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.tiao {
  padding: 5px 15px;
}
.box {
  background: #fff;
  overflow: hidden;
  .box1 {
    padding: 0 15px;
    line-height: 36px;
  }
  .box-szr {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.info-base {
  .demanditem {
    border-bottom: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
    padding: 15px 15px;
  }
  ul {
    height: 45px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
}

.info-base .tab-left {
  width: 90px;
}

.info-base .tab-right {
  position: relative;
}

.info-base .tab-right h1 {
  line-height: 100%;
}

.info-base .tab-right p {
  position: absolute;
  bottom: 0;
}

.info-base .tab-right p span {
  padding-right: 10px;
}
</style>
