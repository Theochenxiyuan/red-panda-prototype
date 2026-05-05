<script setup lang="ts">
import { useRouter } from 'vue-router'

import PageHeader from '@/components/layout/PageHeader.vue'
import GameProgressCard from '@/components/profile/GameProgressCard.vue'
import ProfileHeader from '@/components/profile/ProfileHeader.vue'
import ProfileMenu from '@/components/profile/ProfileMenu.vue'
import SocialStats from '@/components/profile/SocialStats.vue'
import { gameProgress, profileMenuItems, userProfile } from '@/data/mock'
import type { MenuItem } from '@/types/app'

const router = useRouter()

function selectMenuItem(item: MenuItem) {
  if (item.to) {
    router.push(item.to)
  }
}
</script>

<template>
  <PageHeader title="我的" />

  <div class="space-y-4 px-5 pt-4">
    <ProfileHeader :profile="userProfile" />
    <SocialStats :followers="userProfile.followers" :following="userProfile.following" />
    <GameProgressCard :progress="gameProgress" />
    <ProfileMenu :items="profileMenuItems" @select="selectMenuItem" />
  </div>
</template>
