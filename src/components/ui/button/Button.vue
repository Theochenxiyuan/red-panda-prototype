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
    'inline-flex items-center justify-center gap-2 rounded-full font-medium transition active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50',
    props.variant === 'primary' && 'bg-primary text-primary-foreground shadow-sm',
    props.variant === 'secondary' && 'bg-secondary text-secondary-foreground',
    props.variant === 'cream' && 'bg-panda-cream text-panda-rust hover:bg-white',
    props.variant === 'ghost' && 'bg-transparent text-muted-foreground hover:bg-muted',
    props.variant === 'outline' && 'border bg-card text-foreground hover:bg-muted',
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
