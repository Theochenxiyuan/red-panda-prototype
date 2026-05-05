<script setup lang="ts">
import { Heart, MessageCircle } from 'lucide-vue-next';

import Avatar from '@/components/ui/avatar/Avatar.vue';

interface ReplyItem {
  id: string;
  author: string;
  title: string;
  content: string;
  createdAt: string;
  likes: number;
  liked: boolean;
}

defineProps<{
  id: string;
  author: string;
  title: string;
  content: string;
  createdAt: string;
  likes: number;
  liked: boolean;
  replies: ReplyItem[];
}>();

defineEmits<{
  toggleLike: [id: string];
  reply: [id: string];
}>();
</script>

<template>
  <article class="flex gap-3 py-4">
    <Avatar :name="author" class="size-9 [&]:rounded-xl text-xs" />
    <div class="min-w-0 flex-1">
      <div class="flex items-center gap-2">
        <span class="text-sm font-semibold text-panda-bark">{{ author }}</span>
        <span class="text-[11px] text-muted-foreground">{{ title }}</span>
      </div>
      <p class="mt-1.5 text-sm leading-6 text-foreground/80">{{ content }}</p>
      <div class="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
        <span>{{ createdAt }}</span>
        <button
          type="button"
          class="flex items-center gap-1 transition active:scale-95"
          :class="liked ? 'text-primary font-medium' : ''"
          @click="$emit('toggleLike', id)"
        >
          <Heart class="size-3.5" :class="liked ? 'fill-current' : ''" />
          {{ likes }}
        </button>
        <button
          type="button"
          class="flex items-center gap-1 transition active:scale-95"
          @click="$emit('reply', id)"
        >
          <MessageCircle class="size-3.5" />
          回复
        </button>
      </div>

      <div
        v-if="replies.length > 0"
        class="mt-3 space-y-3 border-l-2 border-panda-orange/20 pl-3"
      >
        <div v-for="reply in replies" :key="reply.id" class="flex gap-2.5">
          <Avatar
            :name="reply.author"
            class="size-7 [&]:rounded-lg text-[10px]"
          />
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold text-panda-bark">{{
                reply.author
              }}</span>
              <span class="text-[11px] text-muted-foreground">{{
                reply.title
              }}</span>
            </div>
            <p class="mt-0.5 text-sm leading-5 text-foreground/80">
              {{ reply.content }}
            </p>
            <div
              class="mt-1.5 flex items-center gap-3 text-[11px] text-muted-foreground"
            >
              <span>{{ reply.createdAt }}</span>
              <button
                type="button"
                class="flex items-center gap-1 transition active:scale-95"
                :class="reply.liked ? 'text-primary font-medium' : ''"
                @click="$emit('toggleLike', reply.id)"
              >
                <Heart
                  class="size-3"
                  :class="reply.liked ? 'fill-current' : ''"
                />
                {{ reply.likes }}
              </button>
              <button
                type="button"
                class="flex items-center gap-1 transition active:scale-95"
                @click="$emit('reply', reply.id)"
              >
                <MessageCircle class="size-3" />
                回复
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
