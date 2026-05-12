<script setup lang="ts">
import { Bookmark, Clock } from 'lucide-vue-next'

import Badge from '@/components/ui/badge/Badge.vue'
import Card from '@/components/ui/card/Card.vue'
import type { WikiArticle } from '@/types/app'

defineProps<{
  article: WikiArticle
}>()

defineEmits<{
  open: [id: string]
  toggleSave: [id: string]
}>()
</script>

<template>
  <Card class="p-4">
    <div class="flex items-start gap-4">
      <button type="button" class="min-w-0 flex-1 text-left" @click="$emit('open', article.id)">
        <img
          v-if="article.image"
          :src="article.image"
          :alt="article.title"
          class="film-image mb-4 h-32 w-full rounded-[1.35rem] object-cover"
        />
        <div class="mb-3 flex flex-wrap gap-2">
          <Badge v-for="tag in article.tags" :key="tag" :tone="tag === '官方' ? 'green' : 'neutral'">{{ tag }}</Badge>
        </div>
        <h2 class="text-lg font-black tracking-tight text-panda-ink">{{ article.title }}</h2>
        <p class="mt-2 text-sm font-medium leading-6 text-muted-foreground">{{ article.summary }}</p>
        <div class="mt-3 flex items-center gap-1 text-xs font-bold text-panda-leaf">
          <Clock class="size-3.5" />
          {{ article.readTime }}阅读
        </div>
      </button>
      <button type="button" class="grid size-10 shrink-0 place-items-center rounded-full bg-white/70 text-panda-rust shadow-[inset_0_0_0_1px_rgba(79,53,40,0.08)]" @click="$emit('toggleSave', article.id)">
        <Bookmark class="size-5" :class="article.saved ? 'fill-current' : ''" />
      </button>
    </div>
  </Card>
</template>
