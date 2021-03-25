export default {
  0: {
    statusText: '草稿',
    textColor: 'color-green',
    listButtonArray: [
      {
        text: '重新编辑',
        url: 'goPublish',
      }
    ],
    detailButtonArray: [
      // {
      //   text: '编辑需求',
      //   url: 'goPublish',
      // }
    ],
  },
  1: {
    statusText: '待审核',
    textColor: 'color-orange',
    listButtonArray: [
      {
        text: '重新编辑',
        url: 'goPublish',
      }
    ],
    detailButtonArray: [
      // {
      //   text: '关闭需求',
      //   url: '',
      // }
      // {
      //   text: '编辑需求',
      //   url: 'goPublish',
      // }
    ],
    confirmText: '确认关闭此需求吗？',
  },
  2: {
    statusText: '审核不通过',
    textColor: 'color-red',
    listButtonArray: [
      {
        text: '重新编辑',
        url: 'goPublish',
      }
    ],
    detailButtonArray: [
      // {
      //   text: '删除需求',
      //   url: '',
      // }
      // {
      //   text: '重新编辑',
      //   url: 'goPublish',
      // }
    ],
    confirmText: '确认删除此需求吗？',
  },
  3: {
    statusText: '帮扶中',
    textColor: 'color-orange',
    listButtonArray: [
      {
        text: '发布动态',
        url: 'loveFeedback',
      }
    ],
    detailButtonArray: [
      // {
      //   text: '关闭需求',
      //   url: '',
      // },
      
    ],
    detailButtonWithdrawArray: [
      // {
      //   text: '提前结束，马上提现',
      //   url: 'cashindex',
      // },
    ],
    confirmTextWithdraw(detail){
      return '确认提前结束，马上提现吗？提前提现功能仅限有紧急资金需求时使用，您当前还剩'+ detail.withDrawCount+ '次提前提现权限。提前提现后，将进入资金提现流程，同时此需求也将终止，无法继续接受帮扶哦~'
    },
    confirmText: '确认关闭此需求吗？',
  },
  4: {
    statusText: '等待提现',
    textColor: 'color-red',
    listButtonArray: [
      {
        text: '发布动态',
        url: 'loveFeedback',
      },
      // {
      //   text: '提醒一下',
      //   url: 'cashindex',
      //   0:{
      //     text:"提醒一下"
      //   },
      //   1:{
      //     text:"已提醒"
      //   }
      // }
    ],
    detailButtonArray: [
      {
        text: '提现',
        url: 'cashindex',
      }
    ],
  },
  5: {
    statusText: '提现中',
    textColor: 'color-orange',
    listButtonArray: [
      {
        text: '发布动态',
        url: 'loveFeedback',
      }
    ],
    detailButtonArray: [],
  },
  6: {
    statusText: '待送出',
    textColor: 'color-orange',
    listButtonArray: [
      {
        text: '发布动态',
        url: 'loveFeedback',
      }
    ],
    detailButtonArray: [],
    countdown(detail){
      return '还剩'+detail.countdown+'送出物品'
    }

  },
  7: {
    statusText: '已送出',
    textColor: 'color-green',
    listButtonArray: [
      {
        text: '发布动态',
        url: 'loveFeedback',
      }
    ],
    detailButtonArray: [
      // {
      //   text: '确认收货',
      //   url: '',
      // }
    ],
    confirmText: '确认要收货吗？',
  },
  8: {
    statusText:'发布超时',
    textColor: 'color-red',
    listButtonArray: [
      {
        text: '重新编辑',
        url: 'goPublish',
      }
    ],
    detailButtonArray: [
      // {
      //   text: '删除需求',
      //   url: '',
      // }
      // {
      //   text: '重新编辑',
      //   url: 'goPublish',
      // }
    ],
    confirmText: '确认删除此需求吗？',
  },
  9: {
    statusText: '帮扶失败',
    textColor: 'color-999',
    listButtonArray: [],
    detailButtonArray: [
/*      {
        text: '删除需求',
        url: '',
      }*/
    ],
    //confirmText: '确认删除此需求吗？'
  },
  10: {
    statusText: '已关闭',
    textColor: 'color-999',
    listButtonArray: [],
    detailButtonArray: [
      // {
      //   text: '删除需求',
      //   url: '',
      // }
    ],
    confirmText: '确认删除此需求吗？',
  },
  11: {
    statusText: '帮扶成功',
    textColor: 'color-green',
    listButtonArray: [
      {
        text: '发布动态',
        url: 'loveFeedback',
      },
      {
        text: '填写感谢回馈',
        url: 'thankFeedback',
      }
    ],
    detailButtonArray: [
      // {
      //   text: '查看感谢回馈',
      //   url: 'viewlovefeedback',
      // },
      // {
      //   text: '填写感谢回馈',
      //   url: 'thankFeedback',
      // }
    ],
  },
  getDetailButtonArray(detail) {
    if (detail.demand_status==3&&detail.moneycount>0) {
      return this[detail.demand_status].detailButtonWithdrawArray;
    } else {
      return this[detail.demand_status].detailButtonArray;
    }
  },
  getConfirmText(detail) {
    if (detail.demand_status == 3 && detail.moneycount) {
      return this[detail.demand_status].confirmTextWithdraw(detail);
    } else {
      return this[detail.demand_status].confirmText;
    }
  },
  getCountdown(detail){
    if(detail.demand_status === 6){
      return this[detail.demand_status].countdown(detail)
    }
  }
}
