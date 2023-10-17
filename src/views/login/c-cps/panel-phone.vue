<script setup lang="ts">
import { reactive } from "vue"
import type { FormRules } from "element-plus"
const phone = reactive<{ number: string; verificationCode: string }>({
  number: "",
  verificationCode: ""
})

//  表单验证
const phoneRules: FormRules = {
  number: [
    { required: true, message: "必须输入手机号！", trigger: "change" },
    {
      pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
      message: "请输入正确的手机号",
      trigger: "blur"
    }
  ],
  verificationCode: [
    { required: true, message: "必须输入验证码！", trigger: "blur" },
    {
      pattern: /^[0-9]{4}$/,
      message: "验证码输入错误",
      trigger: "blur"
    }
  ]
}
</script>

<template>
  <div class="panelPhone">
    <el-form
      label-width="70px"
      style="max-width: 460px"
      :model="phone"
      :rules="phoneRules"
      ref="formRef"
    >
      <el-form-item label="手机号" prop="number" status-icon>
        <el-input v-model="phone.number" />
      </el-form-item>
      <el-form-item label="验证码" class="buttomItem" prop="verificationCode" status-icon>
        <div class="verify-code">
          <el-input v-model="phone.verificationCode" />
          <el-button class="fuck" type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.panelPhone {
  text-align: center;
  .buttomItem {
    margin-bottom: 0;
    .verify-code {
      display: flex;
      justify-content: center;
      .fuck {
        margin-left: 15px;
      }
    }
  }
}
</style>
