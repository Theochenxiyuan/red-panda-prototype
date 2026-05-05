<script setup lang="ts">
import { shallowRef } from 'vue';
import { Search } from 'lucide-vue-next';

import PageHeader from '@/components/layout/PageHeader.vue';
import Card from '@/components/ui/card/Card.vue';
import Input from '@/components/ui/input/Input.vue';
import WikiArticleList from '@/components/wiki/WikiArticleList.vue';
import WikiCategoryStrip from '@/components/wiki/WikiCategoryStrip.vue';
import { wikiArticles, wikiCategories } from '@/data/mock';

const activeCategory = shallowRef(wikiCategories[0]?.id ?? 'species');
const wikiSearchQuery = shallowRef('');
</script>

<template>
  <PageHeader title="小熊猫 Wiki">
    <Input
      v-model="wikiSearchQuery"
      type="search"
      enterkeyhint="search"
      :icon="Search"
      placeholder="搜索 Wiki 文章"
    />
    <WikiCategoryStrip v-model="activeCategory" :categories="wikiCategories" />
  </PageHeader>

  <div class="space-y-4 px-5 pt-4">
    <Card class="overflow-hidden p-5">
      <div
        class="rounded-[1.5rem] bg-gradient-to-br from-panda-leaf to-panda-moss p-5 text-white"
      >
        <p class="text-xs font-medium opacity-80">今日推荐</p>
        <h2 class="mt-2 text-xl font-bold">从一片竹林开始认识小熊猫</h2>
        <p class="mt-2 text-sm leading-6 text-white/80">
          阅读官方科普，理解栖息地、保护行动和常见误区。
        </p>
      </div>
    </Card>

    <WikiArticleList
      :articles="wikiArticles"
      :active-category="activeCategory"
      :search-query="wikiSearchQuery"
    />
  </div>
</template>
