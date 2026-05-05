<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

import type { MenuItem } from '@/types/app'

defineProps<{
  item: MenuItem
}>()

defineEmits<{
  select: [item: MenuItem]
}>()
</script>

<template>
  <button type="button" class="flex w-full items-center justify-between gap-3 p-4 text-left" @click="$emit('select', item)">
    <div>
      <p class="text-sm font-semibold text-panda-bark">{{ item.label }}</p>
      <p v-if="item.description" class="mt-1 text-xs leading-5 text-muted-foreground">{{ item.description }}</p>
    </div>
    <ChevronRight class="size-4 text-muted-foreground" />
  </button>
</template>
