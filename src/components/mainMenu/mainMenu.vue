<!-- eslint-disable vue/valid-v-for -->
<script setup lang="ts">
import { useRouter, useRoute } from "vue-router"
import useLoginStore from "@/stores/login/login"
import { computed } from "vue"
import { mapPathToMenu } from "@/utils/mapMenusToRoutes"
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const route = useRoute()
const loginStore = useLoginStore()
const userMenu = loginStore.userMenus

function toPage(url) {
  router.push(url)
}
// 默认菜单
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenu)
  return pathMenu?.id
})
</script>

<template>
  <div class="mainMenu">
    <div class="logo">
      <img src="@/assets/img/naruto.png" alt="" />
      <div class="title">
        <h2 v-show="!isFold">夜雨管理系统</h2>
      </div>
    </div>
    <div class="menu">
      <el-menu
        background-color="#0c2135"
        active-text-color="#fff"
        text-color="#b7bdc3"
        :isCollapse="isFold"
        :default-active="defaultActive"
      >
        <template v-for="item in userMenu" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon
                ><component :is="item.icon.split('-icon-')[1]"></component
              ></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                @click="toPage(subItem.url)"
                :index="subItem.id + ''"
              >
                {{ subItem.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<style scoped lang="less">
.mainMenu {
  height: 100%;
  // overflow: auto;
  background-color: #0c2135;
  box-sizing: border-box;
  .logo {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 40px;
      margin-right: 5px;
      vertical-align: top;
    }
    .title {
      font-size: 18px;
      font-weight: 700;
      margin-right: 5px;
    }
    .menu {
      .el-menu {
        width: 250px;
        border-right: none;
        .is-active {
          background-color: rgb(15, 71, 93);
        }
      }

      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
      }
    }
  }
}
</style>
