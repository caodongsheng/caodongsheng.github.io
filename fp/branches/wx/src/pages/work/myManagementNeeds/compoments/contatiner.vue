<template>
    <div>
        <span ref="spa" @click="remind()">{{text}}</span>
    </div>
</template>
<script>
export default {
  props: ['text', 'demenId', 'url'],
  data () {
    return {
      text: '提醒一下'
    }
  },
         // 按钮提醒一下
  methods: {

    reminder () {
      let _this = this
      this.$http.post('hts/management/msgRemind', {
        demandId: this.demenId
      })
      .then(res => {

      }).catch(error => {
        if (error.code === 'M2003') {
          if (this.text === '提醒一下') {
            this.text = '已提醒'
          }
        } else if (error.code === 'X0002') {
          if (this.text === '提醒一下') {
            this.text = '提醒一下'
          }
        } else if (error.code === 'X0001') {
          if (this.text === '提醒一下') {
            this.text = '已提醒'
          }
        }
      })
    },
    remind () {
      this.reminder()
      if (this.url !== '') {
        this.$router.push({
          name: this.url,
          params: {demandId: this.demenId}
        })
      }
    }

  }

}
</script>
<style lang='less'>
        .right-btn-contatiner {
            justify-content: flex-end;
            .btn-bordered {
            margin-left: 10px;
            }
        }
</style>

