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
    <Card class="overflow-hidden p-3">
      <div class="relative overflow-hidden rounded-[1.6rem] bg-panda-fern p-5 text-white">
        <img
          src="/images/content/red-panda-forest-bamboo.png"
          alt="竹林中的小熊猫"
          class="absolute inset-0 size-full object-cover opacity-45 mix-blend-luminosity"
        />
        <div class="absolute inset-0 bg-gradient-to-br from-panda-fern via-panda-leaf/75 to-panda-rust/60" />
        <div class="relative">
          <p class="text-xs font-black uppercase tracking-[0.22em] text-white/75">今日推荐</p>
          <h2 class="mt-2 text-2xl font-black leading-tight tracking-tight">从一片竹林开始认识小熊猫</h2>
          <p class="mt-2 text-sm font-medium leading-6 text-white/85">
          阅读官方科普，理解栖息地、保护行动和常见误区。
          </p>
        </div>
      </div>
    </Card>

    <WikiArticleList
      :articles="wikiArticles"
      :active-category="activeCategory"
      :search-query="wikiSearchQuery"
    />
  </div>
</template>
