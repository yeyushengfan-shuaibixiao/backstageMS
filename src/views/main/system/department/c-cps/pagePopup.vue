<script setup lang="ts">
import { ref, reactive } from "vue"
import useMainStore from "@/stores/main/main"
import { storeToRefs } from "pinia"
import useSystemStore from "@/stores/system/system"

const formData = reactive<any>({
  name: "",
  leader: "",
  parentId: ""
})
const dialogVisible = ref(false)
const editData = ref()
const isTrue = ref(true)
let titleString = "新建部门"
function setDialogVisible(isNew: boolean = true, infoData?: any) {
  dialogVisible.value = true
  isTrue.value = isNew
  // 编辑
  if (!isNew && formData) {
    for (const key in formData) {
      formData[key] = infoData[key]
      titleString = "编辑部门"
      editData.value = infoData
    } // 新建
  } else {
    for (const key in formData) {
      formData[key] = ""
      titleString = "新建部门"
      editData.value = null
    }
  }
}
defineExpose({ setDialogVisible })

// 获取 page  数据
const mainStore = useMainStore()
const { entireDepartmentList } = storeToRefs(mainStore)
const systemStore = useSystemStore()
// 确定 按钮
function confirmClickHandle() {
  dialogVisible.value = false

  if (!isTrue.value && editData.value) {
    //  编辑
    systemStore.editPageDataAtion("department", editData.value.id, formData)
  } else {
    //  新建
    systemStore.newPageDataAtion("department", formData)
  }
}
</script>

<template>
  <div class="popup">
    <el-dialog v-model="dialogVisible" :title="titleString" width="30%" center class="form">
      <el-form label-width="100px" :model="formData" style="max-width: 300px">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入您的部门" />
        </el-form-item>
        <el-form-item label="部门领导" prop="leader">
          <el-input v-model="formData.leader" placeholder="请输入部门领导姓名" />
        </el-form-item>

        <el-form-item label="上级部门" prop="parentId">
          <el-select v-model="formData.parentId" placeholder="请现在您的部门">
            <template v-for="item in entireDepartmentList" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmClickHandle"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="less">
.form {
  padding: 20px;
}
</style>
