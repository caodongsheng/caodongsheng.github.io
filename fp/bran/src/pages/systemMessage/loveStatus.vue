<template>
  <div>
    <div class="header-wrap">
      <x-header :left-options="{backText: ''}">{{headerTitle}}</x-header>
    </div>

    <div class="love-status-container box-withheader over-auto">
      <div v-bind:class="{ 'dh-bg': toOpen, 'dh-tab': true }">
        <ul class="clearfix">
          <li @click="change(0)" :class="{'li-l':true,'li-hover':lia}">帮扶过的</li>
          <li @click="change(1)" :class="{'li-r':true,'li-hover':lib}">关注的</li>
        </ul>
      </div>

      <div v-if="index === 0">
        <!-- <p class="total-number f-14 c-e">您共关注了<span class="c-b-o">27人</span></p> -->
        <ul class="img-list display-flex">
          <li class="img-container text-center">
            <img class="personal-img bd-radius-cir" src="/static/appimg/user-photo01.jpg" alt="">
            <p class="f-14 c-c">周杰伦</p>
          </li>
          <li class="img-container text-center">
            <img class="personal-img bd-radius-cir" src="/static/appimg/user-photo01.jpg" alt="">
            <p class="f-14 c-c">周杰伦</p>
          </li>
          
        </ul>
      </div>

        <div v-if="index === 1">
            <ul class="img-list display-flex">
                <li class="img-container text-center">
                    <img class="personal-img bd-radius-cir" src="/static/appimg/user-photo02.jpg" alt="">
                    <p class="f-14 c-c">周杰伦</p>
                </li>
                <li class="img-container text-center">
                    <img class="personal-img bd-radius-cir" src="/static/appimg/user-photo02.jpg" alt="">
                    <p class="f-14 c-c">周杰伦</p>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
  import {XHeader} from 'vux'

  export default {
    name: 'loveStatus',
    components: {
      XHeader
    },
    data() {
      return {
        headerTitle: '爱心反馈',
        index: 0,
        toOpen: true,
        lia: true,
        lib: false,

      }
    },
    methods: {
      change(num) {
        this.index = num
        if (num === 0) {
          this.lia = true
          this.lib = false
        }
        if (num === 1) {
          this.lia = false
          this.lib = true
        }
      }
    },
    created() {
        // this.lia = true;
    }
  }
</script>

<style scoped lang="less">
  .love-status-container{
    margin: 0 auto;
  .dh-tab {
    width: 100%;
    background: #f6f6f6;
    text-align: center;
  }

  .dh-bg {
    background: #ffffff;
  }

  .dh-tab ul {
    padding-top: 22px;
    width: 60%;
    margin: 0 auto;
    color: #fd6d0a;
    box-sizing: border-box;
  }

  .dh-tab ul li {
    width: 50%;
    height: 34px;
    float: left;
    border: 1px solid #fd6d0a;
    line-height: 34px;
    display: block;
    box-sizing: border-box;
  }

  .li-l {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .li-r {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .li-hover {
    background: #fd6d0a;
    color: #ffffff
  }
.total-number{
  line-height: 30px;
  height: 30px;
  text-align: center;
  padding:12px 0 5px 0;
}
  .img-list {
    margin: 0 auto;
    width: 85%;
    flex-wrap: wrap;
    .img-container {
      width: 25%;
      padding: 15px 0;
      .personal-img {
        width: 50px;
        height: 50px;
      }
    }
  }
  }

</style>
