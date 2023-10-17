import { yeyuRequest } from "@/service"
// 请求 用户列表
export function postUserList(query: any) {
  return yeyuRequest.post({
    url: "/users/list",
    data: query
  })
}
// 删除
export function deleteUserById(id: number) {
  return yeyuRequest.delete({
    url: `/users/${id}`
  })
}

// 添加
export function newUserData(form: object) {
  return yeyuRequest.post({
    url: "/users",
    data: form
  })
}

// 编辑

export function editUserData(id: number, form: any) {
  return yeyuRequest.patch({
    url: `/users/${id}`,
    data: form
  })
}

// 针对page 的增删改查
export function postPageListData(pageName: string, query: any) {
  return yeyuRequest.post({
    url: `/${pageName}/list`,
    data: query
  })
}
export function deletePageById(pageName: string, id: number) {
  return yeyuRequest.delete({
    url: `/${pageName}/${id}`
  })
}
export function newPageData(pageName: string,form: object) {
  return yeyuRequest.post({
    url: `/${pageName}`,
    data: form
  })
}
export function editPageData(pageName: string,id: number, form: any) {
  return yeyuRequest.patch({
    url: `/${pageName}/${id}`,
    data: form
  })
}