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
    'h-11 w-full rounded-full border bg-card text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15',
    props.icon ? 'pl-10 pr-4' : 'px-4',
  ),
)
</script>

<template>
  <div class="relative">
    <component :is="icon" v-if="icon" class="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    <input v-model="model" :type="type" :enterkeyhint="enterkeyhint" :placeholder="placeholder" :class="inputClasses" />
  </div>
</template>
