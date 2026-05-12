<script setup lang="ts">
import { type Component, computed } from 'vue'

import { cn } from '@/lib/utils'

const model = defineModel<string>({ default: '' })

const props = withDefaults(
  defineProps<{
    placeholder?: string
    type?: string
    enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'
    icon?: Component
  }>(),
  {
    placeholder: '',
    type: 'text',
  },
)

const inputClasses = computed(() =>
  cn(
    'h-12 w-full rounded-full border border-white/70 bg-white/70 text-sm font-medium text-panda-ink outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_10px_24px_rgba(79,53,40,0.06)] transition placeholder:text-muted-foreground focus:border-primary/45 focus:bg-white focus:ring-4 focus:ring-primary/10',
    props.icon ? 'pl-10 pr-4' : 'px-4',
  ),
)
</script>

<template>
  <div class="relative">
    <component :is="icon" v-if="icon" class="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-panda-rust/65" />
    <input v-model="model" :type="type" :enterkeyhint="enterkeyhint" :placeholder="placeholder" :class="inputClasses" />
  </div>
</template>
