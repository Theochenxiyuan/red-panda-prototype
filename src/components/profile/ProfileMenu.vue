<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'

import Card from '@/components/ui/card/Card.vue'
import Separator from '@/components/ui/separator/Separator.vue'
import type { MenuItem } from '@/types/app'

defineProps<{
  items: MenuItem[]
}>()

defineEmits<{
  select: [item: MenuItem]
}>()
</script>

<template>
  <Card class="overflow-hidden">
    <template v-for="(item, index) in items" :key="item.id">
      <button type="button" class="flex w-full items-center justify-between gap-3 p-4 text-left transition hover:bg-white/35 active:bg-white/55" @click="$emit('select', item)">
        <div>
          <p class="text-sm font-black text-panda-ink">{{ item.label }}</p>
          <p v-if="item.description" class="mt-1 text-xs font-medium text-muted-foreground">{{ item.description }}</p>
        </div>
        <ChevronRight class="size-4 text-panda-rust/65" />
      </button>
      <Separator v-if="index < items.length - 1" />
    </template>
  </Card>
</template>
