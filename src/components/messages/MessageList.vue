<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import MessageItem from '@/components/messages/MessageItem.vue'
import type { Message, MessageType } from '@/types/app'

const props = defineProps<{
  messages: Message[]
  activeType: MessageType
}>()

const router = useRouter()

const filteredMessages = computed(() => props.messages.filter((message) => message.type === props.activeType))

function openMessage(messageId: string) {
  const message = props.messages.find((item) => item.id === messageId)

  if (message?.to) {
    router.push(message.to)
  }
}
</script>

<template>
  <section class="space-y-3">
    <MessageItem v-for="message in filteredMessages" :key="message.id" :message="message" @open="openMessage" />
  </section>
</template>
