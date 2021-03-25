<template>
	<div>
		<!--<el-upload class="basic-upload-field__uploader" 
			drag 
			ref="upload" 
			accept="image/jpeg,image/gif,image/png"
			list-type="picture-card"
			:auto-upload="false"
			:multiple='true'
			:limit = "9" 
			:action="actionUrl" 
			:on-success="uploadSuccess" 
      :before-upload="beforeUpload" 
      :on-remove="removeHandler" 
      :http-request="httpRequest" 
      multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip"></div>
    </el-upload>-->
    <el-upload
      ref= "upload"
      action = ""
			accept="image/jpeg,image/gif,image/png"
			list-type="picture-card"
			:auto-upload="false"
			:multiple='true'
			:limit = "9"
			:file-list = "fileList"
			:http-request = "httpRequest"
			:drag="false">
			<i class="el-icon-plus"></i>
			<div slot="tip" class="el-upload__tip">图片最多上传9张，仅支持JPG\JPEG\GIF\PNG格式的图片文件，文件大小不能大于2MB</div>
		</el-upload>
		<h3 @click="aaa">上传</h3>
	</div>      
</template>

<script>



export default {
  name: 'shangchuan',
  data () {
    return {
      fileList: [],
      fileList2: [],
      actionUrl: '/api/file/upload',
      fileReader: '',
    }
  },

  methods: {
  	aaa() {
  		this.$refs.upload.submit()
  		console.log("我在上传")
  	},
  	httpRequest(e) {
			var file = e.file;
			var _this = this;
			if(!/image\/\w+/.test(file.type)) {
				alert('请确保文件为图像类型');
				return false;
			}
			if(file.size > 2 * 1024 * 1024) {
				alert('上传图片不能超过2M');
				return false;
			}
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function(e) {
				var result = this.result;
				var image = new Image();
				var rate = 1;
				if(file.size >= 200 && file.size <= 500) {
					rate = 0.7;
				} else if(file.size > 500 && file.size <= 1024) {
					rate = 0.5;
				} else if(file.size > 1024) {
					rate = 0.3
				}
				var canvas = document.createElement("canvas");
				var ctx = canvas.getContext('2d');
				image.src = result;
				image.onload = function() {
					var w = image.naturalWidth,
						h = image.naturalHeight;
					canvas.width = w;
					canvas.height = h;
					ctx.drawImage(image, 0, 0, w, h, 0, 0, w, h);
					var data = canvas.toDataURL("image/jpeg", rate);
					console.log("push数组,但是push的string")
					_this.fileList2.push(data)
					console.log(_this.fileList2)
					this.imgUploadArg = {}
					this.imgUploadArg = _this.fileList2.join('-')
					console.log(this.imgUploadArg)
					_this.$http.post('/hts/bfFilesUpload', {
							imgStr: this.imgUploadArg
						})
						.then(response => {
							console.log(response)
							_this.fileList = []
						})
	
				}
		}
	}
//  httpRequest (options) {
//  	console.log("我是自定义")
//    let file = options.file
//    let filename = file.name
//    if (file) {
//      this.fileReader.readAsDataURL(file)
//    }
//    this.fileReader.onload = () => {
//      let base64Str = this.fileReader.result
//      let config = {
//        url: '/api/file/upload/base64',
//        method: 'post',
//        // file: file,
//        data: {
//          base64Str: base64Str.split('-')[1],
//          name: filename
//        },
//        timeout: 10000,
//        onUploadProgress: function (progressEvent) {
//          // console.log(progressEvent)
//          progressEvent.percent = progressEvent.loaded / progressEvent.total * 100
//          options.onProgress(progressEvent, file)
//        },
//      }
//      axios(config)
//        .then(res => {
//          options.onSuccess(res, file)
//        })
//        .catch(err => {
//          options.onError(err)
//        })
//    }
//  },
//  removeHandler (file, fileList) {
//    let index = this.fileList.indexOf(file.key)
//    this.fileList.splice(index, 1)
//    console.log('current file list ==>', this.fileList)
//    this.$store.commit('applicant/updateResume', this.fileList)
//    axios.delete(`/api/file/delete?key=${file.key}`).then(res => {
//      console.log(res)
//    })
//  },
//  beforeUpload (file) {
//  	console.log("我是上传之前")
//    const isLt5M = file.size < 5 * 1024 * 1024
//    if (this.fileList.length >= 3) {
//      alert('At most 3 files')
//      return false
//    }
//    if (!isLt5M) {
//      alert('The max size is 5MB')
//      return false
//    }
//  },
//  uploadSuccess (res, file, fileList) {
//    let data = res.data
//    console.log("我是上传成功")
//    console.log('upload result:', res, file)
//    file.key = data.key
//    this.fileList.push(data.key)
//  }
//},
//mounted () {
//  if (!window.FileReader) {
//    console.error('Your browser does not support FileReader API!')
//  }
//  this.fileReader = new FileReader()
  }
}
</script>

<style >
.basic-upload-field {
  padding: 16px;

}
.basic-upload-field__uploader {
  padding: 16px;
  text-align: center;
}
.basic-upload-field__uploader .el-upload-dragger {
  min-width: 600px;
}
.basic-upload-field__uploader .el-upload-list {
  margin: 0 auto;
  padding: 0 16px;
  min-width: 500px;
}
.basic-upload-field__uploader .el-upload-list__item-name {
  max-width: 600px;
}
</style>
