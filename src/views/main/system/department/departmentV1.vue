<script setup lang="ts">
import pageSearch from "./c-cps/pageSearch.vue"
import pageContent from "./c-cps/pageContent.vue"
import pagePopup from "./c-cps/pagePopup.vue"
import { ref } from "vue"
const pageSearchRef = ref<InstanceType<typeof pageSearch>>()
const pageContentRef = ref<InstanceType<typeof pageContent>>()
const pagePopupRef = ref<InstanceType<typeof pagePopup>>()
function queryClickHandle(query: any) {
  pageContentRef.value?.fetchPageListData(query)
}
function resetClickHandle() {
  pageContentRef.value?.fetchPageListData()
}
function newClickHandle() {
  pagePopupRef.value?.setDialogVisible()
}
function editClickHandle(formData: any) {
  pagePopupRef.value?.setDialogVisible(false, formData)
}
</script>

<template>
  <div class="department">
    <pageSearch
      ref="pageSearchRef"
      @reset-click="resetClickHandle"
      @query-click="queryClickHandle"
    ></pageSearch>
    <pageContent
      ref="pageContentRef"
      @new-btn-click="newClickHandle"
      @edit-btn-click="editClickHandle"
    ></pageContent>
    <pagePopup ref="pagePopupRef"></pagePopup>
  </div>
</template>

<style scoped lang="less"></style>
