<template>
  <div>
    <x-header :left-options="{backText: ''}">消息详情</x-header>
    <div class="message-detail">
      <div class="text-center c-b-c color-white f-12 message-time">2018/6/13 15:32</div>
      <article class="news-article c-e f-14">
        <h1 class="c-c f-16 " style="margin: 20px 0">【关于中国社会扶贫网2018年1月服务器维护安排】</h1>
        <p>尊敬的用户：</p>
        <p>至成科技将于2017年3月23日中午12:00至12:30 对企业内部服务器进行升级维护，届时网站将暂停访问。对此造成的不便，敬请大家原谅。
          如您在维护期间需咨询问题，请联系至成科技售后：400-6292-715，售后人员将在第一时间解答您的疑问。
          感谢大家一直以来对至成科技的关注和支持，我们将继续竭诚为您提供更加便捷的互联网综合服务</p>
        <div class="f_r text-right" style="margin:30px 20px 0 0 ">
          <p class="c-c f-16">中国社会扶贫网</p>
          <p class="f-12">2017年03月23日</p>
        </div>
      </article>
    </div>
    <div class="text-center" style="margin-top: 130px"><a href="/" class="c-a f-14">点击公告链接>></a></div>
  </div>
</template>

<script>
  import {XHeader, XButton, Flexbox, FlexboxItem, Divider} from 'vux'

  export default {
    components: {XHeader, XButton, Flexbox, FlexboxItem, Divider}
  }

</script>

<style scoped>
  .message-detail {
    padding: 30px;
  }
  .message-time{
    border-radius: 19px;
    width: 116px;
    padding:0 14px;
    margin: 0 auto;
  }

  /*  .weui-btn_mini {
      display: block !important;
      margin-top: 20px !important;
    }

    .news-article {
      max-width: 100%;
      box-sizing: border-box;
      word-wrap: break-word;
      padding: 10px 15px;
      font-size: 15px;
      margin-bottom: 60px;
    }

    .news-article p {
    }

    .news-article h1 {
      font-size: 18px;
      font-weight: 400;
    }

    .vux-divider {
      display: block !important;
    }

    .vux-divider a {
      color: #f37306;
    }*/

</style>
