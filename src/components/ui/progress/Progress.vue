<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    value: number
    max?: number
  }>(),
  { max: 100 },
)

const percentage = computed(() => `${Math.min(100, Math.round((props.value / props.max) * 100))}%`)
</script>

<template>
  <div class="h-2 overflow-hidden rounded-full bg-muted">
    <div class="h-full rounded-full bg-primary transition-all" :style="{ width: percentage }" />
  </div>
</template>
