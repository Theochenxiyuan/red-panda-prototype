<script setup lang="ts">
import { computed, onUnmounted, shallowRef, watch } from 'vue';
import {
  Flag,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
} from 'lucide-vue-next';

import { boards } from '@/data/mock';
import Avatar from '@/components/ui/avatar/Avatar.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Card from '@/components/ui/card/Card.vue';
import ImagePlaceholder from '@/components/ui/image-placeholder/ImagePlaceholder.vue';
import SpoilerBlock from '@/components/community/SpoilerBlock.vue';
import { useToast } from '@/composables/useToast';
import type { Post } from '@/types/app';

const props = defineProps<{
  post: Post;
  showBoardTag: boolean;
}>();

defineEmits<{
  open: [id: string];
}>();

const spoilerRevealed = shallowRef(false);
const moreMenuOpen = shallowRef(false);
const moreMenuRef = shallowRef<HTMLDivElement | null>(null);
const { showToast } = useToast();

function onDocumentClick(e: MouseEvent) {
  if (moreMenuRef.value && !moreMenuRef.value.contains(e.target as Node)) {
    moreMenuOpen.value = false;
  }
}

watch(moreMenuOpen, (open) => {
  if (open) {
    document.addEventListener('click', onDocumentClick);
  } else {
    document.removeEventListener('click', onDocumentClick);
  }
});

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick);
});

const boardLabel = computed(
  () =>
    boards.find((board) => board.id === props.post.boardId)?.label ?? '社区',
);
const shouldHidePreview = computed(
  () => props.post.isSpoiler && !spoilerRevealed.value,
);

function toggleMoreMenu() {
  moreMenuOpen.value = !moreMenuOpen.value;
}

function chooseMoreAction(action: 'share' | 'report') {
  showToast(action === 'share' ? '已模拟打开分享面板' : '已模拟提交反馈入口');
  moreMenuOpen.value = false;
}
</script>

<template>
  <Card class="relative p-4">
    <button
      type="button"
      class="w-full text-left"
      @click="$emit('open', post.id)"
    >
      <div class="flex items-center gap-3">
        <Avatar :name="post.author.name" :src="post.author.avatar" />
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <p class="truncate text-sm font-semibold text-panda-bark">
              {{ post.author.name }}
            </p>
            <Badge tone="green">{{ post.author.title }}</Badge>
          </div>
          <p class="text-xs text-muted-foreground">{{ post.createdAt }}</p>
        </div>
      </div>

      <div class="mt-4">
        <h2 class="text-base font-bold leading-snug text-panda-bark">
          {{ post.title }}
        </h2>
      </div>
    </button>

    <div class="mt-3">
      <SpoilerBlock v-if="shouldHidePreview" @reveal="spoilerRevealed = true" />
      <Transition name="fade">
        <button
          v-if="!shouldHidePreview"
          type="button"
          class="w-full text-left"
          @click="$emit('open', post.id)"
        >
          <p class="text-sm leading-6 text-muted-foreground">
            {{ post.excerpt }}
          </p>
        </button>
      </Transition>
    </div>

    <Transition name="fade">
      <div
        v-if="post.imageCount > 0 && !shouldHidePreview"
        class="mt-4 grid gap-2"
        :class="post.imageCount === 1 ? 'grid-cols-1' : 'grid-cols-3'"
      >
        <ImagePlaceholder
          v-for="index in post.imageCount"
          :key="index"
          size="md"
          :label="`图片 ${index}`"
        />
      </div>
    </Transition>

    <div
      class="mt-4 flex items-center gap-3 border-t pt-3 text-sm text-muted-foreground"
    >
      <div class="min-w-0 flex-1">
        <Badge v-if="showBoardTag" tone="orange">{{ boardLabel }}</Badge>
      </div>
      <div class="flex shrink-0 items-center justify-end gap-4">
        <button type="button" class="flex items-center gap-1.5">
          <MessageCircle class="size-4" />
          <span>{{ post.comments }}</span>
        </button>
        <button type="button" class="flex items-center gap-1.5">
          <Heart class="size-4" />
          <span>{{ post.likes }}</span>
        </button>
        <div class="relative">
          <button
            type="button"
            class="flex items-center gap-1.5"
            @click="toggleMoreMenu"
          >
            <MoreHorizontal class="size-4" />
            <span>更多</span>
          </button>

          <div
            v-if="moreMenuOpen"
            ref="moreMenuRef"
            class="absolute bottom-7 right-0 z-20 w-36 overflow-hidden rounded-2xl border bg-card p-1.5 text-sm shadow-soft"
          >
            <button
              type="button"
              class="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left font-medium text-panda-bark hover:bg-muted"
              @click="chooseMoreAction('share')"
            >
              <Share2 class="size-4" />
              分享
            </button>
            <button
              type="button"
              class="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left font-medium text-panda-rust hover:bg-orange-50"
              @click="chooseMoreAction('report')"
            >
              <Flag class="size-4" />
              反馈/举报
            </button>
          </div>
        </div>
      </div>
    </div>
  </Card>
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
