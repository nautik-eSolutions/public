<template>
  <div class="relative" ref="wrapperEl">
    <div @click="toggleSearchbox" v-if="showPlaceHolder">
      <p class="text-gray-600">{{ selectedText }}</p>
    </div>

    <div
      v-if="showSearchbox"
      class="w-full bg-white border border-primary-500 rounded-primary "
    >

      <div class="relative">
        <input
          :value="inputText"
          @input="onInput"
          @focus="onFocus"
          @keydown.down="onArrowDown"
          @keydown.enter.prevent="onSelectOption"
          @keydown.up="onArrowUp"
          @keydown.esc="onESC"
          class="w-full px-4 border-0 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
          type="text"
          :placeholder="placeholder"
          ref="searchInput"
        />
        <div v-if="loading" class="absolute right-0 top-0"></div>
      </div>

      <ul class=" w-full bg-white ">
        <li
          class="px-4 py-2 cursor-pointer hover:bg-gray-100"
          v-for="(option, i) in filteredOptions"
          @click="onSelectOption($event, i)"
          :class="{ active: i == activeIndex }"
          :key="i"
        >
          {{ getOptionTitle(option) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed, ref, onMounted, onUnmounted, nextTick } from 'vue'

export default {
  name: 'searchable-select',
  emits: ['update:modelValue', 'search'],
  setup(props, ctx) {
    // ///// Data //////
    // /////////////////
    const data = reactive({
      inputText: '',
      activeIndex: 0,
      showDropdown: false,
      showSearchbox: false,
      showPlaceHolder: true,
      selectedText: 'Click to choose',
    })
    // Element Ref
    const searchInput = ref(null)
    const wrapperEl = ref(null)
    // //////// Life Cycle Hooks  /////////
    // ///////////////////////////////////
    // Mounted

    // //// Computed /////
    // //////////////////
    // Filter options by inputText
    const filteredOptions = computed(() => {
      const searchOptions = (val, i) =>
        val.toLocaleLowerCase().includes(data.inputText.toLocaleLowerCase()) && i < props.max
      return props.options.filter((opt, i) => {
        if (typeof opt === 'object') {
          return searchOptions(opt[props.title], i)
        }
        return searchOptions(opt, i)
      })
    })
    // /// Methods //////
    // /////////////////
    // Set Dropdown value
    function toggleDropdown() {
      data.showDropdown = Boolean(data.inputText && filteredOptions.value.length)
    }
    // Toggle searchbox
    function toggleSearchbox() {
      data.showPlaceHolder = false
      data.showSearchbox = !data.showSearchbox
      nextTick(() => {
        if (data.showSearchbox) {
          searchInput.value.focus()
        }
      })
    }
    function handleOutsideClick(e) {
      if (!wrapperEl.value.contains(e.target)) {
        data.showDropdown = false
        data.showSearchbox = false
      }
    }
    // On Input Change
    function onInput(e) {
      const value = e.target.value.trim()
      // Updating value
      data.inputText = value
      data.activeIndex = 0
      // Emit to parent
      ctx.emit('search', value)
      // toggle dropdown
      toggleDropdown()
    }
    // When focus to input
    function onFocus(e) {
      // toggle dropdown
      toggleDropdown()
    }
    // On Arrow Down press
    function onArrowDown(e) {
      data.activeIndex++
      if (data.activeIndex >= filteredOptions.value.length) {
        data.activeIndex = 0
      }
    }
    // On Arrow Up press
    function onArrowUp(e) {
      data.activeIndex--
      if (data.activeIndex < 0) {
        data.activeIndex = filteredOptions.value.length - 1
      }
    }
    // On ESC press
    function onESC(e) {
      data.showDropdown = !data.showDropdown
    }
    // When Select Option
    function onSelectOption(e, index = data.activeIndex) {
      if (!data.showDropdown) {
        return
      }
      const selected = filteredOptions.value[index]
      data.inputText = ''
      data.selectedText = selected[props.title]
      data.showDropdown = false
      data.showSearchbox = false
      data.showPlaceHolder = true
      ctx.emit('update:modelValue', selected[props.trackby])
    }
    // Get Options Title
    function getOptionTitle(option) {
      return option.name
    }
    // Return to Template
    return {
      ...toRefs(data),
      wrapperEl,
      onInput,
      getOptionTitle,
      filteredOptions,
      searchInput,
      onArrowUp,
      onArrowDown,
      onESC,
      onFocus,
      onSelectOption,
      toggleSearchbox,
    }
  },
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      default: 'name',
    },
    trackby: {
      type: String,
      default: 'id',
    },
    autoFocus: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    max: {
      type: Number,
      default: 5,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="css" scoped>

</style>
