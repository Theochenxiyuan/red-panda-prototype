<script setup lang="ts">
import { computed } from 'vue'

import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'cream'
    size?: 'sm' | 'md' | 'lg' | 'icon'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
  },
)

const buttonClasses = computed(() =>
  cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-bold transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
    props.variant === 'primary' && 'bg-gradient-to-br from-panda-orange to-panda-rust text-primary-foreground shadow-[0_12px_28px_rgba(159,61,33,0.22)]',
    props.variant === 'secondary' && 'border border-white/60 bg-white/65 text-secondary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]',
    props.variant === 'cream' && 'bg-panda-cream text-panda-rust shadow-[inset_0_1px_0_rgba(255,255,255,0.82)] hover:bg-white',
    props.variant === 'ghost' && 'bg-transparent text-muted-foreground hover:bg-white/55',
    props.variant === 'outline' && 'border bg-white/65 text-foreground hover:bg-white',
    props.size === 'sm' && 'h-8 px-3 text-xs',
    props.size === 'md' && 'h-10 px-4 text-sm',
    props.size === 'lg' && 'h-12 px-6 text-base',
    props.size === 'icon' && 'size-10',
  ),
)
</script>

<template>
  <button :type="type" :disabled="disabled" :class="buttonClasses">
    <slot />
  </button>
</template>
