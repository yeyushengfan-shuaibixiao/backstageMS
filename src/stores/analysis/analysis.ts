import {
  getAmountListData,
  getCategoryCountData,
  getGoodsAddressSaleData,
  getGoodsCategoryFavorData,
  getGoodsCategorySaleData,
  getGoodsSaleTop10Data
} from "@/service/module/analysis/analysis"
import { defineStore } from "pinia"
interface IAnalysisState {
  amountList: any[]
  categoryCount: any[]
  goodsAddressSale: any[]
  goodsCategoryFavor: any[]
  goodsCategorySale: any[]
  goodsSaleTop10: any[]
}
const UseAnalysisStore = defineStore("analysis", {
  state: (): IAnalysisState => ({
    amountList: [],
    categoryCount: [],
    goodsAddressSale: [],
    goodsCategoryFavor: [],
    goodsCategorySale: [],
    goodsSaleTop10: []
  }),
  actions: {
    async fetchAnalysisDataAtion() {
      const amountResult = await getAmountListData()
      this.amountList = amountResult.data.data

      const categoryCountResult = await getCategoryCountData()
      this.categoryCount = categoryCountResult.data.data

      const goodsAddressSaleResult = await getGoodsAddressSaleData()
      this.goodsAddressSale = goodsAddressSaleResult.data.data

      const goodsCategoryFavorResult = await getGoodsCategoryFavorData()
      this.goodsCategoryFavor = goodsCategoryFavorResult.data.data

      const goodsCategorySaleResult = await getGoodsCategorySaleData()
      this.goodsCategorySale = goodsCategorySaleResult.data.data

      const goodsSaleTop10Result = await getGoodsSaleTop10Data()
      this.goodsSaleTop10 = goodsSaleTop10Result.data.data
    }
  }
})

export default UseAnalysisStore
