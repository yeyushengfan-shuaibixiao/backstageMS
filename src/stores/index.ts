import { createPinia } from "pinia"
import type { App } from "vue"
import { useLoginStore } from "@/stores/login/login"
const pinia = createPinia()
function registerStore(app: App<Element>) {
  app.use(pinia)
  const loginStore = useLoginStore()
  loginStore.loadLocalCacheAtion()
}
export default registerStore
 