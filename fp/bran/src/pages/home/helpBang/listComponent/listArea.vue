<template>
    <div>
       <nav>
        <ul>
          <li>
            <p @click="btn1()">{{sjcon?sjcon:"省级"}}<i :class="sanjiao1" aria-hidden="true"></i></p>
            <ol v-show="sheng">
                <li v-for="(item,index) in sj" :key="index" @click="sheng1(index)">{{item}}</li>
            </ol>
          </li>
          <li>
              <p @click="btn2()">{{zbcon?zbcon:"总榜"}}<i :class="sanjiao2" aria-hidden="true"></i></p>
              <ol v-show="zong">
                  <li v-for="(item,index) in zb" :key="index" @click="zb1(index)">{{item}}</li>
              </ol>
          </li>
          <li @click="btn3()">榜单规则 <i class="fa fa-question-circle-o"></i></li>
        </ul>
      </nav>
      <section>
        <div class="lis">
                      <!-- 第一名 -->
                    <dl v-for="(item,index) in list1" :key="index">
                        <dt>
                            <span><img class="img1" src="../../../../../static/appimg/No1.png" alt=""></span>
                            <img class="img2" src="../../../../../static/appimg/sheng.png" alt="">
                        </dt>
                        <dd>
                            <div class="sheng"><p>{{item.sheng}}</p></div>
                            <p class="prc"><i class="fa fa-free-code-camp" aria-hidden="true"></i>{{item.prc}}万次</p>
                            <p>当前排名 <span>1</span>名</p>
                        </dd>
                    </dl>
                    <!-- 第二名 -->
                    <dl v-for="(items,index) in list2" :key="index+1" style="background:#eee;">
                        <dt>
                            <span><img class="img1" src="../../../../../static/appimg/No2.png" alt=""></span>
                            <img class="img2" src="../../../../../static/appimg/sheng.png" alt="">
                        </dt>
                        <div class="sheng"><p>{{items.sheng}}</p></div>
                        <dd>
                            <p class="prc"><i class="fa fa-free-code-camp" aria-hidden="true"></i>{{items.prc}}万次</p>
                        </dd>
                    </dl>
                    <!-- 第三名 -->
                    <dl v-for="(item,index) in list3" :key="index+2">
                        <dt>
                            <span><img class="img1" src="../../../../../static/appimg/No3.png" alt=""></span>
                            <img class="img2" src="../../../../../static/appimg/sheng.png" alt="">
                        </dt>
                        <div class="sheng"><p>{{item.sheng}}</p></div>
                        <dd>
                            <p class="prc"><i class="fa fa-free-code-camp" aria-hidden="true"></i>{{item.prc}}万次</p>
                        </dd>
                    </dl>
                    <!-- 第四名 -->
                    <dl v-for="(item,index) in list4" :key="index+3">
                        <dt>
                            <span>4</span>
                            <img class="img2" src="../../../../../static/appimg/sheng.png" alt="">
                        </dt>
                        <div class="sheng"><p>{{item.sheng}}</p></div>
                        <dd>
                            <p class="prc"><i class="fa fa-free-code-camp" aria-hidden="true"></i>{{item.prc}}万次</p>
                        </dd>
                    </dl>
                    <!-- 第四名以后排名 -->
                    <dl v-for="(item,index) in list" :key="index+4" v-bind:class='{bg:index%isactive}'>
                        <dt>
                            <span>{{index+5}}</span>
                            <img class="img2" src="../../../../../static/appimg/sheng.png" alt="">
                        </dt>
                        <div class="sheng"><p>{{item.sheng}}</p></div>
                        <dd>
                            <p class="prc"><i class="fa fa-free-code-camp" aria-hidden="true"></i>{{item.prc}}万次</p>
                        </dd>
                    </dl>
        </div>
      </section>
    </div>
</template>
<script>
export default {
    data(){
        return{
          sanjiao1:"fa fa-caret-up",
          sanjiao2:"fa fa-caret-up",
          sheng:false,
          zong:false,
          sjcon:"",
          zbcon:"",
          sj:["省级","市级","县级"],
          zb:["总榜","月榜"],
          isactive:2,
            list1:null,
            list2:null,
            list3:null,
            list4:null,
            list:[
               {
                   sheng:"湖南省",
                   prc:245.5,
               },
               {
                   sheng:"湖南省",
                   prc:252.5,
               },
               {
                   sheng:"湖南省",
                   prc:2225.5,
               },
               {
                   sheng:"湖南省",
                   prc:2513.5,
               },
               {
                   sheng:"湖南省",
                   prc:215.5,
               },
                {
                   sheng:"湖南省",
                   prc:21455.5,
               },
                {
                   sheng:"湖南省",
                   prc:215666.5,
               },
                {
                   sheng:"湖南省",
                   prc:2165.5,
               },
               {
                   sheng:"湖南省",
                   prc:2165.5,
               },
               {
                   sheng:"湖南省",
                   prc:2165.5,
               },
            ]
        }
    },
    computed:{
      evenNumbers: function () {
        return this.list.sort(function (a,b) {
          return b.prc-a.prc
        })
      }
    },
    mounted(){
       this.list1 = this.evenNumbers.splice(0,1);
       this.list2 = this.evenNumbers.splice(0,1);
       this.list3 = this.evenNumbers.splice(0,1);
       this.list4 = this.evenNumbers.splice(0,1);

    },
    methods:{
        btn1(){
        if(this.sanjiao1 == "fa fa-caret-up"){
            this.sanjiao1 = "fa fa-caret-down";
            this.sheng = true;
            this.sanjiao2 = "fa fa-caret-up"
            this.zong = false;
        }else{
            this.sanjiao1 = "fa fa-caret-up";
            this.sheng = false;
        }
    },
        btn2(){
            //console.log("asdsa")
        if(this.sanjiao2 == "fa fa-caret-up"){
            this.sanjiao2 = "fa fa-caret-down"
            this.sanjiao1 = "fa fa-caret-up";
            this.sheng = false;
            this.zong = true;
        }else{
            this.sanjiao2 = "fa fa-caret-up"
            this.zong = false;
        }
    },
    btn3(){
         this.sanjiao1 = "fa fa-caret-up";
         this.sanjiao2 = "fa fa-caret-up";
         this.sheng = false;
         this.zong = false;
    },
    sheng1(ind){
        this.sjcon=this.sj[ind];
        this.sanjiao1 = "fa fa-caret-up";
        this.sheng = false;
    },
    zb1(ind){
        this.zbcon=this.zb[ind];
        this.zong = "fa fa-caret-up";
        this.zong = false;
    }
    },

}
</script>
<style lang="less" scoped>
    nav{
    width:100%;
    margin:10px 0;
  }
  nav ul{
    width:100%;
    height:35px;
    background:#fff;
    display:flex;
  }

  nav ul li{
    flex:1;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:13px;
    position: relative;
    ol{
        width:100%;
        position: absolute;
        top:36px;
        left:0;
        li{
            height:30px;
            line-height:30px;
            background:#eee;
            border-bottom:1px solid #ccc;
        }
    }
  }
  nav ul li i{
    padding-left:3px;
  }
  .lis,.list{
    width:100%;
  }
  .bg{
    background:#eee!important;
  }
   .lis dl{
    height:60px;
    display:flex;
    align-items:center;
    background:#fff;
    margin:0 10px;
    .sheng{
      font-size:13px;
    }
    dd{
      width:40%;
      padding-left:20%;
        .prc{
            font-size:13px;
            i{
              color:orange;
              padding-right:5px;
            }
        }
    }
  }
   .lis dl:nth-child(4){background:#eee;}
  .lis dl:nth-child(1){
      height:100px;
      dt{
          padding-left:10px;
         span{
           padding-right:10px;
         }
       .img2{
          width:80px;
          height:80px;
      }
      .img1{
          width:30px;
          height:60px;
          padding-top:5px;
      }
      }
      dd{
          padding-left:20px;
          .prc{
            color:orange;
          }
          p{
            font-size:15px;
              span{
                  color:orange;

              }
          }
      }
  }

  .lis dl dt{
      display:flex;
      justify-content:center;
      align-items:center;;
      padding-right:10px;
      span{
          display:inline-block;
          width:30px;
          text-align:center;

      }
  }
  .lis dl dt .img1{
    width:20px;
    height:40px;
  }
  .lis dl dt .img2{
    width:40px;
    height:40px;
    border-radius:50%;
  }
</style>
