<template lang="html">
    <div class="">
        <el-dialog title="需求详情" :visible.sync="visible"  @close="end" :show-close='false' :close-on-press-escape='false' :close-on-click-modal='false'>
          <el-form :model="form" :rules="rules" >
              <!-- <el-form-item label="选择区划：" :label-width="wi" >
                  <linkage :level="level" :level_list="level_list" num="3" @change="linkageChange"
                  open="true"
                  :province_region_id="linkage.province_region_id"
                  :city_region_id="linkage.city_region_id"
                  :county_region_id="linkage.county_region_id"
                  :village_region_id="linkage.village_region_id"
                  :hamlet_region_id="linkage.hamlet_region_id"/>
              </el-form-item> -->
              <el-form-item label="帮扶类型：" :label-width="wi" >
                <span>{{typeFn(form.helpTypeCode)}}</span>
              </el-form-item>
            <el-form-item label="需求ID：" :label-width="wi" >
              <el-input v-model="form.demandId" style="width:200px;" :disabled="disabled" ></el-input>
            </el-form-item>
            <el-form-item label="推荐标题：" :label-width="wi" prop="linkUrl" v-if="form.demandTitle!=''">
              <span>{{form.demandTitle}}</span>
            </el-form-item>
            <el-form-item label="封面图片：" :label-width="wi" prop="linkUrl" v-if="form.relatePics!=''">
              <img :src="form.relatePics" alt="加载失败" width="300">
              <div style="color:#F37306;font-size:12px;">默认需求的第一张图片，如需要修改请到“对接管理”中修改</div>
            </el-form-item>
            <el-form-item label="描述：" :label-width="wi" prop="linkUrl" v-if="form.demandDetails!=''">
              <span style="line-height:12px;">{{form.demandDetails}}</span>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="end">取 消</el-button>
            <el-button type="primary" @click="sub" v-if="!disabled && form.demandDetails!=''" :disabled="!disa">推 荐</el-button>
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
            isLoading:true,
            types:'',
            disabled:true,
            disa:true,
            timer:2000,
            timeFn:null,
            regionId:'',
            columnId:'',
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
                demandTitle:'',
                demandId:'',
                demandDetails:'',
                relatePics:'',
                helpTypeCode:''
            },
            rules:{
                name:[{ required: true, message: ' ', trigger: 'change' }],
                linkUrl:[{ required: true, message: '请输入要跳转的链接地址', trigger: 'change' }]
            },
            wi:'100px'
        }
    },
    mounted(){
        let id=JSON.parse(localStorage.leaderarrs)[0].id
        if(this.level==1){
            this.linkage.province_region_id=id
        }else if(this.level==2){
            this.linkage.city_region_id=id
        }else if(this.level==3){
            this.linkage.county_region_id=id
        }else if(this.level==4){
            this.linkage.village_region_id=id
        }else if(this.level==5){
            this.linkage.hamlet_region_id=id
        }

    },
    watch:{
        'form.demandId':function(n,v){
            if(n){
                if(n!=v){
                    clearTimeout(this.timeFn)
                    this.disa=false;
                    this.timeFn=setTimeout(()=>{
                        console.log('0',n,v)
                        this.getList()
                    },this.timer)
                }
            }
        }
    },
    methods:{
        typeFn(code){
            let str
            if(code==1){
                str='教育帮扶'
            }else if(code==2){
                str='医疗帮扶'
            }else if(code==3){
                str='住房帮扶'
            }else if(code==4){
                str='物品帮扶'
            }else{
                str='???'
            }
            return str
        },
        getData(id,type,regionId,columnId){
            this.form.helpTypeCode=type;
            this.regionId=regionId;
            this.columnId=columnId;
            if(id){
                this.disabled=true;
                this.form.demandId=id;
                // this.getList()
            }else{

                this.disabled=false
            }

        },
        getList(){
            this.disa=false;
            console.log('--',this.form.demandId)
            let data=this.form
            this.$http.post('hts/management/getDemand', data).then(res => {
                console.log('--==')
                this.disa=true;
                if(res.helpTypeCode==data.helpTypeCode){
                    this.form=res;
                    let arr=res.relatePics.split(",")
                    this.form.relatePics=arr[0]
                }else{
                    this.form.demandTitle=''
                    this.form.relatePics=''
                    this.form.demandDetails=''
                    this.$message({
                      message: '查询失败,需求ID跟帮扶类型不匹配',
                      type: 'error'
                    })
                }



            }).catch(res=>{
                this.disa=true;
                this.form.demandTitle=''
                this.form.relatePics=''
                this.form.demandDetails=''
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
            this.$http.post('hts/management/saveRecommendDemand', this.form).then(response => {
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
            this.form.columnId=this.columnId;
            this.form.regionId=this.regionId;
            this.subFn()
        },
        end(){
            this.form={
                demandId:'',
                demandTitle:'',
                demandDetails:'',
                relatePics:'',
                helpTypeCode:''
            };
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
