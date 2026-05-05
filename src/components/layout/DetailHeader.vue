<script setup lang="ts">
defineProps<{
  title: string
}>()

defineEmits<{
  back: []
}>()
</script>

<template>
  <header class="sticky top-0 z-40 flex h-12 items-center border-b border-border/70 bg-background/95 px-4 pt-[calc(env(safe-area-inset-top))] backdrop-blur">
    <button type="button" class="grid size-9 shrink-0 place-items-center rounded-full transition active:scale-95" @click="$emit('back')">
      <slot name="back-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-panda-bark"><path d="m15 18-6-6 6-6" /></svg>
      </slot>
    </button>
    <h1 class="min-w-0 flex-1 truncate text-center text-sm font-bold text-panda-bark">{{ title }}</h1>
    <div class="size-9 shrink-0">
      <slot name="actions" />
    </div>
  </header>
</template>
