<script setup lang="ts">
import pageSearch from "@/components/pageSearch/pageSearch.vue"
import pageContent from "@/components/pageContent/pageContent.vue"
import pagePopup from "@/components/pagePopup/pagePopup.vue"
import searchConfig from "./config/search.config"
import contentConfig from "./config/content.config"
import popupConfig from "./config/popup.config"
import { computed } from "vue"
import useMainStore from "@/stores/main/main"
import usePageContent from "@/hooks/usePageContent"
import usePagePopup from "@/hooks/usePagePopup"

//  对 popupConfig  进行操作
const mainStore = useMainStore()
const popupConfigRef = computed(() => {
  const dapartmemts = mainStore.entireDepartmentList.map((item) => {
    return { label: item.name, value: item.id }
  })

  popupConfig.formItem.forEach((item) => {
    if (item.prop === "parentId") {
      item.option?.push(...dapartmemts)
      // item.option = dapartmemts as any
      // console.log(item.option)
    }
  })
  return popupConfig
})

const { pageContentRef, resetClickHandle, queryClickHandle } = usePageContent()
const { pagePopupRef, newClickHandle, editClickHandle } = usePagePopup()
</script>

<template>
  <div class="department">
    <pageSearch
      :searchConfig="searchConfig"
      @reset-click="resetClickHandle"
      @query-click="queryClickHandle"
    ></pageSearch>
    <pageContent
      :content-config="contentConfig"
      ref="pageContentRef"
      @new-btn-click="newClickHandle"
      @edit-btn-click="editClickHandle"
    ></pageContent>
    <pagePopup :popup-config="popupConfigRef" ref="pagePopupRef"></pagePopup>
  </div>
</template>

<style scoped lang="less"></style>
