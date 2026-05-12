<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  followers: number
  following: number
}>()
</script>

<template>
  <section class="grid grid-cols-2 gap-3">
    <RouterLink to="/profile/followers" class="field-card rounded-[1.5rem] border p-4 text-left">
      <p class="text-3xl font-black text-panda-ink">{{ followers }}</p>
      <p class="text-sm font-semibold text-muted-foreground">粉丝</p>
    </RouterLink>
    <RouterLink to="/profile/following" class="field-card rounded-[1.5rem] border p-4 text-left">
      <p class="text-3xl font-black text-panda-ink">{{ following }}</p>
      <p class="text-sm font-semibold text-muted-foreground">关注</p>
    </RouterLink>
  </section>
</template>
