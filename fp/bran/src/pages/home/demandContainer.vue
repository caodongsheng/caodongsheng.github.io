<template>
  <div class="bg-f6f5f6" style="height:100%">
     <indexNav @chrid="chrid_save" ref="chrid"></indexNav>
     <div class="tab-con" >
     <v-touch v-on:swipeleft="onSwipeLeft" v-on:swiperight="onSwipeRight">
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"  @leave="leave" >
          <keep-alive :include="cachedViews">
            <router-view class="con" ></router-view>
         </keep-alive> 
      </transition >
      </v-touch >
    </div>
  </div>
</template>
<script>
  import indexNav from '@/components/nav/nav'

  export default {
    name:'demandconstainer',
    components: {
         indexNav
    },
    computed:{
    cachedViews () {
        // debugger
        console.log(this.$store.state.cachedViews)
        return this.$store.state.cachedViews
   
      },
    },
    beforeRouteEnter(to, from, next)  {
     
      console.log("11111111111")
       next(vm => {
            // if(vm && vm.$refs.scroll.$refs.scroller) {
            //     setTimeout(function ()  {
            //         vm.$refs.scroll.$refs.scroller.scrollTo(0,sessionStorage.getItem('demand2'),false)
            //     },0)
            // }
       })
    },
    data () {
      return {
        
      }
    },
   watch: {
    '$route' (to, from) {
        if(to.path !== from.path&&to.path=="/demandContainer"){
         let item = this.$refs.chrid.vos[this.index]
          this.$refs.chrid.goitem(item, this.index)
        }
    }
},

    methods: {
       onSwipeLeft () {
        if (this.$store.state.navflag) {
          let index = this.index + 1
          if (index >= this.$refs.chrid.vos.length) {
            index = this.$refs.chrid.vos.length - 1
          }
          let item = this.$refs.chrid.vos[index]
          this.$refs.chrid.goitem(item, index)
        }
      },
      onSwipeRight () {
        if (this.$store.state.navflag) {
          let index = this.index - 1
          if (index === -1) {
            index = 0
          }
          let item = this.$refs.chrid.vos[index]
          this.$refs.chrid.goitem(item, index)
        }
      },
       chrid_save (index) {
        if (index > this.index) { // 往后点了
          this.num = -100
        } else {
          this.num = 100
        }
        this.index = index
      },
      beforeEnter (el) {
        // el.style = 'transform:translateX(' + (-this.num) + '%)'
        el.style.transform = 'translateX(' + (-this.num) + '%)'
      },
      enter (el, done) {
        el.offsetHeight
        // el.style = 'transition:ease  0.5s;transform:translateX(0)'
        el.style.transition = 'ease  0.5s'
        el.style.transform = 'translateX(0)'
        done()
      },
      afterEnter (el) {
        // 当执行完毕以后会执行
      },
      leave (el) {
        // el.style = 'transition:ease  0.5s;transform:translateX(' + (this.num) + '%)'
        el.style.transition = 'ease  0.5s'
        el.style.transform = 'translateX(' + (this.num) + '%)'
      },
    },

  }
</script>

<style scoped>
 .tab-con{
    top: 44px;
    height: 100%
  }
  .tab-con > div{
    height: 100%;
    touch-action: pan-y!important;
  }
  

</style>
