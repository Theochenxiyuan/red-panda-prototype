<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import PostCard from '@/components/community/PostCard.vue'
import type { BoardId, Post } from '@/types/app'

const props = defineProps<{
  posts: Post[]
  activeBoard: BoardId
  searchQuery: string
}>()

const router = useRouter()

const filteredPosts = computed(() => {
  const query = props.searchQuery.trim().toLowerCase()

  return props.posts.filter((post) => {
    const matchesBoard = props.activeBoard === 'home' || post.boardId === props.activeBoard
    const matchesQuery = !query || `${post.title} ${post.excerpt} ${post.author.name}`.toLowerCase().includes(query)

    return matchesBoard && matchesQuery
  })
})

function openPost(id: string) {
  router.push({ name: 'PostDetail', params: { id } })
}
</script>

<template>
  <section class="space-y-4">
    <PostCard
      v-for="post in filteredPosts"
      :key="post.id"
      :post="post"
      :show-board-tag="activeBoard === 'home'"
      @open="openPost"
    />
    <div v-if="filteredPosts.length === 0" class="rounded-[1.5rem] border bg-card p-8 text-center text-sm text-muted-foreground">
      暂时没有匹配的帖子
    </div>
  </section>
</template>
