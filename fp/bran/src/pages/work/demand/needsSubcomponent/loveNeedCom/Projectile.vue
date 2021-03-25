<template>
    <div class="box" v-show="shows">
        <div class="box1">
            <h4>回复他的留言</h4>
            <div class="ipt">
                <input type="text" v-model="liuyan">
            </div>
            <div class="btn">
            <span class="active" @click="cancel">取消</span><span @click="Determine">确定</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      liuyan: "",
      shows: true
    };
  },
  methods: {
    cancel() {
      if (this.shows == true) {
        this.shows = false;
      } else {
        this.shows = true;
      }
    },
    Determine() {
      if (this.shows == true) {
        this.shows = false;
      } else {
        this.shows = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: relative;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  .box1 {
    width: 70%;
    height: 235px;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 10px;
    h4 {
      line-height: 50px;
      padding-left: 10px;
    }
    .ipt {
      width: 100%;
      display: flex;
      justify-content: center;
      input {
        width: 80%;
        height: 130px;
        border: none;
        background: #eee;
        border-radius: 8px;
      }
    }
    .btn {
      width: 100%;
      height: 45px;
      display: flex;
      padding: 10px 0;
      border-radius: 0 0 10px 10px;
      span {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 0 0 0 10px;
      }
      span:nth-child(1) {
        border-right: 1px solid #ccc;
      }
      .active {
        background: orange;
      }
    }
  }
}
</style>


