<script setup lang="ts">
import Card from '@/components/ui/card/Card.vue'
import Separator from '@/components/ui/separator/Separator.vue'
import SettingListItem from '@/components/settings/SettingListItem.vue'
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
      <SettingListItem :item="item" @select="$emit('select', item)" />
      <Separator v-if="index < items.length - 1" />
    </template>
  </Card>
</template>
