<template>
  <div>
  <div class="vux-circle-demo">
    <div style='width:150px;height:150px;'>
      <x-circle
        :percent="cen.percentage"
        :stroke-width="8"
        :trail-width="8"
        :stroke-color="['#f37306', '#fd8b2a']"
        trail-color="#ececec">
        <span style="color:#000000">{{ cen.percentage }}</span><br>
        <span style="color:#000000">帮扶完成</span>
      </x-circle>
    </div>
    <h4>该项目用时{{cen.overTime}}天</h4>
  </div>
  </div>
</template>

<script>
  import { XCircle } from 'vux'
  export default {
    props: ['cen'],
    components: {
      XCircle
    },
    data () {
      return {
        percent: 70,
        vos: {
          "id": "200",
          "photoUrl": "http://zgshfp.oos-website-cn.oos.ctyunapi.cn/avatar/ce52286d-d430-4356-836a-a5ed4b0f451d1715643245369914978.png",
          "aideder_name": "王娜",
          "region_name": "山东济南历城区",
          "demand_title": "我想活下去",
          "demand_coment": "从学前班开始，小学生活即将开播，不知事谁按了“快进”，一眨眼之际，就要到离开母校的日子。我们在这里过了六年的快乐时光，也有许多数不清的回忆。比如，精彩的运动会，难忘的郊游，一次辩论会，同学们的你追我打，和老师的叨唠细语。\r\n\r\n六年了，回忆里，我们有哭，有笑，有打，有闹，这已见证了我们的友谊，一本同学录，记下了我们的档案，一本相册，刻印了我们纯真的笑容！\r\n\r\n在我们放学之后，老师的汗滴还在不停的流落，灯光上的灯还在不停的释放，影子里，是我们辛劳的老师，一遍一遍，在我们的本子上，写下老师的评语，忘不了，老师教我们的知识，更忘不了，他们脸上洋溢的笑容！\r\n\r\n上课时，整整齐齐的朗读声还在继续，下课后，我们的笑声，洋溢的笑容正在脸上表现着，不一会儿，原本安静的班级，变成了同学们欢乐的场地，“大战”之后，全是我们活泼乱跳的节奏，同学们的友谊永远排在第一！\r\n\r\n别了，母校！别了，班级！同学录上和大树的年轮上还存在着我们的回忆，忘不了小学的生活，忘不了在我们身后默默付出的老师，更忘不了，我们六年中的洋溢的笑容！！！",
          "prove_num": 0,
          "issue_date": "2018-06-14 20:09:52",
          "target_amount": 50000,
          "moneycount": 25000,
          "donatecount": 0,
          "advance": 50,
          "demand_use": "456817154939944961,456817154939944962",
          "moneyUse": [
            {
              "尿毒症": "30000"
            },
            {
              "骨折": "20000"
            }
          ],
          "cateList": [
            "尿毒症",
            "骨折"
          ],
          "relate_pics": "http://zgshfp.oos-website-cn.oos.ctyunapi.cn/avatar/71dbf880-8e77-426e-8129-d2439898a9597044660795384093029.png",
          "relate_video": "",
          "imgUrl": [
            "http://zgshfp.oos-website-cn.oos.ctyunapi.cn/avatar/71dbf880-8e77-426e-8129-d2439898a9597044660795384093029.png"
          ],
          "vedioUrl": [
            ""
          ],
          "overTime": "9",
          "province_region_id": "shandong",
          "city_region_id": "jinan",
          "county_region_id": "1",
          "village_region_id": "12",
          "hamlet_region_id": "123",
          "publish_name": "诸葛亮",
          "create_date": "2018-06-14 20:09:52",
          "is_poor": 0,
          "del_flag": 0,
          "aideder_user_id": "300",
          "finishtime": "2018-06-30 09:39:24",
          "demand_type": 2,
          "demand_use_money": "尿毒症,30000#骨折,20000",
          "demand_types": "456817154939944961,456817154939944962",
          "review_date": "2018-06-21 09:39:02",
          "demand_status": 3
        },
      }
    },
    methods:{
      computePercent(item){
        console.log(item.advance*100)
        return item.advance*100

      }
    }
  }
</script>

<style scoped>
  .vux-circle-demo {
    padding: 20px;
    margin: 0px;
    text-align: center;
  }
  .vux-circle-demo > div {
    margin: 0 auto;
  }
</style>

