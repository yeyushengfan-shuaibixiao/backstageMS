<script setup lang="ts">
import { ref, reactive } from "vue"
import useSystemStore from "@/stores/system/system"
interface Ipopup {
  popupConfig: {
    pageName: string
    header: {
      editTitle: string
      newTitle: string
    }
    formItem: any[]
  }
  ontherInfo?: any
}
const props = defineProps<Ipopup>()
const initalData: any = {}
for (const item of props.popupConfig.formItem) {
  initalData[item.prop] = "" ?? ""
}
const formData = reactive(initalData)

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
      // const item = props.popupConfig.formItem.find((item) => item.prop === key)
      // console.log(item)
      formData[key] = ""
      editData.value = null
    }
  }
}
defineExpose({ setDialogVisible })

// 获取 page  数据
// const mainStore = useMainStore()
// const { entireDepartmentList } = storeToRefs(mainStore)
const systemStore = useSystemStore()
// 确定 按钮
function confirmClickHandle() {
  dialogVisible.value = false
  let infoData = formData
  if (props.ontherInfo) {
    infoData = { ...formData, ...props.ontherInfo }
  }
  if (!isTrue.value && editData.value) {
    //  编辑
    systemStore.editPageDataAtion(
      props.popupConfig.pageName,
      editData.value.id,
      infoData
    )
  } else {
    //  新建
    systemStore.newPageDataAtion(props.popupConfig.pageName, infoData)
  }
}
</script>

<template>
  <div class="popup">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isTrue ? popupConfig.header.newTitle : popupConfig.header.editTitle
      "
      width="30%"
      center
      class="form"
    >
      <el-form label-width="100px" :model="formData" style="max-width: 300px">
        <template v-for="item in popupConfig.formItem" :key="item.prop">
          <el-form-item :label="item.label" :prop="item.prop">
            <template v-if="item.type === 'input'">
              <el-input
                v-model="formData[item.prop]"
                :placeholder="item.placehoder"
              />
            </template>
            <template v-if="item.type === 'password'">
              <el-input
                show-password
                v-model="formData[item.prop]"
                :placeholder="item.placehoder"
              />
            </template>
            <template v-if="item.type === 'select'">
              <el-select
                v-model="formData.parentId"
                :placeholder="item.placehoder"
                style="width: 100%"
              >
                <template v-for="value in item.option" :key="value.id">
                  <el-option :value="value.value" :label="value.label" />
                </template>
              </el-select>
            </template>
            <template v-if="item.type === 'date-picker'">
              <el-date-picker
                type="daterange"
                range-separator="-"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                v-model="formData[item.prop]"
              />
            </template>
            <template v-if="item.type === 'custom'">
              <slot :name="item.slotName"></slot>
            </template>
          </el-form-item>
        </template>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmClickHandle">确定</el-button>
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
