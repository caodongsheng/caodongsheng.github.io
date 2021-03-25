<template>
  <div>
    <x-header
      :left-options="{backText: '',preventGoBack: true}"
      @on-click-back="backToPre"
      ref="ceshiheader"
    >电商扶贫</x-header>
    <div
      class="over-auto box-withheader"
      v-if="!isapp"
    >
      <iframe
        :src="url"
        width="100%"
        height="100%"
        style="border:none;"
      ></iframe>
    </div>
  </div>
</template>

<script>
import { XHeader } from "vux";
export default {
  name: "mall_index",
  components: { XHeader },
  data() {
    return {
      isapp: false,
      url: process.env.SHOP_URL + 'mobile/index.html#/tab/home'
    };
  },
  mounted() {
    localStorage.setItem("shopurl", "");
    // this.url = 'http://shop.m.zgshfp.com.cn/mobile-h5/index.html#/tab/home?token=' + this.L('longToken')
    const _this = this;
    try {
      if (window.api) {
        this.isapp = true;
        const token = localStorage.getItem("longToken");
        this.$nextTick(function() {
          api.addEventListener(
            {
              name: "torootapp"
            },
            function(ret, err) {
              const obj = ret.value;
              localStorage.setItem("shopurl", obj.url);
              localStorage.setItem("currenturl", obj.url);
              if (token && token !== "") {
                api.sendEvent({
                  name: "tourl",
                  extra: {
                    token: token
                    // url: obj.url
                  }
                });
              } else {
                _this.$router.push("/login");
              }
            }
          );
          const headerPos = _this.$refs.ceshiheader.$el.offsetTop;

          const headerh = _this.$refs.ceshiheader.$el.clientHeight;
          let urlpath = "";
          if (
            localStorage.getItem("currenturl") != null &&
            localStorage.getItem("currenturl") != undefined
          ) {
            if (localStorage.getItem("currenturl").substr(0, 4) == "http") {
              urlpath = localStorage
                .getItem("currenturl")
                .substring(localStorage.getItem("currenturl").indexOf("#"));
            } else {
              urlpath = localStorage.getItem("currenturl");
            }
          } else {
            urlpath = "#/tab/home";
          }
          // const urlpath =
          //   localStorage.getItem('currenturl') != null && localStorage.getItem('currenturl') != undefined
          //     ? localStorage.getItem('currenturl')
          //     : '#/tab/home'
          // api.setPrefs({
          //   key: 'isopen',
          //   value: false
          // })
          api.openFrame({
            name: "ceshi",
            url: process.env.SHOP_URL+ "mobile-h5/ll.html" + urlpath,
            reload: true,
            rect: {
              x: 0,
              y: headerPos + headerh + 25,
              w: "auto",
              h: api.winHeight - headerPos - headerh - 25
            },
            pageParam: {
              token: token
              //  url: urlpath
            },
            showProgress: true
          });
        });
      } else {
        this.isapp = false;
        let urlpath = "";
        if (
          localStorage.getItem("currenturl") != null &&
          localStorage.getItem("currenturl") != undefined
        ) {
          urlpath =
            localStorage.getItem("currenturl")
        } else {
          urlpath = process.env.SHOP_URL+
            "mobile/index.html#/tab/home"

        }
        this.url = urlpath;
      }
    } catch (e) {
      this.isapp = false;
      let urlpath = "";
      if (
        localStorage.getItem("currenturl") != null &&
        localStorage.getItem("currenturl") != undefined
      ) {
        urlpath =localStorage.getItem("currenturl")
      } else {
         urlpath = process.env.SHOP_URL+ "mobile/index.html#/tab/home"
      }
      this.url = urlpath;
    }
  },
  methods: {
    backToPre() {
      this.$router.push("/");
    }
  },
  beforeRouteLeave(to, from, next) {
    if (window.api) {
      // if (to.path !== '/login') {
      //   let isOpen
      //   api.getPrefs(
      //     {
      //       key: 'isopen'
      //     },
      //     function(ret, err) {
      //       isOpen = ret.value
      //       if (isOpen) {
      //         api.sendEvent({
      //           name: 'getcurrenturl'
      //         })
      //       } else {
      //         api.closeFrame({
      //           name: 'ceshi'
      //         })
      //       }
      //     }
      //   )
      // } else {
      if (to.path !== "/login") {
        localStorage.setItem("currenturl", "#/tab/home");
      }
      window.api.closeFrame({
        name: "ceshi"
      });
      //   }
    }
    next();
  }
};
</script>

<style scoped>
</style>
