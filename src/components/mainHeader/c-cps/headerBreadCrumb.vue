<script setup lang="ts">
import { mapPathToBreadcrumbs } from "../../../utils/mapMenusToRoutes"
import { useRoute } from "vue-router"
import useLoginStore from "../../../stores/login/login"
import { computed } from "vue"
const route = useRoute()
const userMenus = useLoginStore().userMenus
const breadCrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenus)
})
</script>
<template>
  <div class="breadCrumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadCrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<style scoped lang="less">
.breadCrumb {
  --el-text-color-placeholder: #303133;
}
</style>
