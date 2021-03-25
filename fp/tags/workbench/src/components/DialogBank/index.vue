<template lang="html">
  <div class="">
    <el-dialog :title="title" :visible.sync="dialogVisible"  width="1034px" :before-close="handleClose">
      <el-form ref="dataForm" :model="bankForm" label-position="left" label-width="100px" style=" margin-left:30px;" :rules="rules">
        <el-form-item label="收款人" prop="payee">
          <el-input v-model="bankForm.payee" type="text" style="width:200px"/>
        </el-form-item>
        <el-form-item label="银行名称" prop="bank_name">
          <el-input v-model="bankForm.bank_name" type="text"  style="width:200px"/>
        </el-form-item>
        <el-form-item label="开户行名称" prop="open_bank" >
          <el-input v-model="bankForm.open_bank" type="text" style="width:200px"/>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bank_account">
          <el-input v-model="bankForm.bank_account"type="text"  style="width:200px"/>
        </el-form-item>
        <el-form-item label="联系电话" prop="link_tel" >
          <el-input v-model="bankForm.link_tel" type="text" style="width:200px"/>
        </el-form-item>
        <el-form-item label="设为默认银行" prop="is_default">
          <el-radio-group v-model="bankForm.is_default">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="end">取 消</el-button>
        <el-button type="primary" @click="saveBankInfo">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default{
    props:['dialogVisible','id','data'],
    data(){
      return{
        title:"新增银行信息",
        bankForm:{},
        rules:{
          payee:[
            {required:true,message:'请输入收款人',trigger:'blur'}
          ],
          bank_name:[
            {required:true,message:'请输入银行名称',trigger:'blur'}
          ],
          open_bank:[
            {required:true,message:'请输入开户行名称',trigger:'blur'}
          ],
          link_tel: [
            { required: true, message: '请输入手机号码',trigger: 'blur' },
            {
              validator: function (rule, value, callback) {
                var MobileRegex = /^1[0-9]{10}$/;
                if (!MobileRegex.test(value)) {
                  callback(new Error('手机号码格式不正确！'))
                } else {
                  callback();
                }
              },
              trigger: 'blur'
            }
          ],
          bank_account: [
            {required:true,message:'请输入银行卡号',trigger:'blur'},
            { validator: function (rule, value, callback) {
                var MobileRegex = /^[\d]{10,}$/;
                if (!MobileRegex.test(value)) {
                  callback(new Error('请输入正确的银行卡号'))
                } else {
                  callback();
                }
              }, trigger: 'blur'
            }
          ],
        }
      }
    },
    watch:{
      dialogVisible(n){
        if(n){
          this.init()
        }
      }
    },
    methods:{
      init(){
        if(this.data){
          this.bankForm=this.data;
        }
      },
      saveBankInfo(){
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if(this.data){//修改
              let data={
                id:this.id,
                payee:this.bankForm.payee,
                bankName:this.bankForm.bank_name,
                openBank:this.bankForm.open_bank,
                bankAccount:this.bankForm.bank_account,
                linkTel:this.bankForm.link_tel,
                isDefault:this.bankForm.is_default,
              }
              this.$http.post('/hts/poor/bankEdit',data).then(res => {
                this.$message({
                  type: 'success',
                  message: '成功 '
                });
                this.$emit('Preservation')
                this.end()
              })
            }else{//新增
              let data={
                userId:this.id,
                payee:this.bankForm.payee,
                bankName:this.bankForm.bank_name,
                openBank:this.bankForm.open_bank,
                bankAccount:this.bankForm.bank_account,
                linkTel:this.bankForm.link_tel,
                isDefault:this.bankForm.is_default,
              }
              this.$http.post('/hts/poor/bankSave',data).then(res => {
                this.$message({
                  type: 'success',
                  message: '成功 '
                });
                this.$emit('Preservation')
                this.end()
              })
            }
          }else {
            return false;
          }
        })
      },
      end(){
        this.$emit('update:dialogVisible', false);//1编辑
        this.$refs['dataForm'].resetFields();
        this.bankForm={}
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.end()
            // done();
          }).catch(_ => {});
      }
    }
  }
</script>
