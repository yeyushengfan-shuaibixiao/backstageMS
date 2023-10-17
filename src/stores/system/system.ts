import { defineStore } from "pinia"
import {
  postUserList,
  deleteUserById,
  newUserData,
  editUserData,
  postPageListData,
  deletePageById,
  newPageData,
  editPageData
} from "../../service/module/system/system"
import useMainStore from "../main/main"
interface ISystemStore {
  userList: any[]
  usersTotalCount: number
  pageList: any[]
  pageTotalCount: number
}
const useSystemStore = defineStore("system", {
  state: (): ISystemStore => ({
    userList: [],
    usersTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUserListAtion(query: any) {
      const usersListResult = await postUserList(query)
      const { totalCount, list } = usersListResult.data.data
      this.usersTotalCount = totalCount
      this.userList = list
      // console.log(totalCount, list)
    },
    async deleteUserByIdAtion(id: number) {
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)
      // 删除后 重新请求数据
      this.postUserListAtion({ offset: 0, size: 10 })
    },
    async newUserDataAtion(form: any) {
      // 创建新用户
      const newResult = await newUserData(form)
      // 新建后 重新请求数据
      this.postUserListAtion({ offset: 0, size: 10 })
    },
    async editUserDataAtion(id: number, form: any) {
      const editResult = await editUserData(id, form)
      // console.log(editResult)
      // 重新请求数据
      this.postUserListAtion({ offset: 0, size: 10 })
    },
    // 针对于page 的增删改查
    async postPageListAtion(pageName: string, query: any) {
      const pageListResult = await postPageListData(pageName, query)
      const { totalCount, list } = pageListResult.data.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAtion(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      // console.log(deleteResult)
      this.postPageListAtion(pageName, { offset: 0, size: 10 })
      //  获取完整数据
      const mainstore = useMainStore()
      mainstore.fetchEntireDataAtion()
    },
    async newPageDataAtion(pageName: string, form: any) {
      const newResult = await newPageData(pageName, form)
      console.log(newResult)
      this.postPageListAtion(pageName, { offset: 0, size: 10 })
      //  获取完整数据
      const mainstore = useMainStore()
      mainstore.fetchEntireDataAtion()
    },
    async editPageDataAtion(pageName: string, id: number, form: any) {
      const editResult = await editPageData(pageName, id, form)
      // console.log(editResult)
      this.postPageListAtion(pageName, { offset: 0, size: 10 })
      //  获取完整数据
      const mainstore = useMainStore()
      mainstore.fetchEntireDataAtion()
    }
  }
})
export default useSystemStore
