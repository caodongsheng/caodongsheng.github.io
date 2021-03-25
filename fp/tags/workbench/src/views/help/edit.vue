127<template lang="html">
    <div class="">
        <el-dialog title="编辑" :visible.sync="visible" @close="end" :show-close='false' :close-on-press-escape='false' :close-on-click-modal='false'>
          <el-form :model="form" :rules="rules">
            <el-form-item label="需求ID:" :label-width="wi" >
              {{id}}
            </el-form-item>
            <el-form-item label="需求类型:" :label-width="wi" >
              {{form.demandType==1?'物品':'资金'}}
            </el-form-item>
            <el-form-item label="需求标题:" :label-width="wi" prop="demandTitle">
              <el-input v-model="form.demandTitle" style="width:400px;"></el-input>
            </el-form-item>
            <el-form-item label="目标金额:" v-if="form.demandType==2" :label-width="wi"  prop="targetAmount">
              <el-input v-model="form.targetAmount" style="width:200px;" disabled></el-input>
              <span style="color:red;font-size:12px;"> 金额不可编辑，如需修改请联系发布人!</span>
            </el-form-item>
            <el-form-item label="需求详情:" :label-width="wi" prop="demandDetails">
              <el-input type="textarea"  v-model="form.demandDetails" style="width:400px;" :autosize="{ minRows: 4, maxRows: 10 }" resize="none"></el-input>
            </el-form-item>
            <el-form-item label="图片：" :label-width="wi" prop="name">
                <!-- <div class="imgs">
                    <div class="position"  v-for="(item,index) in imgArr">
                        <div class="end" @click="deteleImg(item,index)">
                            <span></span>
                        </div>
                        <img :src="item" alt="">
                    </div>
                    <el-upload
                        class="avatar-uploader"
                        :action="ImgUrl"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div> -->
                <slick :datas="imgArr" @album="album"></slick>
            </el-form-item>
            <el-form-item label="编辑原因:" :label-width="wi" prop="editReason">
              <el-input type="textarea"  v-model="form.editReason" style="width:400px;" :autosize="{ minRows: 4, maxRows: 10 }" resize="none"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="end">取 消</el-button>
            <el-button type="primary" @click="sub">保 存</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
import slick from '@/components/slick'
export default {
    components:{
      slick
    },
    props:['visible','id'],
    data(){
        return {
            piclist:[],
            ImgUrl:process.env.BASE_API+'/cfs/file/uploads',
            imgArr:[],
            form: {
             demandTitle:'',
             demandType:'',
             demandDetails:'',
             relatePics:'',
             targetAmount:'',
             editReason:'',
            },
            rules:{
                demandTitle:[{ required: true, message: '请输入标题', trigger: 'change' }],
                demandDetails:[{ required: true, message: '请输入详情', trigger: 'change' }],
                targetAmount:[{ required: true, message: '请输入金额', trigger: 'change' }]
            },

            relations: [{id:0,name:"App"},{id:1,name:"微信"},{id:3,name:"Web"}],
            types:[
                {
                    id:0,
                    name:'需求ID',
                    placeholder:'请输入正确需求ID'
                },
                {
                    id:1,
                    name:'商品链接',
                    placeholder:'请输入正确商品链接'
                },
                {
                    id:2,
                    name:'扶贫项目链接',
                    placeholder:'请输入正确扶贫项目链接'
                },
            ],
            wi:'100px'
        }
    },
    methods:{
        sub(){
            this.$http.post("/hts/management/updateDemand", this.form)
              .then(res => {
                  this.$notify({
                      title: '提示：',
                      duration:2000,
                      type:'success',
                      message: '保存成功'
                    });
                  this.end()
              });
        },
        album(picArr){
          let asd=picArr.join(',')
          this.form.relatePics=asd
        },
        deteleImg(item,index){
            this.imgArr.splice(index,1)
        },
        end(){
            this.$emit('update:visible',false)
        },
        handleAvatarSuccess(e,a){
            console.log('asdas',e,a)
            if(e.status==200){
                this.imgArr.push(e.urls)
            }else{
                alert('图片上传失败')
            }
        },
        beforeAvatarUpload(e,a){
            console.log('1231231312312',e,a)
        },
        getList(){
            this.$http.post("/hts/management/editDemandEcho", {
                id:this.id
            })
              .then(res => {
                  this.form=res;
                  this.imgArr=res.relatePics.split(",")
              });
        }
    },
    mounted(){
        this.getList()
        console.log('-----------------------------')
    }
}
</script>

<style scoped lang="scss">
.avatar-uploader{
    display: inline-block;
}
  .avatar-uploader .el-upload {
    display: inline-block;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    border: 1px dashed #d9d9d9;
    width: 127px;
    height: 127px;
    line-height: 127px;
    text-align: center;
  }
  .avatar {
    width: 127px;
    height: 127px;
    display: block;
  }
  .imgs{
      .position{
          float: left;
          position: relative;
      }
      img{
          width: 127px;
          height: 127px;
          margin-right: 9px;
          margin-bottom: 9px;
          object-fit: cover;

      }
      .end{
        position: absolute;
        right: 0px;
        width: 20px;
        height: 20px;
        top: -10px;
        border-radius: 50%;
        background: #666;
        cursor: pointer;
        span{
            position: absolute;
            width: 14px;
            margin-left: 3px;
            transform: rotate(45deg);
            height: 2px;
            background-color: #fff;
            top: 9px;
            &::after{
                content:"";
                display:block;
                width: 14px;
                transform: rotate(90deg);
                height: 2px;
                background-color: #fff;
            }
        }
      }
  }
</style>
