<script setup lang="ts">
const {text} = defineProps<{
  text: string
}>()

function copyText() {
  navigator.clipboard.writeText(text)
}
</script>
<template>
  <InputGroup>
    <InputText :value="text" readonly />
    <InputGroupAddon>
      <Button icon="pi pi-copy" @click="copyText" />
    </InputGroupAddon>
  </InputGroup>
</template>