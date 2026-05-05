<script setup lang="ts">
import { Bell, Heart, MessageCircle } from 'lucide-vue-next';

import Card from '@/components/ui/card/Card.vue';
import type { Message } from '@/types/app';

defineProps<{
  message: Message;
}>();

defineEmits<{
  open: [id: string];
}>();
</script>

<template>
  <Card class="p-4">
    <button
      type="button"
      class="flex w-full items-start gap-3 text-left"
      @click="$emit('open', message.id)"
    >
      <div
        class="grid size-11 shrink-0 place-items-center rounded-2xl"
        :class="
          message.type === 'likes'
            ? 'bg-orange-100 text-panda-rust'
            : message.type === 'system'
              ? 'bg-green-100 text-panda-leaf'
              : 'bg-muted text-panda-bark'
        "
      >
        <Heart v-if="message.type === 'likes'" class="size-5" />
        <Bell v-else-if="message.type === 'system'" class="size-5" />
        <MessageCircle v-else class="size-5" />
      </div>
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <h2 class="truncate text-sm font-bold text-panda-bark">
            {{ message.title }}
          </h2>
          <span v-if="message.unread" class="size-2 rounded-full bg-primary" />
        </div>
        <p class="mt-1 text-sm leading-5 text-muted-foreground">
          {{ message.description }}
        </p>
        <p class="mt-2 text-xs text-muted-foreground">
          {{ message.createdAt }}
        </p>
      </div>
    </button>
  </Card>
</template>
