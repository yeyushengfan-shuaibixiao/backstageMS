<script setup lang="ts">
import { reactive, ref } from "vue"
import type { FormRules, ElForm } from "element-plus"
import { ElMessage } from "element-plus"
import useLoginStore from "@/stores/login/login"
import type { IAccount } from "@/types/index"
import { localCache } from "@/utils/cache"
const account = reactive<IAccount>({
  name: localCache.getCache("name") ?? "",
  password: localCache.getCache("password") ?? ""
})

//  表单验证
const accountRules: FormRules = {
  name: [
    { required: true, message: "必须输入账号！", trigger: "blur" },
    {
      pattern: /^[a-zA-Z0-9]{6,20}$/,
      message: "必须是长度为6-20的数字或者字母组合",
      trigger: "change"
    }
  ],
  password: [
    { required: true, message: "必须输入密码！", trigger: "blur" },
    {
      pattern: /^[a-zA-Z0-9]{3,}$/,
      message: "必须是长度为3位以上的数字或者字母组合 ",
      trigger: "change"
    }
  ]
}
const formRef = ref<InstanceType<typeof ElForm>>()
// 登录 逻辑
const LoginStore = useLoginStore()
function loginAction(isChecked: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 获取用户输入的账户密码
      const name = account.name
      const password = account.password
      // 想服务器发送网络请求 携带账户信息
      // accountLoginRequest({ name, password }).then((res) => {
      //   console.log(res)
      // })
      LoginStore.loginAccountActon({ name, password }).then(() => {
        if (isChecked) {
          localCache.setCache("name", name)
          localCache.setCache("password", password)
        } else {
          localCache.removeCache("name")
          localCache.removeCache("password")
          localCache.removeCache("isChecked")
        }
      })
      console.log("验证成功")
    } else {
      ElMessage.error("格式错误，请修改!")
    }
  })
}
defineExpose({
  loginAction
})
</script>
<template>
  <div class="panelAcount">
    <el-form
      label-width="70px"
      style="max-width: 460px"
      :model="account"
      :rules="accountRules"
      ref="formRef"
    >
      <el-form-item label="账号" prop="name" status-icon>
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" class="buttomItem" prop="password" status-icon>
        <el-input type="password" v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.panelAcount {
  text-align: center;
  .buttomItem {
    margin-bottom: 0;
  }
}
</style>
