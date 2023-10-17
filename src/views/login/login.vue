<script setup lang="ts">
import LoginPanel  from "./c-cps/login-panel.vue";
</script>

<template>
  <div class="login">
  <LoginPanel/>
  </div>
</template>

<style scoped lang="less">
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: skyblue;
  background: url("@/assets/img/cool-background.png");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
