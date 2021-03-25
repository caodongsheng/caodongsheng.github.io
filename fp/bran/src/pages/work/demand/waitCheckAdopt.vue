<template>
    <div class="wrap">
        <!-- <x-header :left-options="{backText: ''}" >审核通过</x-header> -->
        <x-header :left-options="{backText: '',preventGoBack: true}" @on-click-back="backToPre">审核通过</x-header>
        <div class="adopt">
            <img src="../../../../static/appimg/lian_03.jpg" alt="">
            <p class="ps">恭喜！需求审核通过</p>
        </div>
        <div class="btn">
            <button @click="loveDemand">查看需求详情</button>
            <button @click="btn2">继续审核下一条</button>
        </div>
        <!-- <div class="picture">
            <divider>分享给朋友</divider>
            <ul>
                <li></li>
                <li><img src="../../../../static/appimg/weibo_logo.png" alt=""></li>
                <li><img src="../../../../static/appimg/weixin_logo.png" alt=""></li>
                <li><img src="../../../../static/appimg/1_13.gif" alt=""></li>
                <li><img src="../../../../static/appimg/1_15.gif" alt=""></li>   
                <li></li>             
            </ul>
        </div> -->
    </div>
</template>
<script>
import { XHeader, Divider } from "vux";
import { mapState } from 'vuex';
export default {
  components: { XHeader, Divider },
  data() {
    return {
      arr: []
    };
  },
  created() {
      console.log(this.$route.params.nextId);
  },
  computed:{
     ...mapState(['changemsg'])
  },
  methods: {    
    btn2() {
      console.log(this.changemsg)
      let msg = {...this.changemsg};
      msg.checkStatus = "01"
      console.log(msg)
      this.$http
          .post("hts/management/showList", msg)
          .then(res => {
            if(res.data.vos.length !== 0){
              this.$router.push({
                name: "waitCheckShow",
                params: {
                  id:res.data.vos[0].id
                }
              });
            }else{
              this.showToast("", "text", "已是最后一条");
            }
          });
      
    },
    backToPre() {
        this.$router.replace('/waitCheckDemand');
    },
    //跳转爱心需求页面
    loveDemand(){
        this.$http.post('hts/myDemand/detail',{demandId: this.$route.params.id})
        .then(res => {
            //如果需求状态为3(帮扶中)跳转到需求帮扶中的需求详情页,否注跳转到待审核状态的需求详情页
            if(res.data.demand_status == 3) {
                this.$router.push({name: 'loveNeed', params: this.$route.params.id});
            }else {
                this.$router.push({
                    name: "allStatus",
                    params: {
                        id: this.$route.params.id
                    }
                })
            }
        })
     
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100%;
  position: relative;
}
.ps {
  width: 100%;
  height: 0.5rem;
  font-size: 0.9rem;
}
.vux-divider {
  display: table;
  white-space: nowrap;
  height: auto;
  overflow: hidden;
  line-height: 1;
  text-align: center;
  padding: 15px 50px;
}
.adopt {
  text-align: center;
  padding: 50px 0;
  img {
    width: 15%;
  }
  p {
    padding-top: 10px;
    font-weight: bold;
  }
}
.btn {
  width: 100%;
  text-align: center;
  button {
    width: 150px;
    height: 30px;
    border: none;
    background: #fff;
    border: 1px solid #ccc;
    padding: 5px 10px;
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 5px;
  }
}
.picture {
  width: 100%;
  position: absolute;
  bottom: 40px;
  ul {
    width: 100%;
    display: flex;
    padding-top: 20px;
    li {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 70%;
      }
    }
  }
}
</style>


