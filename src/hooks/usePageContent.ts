import { ref } from "vue"
import  pageContent from "@/components/pageContent/pageContent.vue"
export default function usePageContent() {
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  function queryClickHandle(query: any) {
    pageContentRef.value?.fetchPageListData(query)
  }
  function resetClickHandle() {
    pageContentRef.value?.fetchPageListData()
  }

  return { pageContentRef, queryClickHandle, resetClickHandle }
}
