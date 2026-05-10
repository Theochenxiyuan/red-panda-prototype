<script setup lang="ts">
import { shallowRef, watch } from 'vue';
import { ImagePlus, Send, X } from 'lucide-vue-next';

import Button from '@/components/ui/button/Button.vue';
import Sheet from '@/components/ui/sheet/Sheet.vue';

const commentText = defineModel<string>({ required: true });

const props = defineProps<{
  replyingTo: string | null;
}>();

const emit = defineEmits<{
  submit: [];
  cancelReply: [];
}>();

const drawerOpen = shallowRef(false);
const textareaRef = shallowRef<HTMLTextAreaElement | null>(null);

function openDrawer() {
  drawerOpen.value = true;
}

function focusTextarea() {
  textareaRef.value?.focus({ preventScroll: true });
}

function handleSubmit() {
  drawerOpen.value = false;
  emit('submit');
}

watch(
  () => props.replyingTo,
  (val) => {
    if (val) openDrawer();
  },
);
</script>

<template>
  <div>
    <button
      type="button"
      class="flex w-full items-center gap-2 rounded-2xl border bg-card px-4 py-2.5 text-sm text-muted-foreground transition active:scale-[0.98]"
      @click="openDrawer"
    >
      <span v-if="replyingTo" class="text-panda-leaf"
        >回复 {{ replyingTo }}</span
      >
      <span v-else>写下你的评论…</span>
    </button>

    <Sheet v-model="drawerOpen" @after-enter="focusTextarea">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-bold text-panda-bark">
          {{ replyingTo ? `回复 ${replyingTo}` : '写评论' }}
        </h3>
        <div class="flex items-center gap-1.5">
          <button
            v-if="replyingTo"
            type="button"
            class="rounded-full px-2.5 py-1 text-xs font-medium text-panda-leaf transition hover:bg-panda-cream active:scale-95"
            @click="$emit('cancelReply')"
          >
            取消回复
          </button>
          <button
            type="button"
            class="rounded-full p-1 text-muted-foreground transition active:scale-90"
            @click="drawerOpen = false"
          >
            <X class="size-5" />
          </button>
        </div>
      </div>

      <textarea
        ref="textareaRef"
        :value="commentText"
        class="mt-3 min-h-[6rem] w-full resize-none rounded-2xl border bg-card p-3 text-sm leading-6 outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
        placeholder="写下你的评论…"
        @input="commentText = ($event.target as HTMLTextAreaElement).value"
      />

      <div class="mt-3 flex items-center justify-between">
        <button
          type="button"
          class="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted active:scale-95"
        >
          <ImagePlus class="size-5" />
          图片
        </button>
        <Button size="sm" :disabled="!commentText.trim()" @click="handleSubmit">
          <Send class="size-3.5" />
          {{ replyingTo ? '回复' : '发布' }}
        </Button>
      </div>
    </Sheet>
  </div>
</template>
