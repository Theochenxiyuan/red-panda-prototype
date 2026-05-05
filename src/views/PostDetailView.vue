<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import { Flag, Heart, MessageCircle, Share2 } from 'lucide-vue-next';

import Avatar from '@/components/ui/avatar/Avatar.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import ImagePlaceholder from '@/components/ui/image-placeholder/ImagePlaceholder.vue';
import DetailHeader from '@/components/layout/DetailHeader.vue';
import SpoilerBlock from '@/components/community/SpoilerBlock.vue';
import CommentSection from '@/components/community/CommentSection.vue';
import type { CommentData } from '@/components/community/CommentSection.vue';
import { useToast } from '@/composables/useToast';
import { boards, posts } from '@/data/mock';

const props = defineProps<{
  id: string;
}>();

const router = useRouter();
const { showToast } = useToast();
const spoilerRevealed = shallowRef(false);
const comments = shallowRef<CommentData[]>([
  {
    id: 'c1',
    author: '竹叶汽水',
    title: '记忆收藏家',
    content: '这个解释很清楚，终于不会把它叫成小浣熊了。',
    createdAt: '8分钟前',
    likes: 12,
    liked: false,
    replies: [
      {
        id: 'r1',
        author: '栗子管理员',
        title: '管理员',
        content: '之后会把对比图同步到 Wiki。',
        createdAt: '5分钟前',
        likes: 3,
        liked: false,
      },
    ],
  },
  {
    id: 'c2',
    author: '半山风',
    title: '竹林画手',
    content: '建议 Wiki 也放一张对比图，画画参考会更方便。',
    createdAt: '18分钟前',
    likes: 7,
    liked: true,
    replies: [],
  },
]);

const post = computed(() => posts.find((item) => item.id === props.id));
const boardLabel = computed(
  () =>
    boards.find((board) => board.id === post.value?.boardId)?.label ?? '社区',
);
const shouldHidePostContent = computed(
  () => post.value?.isSpoiler && !spoilerRevealed.value,
);

function handleShare() {
  showToast('已模拟打开分享面板');
}

function handleReport() {
  showToast('已模拟提交反馈入口');
}
</script>

<template>
  <DetailHeader :title="post ? boardLabel : '社区'" @back="router.back()" />

  <div class="space-y-4 px-5 pt-4">
    <Card v-if="post" class="p-5">
      <div class="flex items-center gap-3">
        <Avatar :name="post.author.name" :src="post.author.avatar" />
        <div>
          <div class="flex items-center gap-2">
            <p class="text-sm font-semibold text-panda-bark">
              {{ post.author.name }}
            </p>
            <Badge tone="green">{{ post.author.title }}</Badge>
          </div>
          <p class="text-xs text-muted-foreground">{{ post.createdAt }}</p>
        </div>
      </div>

      <div class="mt-5 space-y-3">
        <Badge tone="orange">{{ boardLabel }}</Badge>
        <h1 class="text-2xl font-bold leading-tight text-panda-bark">
          {{ post.title }}
        </h1>
        <SpoilerBlock
          v-if="shouldHidePostContent"
          @reveal="spoilerRevealed = true"
        />
        <Transition name="fade">
          <p
            v-if="!shouldHidePostContent"
            class="text-sm leading-7 text-muted-foreground"
          >
            {{ post.body }}
          </p>
        </Transition>
      </div>

      <Transition name="fade">
        <div
          v-if="post.imageCount > 0 && !shouldHidePostContent"
          class="mt-5 grid gap-2"
          :class="post.imageCount === 1 ? 'grid-cols-1' : 'grid-cols-2'"
        >
          <ImagePlaceholder
            v-for="index in post.imageCount"
            :key="index"
            size="lg"
            :label="`图片 ${index}`"
          />
        </div>
      </Transition>

      <div
        class="mt-5 flex items-center gap-3 border-t pt-4 text-sm text-muted-foreground"
      >
        <button
          type="button"
          class="flex items-center gap-1.5 transition active:scale-95"
        >
          <MessageCircle class="size-4" />
          <span>{{ post.comments }}</span>
        </button>
        <button
          type="button"
          class="flex items-center gap-1.5 transition active:scale-95"
        >
          <Heart class="size-4" />
          <span>{{ post.likes }}</span>
        </button>
        <button
          type="button"
          class="ml-auto flex items-center gap-1.5 transition active:scale-95"
          @click="handleShare"
        >
          <Share2 class="size-4" />
          <span>分享</span>
        </button>
        <button
          type="button"
          class="flex items-center gap-1.5 transition active:scale-95"
          @click="handleReport"
        >
          <Flag class="size-4" />
          <span>反馈</span>
        </button>
      </div>
    </Card>

    <Card v-if="post" class="p-5">
      <CommentSection
        :comments="comments"
        @update:comments="comments = $event"
      />
    </Card>

    <Card v-else class="p-8 text-center text-sm text-muted-foreground"
      >帖子不存在</Card
    >
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
