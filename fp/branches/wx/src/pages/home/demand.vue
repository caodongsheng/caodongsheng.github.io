<template>
  <div class="bg-f6f5f6 h" id="mainContent">
    <div class="tabdiv">
      <selectTab ref="selectTab" :datas='selects' @getdatas="getdatas" :code='this.$route.params.id'></selectTab>
      <selectReg v-if="city.cooperation==1" :datas='selects2' @getdatas="getdatas" ></selectReg>
      <selectRegion :datas='selects2' @getdatas="getdatas" v-else></selectRegion>
    </div>
    <scroller
      style="top:39px"
      v-if='demandlist.length !== 0'
      :on-refresh="refresh"
      ref="scroller"
      :on-infinite="infinite"
      refresh-layer-color="#4b8bf4"
      loading-layer-color="#ec4949">
      <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
        <g stroke-width="7" stroke-linecap="round">
          <line x1="10" x2="10" y1="27.3836" y2="36.4931">
            <animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate>
            <animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate>
          </line>
          <line x1="24" x2="24" y1="18.6164" y2="45.3836">
            <animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate>
            <animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate>
          </line>
          <line x1="38" x2="38" y1="16.1233" y2="47.8767">
            <animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate>
            <animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate>
            <animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate>
          </line>
          <line x1="52" x2="52" y1="16" y2="48"><animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate><animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate><animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate></line></g></svg>
      <slot>
        <recommand :item="item1" :type="item1.re_template"  v-for="(item1,index) in demandlist" :key="index"></recommand>
      </slot>
      <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
        <g><circle cx="16" cy="32" stroke-width="0" r="3"><animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate></circle><circle cx="32" cy="32" stroke-width="0" r="3.09351"><animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate></circle><circle cx="48" cy="32" stroke-width="0" r="4.09351"><animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate><animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate></circle></g></svg>
    </scroller>
    <!-- <div v-if="demandlist.length == 0" class="nomatch">
      没有更多数据
    </div> -->
  </div>
</template>
<script>
  import recommand from '@/components/recommand/recommand'
  import selectTab from '@/components/select/selectTab'
  import scrolltemplate from '@/components/scroll/scrollcomponent'
  import selectRegion from '@/components/select/selectRegion'
  import selectReg from '@/components/select/selectReg'
  import { setTimeout } from 'timers';
  import { mapState,mapActions } from 'vuex'
  import Bus from './Bus.js'
  export default {
    components: {
      selectTab,
      recommand,
      scrolltemplate,
      selectRegion,
      selectReg
    },
    data () {
      return {
        help_type_code: '',
        page: 1,
        end: false,
        demandlist: [],
        sort: '',
        cateGoryRelate:'',
        cityId: this.$store.state.id,
        totals:0,
        temp: '',
        routePath:'',
        routerPath: '',
        selects: [
          {
            title: '综合排序',
            type: 2,
            typefor: 2,
            list_index: 0, // 当前选中item
            list: ['综合排序', '即将完成']
          },
          // {
          //   title: '分类',
          //   type: 2,  // 是否下拉形式
          //   typefor: 1,  // 下拉样式
          //   ischeckbox: false, // true 多选   false 单选
          //   list_index: -1, // 选中默认值
          //   demand: 0, // 0 需求 1 地域
          //   parmas_id:1,
          //   list: []  // tree数据，selecthttp.js 加载
          // }
        ],
        selects2: [
          {
            title: '地域',
            type: 2,  // 是否下拉形式
            typefor: 1,  // 下拉样式
            list_index: -1, // 选中默认值
            demand: 0, // 0 需求 1 地域
            parmas_id:"",
            list: [],  // tree数据，selecthttp.js 加载
            hisstoryisShow:false       //历史记录是否显示
          }
        ],
        lastCity:'',
        nams:''
      }
    },
    methods: {
      getdatas (datas) {
        this.demandlist = [];
        if(datas[1] && datas[1].category_name === "全部分类"){
          this.cateGoryRelate = ''
        }else if(datas[1] && datas[1].category_name === "城市"){
          if(this.sort==1){
             datas[0] = '即将完成';
          }
          else{
            datas[0] = '综合排序';
          }
          this.cityId = datas[1].id;
        }else{
          // this.cateGoryRelate=datas[1].id
          this.cateGoryRelate=''
        }
        // if(datas[1].category_name === "贵州省"){
        //   this.cateGoryRelate=datas[1].id
        //   this.cityId=datas[1].id
        // }
        if(datas[0] === '综合排序' && datas[1]){
          let ret = []
          for(let i in datas[1].nodes){
            let k = datas[1].nodes[i]
            ret.push(k.id)
            this.cateGoryRelate = `${ret.join(',')}`
          }
        }
        if(datas[1] && datas[1].category_name === "全部分类"){
          this.cateGoryRelate = ''
        }else if(datas[1] && datas[1].category_name === "城市"){
          this.cityId = datas[1].id;
        }else{
          // this.cateGoryRelate=datas[1].id
          this.cateGoryRelate=''
        }
        console.log(datas)
        if(datas[0] === '综合排序' && datas[1]){
          let ret = []
          for(let i in datas[1].nodes){
            let k = datas[1].nodes[i]
            ret.push(k.id)
            this.cateGoryRelate = `${ret.join(',')}`
          }
        }
        this.page = 1;
        if(datas[0] === '即将完成'){
          this.sort = 1;
        }else{
          this.sort = '';
        }
        this.getDemands();
      },
      recordScrollPosition(e) {
          this.$store.dispatch('savePosition', e.target.scrollTop)
      },
      getDemands (done) {
        let self = this
        let cooperation=this.$store.state.city.cooperation
        let cityId=this.cityId
        console.log('cityId',cityId,'====',this.$store.state.city.id)
        if(cityId!=this.$store.state.city.id){
          cooperation=2
        }
        let msg = {
          page: this.page,
          pagesize:10,
          sort: this.sort,
          help_type_code: this.help_type_code,
          region_id: cityId,
          isAll:cooperation,
          // counterpart:this.lastCity,
        }
        if(this.cateGoryRelate !== ''){
          msg.cateGoryRelate=this.cateGoryRelate
        }
        this.$http.post('hts/help/getAllDemand', msg).then(function (response) {
            self.demandlist = [...self.demandlist,...response.data.vos]
            self.totals = response.data.totals;
            if(done){
              done(true)
            }
        })
      },
      infinite (done) {
        setTimeout(()=>{
            if(this.demandlist.length < this.totals) {
                this.page++;
                this.getDemands(done)
            }else {
                done(true);
            }
        },1000)
      },
      refresh(done){
        setTimeout(()=>{
          this.page = 1;
          this.demandlist = [];
          this.getDemands();
          done();
        },1000)
      },
     
      getBf () {
        this.selects2.parmas_id = []
        let msg = {
          regionId: this.lastCity || ''
        }
        let ret = []
        let city = this.city;
        ret.unshift({id: city.id, regionName: city.name});
        this.$http.post('hts/help/getCounterpart', msg).then((res) => {
          let retId = res.data
          for (let i in retId) {
            let msg = {
              id: null,
              regionName: null
            }
            let regArr = retId[i].region_name.split(' ')
            msg.id = retId[i].duikou_region_id
            if(regArr.length === 1){
              msg.regionName = regArr[0]
            }
            msg.regionName = regArr[regArr.length-1]
            ret.push(msg)
            this.selects2[0].parmas_id = ret;
          }
        })
      },
    },
    computed: {
      ...mapState(['city']),
      getLocalCity() {
          return this.$store.state.city;
      }
    },
    // created() {
    // //     this.page = 1
    // //   this.demandlist = [];
    //   this.help_type_code = this.$route.params.id
    //   this.lastCity = this.city.id
    // //   this.getDemands(this.lastCity)
    //   this.getBf()
    //   Bus.$on('clickUpdate',(e) => {
    //     this.nams = e
    //   })
    // },
    mounted () {
      this.page = 1
      this.demandlist = [];
      this.help_type_code = this.$route.params.id
      this.lastCity = this.city.id
      this.cityId= this.city.id
      this.getDemands(this.lastCity)
      this.getBf()
      Bus.$on('clickUpdate',(e) => {
        this.nams = e
      })

    },
    //  beforeUpdate() {
    //     this.$nextTick(function () {
    //         //返回页面时取出Postion
    //         let position = this.$store.state.position;
    //         window.scroll(0, position);
    //     })
    // },
    activated(){
        this.routePath = this.$route.path.substr(1,7)
        // if(this.$refs.scroller && sessionStorage.getItem('demand5')) {
            
        //     setTimeout(() => {
        //         this.$refs.scroller.scrollTo(0, sessionStorage.getItem('demand5'),false)
        //     },0)
        // }
        this.L('flag',1)
      if (this.lastCity !== this.city.id) {
        this.lastCity = this.city.id
        this.demandlist = [];
        this.page = 1;
        this.selects2[0].parmas_id = [];
        this.getBf()
        this.getDemands()
      }
      if(this.nams){
        this.demandlist = [];
        this.getDemands(true)
      }
      if(this.routerPath !== '') {
          this.demandlist = [];
          this.getDemands(true)
      }
    },
    deactivated() {
        // console.log('deactived',this.$refs.scroller.getPosition().top
        //将需求列表页滚动位置保存到sessionStorage中
        switch(this.routePath) {
            case 'demand5':
                sessionStorage.setItem('demand5',this.$refs.scroller.getPosition().top)
                    break;
            case 'demand2':
                sessionStorage.setItem('demand2',this.$refs.scroller.getPosition().top)   
                    break;
            case 'demand4':
                sessionStorage.setItem('demand4', this.$refs.scroller.getPosition().top)   
                break;
            case 'demand3':
                sessionStorage.setItem('demand3', this.$refs.scroller.getPosition().top)  
                break;
       }
       //离开列表页时 重新清空routerPath,防止下次进来再次请求接口
       this.routerPath = ''
      
    },
      watch: {
            '$route' (to, from) {
                // this.page = 1
                // this.demandlist = []
                // this.help_type_code = to.params.id;
                // this.lastCity = this.city.id
                // this.getDemands(this.lastCity);
                // this.getBf()
                // Bus.$on('clickUpdate',(e) => {
                //     this.nams = e
                // })
                if(from.path.indexOf('certificate') !== -1) {
                    this.routerPath = from.path
                }

            },
            getLocalCity: function(newVal, oldVal) {
                // this.refresh();
                // this.getBf();
            }

        }
  }
</script>

<style scoped>
  .tabdiv{
    width: 100%;
    display: flex;
  }
  .h{
    height: 100%;
    position: absolute;
    width: 100%;
  }
  .nomatch {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    color: rgb(236, 73, 73);
    line-height: 80px;
  }

</style>
