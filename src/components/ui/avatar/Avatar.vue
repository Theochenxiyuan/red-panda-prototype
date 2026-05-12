<script setup lang="ts">
import { computed } from 'vue';

import { cn } from '@/lib/utils';

const props = withDefaults(
  defineProps<{
    name: string;
    src?: string;
    variant?: 'default' | 'muted';
  }>(),
  { variant: 'default' },
);

const initials = computed(() => props.name.slice(0, 2).toUpperCase());
</script>

<template>
  <div
    :class="
      cn(
        'grid size-11 shrink-0 place-items-center overflow-hidden rounded-[1.15rem] border-2 border-white/75 text-sm font-black text-panda-rust shadow-[0_10px_22px_rgba(79,53,40,0.14)]',
        variant === 'default' &&
          'bg-gradient-to-br from-orange-200 via-amber-100 to-panda-parchment',
        variant === 'muted' && 'bg-muted',
      )
    "
  >
    <img v-if="src" :src="src" :alt="name" class="size-full object-cover" />
    <span v-else>{{ initials }}</span>
  </div>
</template>
