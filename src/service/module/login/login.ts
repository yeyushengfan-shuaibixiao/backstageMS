import { yeyuRequest } from "../.."
import type { IAccount } from "@/types/index"
export function accountLoginRequest(account: IAccount) {
  return yeyuRequest.post({
    url: "/login",
    data: account
  })
}

export function getUserInfoByIdRequest(id: number) {
  return yeyuRequest.get({
    url: `/users/${id}`
    // headers: {
    //  Authorization: "Bearer" + localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

export function getUserMenuByRoleIdRequest(id: number) {
  return yeyuRequest.get({
    url: `/role/${id}/menu`
  })
}
