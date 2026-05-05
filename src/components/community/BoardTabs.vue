<script setup lang="ts">
import Tabs from '@/components/ui/tabs/Tabs.vue'
import type { Board } from '@/types/app'

const model = defineModel<string>({ required: true })

defineProps<{
  boards: Board[]
}>()
</script>

<template>
  <Tabs v-model="model" :items="boards" />
</template>
