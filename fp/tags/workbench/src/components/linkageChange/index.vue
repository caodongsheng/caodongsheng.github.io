<template>
  <div class="box">
    <el-select
      v-for="(vt,index) in sel_list"
      v-if="(index+1)>=level&&(index+1)<=sel_list.length-qlevel"
      :disabled="readonly"
      v-model="vt.id"
      :placeholder="vt.placeholder"
      :key="vt.placeholder+vt.id"
      clearable
      style="width: 160px"
      class="filter-item padd">
      <el-option v-for="item in vt.list" :key="item.id" :label="item.regionName" :value="item.id"/>
    </el-select>
  </div>
</template>
<script>
  export default {
    props: ['readonly','qlevel','index','level', 'level_list','province_region_id','city_region_id','county_region_id','village_region_id','hamlet_region_id'],
    data() {
      return {
        flag:true,
        for_index:0,
        id:'',
        arrs:[
          this.province_region_id,
          this.city_region_id,
          this.county_region_id,
          this.village_region_id,
          this.hamlet_region_id
        ],
        sel_list: [
          {
            regionName: '',
            placeholder: '省',
            id: '',
            list: []
          },
          {
            regionName: '',
            placeholder: '市',
            id: '',
            list: []
          },
          {
            regionName: '',
            placeholder: '县',
            id: '',
            list: []
          },
          {
            regionName: '',
            placeholder: '乡',
            id: '',
            list: []
          },
          {
            regionName: '',
            placeholder: '村',
            id: '',
            list: []
          }
        ]

      }
    },
    computed: {
      name1() {
        return this.sel_list[0].id
      },
      name2() {
        return this.sel_list[1].id
      },
      name3() {
        return this.sel_list[2].id
      },
      name4() {
        return this.sel_list[3].id
      },
      name5() {
        return this.sel_list[4].id
      }
    },
    watch: {
      name1(n, v) {
        this.fn(0, n)
      },
      name2(n, v) {
        this.fn(1, n)
      },
      name3(n, v) {
        this.fn(2, n)
      },
      name4(n, v) {
        this.fn(3, n)
      },
      name5(n, v) {
        this.fn(4, n)
      }
    },
    mounted() {
      if(this.level_list.length===0 ){
        this.getRegionListById(-1,100)
      }else{
        this.sel_list[(this.level - 1)].list = this.level_list;
        if(this.province_region_id==='' || this.province_region_id===undefined &&
          this.city_region_id ==='' || this.city_region_id === undefined &&
          this.county_region_id ==='' || this.county_region_id === undefined &&
          this.village_region_id ==='' || this.village_region_id === undefined &&
          this.hamlet_region_id ==='' || this.hamlet_region_id === undefined){
        }else{
          this.init()
        }
      }
    },
    methods: {
      init(){
        this.for_index=this.level-1;
        let time=setInterval(()=>{
          if(this.flag){
            if(this.for_index>=this.level-1){
              if(this.arrs[this.for_index]!=='' && this.arrs[this.for_index] !== undefined){
                this.flag=false;
                this.sel_list[this.for_index].id=this.arrs[this.for_index];
              }
            }
          }
          if(this.for_index===(this.sel_list.length-1)){
            clearInterval(time)
          }
        },100)
      },
      getRegionListById(index, id) {
        this.$http.post('eai/authRegion/selectDate', { 'parentId': id }).then(data => {
          this.sel_list[index + 1].list = data
          this.flag=true;
          this.for_index++;
        })
      },
      fn(n, id) {
        this.id = id
        for (let i = 0; i < this.sel_list.length; i++) {
          if (i <= n) {
            if(i===n){
              let obj = {};
              obj = this.sel_list[i].list.find((item)=>{
                return item.id === id;//筛选出匹配数据
              });
              if(obj){
                this.sel_list[i].regionName=obj.regionName
              }else{
                this.sel_list[i].regionName=''
              }
            }
          } else {
            this.sel_list[i].list = []
            this.sel_list[i].id = ''
          }
        }
        if (n!==4 && id) {
          this.getRegionListById(n, id)
        }
        this.$emit('change', this.sel_list,this.index,this.id)
      }
    }
  }
</script>

<style lang="scss">
  .box{
    display: inline-block;
    margin-bottom: 10px;
  }
  .padd{
    margin-right: 10px;
  }
 .filter-item{
    margin-bottom: 0;
  }
</style>
