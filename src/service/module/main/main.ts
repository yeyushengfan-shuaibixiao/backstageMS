import { yeyuRequest } from "@/service"

export function getEntireDepartmentList() {
  return yeyuRequest.post({
    url: "/department/list"
  })
}

export function getEntireRolesList() {
  return yeyuRequest.post({
    url: "/role/list"
  })
}

export function getEntireMenuList() {
  return yeyuRequest.post({
    url: "/menu/list"
  })
}
