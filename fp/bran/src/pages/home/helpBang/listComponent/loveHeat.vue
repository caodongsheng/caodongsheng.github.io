<template>
    <div>
       <nav>
           <ul>
               <li>
                   <select name="" id="">
                        <option value="">省级</option>
                        <option value="">市级</option>
                        <option value="">县级</option>
                   </select>
                   <i class="fa fa-caret-up" aria-hidden="true"></i>
               </li>
               <li>
                   <select name="" id="">
                        <option value="">总榜</option>
                        <option value="">月榜</option>
                   </select>
                   <i class="fa fa-caret-up" aria-hidden="true"></i>
               </li>
               <li>
                   <span>榜单规则</span><i class="fa fa-question-circle-o"></i>
               </li>
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
            shows1:false,
            cls:'fa fa-caret-up',
            isactive:2,
            list1:null,
            list2:null,
            list3:null,
            list4:null,
            love:0,
            navList:["省级","榜单","榜单规则"],
            sheng:["省级","市级","县级"],
            zong:["总榜","月榜"],
            list:[
               {
                   sheng:"湖南省",
                   prc:245,
               },
               {
                   sheng:"湖南省",
                   prc:2552.5,
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
        city1(){
            this.shows1 = !this.shows1;
           
        },
        aa(ind){
            this.love = ind;
        }
    }
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
   nav ul li:hover{
       color:orange;    
   }
  nav ul li{
    flex:1;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:13px;
    position: relative;
    select{
        width:100%;
        height:100%;
        border:none;
        outline: none;
        appearance:none;
        padding-left:30px;
        option{
            text-align:center;
        }
    }
  }
  .lis1{
      color:orange;
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
