<template>
  <div>
    <template v-if="!pagemodel">
      <aidperson
        :on-choose='aidperson.onChoose'
        :person-data='personData'
        :close="close"
        @postsearchdata="aidperson.postdataMethod"
      ></aidperson>
    </template>
    <template v-else>
      <aidpersonpagemodel
        :on-choose='aidperson.onChoose'
        :person-data='personData'
        :close="close"
        @postsearchdata="aidperson.postdataMethod" ref="pagemodel">
      </aidpersonpagemodel>
    </template>
  </div>
</template>

<script>
  import aidperson from './aidperson';
  import aidpersonpagemodel from "./aidpersonPgemodel"
  import {ConvertPinyin,getFirstCap} from "./pinying.js"
  import {mapActions} from "vuex";
  export default {
    data(){
      return {
        aidperson: {
          onChoose: null,
          postdataMethod:null
        },
        postdata:{},
        pathName:"",
        personData:[]
      }
    },
    components: {
      aidperson,
      aidpersonpagemodel
    },
    created() {
      // 在页面挂载前就发起请求
      this.pathName = this.$route.params.pathName
    //   this.getAidedPersonList();
    //   this.getAddressList();
      let  _this = this;
      this.aidperson.postdataMethod = function(value){
        _this.postdata = value;

        // _this.getAidedPersonList();
      }
    },
    mounted(){
      let _this = this;
      this.aidperson.onChoose = function(res){
        if(!_this.pathName) {
          _this.$router.push("/aideddetail/" + res.id)
        }
        else{
          _this.$store.dispatch("getAidpersondata",res)
          this.$router.history.go(-1);
        }
      }
      let persondata = this.$store.state.aidedperson_list;
      _this.personData = _this.parseArray(persondata);

    },
    computed:{

      pagemodel:{
        get:function(){
          let persondatalength = this.$store.state.persontotal;
          if(persondatalength<=30||persondatalength>=500){
            return   true
          }
          else
          {
            return  false;
          }

        }
      }

    },
    watch:{
      pagemodel:function(val,oldval){
        let self = this;
        this.$nextTick(function(){
          let persondata = this.$store.state.aidedperson_list;
          self.personData = self.parseArray(persondata);
        });
      }
    },
    methods: {
      ...mapActions(["getAidedPersonList","getAddressList","getAidpersondata"]),
      getAidedPersonList(){
        this.$store.dispatch("getAidedPersonList", this);
      },
      getAddressList(){
        this.$store.dispatch("getAddressList", this)
      },
      parseArray:function(arr){
        for(let j=0;j<arr.length;j++){
          arr[j].personSpell =  ConvertPinyin(arr[j].aided_person_name)
          arr[j].personFirstLetter =  getFirstCap(arr[j].personSpell)
        }
        return arr;
      },
      close(){
        this.aidperson.isShow = false;
      }
    }
  }
</script>

<style  scoped>
  html{
    font-size: 100%;
    background: #fff;
  }
  body{
    padding: 0.2rem 0.1rem!important;
    box-sizing: border-box;
  }
  .choice{
    font-size: 0.14rem;
    padding: 10px;
    border-radius: 3px;
    background: #fff;
    margin-bottom: 10px;
    border: solid 1px #e5e5e5;
    background: rgba(237, 85, 101, 0.8)!important;
    color: #fff;
  }
</style>
