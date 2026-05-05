<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  followers: number
  following: number
}>()
</script>

<template>
  <section class="grid grid-cols-2 gap-3">
    <RouterLink to="/profile/followers" class="rounded-[1.5rem] border bg-card p-4 text-left shadow-sm">
      <p class="text-2xl font-bold text-panda-bark">{{ followers }}</p>
      <p class="text-sm text-muted-foreground">粉丝</p>
    </RouterLink>
    <RouterLink to="/profile/following" class="rounded-[1.5rem] border bg-card p-4 text-left shadow-sm">
      <p class="text-2xl font-bold text-panda-bark">{{ following }}</p>
      <p class="text-sm text-muted-foreground">关注</p>
    </RouterLink>
  </section>
</template>
