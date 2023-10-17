<script setup lang="ts">
import { ref } from "vue"

let isCollpase = ref(false)
function foldChangeHandle(e: boolean) {
  isCollpase.value = e
}
</script>

<template>
  <div class="main">
    <el-container class="mainContent">
      <el-aside :width="isCollpase ? '40px' : '230px'" class="mainAside">
        <MainMenu :isFold="isCollpase" />
      </el-aside>
      <el-container>
        <el-header height="50px" class="mainHeader">
          <MainHeader @foldChange="foldChangeHandle" />
        </el-header>
        <el-main class="mainChange">
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.main {
  height: 100%;
  .mainContent {
    height: 100%;

    .el-aside {
      overflow-x: hidden;
      overflow-y: auto;
      line-height: 200px;
      cursor: pointer;
      transition: width 0.3s linear;
      scrollbar-width: none;
      -ms-overflow-style: none;
      &::-webkit-scrollbar {
        width: 0 !important;
        display: none;
      }
    }
    .mainHeader {
      background-color: #67afbe;
    }
  }
  .mainChange {
    background-color: #f4c2c4;
  }
}
</style>
