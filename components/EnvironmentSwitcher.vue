<script setup lang="ts">
import type {BadgeProps} from "primevue";
import type {ApiUrl} from "~/utils/constants";

export interface Environment {
  name: string
  severity: BadgeProps['severity']
  url: ApiUrl
}

const environments: Environment[] = [
  {
    name: 'Local',
    url: API_URLS.local,
    severity: 'success'
  },
  {
    name: 'Stage',
    url: API_URLS.stage,
    severity: 'warn'
  },
  {
    name: 'Production',
    url: API_URLS.prod,
    severity: 'danger'
  },
] as const;


const model = defineModel()
</script>
<template>
  <div>
    <Select
        v-model="model"
        :options="environments"
        optionLabel="name"
        optionValue="url"
        placeholder="Select a City"
        class="w-full md:w-56">
      <template #option="{option}: {option: Environment}">
        <div class="flex items-center gap-2">
          <Badge :severity="option.severity"></Badge>
          <div>{{ option.name }}</div>
        </div>
      </template>
    </Select>
  </div>
</template>