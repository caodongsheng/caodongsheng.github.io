<template>
  <div class="app-container">
    <div class="conheader clearfix" align="right">
      <h3>{{$route.meta.title}}</h3>

    </div>
    <div class="filter-container">
      <el-form :model="detailData" label-position="right" label-width="110px">
        <el-form-item label="ID:"><span>{{detailData.id}}</span></el-form-item>
        <el-form-item label="姓名:"><span>{{detailData.aided_person_name}}</span></el-form-item>
        <el-form-item label="手机号码:"><span>{{detailData.aided_person_tel}}</span></el-form-item>
        <el-form-item label="身份证号:">{{detailData.idcard}}</el-form-item>
        <el-form-item label="与受助人关系:" v-if="this.$route.query.state !== 1">
          {{relationShip}}
          <!-- <el-select v-model="detailData.relation_id" clearable style="width: 160px" class="filter-item" >
                   <el-option v-for="item in relationJson" :label="item.value" :key="item.id" :value="item.id"/>
                </el-select> -->
        </el-form-item>
        <el-form-item label="所在区域:">
          {{detailData.region_name}}
           <!--<linkage @change="linkageChange" :level="level" :level_list="level_list" :province_region_id="detailData.province_region_id" :city_region_id="detailData.city_region_id" :county_region_id="detailData.county_region_id" :village_region_id="detailData.village_region_id" :hamlet_region_id="detailData.hamlet_region_id" />-->
        </el-form-item>
        <el-form-item label="性别:">{{gender}}</el-form-item>
      </el-form>
      <div class="commonList">地址信息
        <span @click="addAddress"><i class="el-icon-circle-plus-outline"></i>新增收货地址</span>
      </div>
      <el-table :data="detailData.userAddrVOs" highlight-current-row>
        <el-table-column align="center" label="收货人" width="160px"  prop="linkman"/>
        <el-table-column align="center" label="所在地区" prop="region_name"/>
        <el-table-column align="center" label="邮编" prop="postcode"/>
        <el-table-column align="center" label="手机号码" prop="link_tel"/>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editAddress(scope.row,scope.$index)">修改</el-button>
            <el-button size="mini" type="primary" @click="deleteAddress(scope.row.id,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="commonList">银行信息
        <span @click="addCredit"><i class="el-icon-circle-plus-outline"></i>新增银行信息</span>
      </div>
      <el-table :data="detailData.userBankVOs" highlight-current-row>
        <el-table-column align="center" label="银行名称" width="160px" prop="bank_name"/>
        <el-table-column align="center" label="开户行名称" prop="open_bank"/>
        <el-table-column align="center" label="账号" prop="bank_account"/>
        <el-table-column align="center" label="收款人" prop="payee"/>
        <el-table-column align="center" label="手机号码" prop="link_tel"/>
        <el-table-column align="center" label="操作" >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editCredit(scope.row,scope.$index)">修改</el-button>
            <el-button size="mini" type="primary" @click="deleteCredit(scope.row.id,scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-button class="filter-item saveBtn" type="primary" @click="save">保存</el-button> -->
    </div>
    <el-dialog
      :visible.sync="centerDeleteVisible"
      width="30%"
      center>
      <span>是否确定删除</span>
      <span slot="footer" class="dialog-footer">
		    <el-button @click="centerDeleteVisible = false">取 消</el-button>
		    <el-button type="primary" @click="confirmDelete">确 定</el-button>
		  </span>
    </el-dialog>
    <dialog-view :dialogVisible.sync="isDialogAddr" :id="deliverAddrId" :data="addressData" @Preservation="getPoorDetail" :state="state1" :level_lists="level_lists" :title="getTitle"></dialog-view>
    <DialogBank :dialogVisible.sync="isDialogBank" :id="deliverBankId" :data="bankData" @Preservation="getPoorDetail" :state="state2"></DialogBank>
  </div>
</template>
<script>
  import linkage from '@/components/linkage'
  import DialogView from '@/components/DialogView'
  import DialogBank from '@/components/DialogBank'

  export default{
    name:'editPoorlist',
    components:{linkage,DialogView,DialogBank},
    data(){
      return{
        state1:'',
        state2:'',
        level_lists:[],
        level_list: JSON.parse(localStorage.leaderarrs),
        level: localStorage.leaderLevel,
        detailData:{},
        centerDeleteVisible:false,
        deleteType:'',//删除收货地址还是银行信息
        addrId:'',
        bankId:'',
        deliverAddrId:'',
        deliverBankId:'',
        addrIndex:'',
        bankIndex:'',
        isDialogAddr:false,
        isDialogBank:false,
        listQuery: {
          province_region_id: undefined,
          city_region_id: undefined,
          county_region_id: undefined,
          village_region_id: undefined,
          hamlet_region_id: undefined,
        },
        addressData:{},
        bankData:{},
        relationJson:[
          {
            "id": "01",
            "value": "本人",
            "name": "本人"
          },
          {
            "id": "02",
            "value": "我帮扶的贫困户",
            "name": "我帮扶的贫困户"
          },
          {
            "id": "03",
            "value": "我认识的贫困户",
            "name": "我认识的贫困户"
          },
          {
            "id": "04",
            "value": "儿子",
            "name": "儿子"
          },
          {
            "id": "05",
            "value": "女儿",
            "name": "女儿"
          },
          {
            "id": "06",
            "value": "亲戚",
            "name": "亲戚"
          },
          {
            "id": "07",
            "value": "朋友",
            "name": "朋友"
          },
          {
            "id": "08",
            "value": "丈夫",
            "name": "丈夫"
          },
          {
            "id": "09",
            "value": "妻子",
            "name": "妻子"
          },
          {
            "id": "10",
            "value": "父亲",
            "name": "父亲"
          },
          {
            "id": "11",
            "value": "母亲",
            "name": "母亲"
          },
          {
            "id": "12",
            "value": "邻居",
            "name": "邻居"
          },
          {
            "id": "13",
            "value": "其他",
            "name": "其他"
          }
        ]
      }
    },
    computed:{
      getTitle(){
       if(this.state1==0){
         return "新增收货地址"
       }
       else{
         return "修改收货地址"
       }
      },
      gender(){
        return this.detailData.gender==0?'女':'男'
      },
      relationShip(){
        for (let i = this.relationJson.length - 1; i >= 0; i--) {
          if(this.detailData.relation_id === this.relationJson[i].id){
            return this.relationJson[i].value
          }
        }
      }
    },
    methods:{
      linkageChange(n) {
        this.listQuery.province_region_id = n[0].id
        this.listQuery.city_region_id = n[1].id
        this.listQuery.county_region_id = n[2].id
        this.listQuery.village_region_id = n[3].id
        this.listQuery.hamlet_region_id = n[4].id
      },
      getPoorDetail(){
        if(this.$route.query.state === 1){
          this.$http.post('hts/management/detailPoor',{aidedId:this.$route.query.id})
            .then(response=>{
              this.detailData=response
            })
        }else{
          this.$http.post('hts/poor/detail',{aidedId:this.$route.query.id})
            .then(response=>{
              this.detailData=response
            })
        }

      },
      addAddress(){
        this.state1 = 0
        this.level_lists = []
        // 新增收货地址
        this.deliverAddrId=this.detailData.id
        this.addressData=undefined
        this.isDialogAddr=true
      },
      addCredit(){
        this.state2= 0
        // 新增银行卡
        this.deliverBankId=this.detailData.id
        this.bankData=undefined
        this.isDialogBank=true
      },
      editAddress(data,index){
        this.state1= 1
        this.level_lists = []
        this.addressData=data
        this.deliverAddrId=this.detailData.userAddrVOs[index].id
        this.isDialogAddr=true
      },
      editCredit(data,index){
        this.state2 = 1
        this.bankData=data
        this.deliverBankId=this.detailData.userBankVOs[index].id
        this.isDialogBank=true
      },
      deleteAddress(id,index){
        // 删除收货地址
        this.centerDeleteVisible=true
        this.deleteType=1
        this.addrId=id
        this.addrIndex=index
      },
      deleteCredit(id,index){
        // 删除银行卡信息
        this.centerDeleteVisible=true
        this.deleteType=2
        this.bankId=id
        this.bankIndex=index
      },
      confirmDelete(){
        debugger
        if(this.deleteType==1){
          // 删除收货地址
          this.confirmDeleteAddress()
        }else if(this.deleteType==2){
          // 删除银行卡信息
          this.confirmDeleteCredit()
        }
      },
      confirmDeleteAddress(){
        // 确认删除地址信息
        this.$http.post('hts/poor/addressDelete',{addrId:this.addrId})
          .then(response=>{
            debugger
            this.detailData.userAddrVOs.splice(this.addrIndex, 1)
            // if(response.code=="HTSI0000"){
            this.centerDeleteVisible=false
            // 	 this.$message('删除成功')
            // }else{
            // 	this.centerDeleteVisible=false
            // 	this.$message.error('删除失败');
            // }
          })
      },
      confirmDeleteCredit(){
        debugger
        // 确认删除银行卡信息
        this.$http.post('hts/poor/bankDelete',{bankId:this.bankId}).
        then(response=>{
          debugger
          this.detailData.userBankVOs.splice(this.bankIndex,1)
          this.centerDeleteVisible=false

        })
      }
    },
    mounted(){
      this.getPoorDetail()
    }
  }
</script>
<style scoped>
  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{margin-bottom: 0px}
  .commonList{padding-bottom: 10px;margin-top: 26px;border-bottom: 1px solid #dcdcdc}
  .commonList i{margin:0 5px 0 10px;color: #409EFF; font-size: 16px}
  .commonList span{font-size: 10px}
  .saveBtn{margin: 20px 0 0 0}
</style>
