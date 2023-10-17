import { ref } from "vue"
import pagePopup from "@/components/pagePopup/pagePopup.vue"
type CallBackType = (data: any) => void

export default function usePagePopUp(editCallBack?: CallBackType, newCallBack?: CallBackType) {
  const pagePopupRef = ref<InstanceType<typeof pagePopup>>()
  function newClickHandle() {
    pagePopupRef.value?.setDialogVisible()
    if (newCallBack) {
      newCallBack([])
    }
  }
  function editClickHandle(formData: any) {
    pagePopupRef.value?.setDialogVisible(false, formData)
    if (editCallBack) {
      editCallBack(formData)
    }
  }
  return { pagePopupRef, newClickHandle, editClickHandle }
}
