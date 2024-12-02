<script setup lang="ts">
import type {Input} from "~/components/TranslationRow.vue";

const visible = ref(false)
const rowAmount = ref(1)

function onCompleted(key: string, _languages: Input[]) {
  rowAmount.value++
}

interface Row {
  key: string

  [key: string]: string
}

function onSubmit(e: SubmitEvent): Row {
  const formData = new FormData(e.target as HTMLFormElement)
  const dataArray = parseFormData(formData)
  const copyableString = generateCopyableString(dataArray)
  navigator.clipboard.writeText(copyableString.join(',\n').concat(','))
}

function parseFormData(formData: FormData) {
  const result = [];
  const temp = {};

  for (const [fullKey, value] of formData) {
    if (!value)
      continue;

    const match = fullKey.match(/^(\w+)\[(\d+)\]$/);
    if (match) {
      const [, key, index] = match;

      if (!temp[index]) {
        temp[index] = {};
      }

      if (key === "key") {
        temp[index]["key"] = value;
      } else {
        temp[index][key] = value;
      }
    }
  }

  for (const index of Object.keys(temp).sort()) {
    result.push(temp[index]);
  }

  return result;
}

function generateCopyableString(array: Row[]) {
  return array.map((item) => {
    const {key, en, ...translations} = item;
    const child = Object.entries(translations).map(([code, translation]) => `['code' => '${code}', 'translation' => '${translation}']`);
    return `['tag' => '${key}', 'standard_translation' => '${en}', 'child' => [${child.join(', ')}]]`;
  });
}
</script>
<template>
  <Button
      v-bind="$attrs"
      class="absolute bottom-10 right-10 shadow"
      icon="pi pi-plus"
      severity="success"
      @click="visible = true"
  />
  <Dialog v-model:visible="visible" modal header="Add Translations" :close-on-escape="false" :draggable="false">
    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <TranslationRow v-for="n in rowAmount" @completed="onCompleted" :is-last="rowAmount === n" :index="n -1"/>
      <Button label="Copy Code" type="submit"/>
    </form>
  </Dialog>
</template>