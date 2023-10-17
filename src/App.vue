<script setup lang="ts">
import zhCn from "element-plus/dist/locale/zh-cn.mjs"
</script>

<template>
  <div class="app">
    <!-- <RouterLink to="/main">主要</RouterLink>
    <RouterLink to="/login">登录</RouterLink> -->
    <el-config-provider :locale="zhCn">
      <RouterView></RouterView>
    </el-config-provider>
  </div>
</template>

<style lang="less" scoped>
.app {
  height: 100vh;
  width: 100vw;
  // background-color: skyblue;
}
</style>
