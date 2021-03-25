<template>
    <div class="box">
            <div class="list" v-for="(item,index) in lis" :key="index" @click="medicalList(item)">
                <dl>
                    <dt><img :src="item.img_url" alt=""></dt>
                    <dd>
                        <h4>{{item.demand_title}}</h4>
                        <p class="tit-2row-nowrap">{{item.demand_coment}}</p>
                    </dd>
                </dl>
                <ul>
                    <li :class="getclor(item)">{{helpstate(item)}}</li>
                    <li class="time">{{item.create_date}}</li>
                </ul>
            </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["lis"],
  data() {
    return {
      state: []
    };
  },
  methods: {
    medicalList(list) {
      this.$router.push({
        name: "allStatus",
        params: {
          id: list.id
        }
      });
    },
    helpstate: function(item) {
      let oj = this.state.find(n => n.code == item.demand_status);
      return oj.value;
    },
    getclor:function (item) {
      switch (item.demand_status) {
        case 1:
          return "color-orange";
          break;
        case 2:
        return "color-red";
        break;
        case 9:
          return "color-red";
          break;
        default:
          return "color-green";
          break;
      }
    },
    
  },
  computed: {
    ...mapState(["alljson"])
  },
  created() {
    this.state = this.alljson.DemandStatusEnum;
   
  }
};
</script>
<style lang="less" scoped>
.box {
  .list {
    background: #fff;
    margin-top: 10px;
  }

  dl {
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    dt {
      padding: 0 10px;
      img {
        width: 110px;
        height: 80px;
      }
    }
    dd {
      p {
        font-size: 13px;
        color: #ccc;
      }
    }
  }
  ul {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    li {
      padding: 0 10px;
      font-size: 13px;
    }
    .time {
      color: #ccc;
    }
    .orange1 {
      color: orange;
    }
    .green1 {
      color: green;
    }
    .red1 {
      color: red;
    }
  }
}
</style>
