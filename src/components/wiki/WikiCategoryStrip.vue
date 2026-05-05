<script setup lang="ts">
import Tabs from '@/components/ui/tabs/Tabs.vue'
import type { WikiCategory } from '@/types/app'

const model = defineModel<string>({ required: true })

defineProps<{
  categories: WikiCategory[]
}>()
</script>

<template>
  <Tabs v-model="model" :items="categories" />
</template>
