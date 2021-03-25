<template>
  <div class="box">
    <el-select
      v-for="(vt,index) in sel_list"
    
     
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
    props: ['province_region_id','city_region_id','county_region_id','village_region_id','hamlet_region_id'],
    data() {
      return {
  
       
        sel_list: [
          {
            regionName: '',
            placeholder: '省',
            id: this.province_region_id,
            list: []
          },
          {
            regionName: '',
            placeholder: '市',
            id: this.city_region_id,
            list: []
          },
          {
            regionName: '',
            placeholder: '县',
            id: this.county_region_id,
            list: []
          },
          {
            regionName: '',
            placeholder: '乡',
            id: this.village_region_id,
            list: []
          },
          {
            regionName: '',
            placeholder: '村',
            id: this.hamlet_region_id,
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
    created(){
     
    },
    mounted() {
    
     //if(this.province_region_id!="")
     //{
       this.getRegionListById(-1,100)
     //}
    
     
    },
    methods: {
   
       getRegionListById(index, id) {
        
         this.$http.post('eai/authRegion/selectDate', { 'parentId': id }).then(data => {
      
         if(this.sel_list[index+1]){
           this.sel_list[index + 1].list = data
           if(this.sel_list[index+1].id!=""&&this.sel_list[index+1].list.length>0){
           let arr = data.filter(item=>item.id===this.sel_list[index+1].id)     
           if(arr.length>0){    
           this.sel_list[index+1].regionName =arr[0].regionName
        
           this.getRegionListById(index+1, this.sel_list[index+1].id) 
           }
           }
           else{
               this.$emit('init', this.sel_list)
           return false;
           }
          }
          else{
              this.$emit('init', this.sel_list)
           return false;
          }
        
        })
      },
      fn(n, id) {
        this.id = id
        for (let i = 0; i < this.sel_list.length; i++) {
         // this.sel_list[i].list = []
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
     
        this.$emit('change', this.sel_list)
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
  .filter-container .filter-item{
    margin-bottom: 0;
  }
</style>
