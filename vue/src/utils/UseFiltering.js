import { computed } from 'vue'

export function useFiltering(categories, filters, sortBy) {
  const filteredAndSorted = computed(() => {
    if (!categories.value || categories.value.length === 0) {
      return []
    }

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

    console.log(filters.value.priceRange)
    switch (sortBy.value) {
      case 'price_low':
        result.sort((a, b) => (a.totalPrice || 0) - (b.totalPrice || 0))
        break
      case 'price_high':
        result.sort((a, b) => (b.totalPrice || 0) - (a.totalPrice || 0))
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
