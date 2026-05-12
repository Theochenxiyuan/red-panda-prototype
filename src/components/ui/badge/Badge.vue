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
    'inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-black leading-none shadow-[inset_0_1px_0_rgba(255,255,255,0.72)]',
    props.tone === 'orange' && 'bg-orange-100 text-panda-rust ring-1 ring-orange-200/70',
    props.tone === 'green' && 'bg-emerald-100 text-panda-leaf ring-1 ring-emerald-200/80',
    props.tone === 'neutral' && 'bg-stone-100/80 text-muted-foreground ring-1 ring-stone-200/80',
    props.tone === 'outline' && 'border bg-white/55 text-muted-foreground',
  ),
);
</script>

<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>
