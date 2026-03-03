import { computed } from 'vue'

export function useFiltering(categories, filters, sortBy) {
  const filteredAndSorted = computed(() => {
    if (!categories.value || categories.value.length === 0) {
      return []
    }

    let result = [...categories.value]
    if (filters.value.electricity16A) {
      result = result.filter((mc) =>
        mc.services?.some((service) => service.name === 'Electricity16A'),
      )
    }

    if (filters.value.electricity32A) {
      result = result.filter((mc) =>
        mc.services?.some((service) => service.name === 'Electricity32A'),
      )
    }

    if (filters.value.electricity63A) {
      result = result.filter((mc) =>
        mc.services?.some((service) => service.name === 'Electricity63A'),
      )
    }

    if (filters.value.freshWater) {
      result = result.filter((mc) => mc.services?.some((service) => service.name === 'FreshWater'))
    }

    if (filters.value.wifiPremium) {
      result = result.filter((mc) => mc.services?.some((service) => service.name === 'WiFiPremium'))
    }

    if (filters.value.security247) {
      result = result.filter((mc) => mc.services?.some((service) => service.name === 'Security247'))
    }

    if (filters.value.wasteDisposal) {
      result = result.filter((mc) =>
        mc.services?.some((service) => service.name === 'WasteDisposal'),
      )
    }

    if (filters.value.showersAndLockers) {
      result = result.filter((mc) =>
        mc.services?.some((service) => service.name === 'ShowersAndLockers'),
      )
    }

    if (filters.value.parking) {
      result = result.filter((mc) => mc.services?.some((service) => service.name === 'Parking'))
    }

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
