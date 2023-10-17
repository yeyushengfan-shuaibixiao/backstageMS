import { yeyuRequest } from "@/service/index"

export function getAmountListData() {
  return yeyuRequest.get({
    url: "/goods/amount/list"
  })
}

export function getCategoryCountData() {
  return yeyuRequest.get({
    url: "/goods/category/count"
  })
}

export function getGoodsCategorySaleData() {
  return yeyuRequest.get({
    url: "/goods/category/sale"
  })
}

export function getGoodsCategoryFavorData() {
  return yeyuRequest.get({
    url: "/goods/category/favor"
  })
}

export function getGoodsAddressSaleData() {
  return yeyuRequest.get({
    url: "/goods/address/sale"
  })
}

export function getGoodsSaleTop10Data() {
  return yeyuRequest.get({
    url: "/goods/sale/top10"
  })
}
