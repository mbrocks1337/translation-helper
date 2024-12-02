<script setup lang="ts">
import type {ApiUrl} from "~/utils/constants";
import type {LanguageResponse} from "~/types";
import {FilterMatchMode} from "@primevue/core";
import CreateDialog from "~/components/CreateDialog.vue";

const environment = ref<ApiUrl>('https://api.ivg.auction')

const {data, error, status} = useLazyAsyncData<LanguageResponse[]>('translations',
    () => Promise.all(LANGUAGES.map((language) => $fetch(`${environment.value}/admin-api/localization/${language.code}`))),
    {
      watch: environment,
    });

const allKeys = computed(() => {
  if (!data.value) return [];
  return Array.from(
      new Set(
          data.value.flatMap((response) => Object.keys(response.data.translations))
      )
  ).sort();
});

const languageCodes = computed(() => {
  if (!data.value) return [];
  return data.value.map((res) => res.data.lang)
});

const translationsTable = computed(() => {
  if (!data.value) return [];

  return allKeys.value.map((key) => {
    const row: Record<string, string | undefined> = {key};
    data.value?.forEach((res) => {
      row[res.data.lang] = res.data.translations[key] || '-';
    });
    return row;
  });
});

const toast = useToast()
watch(status, () => {
  if (status.value !== 'error')
    return;

  toast.add({severity: 'error', detail: error.value.message, life: 3000})
})

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
</script>

<template>
  <div class="h-screen flex flex-col">
    <div class="flex justify-between items-center p-4">
      <EnvironmentSwitcher v-model="environment"/>
      <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
    </div>
    <div class="flex-1 overflow-y-hidden">
    <DataTable v-model:filters="filters" :value="translationsTable" :tableStyle="{ minWidth: '50rem' }" :virtualScrollerOptions="{ itemSize: 46 }" scrollable scrollHeight="flex">
      <Column field="key" header="Key" class="w-[30rem]">
        <template #body="slotProps">
          <CopyText :text="slotProps.data.key"/>
        </template>
      </Column>
      <Column
          v-for="(lang, index) in languageCodes"
          :key="index"
          :field="lang"
          class="w-[30rem]"
          :header="lang.toUpperCase()"
      />
    </DataTable>
    </div>
    <CreateDialog/>
  </div>
</template>