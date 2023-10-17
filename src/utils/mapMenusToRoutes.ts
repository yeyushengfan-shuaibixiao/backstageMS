import { type RouteRecordRaw } from "vue-router"

function loadLocalRoutes() {
  // 映射动态路由，并添加
  const localRoutes: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob("../views/main/**/*.ts", {
    eager: true
  })
  for (const file in files) {
    const module = files[file]
    localRoutes.push(module.default)
  }
  return localRoutes
}
//首次  展示的页面
export let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[] = []) {
  // 加载本地路由
  const localRoutes = loadLocalRoutes()
  // 根据菜单匹配正确的路由
  const routes: RouteRecordRaw[] = []

  // 添加一级路由
  for (const menu of userMenus) {
    // 添加二级路由
    for (const subMenu of menu.children) {
      const route = localRoutes.find((item) => item.path === subMenu.url)
      if (route) {
        // 面包屑 一级菜单  只添加一次
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }

      // 记录第一个被匹配的 菜单
      if (!firstMenu && route) {
        firstMenu = subMenu
        // console.log(firstMenu)
      }
    }
  }
  return routes
}
// 保存网页刷新前的路径
export function mapPathToMenu(path: string, userMenu: any[] = []) {
  for (const menu of userMenu) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        return subMenu
      }
    }
  }
}
interface IBreadCrumbs {
  name: string
  path: string
}
export function mapPathToBreadcrumbs(path: string, userMenu: any[] = []) {
  const breadCrumbs: IBreadCrumbs[] = []
  // 遍历 面包屑层级
  for (const menu of userMenu) {
    for (const subMenu of menu.children) {
      if (subMenu.url === path) {
        breadCrumbs.push({ name: menu.name, path: menu.url })
        breadCrumbs.push({ name: subMenu.name, path: subMenu.url })
      }
    }
  }
  return breadCrumbs
}

export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []
  function getId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        getId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  getId(menuList)
  return ids
}

export function mapMenuListToButtonPermissions(menuList: any[]) {
  const petmissions: string[] = []

  function getPermissions(menus: any[] = []) {
    for (const item of menus) {
      if (item.type === 3) {
        petmissions.push(item.permission)
      } else {
        getPermissions(item.children ?? [])
      }
    }
  }
  getPermissions(menuList)
  return petmissions
}
