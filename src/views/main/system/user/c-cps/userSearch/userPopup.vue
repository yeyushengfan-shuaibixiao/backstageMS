<script setup lang="ts">
import { ref, reactive } from "vue"
import useMainStore from "@/stores/main/main"
import { storeToRefs } from "pinia"
import useSystemStore from "@/stores/system/system"
const formData = reactive<any>({
  name: "",
  realname: "",
  password: "",
  cellphone: "",
  roleId: "",
  departmentId: ""
})
const dialogVisible = ref(false)
const editData = ref()
const isTrue = ref(true)
function setDialogVisible(isNew: boolean = true, infoData?: any) {
  dialogVisible.value = true
  isTrue.value = isNew
  // 编辑
  if (!isNew && formData) {
    for (const key in formData) {
      formData[key] = infoData[key]

      editData.value = infoData
    } // 新建
  } else {
    for (const key in formData) {
      formData[key] = ""

      editData.value = null
    }
  }
}
defineExpose({ setDialogVisible })

// 获取 role  department  数据
const mainStore = useMainStore()
const { entireRolesList, entireDepartmentList } = storeToRefs(mainStore)
const systemStore = useSystemStore()
// 确定 按钮
function confirmClickHandle() {
  dialogVisible.value = false

  if (!isTrue.value && editData.value) {
    //  编辑
    systemStore.editUserDataAtion(editData.value.id, formData)
  } else {
    //  新建
    systemStore.newUserDataAtion(formData)
  }
}
</script>

<template>
  <div class="popup">
    <el-dialog
      v-model="dialogVisible"
      :title="isTrue ? '新建用户' : '编辑用户'"
      width="30%"
      center
      class="form"
    >
      <el-form label-width="100px" :model="formData" style="max-width: 300px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="formData.name" placeholder="请输入您的用户名" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="formData.realname" placeholder="请输入您的真实姓名" />
        </el-form-item>
        <el-form-item v-if="isTrue" label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="请输入您的密码" show-password />
        </el-form-item>
        <el-form-item label="手机号码" prop="cellphone">
          <el-input v-model="formData.cellphone" placeholder="请输入您的电话号码" />
        </el-form-item>
        <el-form-item label="选择角色" prop="roleId">
          <el-select v-model="formData.roleId" placeholder="请选择您的角色">
            <template v-for="item in entireRolesList" :key="item.id">
              <el-option :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="departmentId">
          <el-select v-model="formData.departmentId" placeholder="请输入您的部门">
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
