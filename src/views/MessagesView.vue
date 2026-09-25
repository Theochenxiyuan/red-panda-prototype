<script setup lang="ts">
import { CheckCheck } from 'lucide-vue-next'
import { computed, shallowRef } from 'vue'
import { useRouter } from 'vue-router'

import MessageList from '@/components/messages/MessageList.vue'
import MessageTabs from '@/components/messages/MessageTabs.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import { useMessages } from '@/composables/useMessages'
import type { MessageType } from '@/types/app'

const router = useRouter()
const activeType = shallowRef<MessageType>('comments')
const { messages, markRead, markAllRead } = useMessages()

const unreadCounts = computed(() => ({
  comments: messages.value.filter((message) => message.type === 'comments' && message.unread).length,
  likes: messages.value.filter((message) => message.type === 'likes' && message.unread).length,
  system: messages.value.filter((message) => message.type === 'system' && message.unread).length,
}))

function openMessage(id: string) {
  markRead(id)

  const message = messages.value.find((item) => item.id === id)

  if (message?.to) {
    router.push(message.to)
  }
}
</script>

<template>
  <PageHeader title="消息">
    <template #actions>
      <button
        type="button"
        class="grid size-10 place-items-center rounded-full bg-card text-panda-bark shadow-sm"
        @click="markAllRead()"
      >
        <CheckCheck class="size-5" />
      </button>
    </template>
    <MessageTabs v-model="activeType" :unread-counts="unreadCounts" />
  </PageHeader>

  <section class="px-5 pt-4">
    <MessageList
      :messages="messages"
      :active-type="activeType"
      @open="openMessage"
    />
  </section>
</template>
