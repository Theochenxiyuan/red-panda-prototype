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
import { useToast } from '@/composables/useToast';
import { usePosts } from '@/composables/usePosts';
import { boards } from '@/data/mock';

const props = defineProps<{
  id: string;
}>();

const router = useRouter();
const { showToast } = useToast();
const { findPost, commentsForPost, setPostComments } = usePosts();
const spoilerRevealed = shallowRef(false);

const post = computed(() => findPost(props.id));
const comments = computed(() => commentsForPost(props.id));
const boardLabel = computed(
  () =>
    boards.find((board) => board.id === post.value?.boardId)?.label ?? '社区',
);
const shouldHidePostContent = computed(
  () => post.value?.isSpoiler && !spoilerRevealed.value,
);
const mediaCount = computed(
  () => (post.value?.images.length ?? 0) + (post.value?.imageSlots ?? 0),
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
        <h1 class="text-3xl font-black leading-tight tracking-tight text-panda-ink">
          {{ post.title }}
        </h1>
        <SpoilerBlock
          v-if="shouldHidePostContent"
          @reveal="spoilerRevealed = true"
        />
        <Transition name="fade">
          <p
            v-if="!shouldHidePostContent && post.body"
            class="text-sm font-medium leading-7 text-muted-foreground"
          >
            {{ post.body }}
          </p>
        </Transition>
      </div>

      <Transition name="fade">
        <div
          v-if="mediaCount > 0 && !shouldHidePostContent"
          class="mt-5 grid gap-2"
          :class="mediaCount === 1 ? 'grid-cols-1' : 'grid-cols-2'"
        >
          <img
            v-for="(src, index) in post.images"
            :key="src"
            :src="src"
            :alt="`图片 ${index + 1}`"
            class="film-image h-40 w-full rounded-[1.35rem] object-cover"
          />
          <ImagePlaceholder
            v-for="index in (post.imageSlots ?? 0)"
            :key="`slot-${index}`"
            :size="mediaCount === 1 ? 'lg' : 'md'"
            :label="`图 ${index}`"
          />
        </div>
      </Transition>

      <div
        class="mt-5 flex items-center gap-3 border-t border-panda-bark/10 pt-4 text-sm font-semibold text-muted-foreground"
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
        :key="post.id"
        :comments="comments"
        @update:comments="setPostComments(post.id, $event)"
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
