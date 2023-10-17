const contentConfig = {
  pageName: "menu",
  header: {
    title: "菜单列表",
    btnTitle: "新建菜单"
  },
  propList: [
    { prop: "name", label: "菜单名称", width: "180px" },
    { prop: "type", label: "级别", width: "120px" },
    { type: "normal", prop: "url", label: "菜单url", width: "240px" },
    { type: "normal", prop: "icon", label: "菜单图标", width: "240px" },
    { type: "normal", prop: "sort", label: "排序", width: "120px" },
    { type: "normal", prop: "permission", label: "权限", width: "180px" },
    { type: "timer", prop: "createAt", label: "创建时间", width: "250px" },
    { type: "timer", prop: "updateAt", label: "更新时间", width: "250px " },
    {
      type: "handler",
      label: "操作",
      width: "200px"
    }
  ],
  childrenProps: {
    rowKey: "id",
    treeProp: {
      children: "children"
    }
  }
}
export default contentConfig
