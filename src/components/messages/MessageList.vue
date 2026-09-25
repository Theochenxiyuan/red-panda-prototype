<script setup lang="ts">
import { computed } from 'vue'

import MessageItem from '@/components/messages/MessageItem.vue'
import type { Message, MessageType } from '@/types/app'

const props = defineProps<{
  messages: Message[]
  activeType: MessageType
}>()

defineEmits<{
  open: [id: string]
}>()

const filteredMessages = computed(() => props.messages.filter((message) => message.type === props.activeType))
</script>

<template>
  <section class="space-y-3">
    <MessageItem
      v-for="message in filteredMessages"
      :key="message.id"
      :message="message"
      @open="$emit('open', $event)"
    />
  </section>
</template>
