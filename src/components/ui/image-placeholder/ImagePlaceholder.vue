<script setup lang="ts">
import { computed } from 'vue';
import { Image } from 'lucide-vue-next';

import { cn } from '@/lib/utils';

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg';
    label?: string;
  }>(),
  {
    size: 'md',
    label: '图片占位',
  },
);

const placeholderClasses = computed(() =>
  cn(
    'grid place-items-center rounded-2xl border border-dashed border-orange-200 bg-gradient-to-br from-orange-100 via-amber-50 to-stone-100 text-panda-rust',
    props.size === 'sm' && 'h-16',
    props.size === 'md' && 'h-24',
    props.size === 'lg' && 'h-36 rounded-3xl',
  ),
);
</script>

<template>
  <div :class="placeholderClasses">
    <div class="flex flex-col items-center gap-1 text-xs font-medium">
      <Image class="size-5 opacity-80" />
      <span>{{ label }}</span>
    </div>
  </div>
</template>
