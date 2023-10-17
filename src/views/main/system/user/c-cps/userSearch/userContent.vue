<script setup lang="ts">
import useSystemStore from "@/stores/system/system"
import { storeToRefs } from "pinia"
import { formatUTC } from "@/utils/format"
import { ref } from "vue"
import usePermission from "@/hooks/usePermission"
const currentPage = ref(1)
const pageSize = ref(10)
// 是否有 增删改查的权限  按钮
const isCreate = usePermission("user:create")
const isDelete = usePermission("user:delete")
const isUpdate = usePermission("user:update")
const isQuery = usePermission("user:query")
const systemStore = useSystemStore()

fetchUserListData()
const { userList, usersTotalCount } = storeToRefs(systemStore)

const emit = defineEmits(["newBtnClick", "editBtnClick"])
// 分页

// const disabled = ref(false)
function handleSizeChange() {
  fetchUserListData()
}
function handleCurrentChange() {
  fetchUserListData()
}
function fetchUserListData(formData: any = {}) {
  if (isQuery) return
  // 获取 offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * 10
  const pageInfo = { size, offset }
  const queryInfo = { ...pageInfo, ...formData }
  //发起网络请求
  systemStore.postUserListAtion(queryInfo)
}

defineExpose({ fetchUserListData })

// 删除 编辑
function deleteClickHandle(id: number) {
  systemStore.deleteUserByIdAtion(id)
}

// 新建用户
function newClickHandle() {
  emit("newBtnClick")
}
// 修改用户信息
function editClickHandle(formData: any) {
  emit("editBtnClick", formData)
  // console.log(formData)
}
</script>

<template>
  <div class="content">
    <div class="header">
      <div class="title"><h3>用户列表</h3></div>
      <el-button size="large" type="primary" @click="newClickHandle"
        >新建用户</el-button
      >
    </div>
    <div class="table">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column
          align="center"
          type="selection"
          label="勾选"
          width="50"
        />
        <el-table-column align="center" type="index" label="序号" width="70" />
        <el-table-column
          align="center"
          prop="name"
          label="用户名"
          width="100"
        />
        <el-table-column
          align="center"
          prop="realname"
          label="真实姓名"
          width="100"
        />
        <el-table-column
          align="center"
          prop="cellphone"
          label="手机号"
          width="180"
        />
        <el-table-column align="center" prop="enable" label="状态" width="120">
          <template #default="scope">
            <el-button
              size="large"
              :type="scope.row.enable ? 'primary' : 'danger'"
              plain
            >
              {{ scope.row.enable ? "启用" : "禁用" }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="createAt"
          label="创建时间"
          width="200"
        >
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="updateAt"
          label="更新时间"
          width="200"
        >
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template #default="scope">
            <el-button
              icon="delete"
              text
              type="danger"
              @click="deleteClickHandle(scope.row.id)"
              >删除</el-button
            >
            <el-button
              icon="edit"
              text
              type="primary"
              @click="editClickHandle(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20]"
        large
        layout="total, sizes, prev, pager, next, jumper"
        :total="usersTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.content {
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
