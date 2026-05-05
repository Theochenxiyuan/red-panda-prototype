<script setup lang="ts">
import { computed } from 'vue'

import Tabs from '@/components/ui/tabs/Tabs.vue'
import type { MessageType } from '@/types/app'

const model = defineModel<MessageType>({ required: true })

const props = defineProps<{
  unreadCounts: Record<MessageType, number>
}>()

const items = computed(() => [
  { id: 'comments', label: '评论/回复', badge: props.unreadCounts.comments },
  { id: 'likes', label: '点赞', badge: props.unreadCounts.likes },
  { id: 'system', label: '系统', badge: props.unreadCounts.system },
])
</script>

<template>
  <Tabs v-model="model" :items="items" />
</template>
