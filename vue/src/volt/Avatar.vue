<template>
  <Avatar
    unstyled
    :pt="theme"
    :ptOptions="{
      mergeProps: ptViewMerge,
    }"
  >
    <template v-for="(_, slotName) in $slots" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps ?? {}" />
    </template>
  </Avatar>
</template>

<script setup lang="ts">
import Avatar, { type AvatarPassThroughOptions, type AvatarProps } from 'primevue/avatar'
import { ref } from 'vue'
import { ptViewMerge } from './utils'

interface Props extends /* @vue-ignore */ AvatarProps {}
defineProps<Props>()

const theme = ref<AvatarPassThroughOptions>({
  root: `inline-flex items-center bg-principal-blue justify-center
        w-10 h-10 cursor-pointer text-base rounded-full text-white
        has-[img]:bg-transparent
        p-circle:rounded-full
        p-large:w-12 p-large:h-12 p-large:text-2xl
        p-xlarge:w-16 p-xlarge:h-16 p-xlarge:text-[2rem]`,
  label: ``,
  icon: `text-base p-large:text-2xl p-xlarge:text-[2rem]`,
  image: `p-circle:rounded-full w-full h-full`,
})
</script>
