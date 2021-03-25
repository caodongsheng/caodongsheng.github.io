
export function getcommandlist(_this){
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
    if(_this.$store.state.recommandlist.length<=0 || _this.$store.state.recommandlist == null){
        _this.$store.state.recommandlist=    [ /*{
          "id": "203",
          "aideder_name": "杜甫",
          "demand_title": "贷款不够，请帮帮我",
          "demand_coment": "贷款不够请帮帮我",
          "region_name": "",
          "demand_use": "",
          "is_poor": 0,
          "moneycount": 5000,
          "target_amount": 50000,
          "img_url": "http://zgshfp.oos-website-cn.oos.ctyunapi.cn/avatar/cb95537d-b146-4e95-b7f0-10677ddeb46c5024494112878771658.png",
          "cateList": ["尿毒症", "骨折"],
          "user_pic": "http://zgshfp.oos-website-cn.oos.ctyunapi.cn/avatar/ce52286d-d430-4356-836a-a5ed4b0f451d1715643245369914978.png",
          "userType": "贫困",
          "beforCate": "慢性病",
          "type":1
        },*/

    {
      "id": "205",
      "projectname":"扬帆计划捐书项目",
      "projecttarget":"圆农村贫困孩子读书梦",
      "projecttitle":"七彩心愿包伴你成长",
      "projectsummary":"为贫困地区的孩子送去七彩心愿包，主力他们快乐学习，健康成长",
      "region_name": "",
      "img_url": "./static/appimg/rec-fpzc-img01.jpg",

      "type":2
    },

          {
            "id": "207",
           "title":"求帮扶标题,大概胜多负稍来看积分第三方",
            "boxlist":[
              {
                "img": "http://zgshfp.oos-website-cn.oos.ctyunapi.cn/avatar/05bfa4e5-bc4c-42de-8cb6-7f1a3c2df1694706314820467098764.png",
                "url": "http://zgshfp.oos-website-cn.oos.ctyunapi.cn/avatar/05bfa4e5-bc4c-42de-8cb6-7f1a3c2df1694706314820467098764.png"

              },{
                "img": "http://zgshfp.oos-website-cn.oos.ctyunapi.cn/avatar/05bfa4e5-bc4c-42de-8cb6-7f1a3c2df1694706314820467098764.png",
                "url": "http://zgshfp.oos-website-cn.oos.ctyunapi.cn/avatar/05bfa4e5-bc4c-42de-8cb6-7f1a3c2df1694706314820467098764.png"
              },{
                "img": "http://zgshfp.oos-website-cn.oos.ctyunapi.cn/avatar/05bfa4e5-bc4c-42de-8cb6-7f1a3c2df1694706314820467098764.png",
                "url": "http://zgshfp.oos-website-cn.oos.ctyunapi.cn/avatar/05bfa4e5-bc4c-42de-8cb6-7f1a3c2df1694706314820467098764.png"
              }
            ],
            "type":3
          },
     {
       "id": "207",
       "title":"求帮扶标题,大概胜多负稍来看积分第三方",
       "summary":"求帮扶标题,大概胜多负稍哈哈哈哈哈哈来看积分第三方",
         "img1": "http://zgshfp.oos-website-cn.oos.ctyunapi.cn/avatar/05bfa4e5-bc4c-42de-8cb6-7f1a3c2df1694706314820467098764.png",
         "img2": "http://zgshfp.oos-website-cn.oos.ctyunapi.cn/avatar/05bfa4e5-bc4c-42de-8cb6-7f1a3c2df1694706314820467098764.png",
         "img3": "http://zgshfp.oos-website-cn.oos.ctyunapi.cn/avatar/05bfa4e5-bc4c-42de-8cb6-7f1a3c2df1694706314820467098764.png",

       "type":4
     }]
    }
    // console.log(_this.$store.state.select);
    return _this.$store.state.recommandlist

}


