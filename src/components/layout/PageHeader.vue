<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-white/50 bg-background/80 px-5 pb-4 pt-3 shadow-[0_12px_28px_rgba(79,53,40,0.06)] backdrop-blur-xl">
    <div class="flex min-h-12 items-center justify-between gap-3">
      <div>
        <p class="mb-0.5 text-[10px] font-black uppercase tracking-[0.26em] text-panda-leaf/70">
          Red Panda Field Notes
        </p>
        <h1 class="text-2xl font-black tracking-tight text-panda-ink">{{ title }}</h1>
      </div>
      <div v-if="$slots.actions" class="flex items-center gap-2">
        <slot name="actions" />
      </div>
    </div>
    <div v-if="$slots.default" class="mt-3 space-y-3">
      <slot />
    </div>
  </header>
</template>
