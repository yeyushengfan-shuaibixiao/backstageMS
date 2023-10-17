import { createRouter, createWebHistory } from "vue-router"
import { LOGIN_TOKEN } from "@/global/constants"
import { localCache } from "@/utils/cache"
import { firstMenu } from "@/utils/mapMenusToRoutes"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/main"
    },
    {
      path: "/login",
      component: () => import("@/views/login/login.vue")
    },
    {
      name: "main",
      path: "/main",
      component: () => import("@/views/main/main.vue")
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("@/views/notFound/notFound.vue")
    }
  ]
})
// 导航守卫
router.beforeEach((to) => {
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith("'/main'") && !token) {
    return "/login"
  }
  //  如果在状态栏输入 main
  if (to.path === "/main") {
    return firstMenu?.url
  }
})
export default router
