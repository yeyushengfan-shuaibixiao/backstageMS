const contentConfig = {
  pageName: "role",
  header: {
    title: "角色列表",
    btnTitle: "新建角色"
  },
  propList: [
    { type: "selection", label: "选择 ", width: "80px" },
    { type: "index", label: "序号 ", width: "80px" },
    { type: "normal", label: "角色名称 ", prop: "name", width: "150px" },
    { type: "normal", label: "角色权限 ", prop: "intro", width: "150px" },
    { type: "timer", label: "创建时间 ", prop: "createAt", width: "250px" },
    { type: "timer", label: "更新时间", prop: "updateAt", width: "250px" },
    { type: "handler", label: "操作 ", prop: "name", width: "200px" }
  ]
}

export default contentConfig
