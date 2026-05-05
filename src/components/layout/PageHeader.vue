<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-border/70 bg-background/95 px-5 pb-3 pt-3 backdrop-blur">
    <div class="flex min-h-12 items-center justify-between gap-3">
      <div>
        <h1 class="text-xl font-bold tracking-tight text-panda-bark">{{ title }}</h1>
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
