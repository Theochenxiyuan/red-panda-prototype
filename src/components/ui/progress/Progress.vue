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
  <div class="h-2.5 overflow-hidden rounded-full bg-panda-bark/10 shadow-[inset_0_1px_3px_rgba(79,53,40,0.14)]">
    <div class="h-full rounded-full bg-gradient-to-r from-panda-leaf via-panda-moss to-panda-orange transition-all" :style="{ width: percentage }" />
  </div>
</template>
