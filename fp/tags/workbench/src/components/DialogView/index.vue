<template lang="html">
  <div class="">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="1034px"
      :before-close="handleClose">
      <el-form ref="dataForm" :model="currentItem" label-position="left" label-width="100px" style=" margin-left:30px;" :rules="rules">
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="currentItem.linkman"   style="width:200px"/>
        </el-form-item>
        <el-form-item label="联系电话" prop="link_tel" >
          <el-input v-model="currentItem.link_tel"  style="width:200px"/>
        </el-form-item>
        <el-form-item label="邮编" prop="postcode">
          <el-input v-model="currentItem.postcode"  type="text" style="width:200px"/>
        </el-form-item>
        <el-form-item label="所在区域" prop="province_region_id" class="addwarn" >
          <showaddress  @change="linkageChange" @init="getinitData"
                   v-if="hackReset"
                   :province_region_id="currentItem.province_region_id"
                   :city_region_id="currentItem.city_region_id"
                   :county_region_id="currentItem.county_region_id"
                   :village_region_id="currentItem.village_region_id"
                   :hamlet_region_id="currentItem.hamlet_region_id" />
        </el-form-item>
        <el-form-item label="详细地址" prop="detail_addr">
          <el-input v-model="currentItem.detail_addr"  type="textarea" :autosize="{ minRows: 4, maxRows: 10}" style="width:500px"/>
        </el-form-item>
        <el-form-item label="设为默认地址" prop="is_default">
          <el-radio-group v-model="currentItem.is_default">
            <el-radio :label=1>是</el-radio>
            <el-radio :label=0>否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
            <el-button @click="end">取 消</el-button>
            <el-button type="primary" @click="sub">保 存</el-button>
          </span>
    </el-dialog>
  </div>
</template>

<script>
import showaddress from "@/components/showaddress";
export default {
  components: {
    showaddress
  },
  props: ["dialogVisible", "id", "data", "state", "level_lists", "title"],
  data() {
    return {
      hackReset: true,
      level_list: this.level_lists,
      level: 1,
      currentItem: {},
      allid: {
        province_region_id: "",
        city_region_id: "",
        county_region_id: "",
        village_region_id: "",
        hamlet_region_id: "",
        region_name: ""
      },
      rules: {
        linkman: [
          { required: true, message: "请输入联系人姓名", trigger: "blur" },
          { min: 2, max: 6, message: "长度在2至6个字段", trigger: "blur" }
        ],
      
        link_tel: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            validator: function(rule, value, callback) {
              var MobileRegex = /^1[0-9]{10}$/;
              if (!MobileRegex.test(value)) {
                callback(new Error("手机号码格式不正确！"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        detail_addr: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          { min: 2, max: 30, message: "长度在2至30个字段", trigger: "blur" }
        ],
        postcode: [
             { required: true, message: "请输入邮政编码", trigger: "blur" },
          {
          
            validator: function(rule, value, callback) {
              var MobileRegex = /^[0-9]{6}$/;
              if (!MobileRegex.test(value)) {
                callback(new Error("请输入6位纯数字邮政编码"));
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    dialogVisible(n) {
      if (n) {
        this.init();
      }
    },
    level_lists(n) {
      this.hackReset = true;
    },
    // currentItem: {
    //   handler(nitem, oitem) {
      
    //       this.currentItem.postcode = nitem.postcode.replace(/[^0-9]/g,'')
    //       this.currentItem.link_tel = nitem.link_tel.replace(/[^0-9]/g,'')
        
    //   },
    //   deep: true
    // },

    // postcode(val) {
    //   this.$nextTick(() => {
    //     this.postcode = val.replace(/[^\w\.\/]/gi, "");
    //   });
    // }
  },
  methods: {
    init() {
      if (this.data) {
        this.currentItem = JSON.parse(JSON.stringify(this.data));
        this.allid.province_region_id = this.data.province_region_id;
        this.allid.city_region_id = this.data.city_region_id;
        this.allid.county_region_id = this.data.county_region_id;
        this.allid.village_region_id = this.data.village_region_id;
        this.allid.hamlet_region_id = this.data.hamlet_region_id;
      } else {
        this.currentItem = {};
        this.allid.province_region_id = "";
        this.allid.city_region_id = "";
        this.allid.county_region_id = "";
        this.allid.village_region_id = "";
        this.allid.hamlet_region_id = "";

}
    },
    sub() {
    
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          if (this.data) {
            let data = {
              id: this.id,
              linkman: this.currentItem.linkman,
              linkTel: this.currentItem.link_tel,
              detailAddr: this.currentItem.detail_addr,
              isDefault: this.currentItem.is_default,
              postcode: this.currentItem.postcode
            };
            Object.assign(data, this.allid);
            //修改
                if(this.allid.region_name!=""){
  
          
            this.$http.post("/hts/poor/addressEdit", data).then(res => {
              this.$message({
                type: "success",
                message: "成功 "
              });
              this.$emit("Preservation");
              this.end();
            });
                }
                else{
                 this.$notify({
          title: "提交数据错误",
          message: `所在区域不能为空!`,
          type: "error"
        });
                }
          } else {
            //新增
            let data = {
              userId: this.id,
              linkman: this.currentItem.linkman,
              linkTel: this.currentItem.link_tel,
              detailAddr: this.currentItem.detail_addr,
              isDefault: this.currentItem.is_default,
              postcode: this.currentItem.postcode
            };
            debugger
                  if(this.allid.region_name!=""){
            Object.assign(data, this.allid);
            this.$http.post("/hts/poor/addressSave", data).then(res => {
              this.$message({
                type: "success",
                message: "成功 "
              });
              this.$emit("Preservation");
              this.end();
            });
          }
          
          else{
                this.$notify({
          title: "提交数据错误",
          message: `所在区域不能为空!`,
          type: "error"
        });
          }
          }
        } else {
          return false;
        }
      });
     
      
    },
    async getinitData(n){
      this.allid.region_name = "";
      let idarr = [n[4].id, n[3].id, n[2].id, n[1].id, n[0].id];
      let tempid = -1;

      for (let j = 0; j < idarr.length; j++) {
        if (idarr[j] !== "") {
          tempid = j;
          break;
        }
      }
      if(tempid==-1) return;
      let reginname = "";
      await this.$http
        .post("/eai/authRegion/getAllParentId", {
          regionId: idarr[tempid]
        })
        .then(function(res) {
          if (res[0]) {
            switch (tempid) {
              case 0:
                reginname = `${res[0].regionName}-${res[1].regionName}-${
                  res[2].regionName
                }-${res[3].regionName}-${n[4].regionName}`;
                break;
              case 1:
                reginname = `${res[0].regionName}-${res[1].regionName}-${
                  res[2].regionName
                }-${n[3].regionName}`;

                break;
              case 2:
                reginname = `${res[0].regionName}-${res[1].regionName}-${
                  n[2].regionName
                }`;
                break;
              case 3:
                reginname = `${res[0].regionName}-${n[1].regionName}`;
                break;
              case 4:
                reginname = `${res[0].regionName}-${n[1].regionName}`;
                break;
            }
          } else {
            reginname = `${n[0].regionName}`;
          }
        });
      this.allid.region_name = reginname;
    },
    async linkageChange(n) {
       this.currentItem.province_region_id = n[0].id;
      this.allid.province_region_id = n[0].id;
      this.allid.city_region_id = n[1].id;
      this.allid.county_region_id = n[2].id;
      this.allid.village_region_id = n[3].id;
      this.allid.hamlet_region_id = n[4].id;
      this.allid.region_name = "";
      let idarr = [n[4].id, n[3].id, n[2].id, n[1].id, n[0].id];
      let tempid = "";

      for (let j = 0; j < idarr.length; j++) {
        if (idarr[j] !== "") {
          tempid = j;
          break;
        }
      }
      debugger
      let reginname = "";
      await this.$http
        .post("/eai/authRegion/getAllParentId", {
          regionId: idarr[tempid]
        })
        .then(function(res) {
          if (res[0]) {
            switch (tempid) {
              case 0:
                reginname = `${res[0].regionName}-${res[1].regionName}-${
                  res[2].regionName
                }-${res[3].regionName}-${n[4].regionName}`;
                break;
              case 1:
                reginname = `${res[0].regionName}-${res[1].regionName}-${
                  res[2].regionName
                }-${n[3].regionName}`;

                break;
              case 2:
                reginname = `${res[0].regionName}-${res[1].regionName}-${
                  n[2].regionName
                }`;
                break;
              case 3:
                reginname = `${res[0].regionName}-${n[1].regionName}`;
                break;
              case 4:
                reginname = `${res[0].regionName}-${n[1].regionName}`;
                break;
            }
          } else {
            reginname = `${n[0].regionName}`;
          }
        });
        debugger
      this.allid.region_name = reginname;
    },
    end() {
      this.level_list = [];
      this.currentItem = {};
      this.hackReset = false;
      this.$refs["dataForm"].resetFields();
      this.$emit("update:dialogVisible", false); //1编辑
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.end();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped>
.addwarn >>> .el-form-item__label:before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
}
</style>

