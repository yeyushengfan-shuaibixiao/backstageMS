<script setup lang="ts">
import useSystemStore from "@/stores/system/system"
import { storeToRefs } from "pinia"
import { formatUTC } from "@/utils/format"
import { ref } from "vue"
import usePermission from "@/hooks/usePermission"

interface Iprops {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propList?: any[]
    childrenProps?: any
  }
}

const props = defineProps<Iprops>()
const currentPage = ref(1)
const pageSize = ref(10)
const systemStore = useSystemStore()

//监听action 执行
systemStore.$onAction(({ name, after }) => {
  // action 执行成功
  after(() => {
    if (
      name === "deletePageByIdAtion" ||
      name === "editUserDataAtion" ||
      name === "newPageDataAtion"
    ) {
      currentPage.value = 1
    }
  })
})
// 是否有 增删改查的权限  按钮
const isCreate = usePermission(props.contentConfig.pageName, "create")
const isDelete = usePermission(props.contentConfig.pageName, "delete")
const isUpdate = usePermission(props.contentConfig.pageName, "update")
const isQuery = usePermission(props.contentConfig.pageName, "query")

fetchPageListData()
const { pageList, pageTotalCount } = storeToRefs(systemStore)

const emit = defineEmits(["newBtnClick", "editBtnClick"])

// 分页

// const disabled = ref(false)
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}
function fetchPageListData(formData: any = {}) {
  if (!isQuery) return
  // 获取 offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * 10
  const pageInfo = { size, offset }
  const queryInfo = { ...pageInfo, ...formData }
  //发起网络请求
  systemStore.postPageListAtion(props.contentConfig.pageName, queryInfo)
}

defineExpose({ fetchPageListData })

// 删除 编辑
function deleteClickHandle(id: number) {
  systemStore.deletePageByIdAtion(props.contentConfig.pageName, id)
}

// 新建用户
function newClickHandle() {
  emit("newBtnClick")
  // console.log(111)
}
// 修改用户信息
function editClickHandle(formData: any) {
  emit("editBtnClick", formData)
  console.log(formData)
}
</script>

<template>
  <div class="content">
    <div class="header">
      <div class="title">
        <h3>{{ props.contentConfig.header?.title }}</h3>
      </div>
      <el-button
        v-if="isCreate"
        size="large"
        type="primary"
        @click="newClickHandle"
        >{{ contentConfig?.header?.btnTitle ?? "新建数据" }}</el-button
      >
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        template
        border
        style="width: 100%"
        v-bind="contentConfig.childrenProps"
      >
        <template v-for="item in contentConfig.propList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope"
                >{{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  v-if="isDelete"
                  icon="delete"
                  text
                  type="danger"
                  @click="deleteClickHandle(scope.row.id)"
                  >删除</el-button
                >
                <el-button
                  v-if="isUpdate"
                  icon="edit"
                  text
                  type="primary"
                  @click="editClickHandle(scope.row)"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="item" align="center"> </el-table-column>
          </template>
        </template>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20]"
        large
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.content {
  border-radius: 10px;
  overflow: hidden;
  margin-top: 25px;
  background-color: #fff;
  padding: 20px;
  .header {
    display: flex;
    justify-content: space-between;

    .title {
      line-height: 40px;
    }
  }
  .table {
    margin-top: 20px;
  }
  .page {
    margin-top: 20px;
    display: flex;
    justify-content: end;
  }
}
</style>
