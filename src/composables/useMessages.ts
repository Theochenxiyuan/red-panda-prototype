import { computed, shallowRef } from 'vue'

import { messages as seedMessages } from '@/data/mock'

const readIds = shallowRef<string[]>([])

export function useMessages() {
  const messages = computed(() =>
    seedMessages.map((message) => ({
      ...message,
      unread: message.unread && !readIds.value.includes(message.id),
    })),
  )

  function markRead(id: string) {
    if (readIds.value.includes(id)) {
      return
    }

    readIds.value = [...readIds.value, id]
  }

  function markAllRead() {
    readIds.value = seedMessages.map((message) => message.id)
  }

  return { messages, markRead, markAllRead }
}
