<script setup lang="ts">
import { computed } from 'vue';

import { cn } from '@/lib/utils';

const props = withDefaults(
  defineProps<{
    tone?: 'orange' | 'green' | 'neutral' | 'outline';
  }>(),
  { tone: 'neutral' },
);

const badgeClasses = computed(() =>
  cn(
    'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium leading-none',
    props.tone === 'orange' && 'bg-orange-100 text-panda-rust',
    props.tone === 'green' && 'bg-green-100 text-panda-leaf',
    props.tone === 'neutral' && 'bg-muted text-muted-foreground',
    props.tone === 'outline' && 'border bg-card text-muted-foreground',
  ),
);
</script>

<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>
