<script setup lang="ts">
import pageSearch from "@/components/pageSearch/pageSearch.vue"
import searchConfig from "./config/search.config"
import pageContent from "@/components/pageContent/pageContent.vue"
import contentConfig from "./config/content.config"
import pagePopup from "@/components/pagePopup/pagePopup.vue"
import popupConfig from "./config/popupConfig"
import usePageContent from "@/hooks/usePageContent"
import usePagePopup from "@/hooks/usePagePopup"
import useMainStore from "@/stores/main/main"
import { storeToRefs } from "pinia"
import { ref, nextTick } from "vue"
import type { ElTree } from "element-plus"
import { mapMenuListToIds } from "@/utils/mapMenusToRoutes"

const treeRef = ref<InstanceType<typeof ElTree>>()
//    获取完整的菜单
const mainStore = useMainStore()
const ontherInfo = ref({})
function checkElTreeHandle(data1: any, data2: any) {
  // console.log(data1, data2)
  const menuList = [...data2.checkedKeys, ...data2.halfCheckedKeys]
  // console.log(menuList)
  ontherInfo.value = { menuList }
}
// 显示回显
function editCallBack(formData: any) {
  // console.log("点击了编辑", formData.menuList)
  const menuIds = mapMenuListToIds(formData.menuList)
  // console.log(menuIds)
  nextTick(() => {
    treeRef.value?.setCheckedKeys(menuIds)
  })
}
// 删除回显
function newCallBack() {
  nextTick(() => {
    treeRef.value?.setCheckedKeys([])
  })
}
const { entireMenuList } = storeToRefs(mainStore)
const { pageContentRef, resetClickHandle, queryClickHandle } = usePageContent()
const { pagePopupRef, newClickHandle, editClickHandle } = usePagePopup(editCallBack,newCallBack)
</script>

<template>
  <div class="role">
    <pageSearch
      :search-config="searchConfig"
      @reset-click="resetClickHandle"
      @query-click="queryClickHandle"
    ></pageSearch>
    <pageContent
      @edit-btn-click="editClickHandle"
      @new-btn-click="newClickHandle"
      :content-config="contentConfig"
      ref="pageContentRef"
    ></pageContent>
    <pagePopup :popup-config="popupConfig" :onther-info="ontherInfo" ref="pagePopupRef">
      <template #menuList>
        <el-tree
          :data="entireMenuList"
          ref="treeRef"
          show-checkbox
          node-key="id"
          highlight-current
          :props="{ children: 'children', label: 'name' }"
          @check="checkElTreeHandle"
        />
      </template>
    </pagePopup>
  </div>
</template>

<style scoped lang="less"></style>
