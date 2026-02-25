import { computed } from 'vue'

export function useFiltering(categories, filters, sortBy) {
  const filteredAndSorted = computed(() => {
    let result = [...categories.value]
    console.log("result0",result)
    console.log("filters",filters)

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
        mc.minPricePerDay >= filters.value.priceRange.min&&
        mc.minPricePerDay <= filters.value.priceRange.max,
    )
    console.log("result2",result)
    switch (sortBy.value) {
      case 'price_low':
        result.sort((a, b) => a.minPricePerDay - b.minPricePerDay)
        break
      case 'price_high':
        result.sort((a, b) => b.minPricePerDay - a.minPricePerDay)
        break
      case 'distance':
        break
      default:
        break
    }
    console.log(result)

    return result
  })

  return {
    filteredAndSorted,
  }
}
