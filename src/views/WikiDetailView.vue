<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import { Bookmark } from 'lucide-vue-next';

import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import DetailHeader from '@/components/layout/DetailHeader.vue';
import { wikiArticles } from '@/data/mock';

const props = defineProps<{
  id: string;
}>();

const router = useRouter();
const article = computed(() =>
  wikiArticles.find((item) => item.id === props.id),
);
const saved = shallowRef(article.value?.saved ?? false);
</script>

<template>
  <DetailHeader title="Wiki 详情" @back="router.back()" />

  <div class="space-y-4 px-5 pt-4">
    <Card v-if="article" class="p-5">
      <div class="mb-4 flex flex-wrap gap-2">
        <Badge
          v-for="tag in article.tags"
          :key="tag"
          :tone="tag === '官方' ? 'green' : 'neutral'"
          >{{ tag }}</Badge
        >
      </div>
      <h1 class="text-3xl font-black leading-tight tracking-tight text-panda-ink">
        {{ article.title }}
      </h1>
      <p class="mt-2 text-xs text-muted-foreground">
        预计 {{ article.readTime }}阅读 · 官方维护
      </p>

      <div class="my-5">
        <img
          v-if="article.image"
          :src="article.image"
          alt="Wiki 配图"
          class="film-image h-48 w-full rounded-[1.65rem] object-cover"
        />
        <div v-else class="grid h-36 w-full place-items-center rounded-3xl border border-dashed border-orange-200 bg-gradient-to-br from-orange-100 via-amber-50 to-stone-100 text-panda-rust">
          <div class="flex flex-col items-center gap-1 text-xs font-medium">
            <span>暂无配图</span>
          </div>
        </div>
      </div>

      <div class="space-y-4 text-sm font-medium leading-7 text-muted-foreground">
        <p v-for="paragraph in article.body" :key="paragraph">
          {{ paragraph }}
        </p>
      </div>

      <Button class="mt-6 w-full" variant="secondary" @click="saved = !saved">
        <Bookmark class="size-4" />
        {{ saved ? '已收藏' : '收藏文章' }}
      </Button>
    </Card>

    <Card v-else class="p-8 text-center text-sm text-muted-foreground"
      >文章不存在</Card
    >
  </div>
</template>
