<script setup lang="ts">
import { localCache } from "@/utils/cache"
import { LOGIN_TOKEN } from "@/global/constants"
import { useRouter } from "vue-router"
import useLoginStore from "@/stores/login/login"
const router = useRouter()
function exitHandle() {
  localCache.removeCache(LOGIN_TOKEN)
  router.push("/login")
}

const loginstore = useLoginStore()
</script>

<template>
  <div class="userInfo">
    <div class="left">
      <el-icon><Message /></el-icon>
      <el-icon>
        <div class="dot"></div>
        <ChatLineRound
      /></el-icon>
      <el-icon><Search /></el-icon>
    </div>
    <div class="right">
      <el-dropdown size="large">
        <span class="info">
          <el-avatar
            :size="30"
            src="https://wx4.sinaimg.cn/large/007aD32gly1ghkclf6vrlj341837q7wj.jpg"
          />
          <span class="name">{{ loginstore.userInfo.name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="exitHandle">
              <el-icon><CircleClose /></el-icon>
              <span>退出系统</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><InfoFilled /></el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <el-icon><Lock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="less">
.userInfo {
  display: flex;
  justify-content: left;
  align-items: center;
  .left {
    // width: ;
    .el-icon {
      margin: 0 8px;
    }
  }
  .right {
    width: 100px;
    .info {
      margin-left: 8px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .name {
        margin-left: 4px;
        font-size: 14px;
      }
      :global(.el-dropdown-menu__item) {
        line-height: 36px !important;
        padding: 6px 22px !important;
      }
    }
  }
}
.el-dropdown:deep(:focus-visible) {
  outline: none;
}
.dot {
  position: absolute;
  right: -1px;
  top: -0px;
  border: 3px solid rgb(254, 3, 3);
  border-radius: 50%;
}
</style>
