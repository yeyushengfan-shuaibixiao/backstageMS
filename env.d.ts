/// <reference types="vite/client" />
declare module "*.vue" {
  // 和 volar ts 插件起冲突 要用就关掉插件
  import { DefineComponent } from "vue"
  const conponent: DefineComponent
  export default conponent
}
