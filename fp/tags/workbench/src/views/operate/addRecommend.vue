<template lang="html">
    <div class="">
        <el-dialog title="栏目配置" :visible.sync="visible" @close="end" :show-close='false' :close-on-press-escape='false' :close-on-click-modal='false'>
          <el-form :model="form" :rules="rules">
              <el-form-item label="推荐地区：" :label-width="wi" prop="name">
                  <linkage :level="level" :level_list="level_list" num="3" @change="linkageChange"
                      v-if="visible && isLoading"
                      open="true"
                      :province_region_id="linkage.province_region_id"
                      :city_region_id="linkage.city_region_id"
                      :county_region_id="linkage.county_region_id"
                      :village_region_id="linkage.village_region_id"
                      :hamlet_region_id="linkage.hamlet_region_id"/>
              </el-form-item>
            <el-form-item label="帮扶类型：" :label-width="wi" prop="type">
              <el-select v-model="form.helpTypeCode"  placeholder="请选择展示位置">
                <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in helpType"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品名称：" :label-width="wi" prop="helpTypeName">
              <el-input v-model="form.helpTypeName" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="icon小图：" :label-width="wi" prop="iconUrl">
                <div class="asd1">
                    <el-upload
                        class="avatar-uploader2"
                        :action="ImgUrl"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccessIcon"
                        :before-upload="beforeAvatarUploadIcon">
                        <img v-if="form.iconUrl" :src="form.iconUrl" class="avatar" alt="加载失败">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <span>该位置图片大小为：54*54</span>
                <span style="color:#f00 ;font-size:12px" v-if="form.iconUrl">点击图片即可替换图片</span>
            </el-form-item>
            <el-form-item label="栏目图片：" :label-width="wi" prop="bannerPicUrl">
                <div class="asd2">
                    <el-upload
                        class="avatar-uploader"
                        :action="ImgUrl"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="form.bannerPicUrl" :src="form.bannerPicUrl" class="avatar" alt="加载失败">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </div>
                <span style="color:#f00;font-size:12px" v-if="form.bannerPicUrl">点击图片即可替换图片</span>
            </el-form-item>
            <el-form-item label="链接地址：" :label-width="wi" prop="bannerLinkUrl">
              <el-input v-model="form.bannerLinkUrl" style="width:200px;"></el-input>
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
import linkage from '@/components/linkage'
export default {
    props:['visible','bannerid'],
    components:{
        linkage
    },
    data(){
        return {
            ImgUrl:process.env.BASE_API+'/cfs/file/uploads',
            isLoading:true,
            linkage:{
                province_region_id:'',
                city_region_id:'',
                county_region_id:'',
                village_region_id:'',
                hamlet_region_id:'',
            },
            level_list: JSON.parse(localStorage.leaderarrs),
            level: localStorage.leaderLevel,
            form: {
                regionId:'',
                helpTypeCode:'',
                helpTypeName:'',
                linkUrl:'',
                iconUrl:'',
                bannerLinkUrl:'',
                bannerPicUrl:'',
                id:'',
            },
            rules:{
                name:[{ required: true, message: ' ', trigger: 'change' }],
                type:[{ required: true, message: ' ', trigger: 'change' }],
                helpTypeName:[{ required: true, message: '请输入产品类名', trigger: 'change' }],
                iconUrl:[{ required: true, message: '请输入icon图标', trigger: 'change' }],
                bannerPicUrl:[{ required: true, message: '请输入栏目图片', trigger: 'change' }],
                bannerLinkUrl:[{ required: true, message: '请输入跳转的地址', trigger: 'change' }]
            },
            relations: [{id:1,name:"App"},{id:2,name:"微信"},{id:0,name:"PC"}],
            helpType: [{id:1,name:"教育帮扶"},{id:2,name:"医疗帮扶"},{id:3,name:"住房帮扶"},{id:4,name:"物品帮扶"}],
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
    mounted(){

    },
    methods:{
        reSet(){
            this.isLoading=false;
            this.form = {
                regionId:'',
                helpTypeCode:'',
                helpTypeName:'',
                linkUrl:'',
                iconUrl:'',
                bannerLinkUrl:'',
                bannerPicUrl:'',
                id:'',
            }
            this.isLoading=true
        },
        getData(id){
            let data={
                id:id
            }
            this.isLoading=false;
            this.$http.post('hts/management/editColumn', data).then(res => {
                this.form=res;
                this.form.helpTypeCode=parseInt(res.helpTypeCode)
                let arr=res.allParentRegionId.split(",")
                this.linkage.province_region_id=arr[0]?arr[0]:''
                this.linkage.city_region_id=arr[1]?arr[1]:''
                this.linkage.county_region_id=arr[2]?arr[2]:''
                this.isLoading=true;
            })
        },
        linkDateChange(n){
            this.linkage.province_region_id=n[0].id
            this.linkage.city_region_id=n[1].id
            this.linkage.county_region_id=n[2].id
            this.linkage.village_region_id=n[3].id
            this.linkage.hamlet_region_id=n[4].id
        },
        linkageChange(n){
            let num=true;
            for(let i=0;i<n.length;i++){
                if(n[i].id!=''){
                    num=false;
                    this.form.regionId=n[i].id;
                }
            }
            if(num){
                this.form.regionId=''
            }
        },
        subFn(){
            this.$http.post('hts/management/addColumn', this.form).then(response => {
                this.$notify({
                    title: '提示：',
                    duration:2000,
                    type:'success',
                    message: '保存成功'
                  });
                  this.$emit('upData')
                this.end()
            })
        },
        sub(){
            if(this.bannerid && this.bannerid != ''  && this.bannerid != undefined ){
                this.form.id=this.bannerid
                this.upSubFn()
            }else{
                this.form.id=''
                this.subFn()
            }
        },
        upSubFn(){
            this.$http.post('hts/management/updateColumn', this.form).then(response => {
                this.$notify({
                    title: '提示：',
                    duration:2000,
                    type:'success',
                    message: '保存成功'
                  });
                  this.$emit('upData')
                this.end()
            })
        },
        end(){
            this.$emit('update:visible',false)
        },

        handleAvatarSuccess(e,a){
            if(e.status==200){
                this.form.bannerPicUrl=e.urls;
                // this.$set(this.form,'bannerPicUrl', e.urls)
            }else{
                alert('图片上传失败')
            }
        },
        handleAvatarSuccessIcon(e,a){
            console.log(e)
            if(e.status==200){
                this.form.iconUrl=e.urls
            }else{
                alert('图片上传失败')
            }
        },
        beforeAvatarUpload(e,a){
            console.log('1231231312312',e,a)
        },
        beforeAvatarUploadIcon(e,a){
            console.log('1231231312312',e,a)
        },
    }
}
</script>

<style scoped lang="scss">
  .asd1{
      .avatar-uploader .el-upload {
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
        width: 54px;
        height: 54px;
        line-height: 54px;
        text-align: center;
      }
      .avatar {
        width: 54px;
        height: 54px;
        display: block;
      }
  }
  .asd2{
      .avatar-uploader .el-upload {
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
        width: 198px;
        height: 100px;
        line-height: 100px;
        text-align: center;
      }
      .avatar {
        width: 198px;
        height: 100px;
        display: block;
      }
  }
</style>
