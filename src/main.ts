import { createApp } from "vue"
import pinia from "@/stores/index"
import("@/assets/css/yeyuReset.css")
import App from "./App.vue"
import router from "./router"
import icons from "./global/register-icons"
// 按需引入 组件的样式  或者配置插件ElementPlusResolve
// import "element-plus/theme-chalk/el-message.css"
const app = createApp(App)
app.use(pinia).use(icons).use(router).mount("#app")
 