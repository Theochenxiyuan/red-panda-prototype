<script setup lang="ts">
import { CheckCircle2, Info } from 'lucide-vue-next'

import { useToast } from '@/composables/useToast'

const { toasts } = useToast()
</script>

<template>
  <div class="pointer-events-none absolute inset-x-5 bottom-[calc(6.25rem+env(safe-area-inset-bottom))] z-[70] flex flex-col items-center gap-2">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="flex max-w-full items-center gap-2 rounded-full border bg-card/95 px-4 py-2 text-sm font-medium shadow-soft backdrop-blur"
        :class="toast.tone === 'success' ? 'text-panda-leaf' : 'text-panda-bark'"
      >
        <CheckCircle2 v-if="toast.tone === 'success'" class="size-4" />
        <Info v-else class="size-4" />
        <span class="truncate">{{ toast.message }}</span>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
