<script setup lang="ts">
import { reactive, ref } from "vue"
import type { ElForm } from "element-plus"
import usePermission from "@/hooks/usePermission"
//  把查询的数据发送出去
const isQuery = usePermission("user:query")
const emit = defineEmits(["queryClick", "resetClick"])

const searchForm = reactive({
  name: "",
  realName: "",
  cellPhone: "",
  enable: 1,
  createAt: ""
})
const formRef = ref<InstanceType<typeof ElForm>>()
function clickCleanHanle() {
  formRef.value?.resetFields()
  emit("resetClick")
}
function clickQueryHandle() {
  emit("queryClick", searchForm)
}
</script>

<template>
  <div class="search" v-if="isQuery">
    <el-form ref="formRef" size="large" label-width="70px" :model="searchForm">
      <el-row :gutter="15">
        <el-col :span="8">
          <el-form-item label="用户名" size="large" style="width: 100%" prop="name">
            <el-input v-model="searchForm.name" placeholder="请输入用户名" /></el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" style="width: 100%" prop="realName">
            <el-input v-model="searchForm.realName" placeholder="请输入真实姓名" /></el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" style="width: 100%" prop="cellPhone">
            <el-input v-model="searchForm.cellPhone" placeholder="请输入手机号码" /></el-form-item
        ></el-col>

        <el-col :span="8">
          <el-form-item label="状态" style="width: 100%" prop="enable">
            <el-select placeholder="请选择状态" clearable v-model="searchForm.enable">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8"
          ><el-form-item label="创建时间" style="width: 100%" prop="createAt">
            <el-date-picker
              type="datetimerange"
              range-separator="到"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              v-model="searchForm.createAt"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button icon="refresh" size="large" @click="clickCleanHanle">重置</el-button>
      <el-button icon="search" size="large" @click="clickQueryHandle">搜索</el-button>
    </div>
  </div>
</template>

<style scoped lang="less">
.search {
  background-color: #fff;
  padding: 20px;
  .el-form-item {
    padding: 20px 5px;
    margin-bottom: 0;
  }
  .btns {
    display: flex;
    justify-content: end;
  }
}
</style>
