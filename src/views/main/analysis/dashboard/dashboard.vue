<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col v-for="item in amountList" :span="6" :key="item.amount">
        <panel v-bind="item"></panel
      ></el-col>
    </el-row>
    <!-- 中间的图表 -->
    <el-row :gutter="10">
      <!-- 折线 -->
      <el-col :span="7"
        ><pie-echart :data="showCategoryCount"></pie-echart
      ></el-col>
      <el-col :span="10">
        <geo-echart :data="showGoodsAddressSale"></geo-echart>
      </el-col>
      <el-col :span="7">
        <rose-echart :data="showCategoryCount" />
      </el-col>
    </el-row>
    <!-- 下部的图表 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <line-echart :data="showGoodsCategorySale" />
      </el-col>
      <el-col :span="12">
        <bar-echart :data="showGoodsCategoryFavor" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="dashboard">
//

import useAnalysisStore from "@/stores/analysis/analysis"
import { storeToRefs } from "pinia"
import panel from "./c-cps/panel.vue"
import { computed } from "vue"
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAtion()
const {
  amountList,
  categoryCount,
  goodsAddressSale,
  goodsCategoryFavor,
  goodsCategorySale
} = storeToRefs(analysisStore)

const showCategoryCount = computed(() => {
  return categoryCount.value.map((item: any) => {
    return {
      name: item.name,
      value: item.goodsCount
    }
  })
})
const showGoodsAddressSale = computed(() => {
  return goodsAddressSale.value.map((item: any) => {
    return {
      name: item.address + "市",
      value: item.count
    }
  })
})
const showGoodsCategorySale = computed(() => {
  return goodsCategorySale.value.map((item: any) => {
    return {
      name: item.name,
      value: item.goodsCount
    }
  })
})
const showGoodsCategoryFavor = computed(() => {
  return goodsCategoryFavor.value.map((item: any) => {
    return {
      name: item.name,
      value: item.goodsFavor
    }
  })
})
</script>

<style scoped>
.dashboard {
  border-radius: 12px;
  padding: 5px;
}
</style>
