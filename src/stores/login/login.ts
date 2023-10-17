import { defineStore } from "pinia"
import { accountLoginRequest, getUserMenuByRoleIdRequest } from "@/service/module/login/login"
import type { IAccount } from "@/types/index"
import { localCache } from "@/utils/cache"
import router from "../../router/index"
import { LOGIN_TOKEN, USER_INF0, USER_MENU, USER_Permissions } from "@/global/constants"
import { getUserInfoByIdRequest } from "../../service/module/login/login"
import { mapMenuListToButtonPermissions, mapMenusToRoutes } from "@/utils/mapMenusToRoutes"
import useMainStore from "../main/main"
interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

export const useLoginStore = defineStore("login", {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? "",
    userInfo: localCache.getCache(USER_INF0) ?? {},
    userMenus: localCache.getCache(USER_MENU) ?? [],
    permissions: localCache.getCache(USER_Permissions) ?? []
  }),
  actions: {
    async loginAccountActon(account: IAccount) {
      const loginResult = await accountLoginRequest(account)

      this.token = loginResult.data.data.token
      const id = loginResult.data.data.id
      console.log(id)
      // const name = loginResult.data.data.name
      // 本地缓存
      localCache.setCache(LOGIN_TOKEN, this.token)
      // 获取登录用户信息  权限等
      const userInfoResult = await getUserInfoByIdRequest(id)
      const userInfo = userInfoResult.data.data
      this.userInfo = userInfo

      // 根据角色 请求用户权限(菜单  )  需要token
      const roleId = this.userInfo.role.id
      const userMenusResult = await getUserMenuByRoleIdRequest(roleId)

      const userMenus = userMenusResult.data.data
      this.userMenus = userMenus
      console.log(userMenus)
      //获取登录用户 按钮的权限
      const permissions = mapMenuListToButtonPermissions(this.userMenus)
      this.permissions = permissions
      // 本地缓存
      localCache.setCache(USER_INF0, this.userInfo)
      localCache.setCache(USER_MENU, this.userMenus)
      localCache.setCache(USER_Permissions, this.permissions)

      // 请求 roles / department 的所有数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAtion()

      // 添加动态路由
      const routes = mapMenusToRoutes(this.userMenus)
      routes.forEach((route) => router.addRoute("main", route))

      // 页面跳转 main页面
      router.push("/main")
    },
    loadLocalCacheAtion() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache(USER_INF0)
      const userMenu = localCache.getCache(USER_MENU)
      const permissions = localCache.getCache(USER_Permissions)

      if (token && userMenu && userInfo && permissions) {
        // 添加动态路由
        const routes = mapMenusToRoutes(userMenu)
        routes.forEach((route) => router.addRoute("main", route))
        //  获取完整数据
        const mainstore = useMainStore()
        mainstore.fetchEntireDataAtion()
      }
    }
  }
})
export default useLoginStore
