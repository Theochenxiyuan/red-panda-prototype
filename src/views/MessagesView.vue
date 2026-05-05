<script setup lang="ts">
import { CheckCheck } from 'lucide-vue-next'
import { computed, shallowRef } from 'vue'

import MessageList from '@/components/messages/MessageList.vue'
import MessageTabs from '@/components/messages/MessageTabs.vue'
import PageHeader from '@/components/layout/PageHeader.vue'
import { messages } from '@/data/mock'
import type { MessageType } from '@/types/app'

const activeType = shallowRef<MessageType>('comments')

const unreadCounts = computed(() => ({
  comments: messages.filter((message) => message.type === 'comments' && message.unread).length,
  likes: messages.filter((message) => message.type === 'likes' && message.unread).length,
  system: messages.filter((message) => message.type === 'system' && message.unread).length,
}))
</script>

<template>
  <PageHeader title="消息">
    <template #actions>
      <button type="button" class="grid size-10 place-items-center rounded-full bg-card text-panda-bark shadow-sm">
        <CheckCheck class="size-5" />
      </button>
    </template>
    <MessageTabs v-model="activeType" :unread-counts="unreadCounts" />
  </PageHeader>

  <section class="px-5 pt-4">
    <MessageList :messages="messages" :active-type="activeType" />
  </section>
</template>
