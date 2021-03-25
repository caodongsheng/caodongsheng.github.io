<template>
  <div class="publish-wrap over-auto animated fadeInRight">
    <x-header>发布需求</x-header>
    <div class="demand" style="padding:10pt" >您选择的 <span>医疗需求</span></div>
    <group class="grops" label-width="4em" label-margin-right="2em" label-align="right">
      <popup-picker title="需求类型"  :data="type_list" v-model="help_type_code" :columns="2" show-name placeholder="请输入与受助人关系"></popup-picker>
    </group>
    <group class="grops" label-width="4em" label-margin-right="2em" label-align="right">
      <x-input title="需求标题" placeholder="请填写需求标题（20个汉字以内）" v-model="demand_title" @input="valideContent(demand_coment)"></x-input>
    </group>
     <group class="grops" label-width="4em" label-margin-right="2em" label-align="right">
      <x-input title="目标金额" placeholder="" v-model="target_amount"  @input="target_amount=target_amount.replace(/[^\0-9\.]/g,'')"></x-input>
     </group>
       <group class="grops" label-width="4em" label-margin-right="2em" label-align="right">
      <x-textarea :max="20" v-model="demand_coment" placeholder="请输入需求详情"  @input="valideContent(demand_coment)"></x-textarea>
    </group>
    <div class="image-list">
      <div style="text-align:center" ref="divGenres" class="list-default-img" v-show="isPhoto" @click.stop="addPic">
        <img src="../../assets/images/camera.png" />
        <br>
        <span>请选择或者拍照上传照片</span>
        <input type="file" accept="image/jpg,image/png,image/jpeg,image/gif" capture="camera" @change="onFileChange" style="display: none;">
      </div>
      <ul class="list-ul" v-show="!isPhoto">
        <li class="list-li " v-for="(iu,index) in imgUrls" :key="index">
          <a class="list-link" @click='previewImage(iu)'>
            <img :src="iu">
          </a>
          <span class="list-img-close" @click='delImage(index)'></span>
        </li>
        <li class="list-li">
          <span class="add-img" @click.stop="addPic"> </span>
        </li>
      </ul>
    </div>
    <div class="add-preview" v-show="isPreview" @click="closePreview">
      <img :src="previewImg">
    </div>
    <div style="font: 0px/0px sans-serif;clear: both;display: block"> </div>
    <div style="padding:15px;">
      <x-button type="primary" @click.native="processButton">提交</x-button>
    </div>
    <actionsheet
      v-model="show1"
      :menus="menus1"
      @on-click-menu="click"
      @on-after-hide="log('after hide')"
      @on-after-show="log('after show')"></actionsheet>
  </div>
</template>

<script>
  import lrz from 'lrz'//前端压缩插件
  import Vue from 'vue'
  import { XHeader, ViewBox, GroupTitle, Group, Cell, XInput, PopupPicker, XButton, XNumber, XAddress, XTextarea, Actionsheet, Confirm } from 'vux'
  import axios from 'axios'
  export default {
    name: 'publishdemond',
    cordova: Vue.cordova,
    components: {
      XHeader,
      ViewBox,
      Group,
      GroupTitle,
      Cell,
      XInput,
      PopupPicker,
      XAddress,
      XButton,
      XNumber,
      XTextarea,
      Actionsheet,
      Confirm
    },
    data () {
      return {
        help_type_code: ['1'],
        demand_title: '',
        target_amount: '',
        demand_coment: '',
        imageUrl: [],
        type_list: [{value: '1', name: '本人'}, {value: '2', name: '我帮扶的贫困户'}],
        show: false,
        imgUrls: [],
        urlArr: [],
        isPhoto: true,
        btnTitle: '',
        isModify: false,
        previewImg: '',
        isPreview: false,
        show1: false,
        demand:[{id:1,name:"住房需求"},{id:2,name:"教育需求"},{id:3,name:"医疗需求"},{id:4,name:"物品需求"},{id:5,name:"民生需求"}],
        menus1: {
          album: '从相册选择',
          photograph: '拍照'
        }
      }
    },
    computed: {
      aided () {
        return this.$store.state.aided
      },
      domandtype () {
        switch (this.$store.state.demandtype) {
          case 1:
            return '教育帮扶'
          case 2:
            return '健康帮扶'
        }
      }
    },
    watch: {
      imgUrls: 'toggleAddPic'
    },
    mounted(){
      console.log(this.$route.params.datas)
    },
    methods: {
    valideContent(value){
      let pattern =/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]]/
      value = value.replace(pattern, ''); 
    },
      processButton () {
        console.log(this.aided.aided_person_name)
        console.log(this.domandtype)
        axios.post('http://localhost:8011/api/demand/edit', this.aided, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      click (key) {
        if (key === 'album') {
          let els = this.$refs.divGenres.querySelectorAll('input[type=file]')
          els[0].click()
        } else if (key === 'photograph') {
          if (!Vue.cordova.camera) {
            window.alert('Vue.cordova.camera not found !')
            return
          }
          Vue.cordova.camera.getPicture((imageURI) => {
            window.alert('Photo URI : ' + imageURI)
          }, (message) => {
            window.alert('FAILED : ' + message)
          }, {
            quality: 50,
            destinationType: Vue.cordova.camera.DestinationType.FILE_URI
          })
        }
      },
      toggleAddPic: function () {
        let vm = this
        if (vm.imgUrls.length >= 1) {
          vm.isPhoto = false
        } else {
          vm.isPhoto = true
        }
      },
      addPic: function (e) {
        console.log(this.show1)
        this.show1 = true

        //   let els = this.$refs.divGenres.querySelectorAll('input[type=file]')
        //   els[0].click()
        //   return false
      },
      onFileChange: function (e) {
        var files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        this.createImage(files, e)
      },
      createImage: function (file, e) {
        let vm = this
        lrz(file[0], {
          width: 480
        }).then(function (rst) {
          vm.imgUrls.push(rst.base64)
          return rst
        }).always(function () {
          // 清空文件上传控件的值
          e.target.value = null
        })
      },
      delImage: function (index) {
        let vm = this
        vm.$vux.confirm.show({
          title: '确定删除该图片?',
          onConfirm () {
            vm.imgUrls.splice(index, 1)
          }
        })
      },
      previewImage: function (url) {
        let vm = this
        vm.isPreview = true
        vm.previewImg = url
      },
      closePreview: function () {
        let vm = this
        vm.isPreview = false
        vm.previewImg = ''
      },
      saveImage: function () {
        let urlArr = [],
          imgUrls = this.imgUrls

        for (let i = 0; i < imgUrls.length; i++) {
          if (imgUrls[i].indexOf('file') === -1) {
            urlArr.push(imgUrls[i].split(',')[1])
          } else {
            urlArr.push(imgUrls[i])
          }
        }

        // 数据传输操作
      }
    }
  }
</script>

<style scoped>
  .publish-wrap{
    width:100%;
    height:100%;
    background:#eee;
  }
  .demand{
    height:20px;
    background:#fff;
    line-height:20px;
    margin-top:10px;
  }
  /* ul li以横排显示 */

  /* 所有class为menu的div中的ul样式 */
  .grops{
    margin:-10px 0;
  }
  .list-ul {
    list-style: none;
    /* 去掉ul前面的符号 */
    margin: 0px;
    /* 与外界元素的距离为0 */
    padding: 0px;
    /* 与内部元素的距离为0 */
    width: auto;
    /* 宽度根据元素内容调整 */
  }

  /* 所有class为menu的div中的ul中的li样式 */

  .list-li {
    float: left;
    /* 向左漂移，将竖排变为横排 */
    padding: 8px;
    /* 与内部元素的距离为0 */
    display: inline-block;
    position: relative;
    text-align: center;
  }

  .list-link img {
    width: 100px;
    height: 100px;
  }

  /* 所有class为menu的div中的ul中的a样式(包括尚未点击的和点击过的样式) */

  .list-link a:visited {
    background-color: #465c71;
    /* 背景色 */
    border: 1px #4e667d solid;
    /* 边框 */
    color: #dde4ec;
    /* 文字颜色 */
    display: flex;
    /* 此元素将显示为块级元素，此元素前后会带有换行符 */
    line-height: 1.35em;
    /* 行高 */
    padding: 4px 20px;
    /* 内部填充的距离 */
    text-decoration: none;
    /* 不显示超链接下划线 */
    white-space: nowrap;
    /* 对于文本内的空白处，不会换行，文本会在在同一行上继续，直到遇到 <br> 标签为止。 */
    overflow: hidden;
  }

  /* 所有class为menu的div中的ul中的a样式(鼠标移动到元素中的样式) */

  .list-link a:hover {
    background-color: #bfcbd6;
    /* 背景色 */
    color: #465c71;
    /* 文字颜色 */
    text-decoration: none;
    /* 不显示超链接下划线 */
  }

  /* 所有class为menu的div中的ul中的a样式(鼠标点击元素时的样式) */

  .list-link a:active {
    background-color: #465c71;
    /* 背景色 */
    color: #cfdbe6;
    /* 文字颜色 */
    text-decoration: none;
    /* 不显示超链接下划线 */
  }

  .list-img-close {
    /* background: #ffffff url(../../assets/images/delete.png) no-repeat right top;*/
    border-color: #ff4a00;
    background-position: center;
    background-size: 35px 35px;
    display: block;
    float: left;
    width: 10px;
    height: 10px;
    position: absolute;
    top: 5%;
    left: 71%;
    margin-top: 0px;
    margin-left: 0px;
    padding: 8px;
    z-index: 10;
    border-radius: 5px;
    text-align: center;
  }

  .add-img {
    display: block;
    background-image: url('../../assets/images/camera.png');
    background-repeat: no-repeat;
    width: 100px;
    height: 100px;
    background-position: center;
    background-size: 58px 47px;
  }
</style>
