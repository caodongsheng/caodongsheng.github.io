<template lang="html">
    <div class="">
        <el-dialog title="新增Bannner" :visible.sync="visible" @close="end" :show-close='false' :close-on-press-escape='false' :close-on-click-modal='false'>
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
            <el-form-item label="推荐位置：" :label-width="wi" prop="name">
              <el-select v-model="form.platform"  placeholder="请选择展示位置">
                <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in relations"></el-option>
              </el-select>
              <div style="color:#f00 ;font-size:12px">您选择的是APP平台，该位置图片大小为：750*350</div>
            </el-form-item>
            <el-form-item label="标题：" :label-width="wi" >
              <el-input v-model="form.title" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="Banner图：" :label-width="wi" prop="name">
                <el-upload
                    class="avatar-uploader"
                    :action="ImgUrl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="form.coverPic" :src="form.coverPic" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span style="color:#f00 ;font-size:12px" v-if="form.coverPic">点击图片即可替换图片</span>
            </el-form-item>
            <el-form-item label="链接：" :label-width="wi" prop="linkUrl">
              <!-- <el-select v-model="form.type"  placeholder="需求ID">
                <el-option :label="item.name" :value="item.id" :key="item.id" v-for="item in types"></el-option>
              </el-select> -->
              <el-input v-model="form.linkUrl" style="width:200px;" placeholder="请输入URL地址"></el-input>
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
                platform:1,
                coverPic:'',
                linkUrl:'',
                positionId:'459072868383195136',
                title:'',
                id:'',
            },
            rules:{
                name:[{ required: true, message: ' ', trigger: 'change' }],
                linkUrl:[{ required: true, message: '请输入要跳转的链接地址', trigger: 'change' }]
            },
            relations: [
                {id:1,name:"App"},
                // {id:2,name:"微信"},
                // {id:0,name:"PC"}
            ],
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
                platform:1,
                coverPic:'',
                linkUrl:'',
                positionId:'459072868383195136',
                title:'',
                id:'',
            }
            this.isLoading=true
        },
        getData(id){
            let data={
                id:id
            }
            this.isLoading=false;
            this.$http.post('hts/management/editBanner', data).then(res => {
                this.form=res;
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
            console.log('---',this.form.regionId)
        },
        subFn(){
            this.$http.post('hts/management/addBanner', this.form).then(response => {
                this.$notify({
                    title: '提示：',
                    duration:2000,
                    type:'success',
                    message: '保存成功'
                  });
                this.$emit('upData')
                this.end();
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
            this.$http.post('hts/management/updateBanner', this.form).then(response => {
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
            console.log('asdas',e,a)
            if(e.status==200){
                this.form.coverPic=e.urls
            }else{
                alert('图片上传失败')
            }
        },
        beforeAvatarUpload(e,a){
            console.log('1231231312312',e,a)
        },
    }
}
</script>

<style scoped>
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
</style>
