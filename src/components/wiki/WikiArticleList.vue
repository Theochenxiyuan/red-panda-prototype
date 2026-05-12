<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { useRouter } from 'vue-router'

import WikiCard from '@/components/wiki/WikiCard.vue'
import type { WikiArticle } from '@/types/app'

const props = defineProps<{
  articles: WikiArticle[]
  activeCategory: string
  searchQuery: string
}>()

const router = useRouter()
const savedIds = shallowRef(new Set(props.articles.filter((article) => article.saved).map((article) => article.id)))

const filteredArticles = computed(() =>
  props.articles
    .filter((article) => {
      const query = props.searchQuery.trim().toLowerCase()
      const matchesCategory = article.categoryId === props.activeCategory
      const matchesQuery = !query || `${article.title} ${article.summary} ${article.tags.join(' ')}`.toLowerCase().includes(query)

      return matchesCategory && matchesQuery
    })
    .map((article) => ({ ...article, saved: savedIds.value.has(article.id) })),
)

function openArticle(id: string) {
  router.push({ name: 'WikiDetail', params: { id } })
}

function toggleSave(id: string) {
  const nextSavedIds = new Set(savedIds.value)

  if (nextSavedIds.has(id)) {
    nextSavedIds.delete(id)
  } else {
    nextSavedIds.add(id)
  }

  savedIds.value = nextSavedIds
}
</script>

<template>
  <section class="space-y-4">
    <WikiCard v-for="article in filteredArticles" :key="article.id" :article="article" @open="openArticle" @toggle-save="toggleSave" />
    <div v-if="filteredArticles.length === 0" class="field-card rounded-[1.5rem] border p-8 text-center text-sm font-medium text-muted-foreground">
      该分类文章正在维护中
    </div>
  </section>
</template>
