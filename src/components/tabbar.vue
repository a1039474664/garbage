<template>
  <div class="tabbar">
    <router-link v-for="(item,index) in tabbarList" :key="index"
                 class="tab-item"
                 :to="item.path"
                 active-class="isActive">
      <div class="item-wrap">
        <div><img :src=" item.path === $route.path ? item.selected : item.normal" style="width: 12%;"></div>
        <div style="margin-top: -8px;"><span slot="label" style="font-size: 12px">{{item.name}}</span></div>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "tabBar",
    props: {
      tabbarList: Array
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style scoped>
  .tabbar {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background: #dcdfe6;
    bottom: 0px;
    left: 0px;
  }

  .isActive {
    color: #09bb07;
  }

  .tab-item {
    flex: 1;
    font-size: 14px;
    height: 100%;
  }

  .item-wrap {
    text-align: center;
    width: 100%;
  }

  a {
    text-decoration: none;
    color: #333;
  }

  a, a:hover, a:active, a:visited, a:link, a:focus {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    outline: none;
    background: none;
    text-decoration: none;
  }
</style>
