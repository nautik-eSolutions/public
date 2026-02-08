<script setup>
import Password from '@/volt/Password.vue'
import InputText from '@/volt/InputText.vue'
</script>

<template>
  <div class="flex flex-col gap-6 w-full">
    <div class="flex flex-col gap-2 w-full">
      <label for="email1" class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
        >Email Address</label
      >
      <Password
        id="password1"
        name="password1"
        v-model="password"
        placeholder="Password"
        :toggleMask="true"
        :feedback="false"
        input-class="w-full!"
      />
    </div>
    <div class="flex flex-col gap-2 w-full">
      <label for="password1" class="text-surface-900 dark:text-surface-0 font-medium leading-normal"
        >Password</label
      >

      <Password
        id="password1"
        name="password1"
        v-model="password"
        placeholder="Confirm password"
        :toggleMask="true"
        :feedback="false"
        input-class="w-full!"
      />
    </div>

    <div
      class="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 sm:gap-0"
    ></div>
  </div>
</template>

<style scoped></style>
