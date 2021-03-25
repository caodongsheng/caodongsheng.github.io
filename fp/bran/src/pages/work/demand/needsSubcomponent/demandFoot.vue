<template>
  <div class="dxq">
    <div class="love-need-foot">
      <ul>
        <li>
          <a href="/">
            <p><i class="fa fa-star-o fa-lg"></i>关注</p>
          </a>
        </li>
        <li class="c-b-a">
          <router-link to="/helpHe"  style="color:#ffffff">
            <p>帮助TA</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: ""
  }
</script>

<style scoped>
  .love-need-foot {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 -2px 4px #d7d7d7;
    background-color: #fff;
  }

  .love-need-foot ul {
    width: 100%;
    background-color: #fff;
  }

  .love-need-foot ul li {
    float: left;
    width: 50%;
    text-align: center;
    padding: 3% 0 3%;
  }

  .love-need-foot p i {
    padding-right: 5px;
  }

  .dxq {
    padding-bottom: 167px;
  }
</style>
