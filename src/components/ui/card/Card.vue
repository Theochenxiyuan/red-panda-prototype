<script setup lang="ts">
import { cn } from '@/lib/utils'
</script>

<template>
  <section :class="cn('rounded-[1.5rem] border bg-card text-card-foreground shadow-sm')">
    <slot />
  </section>
</template>
