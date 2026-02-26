import { computed } from 'vue'

export function useFiltering(categories, filters, sortBy) {
  const filteredAndSorted = computed(() => {
    let result = [...categories.value]

    if (filters.value.wifi) {
      result = result.filter((mc) => mc.services?.includes('Wifi'))
    }
    if (filters.value.restaurantes) {
      result = result.filter((mc) => mc.services?.includes('Restaurantes'))
    }
    if (filters.value.limpieza) {
      result = result.filter((mc) => mc.services?.includes('Limpieza'))
    }
    console.log("result1", result)

    result = result.filter(
      (mc) =>
        mc.totalPrice >= filters.value.priceRange.min&&
        mc.totalPrice <= filters.value.priceRange.max,
    )
    switch (sortBy.value) {
      case 'price_low':
        result.sort((a, b) => a.totalPrice - b.totalPrice)
        break
      case 'price_high':
        result.sort((a, b) => b.totalPrice - a.totalPrice)
        break
      case 'distance':
        break
      default:
        break
    }

    return result
  })

  return {
    filteredAndSorted,
  }
}
