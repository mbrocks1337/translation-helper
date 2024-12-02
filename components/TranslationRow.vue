<script setup lang="ts">
export interface Input {
  value: string
  name: string
}

const {isLast, index} = defineProps<{
  isLast: boolean
  index: number
}>()

const languages = reactive<Input[]>(LANGUAGES.map((lang) => ({
  value: '',
  name: lang.code
})))

const key = ref('')

const isAllFilled = computed(() => {
  return languages.every(language => language.value !== '') && key.value !== '';
});

const emit = defineEmits<{
  (e: 'completed', key: string, languages: Input[]): void
}>()

watch(isAllFilled, () => {
  if (!isAllFilled.value)
    return;

  if (!isLast)
    return;

  emit('completed', key.value, languages)
})
</script>
<template>
  <div class="flex justify-between items-center gap-4">
    <InputText
        :pt="{root: {name: `key[${index}]`}}"
        v-model="key"
        placeholder="Key"
        autofocus
    />
    <InputText
        v-model="language.value"
        :placeholder="language.name.toUpperCase()"
        v-for="language in languages"
        :key="language.name"
        :pt="{root: {name: `${language.name}[${index}]`}}"
    />
  </div>
</template>