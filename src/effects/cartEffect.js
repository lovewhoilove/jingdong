import { computed } from 'vue'
import { useStore } from 'vuex'

export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  const changeCartItemInfo = (shopId, productId, productInfo, num) => {
    store.commit('changeCartItemInfo', {
      shopId, productId, productInfo, num
    })
  }

  const productList = computed(() => {
    const productList = cartList[shopId]?.productList || {}
    const notEmptyProductList = {}
    for (const i in productList) {
      const product = productList[i]
      if (product.count > 0) {
        notEmptyProductList[i] = product
      }
    }
    return notEmptyProductList
  })

  const shopName = computed(() => {
    const shopName = cartList[shopId]?.shopName || ''
    return shopName
  })

  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList
    const result = {
      totalCount: 0,
      totalPrice: 0,
      allCheck: true
    }
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        result.totalCount += product.count
        if (product.check) {
          result.totalPrice += (product.count * product.price)
        }
        if (product.count > 0 && !product.check) {
          result.allCheck = false
        }
      }
    }
    result.totalPrice = result.totalPrice.toFixed(2)
    return result
  })

  return {
    cartList,
    changeCartItemInfo,
    productList,
    shopName,
    calculations
  }
}
