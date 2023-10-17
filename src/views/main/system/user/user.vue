<script setup lang="ts">
import userSearch from "./c-cps/userSearch/userSearch.vue"
import userContent from "./c-cps/userSearch/userContent.vue"
import userPopup from "./c-cps/userSearch/userPopup.vue"
import { ref } from "vue"
const contentRef = ref<InstanceType<typeof userContent>>()
const userPopupRef = ref<InstanceType<typeof userPopup>>()
function queryClickHandle(formData: any) {
  contentRef.value?.fetchUserListData(formData)
}
function resetClickHandle() {
  contentRef.value?.fetchUserListData()
}
function newBtnClickHandle() {
  userPopupRef.value?.setDialogVisible()
}
function editClickHandle(formData: any) {
  userPopupRef.value?.setDialogVisible(false, formData)
}
</script>

<template>
  <div class="user">
    <div class="search" >
      <userSearch @query-click="queryClickHandle" @reset-click="resetClickHandle"></userSearch>
    </div>
    <div class="content" >
      <userContent
        ref="contentRef"
        @new-btn-click="newBtnClickHandle"
        @edit-btn-click="editClickHandle"
      ></userContent>
    </div>
    <div class="popUp">
      <userPopup ref="userPopupRef" />
    </div>
  </div>
</template>

<style scoped lang="less">
.search,
.content {
  border-radius: 10px;
  overflow: hidden;
}
</style>
