<script>
export default {
  name: 'ServicesCheckbox',
  props:{
    service:String
  }
}
</script>

<template>
  <div class="flex justify-start gap-2 h-8 w-[100%] shadow rounded border">
    <input id="filter" class="mx-3" type="checkbox" />
    <label for="filter">{{service}}</label>
  </div>
</template>

<style scoped></style>
