<script setup lang="ts">
defineProps<{
  title: string
}>()

defineEmits<{
  back: []
}>()
</script>

<template>
  <header class="sticky top-0 z-40 flex h-14 items-center border-b border-white/50 bg-background/80 px-4 shadow-[0_12px_28px_rgba(79,53,40,0.06)] backdrop-blur-xl">
    <button type="button" class="grid size-9 shrink-0 place-items-center rounded-full bg-white/65 shadow-[inset_0_0_0_1px_rgba(79,53,40,0.08)] transition active:scale-95" @click="$emit('back')">
      <slot name="back-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-panda-bark"><path d="m15 18-6-6 6-6" /></svg>
      </slot>
    </button>
    <h1 class="min-w-0 flex-1 truncate text-center text-sm font-black tracking-tight text-panda-ink">{{ title }}</h1>
    <div class="size-9 shrink-0">
      <slot name="actions" />
    </div>
  </header>
</template>
