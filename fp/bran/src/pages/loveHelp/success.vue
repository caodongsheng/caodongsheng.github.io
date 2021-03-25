<template>
  <div>
    <div class="header-wrap animated fadeInRight">
      <x-header :left-options="{backText: ''}">{{"提交成功"}}
        <a slot="right"></a></x-header>
    </div>
    <div class="title">
        <div class="title-x">
            <p>此需求已经下线了~</p>
            <p>看看其他贫困户的需求吧~</p>
        </div>
    </div>
    <div class="tab-online">
        <ul class="clearfix">
            <li
            v-for="(item,index) in conNav"
            :key="index"
            @click="tab(index)"><p :class="{active:index == num}">{{item}}</p></li>
        </ul>
        <div class="conList">
            <ol v-for="(item,index) in conList" :key="index" v-show="index == num">
               <li v-for="(items,index) in item.list" :key="index">
                   <div class="title-Top">
                       <div class="title-ds">
                           <p class="title-img"><img src="../../../static/appimg/fpw_logo_small.png" alt=""></p>
                            <div>
                                <p class="name">{{items.name}}</p>
                                <p class="position">{{items.position}}</p>
                            </div>
                       </div>
                       <div class="title-gr">个人</div>
                   </div>
                   <dl>
                       <dt><img :src="items.imgs1" alt=""></dt>
                       <dd>
                           <h4>{{items.title}}</h4>
                           <p class="title-con">{{items.content}}</p>
                            <p>
                                <span>{{items.baby}}</span>
                                <span>{{items.Powdered}}</span>
                            </p>
                       </dd>
                   </dl>
               </li>
            </ol>
        </div>
    </div>
  </div>
</template>

<script>
  import {XHeader,Icon,Scroller} from 'vux'
  export default {
    components: {XHeader,Icon,},
    data(){
      return{
        show:false,
        num:1,
        conNav:["相关推荐","电商扶贫热销榜"],
        conList:[
            {
              list:[
                  {
                      name:"王大拿",
                      position:"湖南 永州 东安区",
                      img:"./static/appimg/foods-img01.jpg",
                      imgs1:"./static/appimg/foods-img01.jpg",
                      title:"我需要6个月婴儿奶粉",
                      content:"孙儿4月份刚出生,家里没钱买奶粉,希望好心人帮帮我们",
                      baby:"#婴儿",
                      Powdered:"#奶粉"
                  },
                  {
                      name:"王大拿",
                      position:"湖南 永州 东安区",
                      img:"./static/appimg/foods-img02.jpg",
                      imgs1:"./static/appimg/foods-img02.jpg",
                      title:"我需要6个月婴儿奶粉",
                      content:"孙儿4月份刚出生,家里没钱买奶粉,希望好心人帮帮我们",
                      baby:"#婴儿",
                      Powdered:"#奶粉"
                  }
              ]
            },
            {
              list:[
                  {
                      name:"电商",
                      position:"湖南 永州 东安区",
                      img:"./static/appimg/foods-img01.jpg",
                      imgs1:"./static/appimg/foods-img01.jpg",
                      title:"我需要6个月婴儿奶粉",
                      content:"孙儿4月份刚出生,家里没钱买奶粉,希望好心人帮帮我们",
                      baby:"#婴儿",
                      Powdered:"#奶粉"
                  }
              ]
            },
        ]
      }
    },
    methods: {
      tab(ind){
          this.num = ind;
      }
    }
  }
</script>
<style lang="less" scoped>
.title{
    width:100%;
    height:120px;
    background:#f6f6f6;
    display:flex;
    justify-content:center;
    align-items:center;
    .title-x{
        text-align: center;
        color:#ccc;
    }
}
.tab-online{
        width:100%;
        ul{
            width:100%;
            li{
                width:50%;
                height:43px;
                font-size:14px;
                float:left;
                border-bottom:1px solid #ccc;
                text-align:center;
                line-height:40px;

            }
            .active{
                margin:0 30px;
                border-bottom:3px solid orange;
            }
        }
        .conList{
            width:100%;
            height:auto;
            overflow-y:scroll;
            ol{
            }
            li{
              position: relative;
                 padding:12px 15px;
              &:last-child{
                &:after{border:0 none}
              }
              &:after{
                content: '';
                position: absolute;
                left:15px;right:15px;bottom:0;
                border-bottom:1px solid #d9d9d9;
                transform: scaleY(0.5);
              }
            }
            .title-Top{
                width:100%;
                height:45px;
                display:flex;
                justify-content:space-between;
                align-items:center;

                .title-ds{
                   display:flex;
                   .title-img{
                       vertical-align: middle;
                     padding-right:8px;
                     padding-top: 4px;
                       img{
                           width:30px;
                       }
                   }
                   .name{
                       font-size:10pt;
                   }
                   .position{
                       font-size:12px;
                       color:#ccc;
                   }
                   .icon{
                       margin:0 auto;
                   }
                }
                .title-gr{
                       border:1px solid orange;
                       color:orange;
                       font-size:10px;
                       padding:0 5px;
                       border-radius:3px;
                   }
            }
            dl{
                width:100%;
                display:flex;
              padding-top: 10px;
              padding-bottom: 5px;
                dt{
                    width:110px;
                    height:80px;
                    img{
                        width:100%;
                        height:100%;
                    }
                }
                dd{
                    padding-left:10px;
                    h4{
                        font-size:14px;
                    }
                    .title-con{
                        font-size:8pt;
                        color:#ccc;
                    }
                    span{
                        font-size:8pt;
                        color:orange;
                    }
                }
            }
        }
    }

</style>
