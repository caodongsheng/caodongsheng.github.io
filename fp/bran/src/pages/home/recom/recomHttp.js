export function get_fpzc_list (_this) {
    // console.log(_this)
    // _this.$http.post('http://user.eap2.net/api/demand/classify',{
    //     params: {
    //       help_type_code: 1
    //     }
    // }).then(function (res) {
    //
    //     if(res){
    //
    //     }
    // }).catch(function (error) {
    //     console.log(error);
    // });
  if (_this.$store.state.fpzclist.length <= 0 || _this.$store.state.fpzclist == null) {
    _this.$store.state.fpzclist = [{
      url: '',
      label: '慈善募捐',
      bgimg: 'background-image: url(./static/appimg/rec-fpzc-img01.jpg)',
      title: '为孩子们建一间梦想教室',
      helpnum: '10000.00',
      supportnum: '1000'
    },
    {
      url: '',
      label: '慈善募捐',
      bgimg: 'background-image: url(./static/appimg/rec-fpzc-img02.jpg)',
      title: '帮助山村孩子读书',
      helpnum: '10000.00',
      supportnum: '1000'
    }]
  }
    // console.log(_this.$store.state.select);
  return _this.$store.state.fpzclist
}
export function get_axf_list (_this, type) {
  switch (type) {
    case 'medical':
      if (_this.$store.state.medicallist.length <= 0 || _this.$store.state.medicallist == null) {
        _this.$store.state.medicallist = [{
          url: '',
          userphoto: './static/appimg/user-photo01.jpg',
          name: '王卓君1',
          img: './static/appimg/rec-ylbf-img01.jpg',
          title: '医疗队伍进驻利川',
          raised: 175,
          data: 80,
          demandtype: 0
        },
        {
          url: '',
          userphoto: './static/appimg/user-photo02.jpg',
          name: '杨晓明',
          img: './static/appimg/rec-ylbf-img02.jpg',
          title: '社区免费体检',
          raised: 175,
          data: 30,
          demandtype: 0
        },
        {
          url: '',
          userphoto: './static/appimg/user-photo03.jpg',
          name: '李玉林',
          img: './static/appimg/rec-ylbf-img03.jpg',
          title: '谢谢好医生的到来',
          raised: 175,
          data: 100,
          demandtype: 0
        }]
      }
      return _this.$store.state.medicallist

      break
    case 'education':

      if (_this.$store.state.educationlist.length <= 0 || _this.$store.state.educationlist == null) {
        _this.$store.state.educationlist = [{
          url: '',
          userphoto: './static/appimg/user-photo02.jpg',
          name: '徐贸焜',
          img: './static/appimg/rec-jybf-img01.jpg',
          title: '山村支教项目',
          raised: 175,
          data: 80,
          demandtype: 0
        },
        {
          url: '',
          userphoto: './static/appimg/user-photo01.jpg',
          name: '王开江',
          img: './static/appimg/rec-jybf-img02.jpg',
          title: '给孩子一个全面的教育',
          raised: 175,
          data: 30,
          demandtype: 0
        },
        {
          url: '',
          userphoto: './static/appimg/user-photo03.jpg',
          name: '杨晓明',
          img: './static/appimg/rec-jybf-img03.jpg',
          title: '宁川幼儿资助工程',
          raised: 175,
          data: 100,
          demandtype: 0
        }]
      }
      return _this.$store.state.educationlist
      break
    case 'house':

      if (_this.$store.state.houselist.length <= 0 || _this.$store.state.houselist == null) {
        _this.$store.state.houselist = [{
          url: '',
          userphoto: './static/appimg/user-photo01.jpg',
          name: '杨晓明',
          img: './static/appimg/rec-zfbf-img01.jpg',
          title: '旧村改造进湖南',
          raised: 175,
          data: 80,
          demandtype: 0
        },
        {
          url: '',
          userphoto: './static/appimg/user-photo02.jpg',
          name: '王忠诚',
          img: './static/appimg/rec-zfbf-img02.jpg',
          title: '危改房临时安置',
          raised: 175,
          data: 30,
          demandtype: 0
        },
        {
          url: '',
          userphoto: './static/appimg/user-photo03.jpg',
          name: '李跃年',
          img: './static/appimg/rec-zfbf-img03.jpg',
          title: '危房改建走访征集活动',
          raised: 175,
          data: 100,
          demandtype: 0
        }]
      }
      return _this.$store.state.houselist
      break
    case 'material':
      if (_this.$store.state.materiallist.length <= 0 || _this.$store.state.materiallist == null) {
        _this.$store.state.materiallist = [{
          url: '',
          userphoto: './static/appimg/user-photo01.jpg',
          name: '杨晓明',
          img: './static/appimg/rec-wpbf-img01.jpg',
          title: '米，面，油',
          label: ['生活需求', '米面油'],
          demandtype: 1
        },
        {
          url: '',
          userphoto: './static/appimg/user-photo02.jpg',
          name: '王忠诚',
          img: './static/appimg/rec-wpbf-img02.jpg',
          title: '一台电动车',
          label: ['生活需求', '电动车', '农用器械'],
          demandtype: 1
        },
        {
          url: '',
          userphoto: './static/appimg/user-photo03.jpg',
          name: '李跃年',
          img: './static/appimg/rec-wpbf-img03.jpg',
          title: '一台洗衣机',
          label: ['生活需求', '洗衣机', '日常用品'],
          demandtype: 1
        }]
      }
      return _this.$store.state.materiallist
      break
  }
}
