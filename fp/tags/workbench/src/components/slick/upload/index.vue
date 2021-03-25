<template lang="html">
    <div class="sss">
        <el-upload
          ref="uploads"
          class="avatar-uploader"
          :action="url+'/cfs/file/uploads'"
          list-type="picture-card"
          accept="image/x-png,image/png,image/jpeg,image/jpg"
          :limit="limits"
          :on-exceed="exceed"
          :on-success="success"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
          <!-- <img v-if="pic" :src="pic" class="avatar"> -->
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
        </el-upload>
        <!-- <el-upload
            :action="ImgUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload> -->
        <!-- <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> -->
    </div>
</template>

<script>
export default {
    props:['limit','pic'],
    data(){
        return {
            limits:1,
            dialogImageUrl: '',
            dialogVisible: false,
            url:'',
        }
    },
    methods:{
        changes(){
            this.$refs.uploads.submit();
        },
        
        success(file,a,fileList){
            // console.log('change',fileList);
            // this.$refs.uploads.clearFiles()
            this.$emit('upchange',fileList,)
        },
        beforeUpload(file){
            var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
			const isLt2M = file.size / 1024 / 1024 < 3     //这里做文件大小限制
			if(!isLt2M) {
                this.$notify({
                    title: '错误',
                    type:'warning',
                    message: '上传文件大小不能超过 3MB!',
                    duration: 2000,
                    customClass:'notify'
                  });
			}
			return  isLt2M
        },
        handleRemove(file, fileList) {
            // console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            // console.log('111',file)
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        remove(){
            this.$refs.uploads.clearFiles()
        },
        exceed(file,fileList){
            this.$notify({
                title: '错误',
                type:'error',
                message: '只能上传'+this.limit+'张图片',
                duration: 2000,
                customClass:'notify'
              });
        }
    },
    mounted(){
        this.limits=parseInt(this.limit)
        // console.log('pic',this.pic);
        this.url=process.env.BASE_API
    }
}
</script>

<style lang="scss" scoped>
.sss{
    margin-right: 10px;
}
.el-upload-list ,.el-upload-list--picture-card{
    width: 100%;
    height: 200px;
}
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
