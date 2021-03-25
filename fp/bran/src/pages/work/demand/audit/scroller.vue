<template>
  <div style="height:100%">
    <scroller
      :on-refresh="refresh"
      :on-infinite="infinite"
      refresh-layer-color="#4b8bf4"
      loading-layer-color="#ec4949">
        <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
        <g stroke-width="7" stroke-linecap="round"><line x1="10" x2="10" y1="27.3836" y2="36.4931"><animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate></line><line x1="24" x2="24" y1="18.6164" y2="45.3836"><animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate></line><line x1="38" x2="38" y1="16.1233" y2="47.8767"><animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate></line><line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
       <slot>
      
      </slot>
       <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
        <g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>
    </scroller>
  </div>
</template>

<script>
export default {
 
  methods: {  
    refresh(done) {

    },
    infinite(done) {

    }
  }
};
</script>
<style scoped>
.box {
  background: #f6f5f6;
}
.loading {
  height: 50px;
}
.no-more {
  text-align: center;
}
.identity-recipient p span {
  font-size: 12px;
}
.f-14 {
  font-size: 12px;
}
.box-bg {
  width: 100%;
  height: 30px;
  line-height: 30px;
  background: #f6f6f6;
  text-align: left;
}

.list-totals {
  padding: 5px 15px;
  background-color: #f6f5f6;
}

.list-topoperate {
  padding: 0;
}
.list-topoperate ul {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 94px;
  bottom: 0;
  z-index: 999;
}

.list-topoperate ul li {
  line-height: 0.36rem;
  background: #fff;
  padding-left: 15px;
}
.list-topoperate span {
  display: inline-block;
  padding: 10px;
}

.list-topoperate i.icon-caret {
  display: inline-block;
  position: relative;
  width: 0;
  height: 0;
  border: 4px solid;
  border-color: #999 transparent transparent transparent;
  top: 2px;
  left: 4px;
}

.check-box-one {
  height: 100%;
  padding: 0 15px;
  background: #fff;
  margin-bottom: 10px;
}
.check-box-one b {
  padding-bottom: 5px;
}
.check-box-one p {
  width: 100%;
  float: left;
}

.list-content {
  padding: 10px 0;
}

.list-content .tab-left {
  width: 90px;
}

.list-content .tab-right {
  position: relative;
}

.list-content .tab-right h1 {
  line-height: 100%;
}

.list-content .tab-right p {
  position: absolute;
  bottom: 0;
}

.list-content .tab-right p span {
  padding-right: 10px;
}

.list-state {
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}
.list-state span:nth-child(2) {
  color: #ccc;
}
.list-state .btn-bordered {
  margin-right: 10px;
}

.list-state .btn-bordered.btn-bordered-orange {
  margin-right: 0;
}
.identity-recipient {
  padding: 10px 0;
}
.color-999 {
  line-height: 18px;
}
.region {
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
}
.flex-tab {
  padding-top: 10px;
}
</style>
