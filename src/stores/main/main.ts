import {
  getEntireMenuList,
  getEntireRolesList,
  getEntireDepartmentList
} from "@/service/module/main/main"
import { defineStore } from "pinia"

interface IMainState {
  entireRolesList: any[]
  entireDepartmentList: any[]
  entireMenuList: any[]
}
const useMainStore = defineStore("main", {
  state: (): IMainState => ({
    entireRolesList: [],
    entireDepartmentList: [],
    entireMenuList: []
  }),
  actions: {
    async fetchEntireDataAtion() {
      const rolesResult = await getEntireRolesList()
      const departmentResult = await getEntireDepartmentList()
      const menuResult = await getEntireMenuList()
      this.entireRolesList = rolesResult.data.data.list
      this.entireDepartmentList = departmentResult.data.data.list
      this.entireMenuList = menuResult.data.data.list
    }
  }
})
export default useMainStore
