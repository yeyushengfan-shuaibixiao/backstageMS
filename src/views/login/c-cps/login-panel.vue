<script setup lang="ts">
import { ref, watch } from "vue"
import panelAcount from "./panel-account.vue"
import panelPhone from "./panel-phone.vue"
import { localCache } from "@/utils/cache"
const isChecked = ref<boolean>(localCache.getCache("isChecked") ?? false)
const activeName = ref("account")
const accountRef = ref<InstanceType<typeof panelAcount>>()
function clickLoginHandle() {
  if (activeName.value === "account") {
    accountRef.value!.loginAction(isChecked.value)
    if (isChecked.value) {
      console.log("记住密码")
    }
  } else {
    console.log("phone登录")
  }
}
// 监听记住密码的值
watch(isChecked, (newValue) => {
  localCache.setCache("isChecked", newValue)
  console.log(newValue)
})
</script>

<template>
  <div class="loginPanel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" :stretch="true" v-model="activeName">
        <el-tab-pane label="账号登录" name="account">
          <template #label>
            <el-icon><User /></el-icon>
            <span> 账号登录</span>
          </template>
          <panelAcount ref="accountRef" />
        </el-tab-pane>
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <el-icon><Connection /></el-icon>
            <span> 手机登录</span>
          </template>
          <panelPhone ref="phoneRef" />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="contorlAcount">
      <el-checkbox class="itemLeft" v-model="isChecked" label="记住密码" size="large" />
      <el-link class="itemRight" type="primary" :underline="false">忘记密码?</el-link>
    </div>
    <div class="loginBtn">
      <el-button type="primary" size="large" @click="clickLoginHandle"> 立即登录 </el-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.loginPanel {
  width: 330px;
  // height: 200px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.5);
  color: black;
  backdrop-filter: blur(20px);
  opacity: 0.6;

  .title {
    padding: 10px 0;
  }
  .el-link.el-link--primary {
    --el-link-hover-text-color: #606266;
  }
  .el-tabs__header.is-top,
  .el-tabs--border-card > .el-tabs__header,
  .el-tabs__nav-wrap,
  .el-tabs--border-card {
    --el-fill-color-light: transparent;
    background-color: transparent;
    border: none;
  }
  .contorlAcount {
    display: flex;
    justify-content: space-between;
    .itemLeft {
      margin-left: 10px;
    }
    .itemRight {
      margin-right: 10px;
    }
  }
  .loginBtn {
    padding: 10px 0;
  }
}
</style>
