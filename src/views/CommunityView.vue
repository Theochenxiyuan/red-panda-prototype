<script setup lang="ts">
import { shallowRef } from 'vue';
import { Search } from 'lucide-vue-next';

import BoardTabs from '@/components/community/BoardTabs.vue';
import CommunityFeed from '@/components/community/CommunityFeed.vue';
import FloatingPostButton from '@/components/community/FloatingPostButton.vue';
import PageHeader from '@/components/layout/PageHeader.vue';
import Input from '@/components/ui/input/Input.vue';
import { boards, posts } from '@/data/mock';
import type { BoardId } from '@/types/app';

const activeBoard = shallowRef<BoardId>('home');
const searchQuery = shallowRef('');
</script>

<template>
  <PageHeader title="社区">
    <Input
      v-model="searchQuery"
      type="search"
      enterkeyhint="search"
      :icon="Search"
      placeholder="搜索标题、作者、板块"
    />
    <BoardTabs v-model="activeBoard" :boards="boards" />
  </PageHeader>

  <section class="px-5 pt-4">
    <CommunityFeed
      :posts="posts"
      :active-board="activeBoard"
      :search-query="searchQuery"
    />
  </section>

  <FloatingPostButton />
</template>
