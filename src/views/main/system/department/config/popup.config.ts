const popupConfig = {
  pageName: "department",
  header: {
    newTitle: "新建部门",
    editTitle: "编辑部门"
  },
  formItem: [
    {
      type: "input",
      label: "部门名称",
      prop: "name",
      placehoder: "请输入部门名称"
    },
    {
      type: "input",
      label: "部门领导",
      prop: "leader",
      placehoder: "请输入部门领导"
    },
    {
      type: "select",
      label: "上级部门",
      prop: "parentId",
      placehoder: "请选择上级部门",
      option: [
        // {
        //   label: "财务部",
        //   value: "111"
        // },
        // {
        //   label: "安保部",
        //   value: "222"
        // },
        // {
        //   label: "保洁部",
        //   value: "333"
        // },
        // {
        //   label: "人事部",
        //   value: "444"
        // },
        // {
        //   label: "咸鱼大王",
        //   value: "555"
        // }
      ] as any
    }
  ]
}

export default popupConfig
