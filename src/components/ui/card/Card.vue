<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>

<template>
  <section :class="cn('field-card rounded-[1.65rem] border text-card-foreground')">
    <slot />
  </section>
</template>
