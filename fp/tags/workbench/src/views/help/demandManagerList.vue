<template>
  <div class="app-container">
    <div class="conheader clearfix" align="right">
      <h3>{{$route.meta.title}}</h3>
      <el-button
        class="filter-item blue"
        style="margin-left: 10px;"
        type="warning"
        icon="el-icon-edit"
        @click="editDemandExc"
      >导出</el-button>
    </div>
    <div class="filter-container">
      <el-row>
        <el-col :span="8">
          <span>身份查询:</span>
          <el-select v-model="listQuery.isPoor" clearable style="width: 160px" class="filter-item">
            <el-option
              v-for="item in isPoorOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>受助人姓名:</span>
          <el-input
            v-model="listQuery.aidedName"
            placeholder="请输入受助人姓名"
            style="width: 160px"
            class="filter-item"
          ></el-input>
        </el-col>
        <el-col :span="8">
          <span>手机号码:</span>
          <el-input
            v-model="listQuery.aidederTel"
            placeholder="请输入受助人手机号"
            style="width: 160px"
            class="filter-item"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span>审核人手机号:</span>
          <el-input
            v-model="listQuery.mobile"
            placeholder="请输入审核人手机号"
            style="width: 160px"
            class="filter-item"
          ></el-input>
        </el-col>
        <el-col :span="8">
          <span>是否本人:</span>
          <el-select
            v-model="listQuery.isOneself"
            clearable
            style="width: 160px"
            class="filter-item"
            placeholder="是否本人审核"
          >
            <el-option
              v-for="item in zhuangtai"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>需求状态:</span>
          <el-select
            v-model="listQuery.demandStatus"
            clearable
            style="width: 160px"
            class="filter-item"
            placeholder="需求状态"
          >
            <el-option v-for="item in leixing" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span>受助人身份证号:</span>
          <el-input
            v-model="listQuery.aidedIdCard"
            placeholder="请输入受助人身份证号"
            style="width: 160px"
            class="filter-item"
          ></el-input>
        </el-col>
        <el-col :span="8">
          <span>代发人手机号:</span>
          <el-input
            v-model="listQuery.publishTel"
            placeholder="请输入代发人手机号"
            style="width: 160px"
            class="filter-item"
          ></el-input>
        </el-col>
        <el-col :span="8">
          <span>代发人姓名:</span>
          <el-input
            v-model="listQuery.publishName"
            placeholder="请输入代发人姓名"
            style="width: 160px"
            class="filter-item"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span>帮扶类型:</span>
          <el-select
            v-model="listQuery.helpTypeCode"
            clearable
            style="width: 160px"
            class="filter-item"
            placeholder="是否本人审核"
          >
            <el-option
              v-for="item in demandTypesList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>是否代发:</span>
          <el-select
            v-model="listQuery.isInstead"
            clearable
            style="width: 160px"
            class="filter-item"
            placeholder="是否代发"
          >
            <el-option
              v-for="item in isInstead"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>审核人姓名:</span>
          <el-input
            v-model="listQuery.staffName"
            placeholder="请输入审核人姓名"
            style="width: 160px"
            class="filter-item"
          ></el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span>收款信息审核状态:</span>
          <el-select
            v-model="listQuery.special_bank_status"
            clearable
            style="width: 160px"
            class="filter-item"
            placeholder="收款信息审核状态"
          >
            <el-option
              v-for="item in bankStatus"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-col>
        <el-col :span="8">
          <span>需求ID:</span>
          <el-input
            v-model="listQuery.id"
            placeholder="请输入需求ID"
            style="width: 120px"
            class="filter-item"
          ></el-input>
        </el-col>
        <el-col :span="8">
          <span>终审状态查询：</span>
          <el-select v-model="listQuery.operationalReviewStatus" clearable style="width: 160px" class="filter-item" placeholder="终审状态查询">
            <el-option v-for="item in ReviewStatus" :key="item.id" :label="item.name" :value="item.id"/>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="demonstration">发布时间:</span>
          <el-date-picker
            v-model="listQuery.startDate"
            placeholder="请选择开始日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptionsStart"

          ></el-date-picker>
          <el-date-picker
            v-model="listQuery.endDate"
            placeholder="请选择结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptionsEnd"
          ></el-date-picker>
        </el-col>
        
      </el-row>
      <el-row>
        <el-col :span="24">
          <span class="demonstration">审核时间:</span>
          <el-date-picker
            v-model="listQuery.reviewStartDate"
            placeholder="请选择开始日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptionsStart2"
          ></el-date-picker>
          <el-date-picker
            v-model="listQuery.reviewEndDate"
            placeholder="请选择结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptionsEnd2"
          ></el-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="22" >
          <span>查询区域:</span>
          <linkage :level="level" :level_list="level_list" @change="linkageChange"/>
        </el-col>
        
        <el-col :span="2">
          <el-button
            v-waves
            class="filter-item "
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >查询</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table
      :key="tableKey"
      :data="list"
      border
      fit
      stripe
      highlight-current-row
      style="width: 100%;min-height:400px;"
      height="400"
      @row-click="handleSelectionChange"
      @selection-change="selectionRowsChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column align="center" label="序号" type="index" width="65" :index="typeIndex" style="background:#000;"/>
      <el-table-column align="center" label="需求ID" prop="id"/>
      <el-table-column min-width="150" align="center" label="发布时间" prop="create_date" sortable />
      <el-table-column min-width="150" label="需求标题" prop="demand_title"/>
      <el-table-column width="70" align="center" label="需求状态" prop="demand_use">
        <template slot-scope="scope">
          <p v-if="scope.row.demand_status == '1'">待审核</p>
          <p v-if="scope.row.demand_status == '2'">审核不通过</p>
          <p v-if="scope.row.demand_status == '3'">帮扶中</p>
          <p v-if="scope.row.demand_status == '4'">等待提现</p>
          <p v-if="scope.row.demand_status == '5'">提现中</p>
          <p v-if="scope.row.demand_status == '6'">待发送</p>
          <p v-if="scope.row.demand_status == '7'">已发送</p>
          <p v-if="scope.row.demand_status == '8'">发布超时</p>
          <p v-if="scope.row.demand_status == '11'">帮扶成功</p>
          <p v-if="scope.row.demand_status == '9'">帮扶失败</p>
          <p v-if="scope.row.demand_status == '10'">已关闭</p>
        </template>
      </el-table-column>
      
      <el-table-column width="70" align="center" label="终审状态" >
        <template slot-scope="scope">
          <p v-if="scope.row.operational_review_status == '2'">待审核</p>
          <p v-if="scope.row.operational_review_status == '1'">审核不通过</p>
          <p v-if="scope.row.operational_review_status == '3'">已审核</p>
          <p v-if="scope.row.operational_review_status == '0'">审核通过</p>
        </template>
      </el-table-column>
      <el-table-column width="70" align="center" label="身份类型">
        <template slot-scope="scope">
          <p v-if="scope.row.is_poor == '1'">贫困户</p>
          <p v-if="scope.row.is_poor == '0'">非贫困户</p>
        </template>
      </el-table-column>
      <el-table-column width="70" align="center" label="需求类型">
        <template slot-scope="scope">
          <p v-if="Number(scope.row.demand_type) === 1">物品</p>
          <p v-if="Number(scope.row.demand_type) === 2">资金</p>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="审核时间" prop="review_date" sortable />
      <el-table-column width="100" align="center" label="爱心反馈" prop="dynamic_num">
        <template slot-scope="scope">
          <span>{{scope.row.dynamic_num}}次</span>
        </template>
      </el-table-column>

      <el-table-column width="100" align="center" label="帮扶次数" prop="donatecount"/>
      <el-table-column width="100" align="center" label="代发人ID" prop="create_by"/>
      <el-table-column width="100" align="center" label="身份证号" prop="aideder_idcard"/>
      <el-table-column width="100" align="center" label="证明次数" prop="prove_num"/>
      <el-table-column width="70" align="center" label="受助人" prop="aideder_name"/>
      <el-table-column width="150" align="center" label="受助人联系方式" prop="aideder_tel"/>
      <el-table-column width="150" align="center" label="发布人" prop="publish_name"/>
      <el-table-column width="150" align="center" label="需求金额" prop="target_amount"/>
      <!--<el-table-column width="150" align="center" label="帮扶进度" prop="speed"/>-->
      <el-table-column align="center" label="二者关系" prop="user_relation">
        <template slot-scope="scope">
          <p v-if="scope.row.user_relation == '00'">暂无关系</p>
          <p v-if="scope.row.user_relation == '01'">本人</p>
          <p v-if="scope.row.user_relation == '02'">我帮助的贫困户</p>
          <p v-if="scope.row.user_relation == '03'">我认识的贫困户</p>
          <p v-if="scope.row.user_relation == '04'">儿子</p>
          <p v-if="scope.row.user_relation == '05'">女儿</p>
          <p v-if="scope.row.user_relation == '06'">亲戚</p>
          <p v-if="scope.row.user_relation == '07'">朋友</p>
          <p v-if="scope.row.user_relation == '08'">丈夫</p>
          <p v-if="scope.row.user_relation == '09'">妻子</p>
          <p v-if="scope.row.user_relation == '10'">父亲</p>
          <p v-if="scope.row.user_relation == '11'">母亲</p>
          <p v-if="scope.row.user_relation == '12'">管理员代发</p>
          <p v-if="scope.row.user_relation == '13'">其他</p>
        </template>
      </el-table-column>
      <el-table-column width="150" align="center" label="发布人联系方式" prop="publish_tel"/>
      <el-table-column width="250" align="center" label="受助人地区" prop="region_name"/>
      <el-table-column width="70" align="center" label="审核人" prop="staff_name">
        <template slot-scope="scope">
          <p v-for="(item,index) in scope.row.staff_name" :key="item+index">{{item}}</p>
        </template>
      </el-table-column>
      <el-table-column width="480"  align="center" label="操作" prop="aideder_name">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" class="yellow" @click="handleDetial(scope.row)">详情</el-button>
          <!-- <el-button
            v-if="level == 3 && scope.row.moneycount > 0 && (scope.row.demand_status == '3' || scope.row.demand_status == '4') && scope.row.is_special"
            size="mini"
            type="primary"
            class="blue"
            :disabled="scope.row.special_bank_status==3"
            @click="bankChange(scope.row)"
          >{{scope.row.is_special==1?'添加':'修改'}}收款信息</el-button> -->
          <el-button
            v-if="scope.row.demand_status == '3'"
            size="mini"
            type="primary"
            class="blue"
            @click="handleClose(scope.row)"
          >{{guanbi}}</el-button>
          <el-button
           class="blue"
            v-if="scope.row.demand_status == '4'"
            size="mini"
            type="primary"
            @click="handleTips(scope.row)"
          >提醒一下</el-button>
          <el-button
           class="blue"
            v-if="scope.row.demand_status == '3'"
            size="mini"
            type="primary"
            @click="editDe(scope.row)"
          >编辑</el-button>
          <el-button
           class="blue"
            v-if="scope.row.demand_status == '3'"
            size="mini"
            type="primary"
            @click="SetUpTop(scope.row.id,scope.row.top_status)"
          >{{scope.row.top_status=='1'?'取消置顶':'置顶'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="选择置顶时间" :visible.sync="zdVisible">
        <div style="text-align:center;">
            <el-date-picker
              v-model="pickerValue"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="center">
            </el-date-picker>
        </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="zdVisible = false">取 消</el-button>
        <el-button type="primary" @click="SetTop">置 顶</el-button>
      </div>
    </el-dialog>
    <div class="pagination-container">
        <span style="float:left;line-height:34px;">共{{totalNum}}条数据</span>
      <el-pagination
        :current-page="listQuery.page"
        :page-size="listQuery.pageSize"
        :total="total"
        background
        layout="prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
         v-if="total>listQuery.pageSize"
      >

      </el-pagination>
     <span class="warnspan">仅能查看2000以内的数据，若需查看更多，请导出数据查看！</span>
    </div>
    <el-dialog :visible.sync="dialogDetail" class="checkDialog" title="需求详情">
      <el-tabs value="first">
        <el-tab-pane
          label="需求详情"
          name="first"
          style="height:400px;overflow-x: hidden;overflow-y: scroll;line-height: 30px;"
        >
          <div>
            <span class="label">需求标题</span>
            <span>{{currentItem.demand_title}}</span>
          </div>
          <div>
            <span class="label">需求ID</span>
            <span>{{ currentItem.id }}</span>
          </div>
          <div>
            <span class="label">受助人</span>
            <span>{{ currentItem.aideder_name }}</span>
          </div>
          <div>
            <span class="label">身份证号码</span>
            <span>{{ currentItem.aideder_idcard }}</span>
          </div>
          <div>
            <span class="label">手机号码</span>
            <span>{{ currentItem.aideder_tel }}</span>
          </div>
          <div>
            <span class="label">所属地区</span>
            <span>{{ currentItem.user_region_name }}</span>
          </div>
          <div>
            <span class="label">发布人</span>
            <span>{{ currentItem.publish_name }}</span>
          </div>
          <div>
            <span class="label">发布人联系方式</span>
            <span>{{ currentItem.publish_tel }}</span>
          </div>
          <div>
            <span class="label">发布人与受助人关系</span>
            <span v-if="currentItem.user_relation == '01'">本人</span>
            <span v-if="currentItem.user_relation == '02'">我帮扶的贫困户</span>
            <span v-if="currentItem.user_relation == '03'">我认识的贫困户</span>
            <span v-if="currentItem.user_relation == '04'">儿子</span>
            <span v-if="currentItem.user_relation == '05'">女儿</span>
            <span v-if="currentItem.user_relation == '06'">亲戚</span>
            <span v-if="currentItem.user_relation == '07'">朋友</span>
            <span v-if="currentItem.user_relation == '08'">丈夫</span>
            <span v-if="currentItem.user_relation == '09'">妻子</span>
            <span v-if="currentItem.user_relation == '10'">父亲</span>
            <span v-if="currentItem.user_relation == '11'">母亲</span>
            <span v-if="currentItem.user_relation == '12'">管理员代发</span>
            <span v-if="currentItem.user_relation == '13'">其他</span>
          </div>
          <div style="overflow: auto;">
            <p style="width: 140px;float: left;margin: 6px;">需求详情</p>
            <p style="width: 400px;float: left;margin: 6px;">{{ currentItem.demand_coment }}</p>
          </div>
          <div>
            <span class="label">需求证明</span>
            <span>{{ currentItem.prove_num }}次证明</span>
          </div>
          <div v-if="currentItem.demand_type == '2'">
            <span class="label">目标金额</span>
            <span>{{currentItem.target_amount}}元</span>
          </div>
          <div v-if="currentItem.demand_type == '2'">
            <span class="label">已帮扶金额</span>
            <span>{{currentItem.moneycount}}元</span>
          </div>
          <!--<div v-if = 'currentItem.demand_type == "2"'>-->
          <!--<span class="label">资金用途</span><span>{{currentItem.demand_use}}</span>-->
          <!--</div>-->
          <div v-if="currentItem.bf_detail != null">
            <div>
              <span class="label">帮扶详情</span>
              <span>{{currentItem.user_name}}给你帮扶了 物品名称{{currentItem.goods}}</span>
            </div>
            <div>
              <span class="label"></span>
              <span style="display: inline-block; margin-top: 10px;">{{ currentItem.bf_detail }}</span>
            </div>
            <div>
              <span class="label">物品图片</span>
              <span style="display: inline-block; margin-top: 10px;">
                <img
                  :src="currentItem.record_imgs"
                  style="width: 100%;height: 100%;padding: 0 20px;"
                >
              </span>
            </div>
            <div>
              <span class="label"></span>
              <span
                style="display: inline-block; margin-top: 10px;color:red"
              >{{ currentItem.countdown }}</span>
            </div>
          </div>
          <div v-if="currentItem.demand_type == '1'">
            <span class="label">收货地址</span>
            <span>姓名:{{ currentItem.linkman }}</span>
          </div>
          <div v-if="currentItem.demand_type == '1'">
            <span class="label"></span>
            <span style="display: inline-block; margin-top: 10px;">地址:{{ currentItem.detail_addr }}</span>
          </div>
          <div v-if="currentItem.demand_type == '1'">
            <span class="label"></span>
            <span style="display:inline-block; margin-top: 10px;">电话号码:{{ currentItem.link_tel }}</span>
          </div>
          <div>
            <span v-if="currentItem.demand_type == '1'" class="label">帮扶方式</span>
            <span v-if="currentItem.demand_type == '1' && currentItem.help_pattern == '2'">快递</span>
            <span v-if="currentItem.demand_type == '1' && currentItem.help_pattern == '1'">面对面</span>
          </div>
          <div>
            <div v-if="currentItem.express_no!==null || currentItem.express_org!==null">
              <div v-if="currentItem.demand_type == 1 && currentItem.help_pattern === 2">
                <span class="label">快递公司</span>
                <span>{{ currentItem.express_org }}</span>
              </div>
              <div v-if="currentItem.demand_type == 1 && currentItem.help_pattern == 1">
                <span class="label"></span>
                <span
                  style="display: inline-block; margin-top: 10px;"
                >快递单号:{{ currentItem.express_no }}</span>
              </div>
              <!--<div v-else>-->
              <!--<span class="label">快递公司:</span><span style="display: inline-block; margin-top: 10px;">暂未送出</span>-->
              <!--</div>-->
            </div>
          </div>
          <div v-if="currentItem.demand_type == '1' && currentItem.help_pattern == '1'">
            <span class="label">赠送人信息</span>
            <span>捐赠人:{{ currentItem.donor }}</span>
          </div>
          <div v-if="currentItem.demand_type == '1' && currentItem.help_pattern == '1'">
            <span class="label"></span>
            <span
              style="display: inline-block; margin-top: 10px;"
            >联系人:{{ currentItem.donor_link_man }}</span>
          </div>
          <div v-if="currentItem.demand_type == '1' && currentItem.help_pattern == '1'">
            <span class="label"></span>
            <span
              style="display: inline-block; margin-top: 10px;"
            >联系电话:{{ currentItem.donor_link_tel }}</span>
          </div>
          <div v-if="currentItem.demand_type == '1' && currentItem.help_pattern == '1'">
            <span class="label"></span>
            <span
              style="display: inline-block; margin-top: 10px;"
            >预计捐赠日期: {{ currentItem.donor_date }}</span>
          </div>
          <div v-if="currentItem.bank_name != null">
            <div v-if="currentItem.demand_type == '2'">
              <span class="label">收款信息</span>
              <span>收款人姓名: {{ currentItem.specialPayee }}</span>
            </div>
            <div v-if="currentItem.demand_type == '2'">
              <span class="label"></span>
              <span>银行名称: {{ currentItem.bank_name }}</span>
            </div>
            
            <div v-if="currentItem.demand_type == '2'">
              <span class="label"></span>
              <span
                style="display: inline-block; margin-top: 10px;"
              >开户行名称: {{ currentItem.open_bank_name }}</span>
            </div>
            <div v-if="currentItem.demand_type == '2'">
              <span class="label"></span>
              <span style="display: inline-block; margin-top: 10px;">银行卡号: {{ currentItem.bank_no }}</span>
            </div>
            <div v-if="currentItem.demand_type == '2'">
              <span class="label"></span>
              <span style="display: inline-block; margin-top: 10px;">付款方式: 系统自动打款</span>
            </div>
            <div v-if="currentItem.demand_type == '2'">
              <span class="label">凭证</span>
              <span style="display: inline-block; margin-top: 10px;">
                <img :src="it" alt="加载失败" v-for="it in bankImgs" style="width:100px;height:100px;" :key="it+index">
                <!-- certificate_url -->
              </span>
            </div>
          </div>
          <div>
            <span class="label">需求动态</span>
            <span></span>
          </div>
          <div>
            <p v-for="(item,index) in currentItem2" style="margin-left:6px" :key="item+index">
              {{item.op_date}}
              <span style="display:inline-block; width:50px"></span>
              {{item.op_result+'；操作人：'+item.staff_name}}
              <span style="display:inline-block; width:50px"></span>
              <el-button v-if="item.check_state==0" @click="logsDetail(item)">审核不通过原因</el-button>
            </p>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="相关图片"
          name="second"
          style="height:400px;overflow-x: hidden;overflow-y: scroll;line-height: 30px;"
        >
          <!-- <img class="imgs" :src="currentItem.img_url" :key="currentItem.img_url"> -->
          <el-carousel :interval="2000" arrow="always">
            <el-carousel-item v-for="item in relate_pics" :key="item">
              <h3><img class="imgs" :src="item"></h3>
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
        <el-tab-pane
          label="爱心动态"
          name="third"
          style="height:400px;overflow-x: hidden;overflow-y: scroll;line-height: 30px;display: none;"
        >
          <div class="tx">
            <el-button type="primary" @click="handerCliclAi" v-if="getDemandStatus">发布爱心动态</el-button>
          </div>
          <div v-for="(item,index) in aiList" :key="item+index">
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple-dark">
                  <span style="font-size:16px;padding-right:10px">{{item.publisher_name}}</span>
                  <span>{{item.create_date}}</span>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-content bg-purple pd">{{item.dynamic_comment}}</div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" v-for="(item, index) in item.img" :key="index">
                <div class="grid-content bg-purple">
                  <img class="wh" :src="item">
                </div>
              </el-col>
            </el-row>
            <hr>
          </div>
        </el-tab-pane>
        <el-tab-pane
          label="帮扶记录"
          name="fived"
          style="height:400px;overflow-x: hidden;overflow-y: scroll;line-height: 30px;"
        >
          <el-table :data="currentItem4.vos" style="width: 100%">
            <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
            <el-table-column prop="user_name" align="center" label="名称" width="100"></el-table-column>
            <el-table-column prop="contribute_time" align="center" width="150" label="帮扶日期"></el-table-column>
            <el-table-column
              v-if="currentItem.demand_type =='2'"
              prop="paid_money"
              align="center"
              width="150"
              value
              label="帮扶金额(元)"
            ></el-table-column>
            <el-table-column align="center" label="爱心热度">
              <template slot-scope="scope">{{scope.row.hot_degree}}</template>
            </el-table-column>
            <el-table-column prop="message" align="center" label="爱心留言">
              <template slot-scope="scope">{{scope.row.bf_detail}}</template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="record.page"
            :page-size="record.pageSize"
            :total="Number(currentItem4.totals)"
            background
            layout="prev, pager, next, jumper"
            @size-change="handleSizeChangerec"
            @current-change="handleCurrentChangerec"
             v-if="currentItem4.totals>record.pageSize">
         </el-pagination>
        </el-tab-pane>
        <el-tab-pane
          label="需求证明"
          name="ford"
          style="height:400px;overflow-x: hidden;overflow-y: scroll;line-height: 30px;"
        >
          <el-table :data="currentItem3.vos" style="width: 100%">
            <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
            <el-table-column prop="real_name" align="center" label="姓名" width="100"></el-table-column>
            <el-table-column prop="user_type" align="center" width="150" label="用户类型"></el-table-column>
            <el-table-column prop="content" align="center" label="内容"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <el-dialog :visible.sync="dialogAiVisible" title="发布爱心动态" @close="cancle">
      <el-form :model="currentItem" label-position="left">
        <el-form-item label="爱心动态">
          <el-input
            v-model="comMent"
            type="textarea"
            placeholder="最少输入五个字"
            :autosize="{ minRows: 4, maxRows: 8}"
          />
        </el-form-item>
        <el-upload
          ref="upload"
          action
          accept="image/jpeg, image/gif, image/png"
          list-type="picture-card"
          :auto-upload="false"
          :multiple="true"
          :limit="9"
          :on-exceed="handleExceed"
          :on-change="changeFile"
          :file-list="fileList"
          :http-request="httpRequest"
          :drag="false"
        >
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">图片最多上传9张，仅支持JPG\JPEG\GIF\PNG格式的图片文件，文件大小不能大于2MB</div>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取消</el-button>
        <el-button type="primary" @click="tupianshangchuan()">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="exportVisible" title="选择导出页码" @close="closeexport">
       <!-- <div class="pagination-container">
      <el-pagination
        :current-page="exportpage"
        :page-size="exportpageSize"
        :total="total"
        background
        layout="total, prev, pager, next, jumper"

        @current-change="handleExportChange"
      />
       <el-button type="primary" @click="downloadFile()">确定</el-button>
    </div> -->
    <el-card >
        <div  class="exportdiv" v-for="(item,index) in exportarr" :key="item.url"><span class="m">第{{index+1}}页:第{{item.from}}条——第{{item.to}}条</span>  <el-button type="primary" icon="el-icon-download" class="exportbutton" @click="downloadFile(item.url)">下载</el-button></div>
    </el-card>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible" title="编辑信息">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="currentItem"
        label-position="left"
        label-width="160px"
        style="width: 500px; margin-left:30px;"
      >
        <el-form-item label="需求标题" prop="demand_title">
          <el-input :autosize="{ minRows: 2, maxRows: 4}" v-model="currentItem.demand_title"/>
        </el-form-item>
        <el-form-item label="需求内容" prop="demand_coment">
          <el-input v-model="currentItem.demand_coment" type="textarea"/>
        </el-form-item>
        <el-form-item label="目标金额" prop="target_amount">
          <el-input v-model="currentItem.target_amount" type="text"/>
        </el-form-item>
        <el-form-item label="资金用途" prop="remark">
          <el-input v-model="currentItem.remark" type="text"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData('ruleform')">确定</el-button>
        <el-button v-else type="primary" @click="updateData()">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="bankVisible" title="收款帐号信息">
      <el-form
        ref="bankform"
        v-if="bankVisible"
        :rules="bankRules"
        :model="bank"
        label-position="right"
        label-width="120px"
        style="width: 500px; margin-left:10px;"
      >
        <el-form-item label="银行名称：" prop="bankName">
          <el-input v-model="bank.bankName" placeholder="示例：重庆农村商业银行"/>
        </el-form-item>
        <el-form-item label="开户行名称：" prop="openBank">
          <el-input v-model="bank.openBank" placeholder="示例：巫溪县天元分理处"/>
        </el-form-item>
        <el-form-item label="收款人姓名：" prop="payee">
          <el-input v-model="bank.payee" type="text"/>
        </el-form-item>
        <el-form-item label="银行卡号：" prop="bankAccount">
          <el-input v-model="bank.bankAccount" type="text"/>
        </el-form-item>
        <el-form-item label="身份证号：" prop="idCard">
          <el-input v-model="bank.idCard" type="text" placeholder="收款人身份证号"/>
        </el-form-item>
        <el-form-item label="上传凭证：" prop="remark">
          <el-button style="margin-top:-8px;" @click="openUrl">下载说明及模板</el-button>
          <div class="imgss" style="margin-top:20px">
            <div class="position"  v-for="(item,index) in imgArr" :key="item">
                <div class="end" @click="deteleImg(item,index)">
                    <span></span>
                </div>
                <img :src="item" alt="">
            </div>
            <el-upload
                v-if="imgArr.length<6"
                class="avatar-uploader"
                :action="ImgUrl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <!-- <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar"> -->
                <i  class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="bankVisible = false">取消</el-button>
        <el-button type="primary" @click="bankSub('bankform')">确定</el-button>
      </div>
    </el-dialog>
    <edit-alert v-if="visible" :id="alertID" :visible.sync="visible"></edit-alert>
  </div>
</template>

<script>
import waves from "@/directive/waves"; // 水波纹指令
import axios from 'axios'
import linkage from "@/components/linkage";
import { createArticle, fetchPv, updateArticle } from "@/api/article";
import { parseTime } from "@/utils";
import "element-ui/lib/theme-chalk/index.css";
import urlFunction from "../../api/urlFun.js";
import downloadfile from "../../utils/downloadfile.js"
import { mapState } from "vuex";
import { Loading } from 'element-ui'
import editAlert from "@/views/help/edit";
export default {
  name: "DemandList",
  directives: {
    waves
  },
  components: {
    linkage,
    editAlert
  },
  computed: {
    ...mapState(["user"]),
    getDemandStatus() {
      let statusarr = [3, 4, 5, 6, 7, 11];
      if (statusarr.indexOf(this.currentItem.demand_status) > -1) {
        return true;
      } else return false;
    }
  },
  data() {
    return {
      ReviewStatus:[
          {
            id:"",
            name:"全部"
          },{
            id: '2',
            name: '待审核'
          }, {
            id: '3',
            name: '已审核'
          }, {
            id: '0',
            name: '审核通过'
          }, {
            id: '1',
            name: '审核不通过'
          }
        ],
      ImgUrl:process.env.BASE_API+'/cfs/file/uploads',
      imgArr:[],
      bank:{
        bankName:'',
        openBank:'',
        payee:'',
        bankAccount:'',
        idCard:'',
        demandId:'',
        remarks:'',
        certificateUrl:[]
      },
      bankRules: {
        bankName: [
          {
            required: true,
            message: "请输入银行名称",
            trigger: "blur"
          }
        ],
        openBank: [
          {
            required: true,
            message: "请输入开户行名称",
            trigger: "blur"
          }
        ],
        payee: [
          {
            required: true,
            message: "请输入收款人",
            trigger: "blur"
          }
        ],
        bankAccount: [
          {
            required: true,
            message: "请输入银行卡号",
            trigger: "blur"
          }
        ],
        idCard: [
          {
            required: true,
            message: "请输入身份证号",
            trigger: "blur"
          }
        ]
      },
      pickerValue:'',
      SetTopId:'',
      SetTopS:'',
      totalNum:'',
      pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      alertID:'',
      visible:false,
      zdVisible:false,
      bankVisible:false,
      exportVisible:false,
      loadingInstance:null,
      level_list: JSON.parse(localStorage.leaderarrs),
      level: JSON.parse(localStorage.leaderLevel),
      selectarr: [],
      tableKey: 0,
      list: null,
      total: null,
      guanbi: "关闭需求",
      comMent: null,
      dialogAiVisible: false,
      fileList: [],
      fileList2: [],
      dialogStatus: null,
      relate_pics: [],
      exportpageSize:100000,
      exportarr:[],
      bankImgs:[],
      listQuery: {
        operationalReviewStatus:'',
        special_bank_status:'',
        sort:3,
        page: 1,
        pageSize: 20,
        isOneself: "",
        aidedName: "",
        aidedIdCard: "",
        isPoor: "",
        regionOneId: "",
        aidederTel: "",
        demandStatus: "",
        state: 1,
        helpTypeCode: "",
        reviewEndDate: "",
        reviewStartDate: "",
        endDate: "",
        startDate: "",
        isInstead: "",
        staffName: "",
        aidederIdcard: "",
        publishTel: "",
        publishName: "",
        mobile: ""
        // helpTypeCode: '',
        // self: '',
        // pId: "",
        // cId: "",
        // xId: "",
        // vId: "",
        // hId: ""
      },
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.listQuery.endDate;
            if (endDateVal!="") {
            return (
              time.getTime() > new Date(endDateVal).getTime()
            );
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.listQuery.startDate;
          if (beginDateVal!="") {
            return (
            time.getTime() <
              new Date(beginDateVal).getTime()-1*1000*24*60*60 ||time.getTime()>Date.now()
            );
          }
          else {
            return time.getTime() > Date.now();
          }

        },
      },
      pickerOptionsStart2: {
        disabledDate: time => {
          let endDateVal = this.listQuery.reviewEndDate;
            if (endDateVal!="") {
            return (
              time.getTime() > new Date(endDateVal).getTime()
            );
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptionsEnd2: {
        disabledDate: time => {
          let beginDateVal = this.listQuery.reviewStartDate;
          if (beginDateVal!="") {
            return (
            time.getTime() <
              new Date(beginDateVal).getTime()-1*1000*24*60*60 ||time.getTime()>Date.now()
            );
          }
          else {
            return time.getTime() > Date.now();
          }

        },
      },
      isInstead: [
        { name: "全部", id: "" },
        { name: "代发", id: 1 },
        { name: "非代发", id: 0 }
      ],
      props: {
        value: "id",
        label: "regionName",
        children: "cities"
      },
      record:{
          page:1,
          pageSize:10,
          id:''
      },
      rules: {
        demand_title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur"
          }
        ],
        demand_coment: [
          {
            required: true,
            message: "请输入内容",
            trigger: "blur"
          }
        ],
        target_amount: [
          {
            required: true,
            message: "请输入金额",
            trigger: "blur"
          }
        ],
        remark: [
          {
            required: true,
            message: "请输入用途",
            trigger: "blur"
          }
        ]
      },
      demandStatus: [
        {
          id: "1",
          name: "待审核"
        },
        {
          id: "0",
          name: "审核不通过"
        }
      ],
      queryType: [
        {
          id: "name",
          name: "姓名"
        },
        {
          id: "idcord",
          name: "身份证号"
        },
        {
          id: "phone",
          name: "贫困户手机号"
        }
      ],
      isPoorOptions: [
        {
          id: "",
          name: "全部"
        },
        {
          id: "1",
          name: "贫困户"
        },
        {
          id: "0",
          name: "非贫困户"
        }
      ],
      demandStatusOptions: [
        {
          id: "",
          name: "全部"
        },
        {
          id: "1",
          name: "待审核"
        },
        {
          id: "2",
          name: "审核不通过"
        },
        {
          id: "3",
          name: "帮扶中"
        },
        {
          id: "4",
          name: "等待提现"
        },
        {
          id: "5",
          name: "提现中"
        },
        {
          id: "6",
          name: "待发货"
        },
        {
          id: "7",
          name: "已发货"
        },
        {
          id: "8",
          name: "发布超时"
        },
        {
          id: "11",
          name: "帮扶成功"
        },
        {
          id: "9",
          name: "帮扶失败"
        },
        {
          id: "10",
          name: "已关闭"
        },
        {
          id: "12",
          name: "审核已删除"
        }
      ],
      demandTypesList: [
        {
          id: "",
          name: "全部需求"
        },
        {
          id: "1",
          name: "教育需求"
        },
        {
          id: "2",
          name: "医疗需求"
        },
        {
          id: "3",
          name: "住房需求"
        },
        {
          id: "4",
          name: "物品需求"
        }
      ],
      leixing: [
        {
          id: "",
          name: "全部"
        },
        {
          id: 1,
          name: "待审核"
        },
        {
          id: 2,
          name: "审核不通过"
        },
        {
          id: 3,
          name: "帮扶中"
        },
        {
          id: 4,
          name: "等待提现"
        },
        {
          id: 5,
          name: "提现中"
        },
        {
          id: 6,
          name: "待发送"
        },
        {
          id: 7,
          name: "已发送"
        },
        {
          id: 8,
          name: "发布超时"
        },
        {
          id: 9,
          name: "帮扶失败"
        },
        {
          id: 10,
          name: "已关闭"
        },
        {
          id: 11,
          name: "帮扶成功"
        }
      ],
      zhuangtai: [
        {
          id: "",
          name: "全部"
        },
        {
          id: "1",
          name: "本人审核"
        },
        {
          id: "0",
          name: "非本人审核"
        }
      ],
      bankStatus:[
        {
          id:'',
          name:'全部'
        },
        {
          id:'3',
          name:'收款信息待审核'
        },
        {
          id:'1',
          name:'收款信息审核通过'
        },
        {
          id:'2',
          name:'收款信息审核不通过'
        },
        
      ],
      currentItem: {
        id: "33"
      },
      currentItem2: {
        id: "33"
      },
      currentItem3: { id: "33" },
      currentItem4: { id: "33" },
      dialogDetail: false,
      dialogFormVisible: false,

      // user_level: null,
      aiList: null,
      totalAi: null,
      tips: "提醒一下",
      result: [],
      imgUploadArg: {},
      str: ""
    };
  },
  created() {
    
    console.log(this.listQuery,'000')
    this.getList();
  },
  methods: {
    logsDetail(item){
      this.$alert(item.remarks, '不通过原因', {
          confirmButtonText: '确定',
          callback: action => {
            
          }
        });
    },
    bankChange(item){
      console.log(item)
      let is_special =item.is_special==1?'添加':'修改'
      this.$confirm(is_special+'收款信息后，需求进行提现操作，运营人员将在7个工作日之内完成审核，审核通过后需求将不能继续捐赠，是否继续添加?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.bankVisible=true;
          this.imgArr=[]
          this.bank={
            bankName:'',
            openBank:'',
            payee:'',
            bankAccount:'',
            idCard:'',
            demandId:item.id,
            remarks:'',
            certificateUrl:[]
          }
      }).catch(() => {
      });
     
    },
    confirm(){
      this.bank.certificateUrl=this.imgArr.toString()
      this.$http.post("hts/special/addSpecialBank", this.bank)
        .then(response => {
          this.$notify({
            title: "成功",
            message: "更新成功",
            type: "success",
            duration: 2000
          });
          this.bankVisible=false;
          this.getList()
        });
    },
    bankSub(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.imgArr.length>0){
              this.$http.post("hts/special/checkSpecialBank", this.bank)
                .then(res => {
                  console.log('[[[',res)
                  let msg=''
                  if(res==0){
                    msg='您所填写的收款人与受助人姓名不一致，收款账号信息验证通过，保存后收款信息无法更改，是否保存?'
                  }else if(res==1){
                    msg='您所填写的收款人与受助人姓名不一致，收款账号信息验证不通过，请检查填写的收款信息'
                    this.$notify({
                      title: "提示！",
                      message: msg,
                      type: "error",
                      duration: 2000
                    });
                    return 
                  }else if(res==2){
                    msg='保存后收款信息无法更改，是否保存?'
                  }else if(res ==3){
                    msg='保存后收款信息无法更改，是否保存?'
                  }
                  this.$confirm(msg, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                      this.confirm()
                  }).catch(() => {
                  });
              });
            }else{
              this.$notify({
                title: "提示！",
                message: "请至少添加一张凭证",
                type: "error",
                duration: 2000
              });
              return false;
            }
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    openUrl(){
      location.href="http://zgshfp.oos-website-cn.oos-hq-bj.ctyunapi.cn/zhongchou/zip/2020/4/24/2020-4-24-2fa02cc7-6573-4e4c-94b8-f4a7c8178ba1.zip"
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
            // alert('图片上传失败')
            this.$notify({
                title: "提示！",
                message: e.message,
                type: "error",
                duration: 2000
              });
        }
    },
    beforeAvatarUpload(e,a){
        console.log('1231231312312',e,a)
    },
    SetTop(){
        let data={
            topStartTime:this.pickerValue[0],
            topEndTime:this.pickerValue[1],
            id:this.SetTopId,
            topStatus:this.SetTopS
        }
        this.$http.post("/hts/management/isTop", data)
          .then(res => {
              this.$message({
                type: 'success',
                message: '置顶成功!'
              });
              this.getList();
          });
          this.zdVisible = false;
    },
      //取消置顶
    SetUpTop(id,status){
        let s
        if(status==1){
            s=0;
            this.$confirm('此操作将取消置顶, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                let data={
                    id:id,
                    topStatus:s
                }
                this.$http.post("/hts/management/isTop", data)
                  .then(res => {
                      this.$message({
                        type: 'success',
                        message: '取消置顶成功!'
                      });
                      this.getList();
                  });

            }).catch(() => {

            });
        }else{
            s=1
            this.SetTopS=s
            this.SetTopId=id
            this.zdVisible=true
        }

      console.log('status',status,s);

    },
    editDe(row){

        this.alertID=row.id
        console.log(this.alertID)
        this.visible=true
    },
    selectionRowsChange(value) {
      this.selectarr = value;
    },

    cancle() {
      this.comMent = null;
      this.dialogAiVisible = false;
      this.fileList2 = [];
      this.fileList = [];
    },
    handleExceed() {
      alert("最多传9张");
    },
    closeexport(){
       this.exportarr = [];
       this.exportVisible = false;
    },
    changeFile(file, filelist) {
      if (filelist.length > 9) {
        alert("最多传9张");
        return;
      }
      this.fileList2 = filelist.filter(f => f.status === "ready");
    },
   downloadFile(url) {
     downloadfile.fileDownload(url,{
			  prepareCallback: function(url){
          this.loadingInstance = Loading.service({fullscreen: true, text: '下载时间较长，请耐心等待...'});
			  },
			  successCallback: function(url){
			    this.loadingInstance.close();
			  },
			  failCallback: function (html, url) {
			    this.loadingInstance.close();
			   }
			}
)

    },
    editDemandExc() {
      if (this.selectarr.length > 0) {
        let idarr = [];
        this.selectarr.forEach(val => {
          idarr.push(val.id);
        });
        let idstr = idarr.join(",");

        let obj = {};
        obj.token =  this.user.token;
        obj.demandId = idstr;
        this.exporthandler(process.env.BASE_API+`ets/excel/demandExcelDown?token=${
          this.user.token
        }&demandId=${idstr}`,obj)

      } else {
        let urlobj = {...this.listQuery}
        urlFunction(urlobj).then(res => {
          let data = res.join("&").replace(/\"/g, "");
           let datastr = data==""?"":"&"+data;

         let obj = {...this.listQuery}
         obj.token =   this.user.token

           this.exporthandler(process.env.BASE_API+`ets/excel/demandExcelDown?token=${
            this.user.token
          }${datastr}`,obj)
        });
      }
    },
  async  exporthandler(url,obj) {
    let pagetotal = 0
    let exporttotal = 0
    await this.$http
        .post("/ets/excel/demandExcelDownCount", obj)
        .then(response => {
          if(response.totals==0){
             this.$message({
            showClose: true,
            message: "没有符合条件的数据，无法导出!",
            type: "error"
          });
            return;
          }
           this.exportVisible = true;
          exporttotal = response.totals;
            if(exporttotal<this.exportpageSize||exporttotal==this.exportpageSize){
       pagetotal = 1;
      this.exportarr = [{url:url+"&page=1",page:1,from:1,to:exporttotal}]
    }
    else{
       pagetotal = Math.ceil(exporttotal/this.exportpageSize);
       for(let i=0;i<pagetotal;i++){
         let num = i+1
         if(i<pagetotal-1){
         this.exportarr.push({url:url+"&page="+num,page:num,from:i*this.exportpageSize+1,to:num*this.exportpageSize})
         }
         else{
         this.exportarr.push({url:url+"&page="+num,page:num,from:i*this.exportpageSize+1,to:exporttotal})

         }
       }
    }

  });

    },

    typeIndex(index) {
      return index + (this.listQuery.page - 1) * this.listQuery.pageSize + 1;
    },
    linkageChange(n, m, b) {
      this.listQuery.regionOneId = b;
      // this.listQuery.pId = n[0].id
      // this.listQuery.cId = n[1].id
      // this.listQuery.xId = n[2].id
      // this.listQuery.vId = n[3].id
      // this.listQuery.hId = n[4].id
    },
    getCookie(name) {
      name = name + "=";
      let start = document.cookie.indexOf(name),
        value = null;
      if (start > -1) {
        let end = document.cookie.indexOf(";", start);
        if (end === -1) {
          end = document.cookie.length;
        }
        value = document.cookie.substring(start + name.length, end);
      }
      return value;
    },
    getList() {
      if (this.$route.query.id) {
        this.listQuery.demandStatus = this.$route.query.id;
        this.$route.query.id = "";
      }
      console.log(this.listQuery,'----------')
      this.$http
        .post("/hts/management/showList", this.listQuery)
        .then(response => {
          this.list = response.vos;
          let num = parseInt(response.totals);
          this.total = num>this.listQuery.pageSize*100?this.listQuery.pageSize*100:num
          // this.total = parseInt(response.totals);
          this.totalNum=parseInt(response.totals);
        });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleSizeChangerec(val) {
      this.record.pageSize = val;
      this.getrec()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleCurrentChangerec(val) {
      this.record.page = val;
      this.getrec()
    },
    handleExportChange(val){
     this.exportpage = val
    },
    change(val) {
      this.$http
        .post("hts/help/dynamic", {
          demand_code: this.currentItem.id,
          dynamic_type: 2,
          page: val
        })
        .then(response => {
          this.totalAi = parseInt(response.totals);
          this.aiList = response.vos;
        });
    },
    handerCliclAi() {
      this.dialogAiVisible = true;
    },
    httpRequest(e) {
      let file = e.file;
      let _this = this;
      if (!/image\/\w+/.test(file.type)) {
        return false;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("上传图片不能超过2M");
        return false;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        let result = this.result;
        let image = new Image();
        let rate = 1;
        if (file.size >= 200 && file.size <= 500) {
          rate = 0.7;
        } else if (file.size > 500 && file.size <= 1024) {
          rate = 0.5;
        } else if (file.size > 1024) {
          rate = 0.3;
        }
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        image.src = result;
        image.onload = function() {
          let w = image.naturalWidth,
            h = image.naturalHeight;
          canvas.width = w;
          canvas.height = h;
          ctx.drawImage(image, 0, 0, w, h, 0, 0, w, h);
          let data = canvas.toDataURL("image/jpeg", rate);
          let filedata = [];
          filedata.push(data);

          _this.imgUploadArg = {};
          _this.imgUploadArg = filedata.join("-");
          _this.$http
            .post("/uts/file/bfFilesUpload", {
              imgStr: _this.imgUploadArg
            })
            .then(res => {
              _this.fileList.push(res[0]);
              _this.str = _this.fileList.join(",");
              if (_this.fileList2.length == _this.fileList.length) {
                _this.uploadOver();
              }
            });
        };
      };
    },
    uploadOver() {
      this.$http
        .post("/hts/management/addDynamic", {
          demandId: this.currentItem.id,
          comment: this.comMent,
          type: 2,
          imgUrl: this.str
        })
        .then(response => {
          this.$message({
            showClose: true,
            message: "发布爱心动态成功",
            type: "success"
          });
          this.$http
            .post("/hts/help/dynamic", {
              demand_code: this.currentItem.id,
              dynamic_type: 2
            })
            .then(response => {
              this.totalAi = parseInt(response.totals);
              this.aiList = response.vos;
            });
          this.comMent = null;
          this.dialogAiVisible = false;
          this.dialogDetail = false;
          this.fileList2 = [];
          this.fileList = [];
        });
    },
    tupianshangchuan() {
      if (this.comMent === null) {
        this.$message({
          showClose: true,
          message: "最少输入5个字，最多输入100个字",
          type: "warning"
        });
      } else if (this.comMent.length >= 5 && this.comMent.length < 100) {
        this.$refs.upload.submit();
      } else {
        this.$message({
          showClose: true,
          message: "最少输入5个字，最多输入100个字",
          type: "warning"
        });
      }
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleClose(value) {
      let self = this;
      // this.$http.post('/hts/management/workbench').then(response => {
      //   this.user_level = response.user_level
      // })
      // this.$http.post('/hts/myDemand/detail', {
      //   demandId: value.id
      // }).then(response => {
      //   this.currentItem = response
      // })
      this.$confirm('确认关闭该需求吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          let demandflag = value.demand_status == "3";
          let demandcapital = value.demand_type == 2 && value.moneycount == 0;
          let goodsstatus = value.demand_type == 1;
          if (demandflag) {
            if (goodsstatus || demandcapital) {
              this.$http
                .post("/hts/management/demandClose", {
                  demandId: value.id
                })
                .then(response => {
                  this.$message({
                    showClose: true,
                    message: "关闭成功",
                    type: "success"
                  });

                  self.getList();
                });
            } else {
              this.$message({
                showClose: true,
                message: "已有捐款不能关闭需求或者您没有权限",
                type: "error"
              });
            }
          } else {
            this.$http
              .post("/hts/management/demandClose", {
                demandId: value.id
              })
              .then(response => {
                this.$message({
                  showClose: true,
                  message: "关闭成功",
                  type: "success"
                });

                self.getList();
              });
          }
      }).catch(() => {
           
      });


      // if((this.demand_type === 2 && this.currentItem.moneycount === 0) || (this.currentItem.demand_status ===3  && this.currentItem.moneycount === 0)) {
      //   this.$http.post('/hts/management/demandClose', {
      //     demandId: this.currentItem.id
      //   }).then(response => {
      //     this.$message({
      //       showClose: true,
      //       message: '关闭成功',
      //       type: 'success'
      //     })
      //   })
      // } else {
      //   this.$message({
      //     showClose: true,
      //     message: '已有捐款不能关闭需求或者您没有权限',
      //     type: 'error'
      //   })
      // }
    },
    getrec(val){
        this.$http
          .post("/hts/help/helpRecord", {
            demand_code: this.record.id,
            page:this.record.page,
            pageSize:this.record.pageSize
          })
          .then(response => {
            this.currentItem4 = response;
          });
    },
    handleTips(item) {
      this.$http
        .post("/hts/management/msgRemind", {
          demandId: item.id
        })
        .then(response => {
          this.$message({
            showClose: true,
            message: "提醒成功",
            type: "success",
            duration: 2000
          });
        });
    },
    handleSelectionChange(val) {
      this.currentItem = val;
      if (val.relate_pics === "") {
        this.relate_pics = [];
      } else {
        this.relate_pics = val.relate_pics.split(",");
      }
    },
    handleDetial(val) {
        this.record.id=val.id
        this.getrec();
      this.$http
        .post("/hts/myDemand/detail", {
          demandId: val.id
        })
        .then(response => {
          this.currentItem = response;
          this.bankImgs=response.certificate_url.split(',')
        });
      this.$http
        .post("/hts/help/getDemandProof", {
          demand_id: val.id
        })
        .then(response => {
          this.currentItem3 = response;
        });

      this.$http
        .post("/hts/management/logs", {
          demandId: val.id
        })
        .then(response => {
          this.currentItem2 = response;
        });
      this.$http
        .post("/hts/help/dynamic", {
          demand_code: val.id,
          dynamic_type: 2
        })
        .then(response => {
          this.totalAi = parseInt(response.totals);
          this.aiList = response.vos;
        });
      this.dialogDetail = true;
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.$http
            .post("hts/myDemand/updateDemand", {
              demandId: this.currentItem.demand_types,
              demand_title: this.currentItem.demand_title,
              help_type_code: this.currentItem.help_type_code,
              demand_coment: this.currentItem.demand_coment,
              target_amount: this.currentItem.target_amount,
              demand_types: this.currentItem.demand_types,
              img: this.currentItem.img_url,
              demand_use: this.currentItem.demand_use,
              demand_use_money: this.currentItem.demand_use_money,
              user_addr_id: this.currentItem.user_addr_id
            })
            .then(response => {
              this.dialogFormVisible = false;
              this.$notify({
                title: "成功",
                message: "更新成功",
                type: "success",
                duration: 2000
              });
            });
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.yellow{
    background: #ffc71d;
    border-color: #ffc71d;
}
.blue{
    background: #23bab7;
    border-color: #23bab7;
}
.tabless{
    th{
        background: #000;
    }
}
.label {
  width: 140px;
  display: inline-block;
  margin: 6px;
}
.exportbutton {
 float:right;
 margin:0px
}
.exportdiv{
  height: 40px;
}
.checkDialog >>> .el-dialog__body {
  padding-top: 0px;
}
.filter-container span {
  line-height: 50px;
  font-size: 14px;
}
.center {
  text-align: center;
}

.img_span {
  width: 100%;
  float: left;
}

.imgs {
  display: block;
  width: 100%;
  height: auto;
}
.pd {
  padding: 10px 0px 10px 0px;
}
.wh {
  width: 100%;
}
.tx {
  text-align: center;
}
.h4 {
  height: 400px;
  overflow-x: hidden;
  overflow-y: scroll;
  line-height: 30px;
  text-align: center;
  display: none;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  height: 300px;
}
.el-carousel__item h3 img {
  display: inline-block;
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  width: 100%;
  height: 100%;
}
.el-pagination{
    text-align: center;
}
.warnspan{
      font-size: 14px;
    height: auto;
    color: red;
    line-height: 30px;
    text-align: center;
    display: block;
    width: 100%;
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
.imgss{
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
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

</style>
