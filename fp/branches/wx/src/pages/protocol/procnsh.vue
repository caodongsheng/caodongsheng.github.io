<template>
  <div class="bg-ffffff h-full">
    <popup v-model="showagree" :hide-on-deactivated="true" height="100%">
      <x-header :left-options="{backText: '',preventGoBack:true}" @on-click-back="showagree=false">中国社会扶贫网需求发起人承诺书
      </x-header>
      <div class="box-withheader over-auto bg-ffffff">
        <div class="protol-wrap">
          <h1>需求发起人承诺书</h1>
          <main>
            <div>需求发起人已承诺，涉及本需求的文字、图片、证明等相关信息完全真实、有效，且不存在未经他人授权冒用他人名义进行求助的行为，本人收到的全部救助、救助物品将直接用于被救助人的救助，不另行挪作他用。若发起人存在违反上述承诺的行为，愿自行承担全部法律责任。</div>
          </main>
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
  import {XHeader, Popup} from 'vux'

  export default {
    components: {XHeader, Popup},
    data() {
      return {
        showagree: false
      }
    },
    methods: {
      showpop() {
        this.showagree = true
      },
    }
  }
</script>

<style scoped>
  .protol-wrap{padding: 20px;text-align: justify}
  .protol-wrap h1{
    font-size:1.7em;
    margin-bottom: 15px;
    color:#f37306;
    text-align:center
  }

  .protol-wrap main div{text-indent: 2em;margin-bottom:10px;font-size:14px}
  .protol-wrap main div p{text-indent: 2em}
  .protol-wrap main div b{font-weight:bold}
  .protol-wrap main div u{text-decoration:underline}

  .protol-wrap main ul{    padding: 0 0 0 2rem;
    text-indent: 0em;}
  .protol-wrap main ul li{ display: list-item;list-style:disc}

  .protol-wrap h6 {
    margin: 15px 0 5px 0;
    color:#f37306;
    font-size:1.2em;
  }
</style>
