<template>
  <div class="box">
    <x-header :left-options="{backText: ''}">我管理的需求</x-header>
      <div class="dsh-header" v-if="list2[inde]">
            <img src="../../../../static/appimg/user-pub-wp.png">
            <p>{{name}} 最近3个月内已有{{list2[inde].total}}条{{list2[inde].help_type_name}}；该人累计总需求量达{{this.$route.params.num}}条</p>
      </div>
    <div class="list1">
        <div>
            <ul>
                <li v-for="(item,index) in list2" :key="index" @click="list(index,item.help_type_name,item.total,item.help_type_code)">
                  <p :class="{bg:index==inde}">{{item.help_type_name}}({{item.total}})</p>
                </li>
            </ul>         
        <scroller 
          lock-x height="-140" 
          ref="scrollerBottom" 
          :scroll-bottom-offst="200">
          
              <div class="box2">
                <ol>
                    <li v-for="(item,index) in list2" :key="index"  v-if="inde == index">
                      <medical :lis="aidedList"></medical>
                    </li>
                </ol>
              </div>
         </scroller>    
        </div>  
    </div>
  </div>
</template>
<script>
import { XHeader, Tab, TabItem, Scroller, LoadMore } from "vux";
//医疗帮扶
import medical from "./needsSubcomponent/medical";
export default {
  components: {
    XHeader,
    Tab,
    TabItem,
    Scroller,
    LoadMore,
    medical
  },
  name: "mypub_goods",
  data() {
    return {
      list2: [],
      name: "",
      inde: 0,
      btn1: '',
      names: "",
      nums: 0,
      showList1: true,
      scrollTop: 0,
      onFetching: false,
      bottomCount: 3,
      block1: true,
      block2: false,
      typeCode: '',
      aidedList:[]
    };
  },
  mounted() {
    this.name = this.$route.query.nams;
  },
  created() {
    this.$http
      .post("hts/management/showDemandtype", {
        aideder_user_id: this.$route.params.id
      })
      .then(res => {
        this.list2 = res.data;
        this.typeCode = this.list2[0].help_type_code;
        this.getAidedList();
        if (this.bottomCount >= this.list2.length) {
          this.block1 = false;
        } else {
          this.block1 = true;
        }
      });
    //   this.typeCode = 
  },
  methods: {
    list(ind, name, num,typecode) {
      this.inde = ind;
      this.names = name;
      this.nums = num;
      this.typeCode = typecode;
      this.getAidedList();
    },
    getAidedList() {
        this.$http.post('hts/management/getAidederUserIdDemand',{
            aideder_user_id : this.$route.params.id,
            help_type_code : this.typeCode
        })
        .then(res =>  {
            this.aidedList = res.data.vos;
        })
    }
  }
};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  background: #eee;
}
._v-content {
  margin-top: 30px;
}
.loading {
  height: 50px;
}
.dsh-header {
  width: 100%;
  height: 50px;
  background: #fff2e9;
}
.dsh-header img {
  width: 26px;
  float: left;
  padding: 10px 10px 0 10px;
}

.dsh-header p {
  float: left;
  width: 80%;
  font-size: 13px;
  padding-top: 5px;
}
.list1 {
  width: 100%;
  height: 100%;
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 33.3%;
      font-size: 13px;
      p {
        border: 1px solid #ccc;
        padding: 3px 5px;
        margin: 10px 0;
        border-radius: 5px;
        background: #fff;
      }
      .bg {
        background: #f37306;
        color: #fff;
      }
    }
  }
}
</style>
