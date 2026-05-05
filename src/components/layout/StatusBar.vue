<script setup lang="ts">
import { computed } from 'vue'

const now = computed(() => {
  const d = new Date()
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
})
</script>

<template>
  <div class="relative z-50 flex h-11 shrink-0 items-center justify-between bg-background/95 px-7 pt-[calc(0.25rem+env(safe-area-inset-top))] text-xs font-semibold text-panda-bark backdrop-blur">
    <span>{{ now }}</span>
    <div class="absolute left-1/2 top-[calc(0.6rem+env(safe-area-inset-top))] h-[1.6rem] w-[7.5rem] -translate-x-1/2 rounded-full bg-panda-bark" />
    <div class="flex items-center gap-1.5">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h.01" /><path d="M7 20v-4" /><path d="M12 20v-8" /><path d="M17 20V8" /><path d="M22 4v16" /></svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18.54V9a6 6 0 0 1 12 0v9.54" /><path d="M4 17a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H4z" /></svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="16" viewBox="0 0 25 16" fill="currentColor"><rect x="0" y="1" width="20" height="14" rx="2.5" ry="2.5" fill="none" stroke="currentColor" stroke-width="1.5" /><rect x="2.5" y="3.5" width="12" height="9" rx="0.5" /><rect x="21.5" y="5" width="2" height="6" rx="1" /></svg>
    </div>
  </div>
</template>
