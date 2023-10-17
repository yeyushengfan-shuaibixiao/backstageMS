<script setup lang="ts">
import { ref } from "vue"
import headerInfo from "./c-cps/headerInfo.vue"
import headerBreadCrumb from "./c-cps/headerBreadCrumb.vue"
let isFold = ref(false)
const emit = defineEmits(["foldChange"])
function menuClickHanle() {
  isFold.value = !isFold.value
  emit("foldChange", isFold.value)
}
</script>

<template>
  <div class="mainHeader">
    <div class="menuIcon" @click="menuClickHanle">
      <el-icon size="22px">
        <component :is="isFold ? 'fold' : 'expand'"></component>
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">
        <headerBreadCrumb></headerBreadCrumb>
      </div>
      <div class="info">
        <headerInfo></headerInfo>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.mainHeader {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  .menuIcon {
    padding-top: 3px;
  }
  .content {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
}
</style>
