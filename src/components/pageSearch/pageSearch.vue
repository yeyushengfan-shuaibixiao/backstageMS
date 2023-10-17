<script setup lang="ts">
import { reactive, ref } from "vue"
import type { ElForm } from "element-plus"
import usePermission from "@/hooks/usePermission"

//  把查询的数据发送出去 / 接收 的属性
interface Iprops {
  pageName?: any
  searchConfig: {
    formItem: any[]
  }
}

const emit = defineEmits(["queryClick", "resetClick"])
const initialForm: any = {}
const props = defineProps<Iprops>()
const isQuery = usePermission(props.pageName, "query")
for (const item of props.searchConfig.formItem) {
  initialForm[item.prop] = ""
}
// 表单数据
const searchForm = reactive(initialForm)

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
        <template v-for="item in searchConfig.formItem" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  type="datetimerange"
                  range-separator="到"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="searchForm[item.prop]"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button icon="refresh" size="large" @click="clickCleanHanle"
        >重置</el-button
      >
      <el-button icon="search" size="large" @click="clickQueryHandle"
        >搜索</el-button
      >
    </div>
  </div>
</template>

<style scoped lang="less">
.search {
  border-radius: 10px;
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
