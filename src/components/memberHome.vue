<template>
  <div class="index">

    <div style="height: 100%;background-color: white">
      <div style="overflow: auto;position:absolute;top: 0px;bottom: 30px;width: 100%">
        <router-view></router-view>
      </div>
      <div style="height: 30px;position:absolute;bottom: 0px;;width: 100%">
        <tabBar :tabbarList="tabbarList"/>
      </div>
    </div>

  </div>
</template>

<script>
  import tabBar from '../components/tabbar'

  export default {
    name: "index",
    components: {
      tabBar
    },
    data() {
      return {
        tabbarList: [
          {
            name: "主页",
            path: "/memberHome/searchPage",
            normal: require('../assets/images/icons/news_icon.png'),
            selected: require('../assets/images/icons/news_icon_active.png')
          },
          {
            name: "我的",
            path: "/memberHome/mine",
            normal: require('../assets/images/icons/mine_icon.png'),
            selected: require('../assets/images/icons/mine_icon_active.png')
          }
        ]
      }
    },
    mounted() {

    },
  }
</script>

<style>

</style>
