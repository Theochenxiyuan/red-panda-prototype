<script setup lang="ts">
import Avatar from '@/components/ui/avatar/Avatar.vue'
import Badge from '@/components/ui/badge/Badge.vue'
import Button from '@/components/ui/button/Button.vue'
import Card from '@/components/ui/card/Card.vue'
import type { UserProfile } from '@/types/app'

defineProps<{
  profile: UserProfile
}>()
</script>

<template>
  <Card class="p-5">
    <div class="flex items-center gap-4">
      <Avatar :name="profile.name" :src="profile.avatar" />
      <div class="min-w-0 flex-1">
        <div class="flex items-center gap-2">
          <h2 class="truncate text-2xl font-black tracking-tight text-panda-ink">{{ profile.name }}</h2>
          <Badge tone="orange">{{ profile.title }}</Badge>
        </div>
        <p class="mt-1 text-sm font-medium text-muted-foreground">守护小熊猫的第 18 天</p>
      </div>
    </div>
    <Button class="mt-4 w-full" variant="secondary">编辑资料</Button>
  </Card>
</template>
