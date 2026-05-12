<script setup lang="ts">
import { shallowRef, computed } from 'vue';

import CommentInput from '@/components/community/CommentInput.vue';
import CommentItem from '@/components/community/CommentItem.vue';
import { useToast } from '@/composables/useToast';

interface ReplyItem {
  id: string;
  author: string;
  title: string;
  avatar?: string;
  content: string;
  createdAt: string;
  likes: number;
  liked: boolean;
}

export interface CommentData {
  id: string;
  author: string;
  title: string;
  avatar?: string;
  content: string;
  createdAt: string;
  likes: number;
  liked: boolean;
  replies: ReplyItem[];
}

const props = defineProps<{
  comments: CommentData[];
}>();

const emit = defineEmits<{
  'update:comments': [value: CommentData[]];
}>();

const { showToast } = useToast();
const commentText = shallowRef('');
const replyingToId = shallowRef<string | null>(null);
const currentUserAvatar = '/images/avatars/theo.png';

const replyingToAuthor = computed(() => {
  if (!replyingToId.value) return null;
  for (const c of props.comments) {
    if (c.id === replyingToId.value) return c.author;
    const reply = c.replies.find((r) => r.id === replyingToId.value);
    if (reply) return reply.author;
  }
  return null;
});

function toggleLike(targetId: string) {
  emit(
    'update:comments',
    props.comments.map((c) => {
      if (c.id === targetId) {
        return {
          ...c,
          liked: !c.liked,
          likes: c.liked ? c.likes - 1 : c.likes + 1,
        };
      }
      const replyIdx = c.replies.findIndex((r) => r.id === targetId);
      if (replyIdx !== -1) {
        const reply = c.replies[replyIdx];
        const nextReplies = [...c.replies];
        nextReplies[replyIdx] = {
          ...reply,
          liked: !reply.liked,
          likes: reply.liked ? reply.likes - 1 : reply.likes + 1,
        };
        return { ...c, replies: nextReplies };
      }
      return c;
    }),
  );
}

function startReply(commentId: string) {
  replyingToId.value = commentId;
}

function cancelReply() {
  replyingToId.value = null;
}

function submitComment() {
  const content = commentText.value.trim();
  if (!content) {
    showToast('先写点评论内容', 'neutral');
    return;
  }

  const newReply: ReplyItem = {
    id: `r-${Date.now()}`,
    author: 'Theo',
    title: '竹林守护者',
    avatar: currentUserAvatar,
    content,
    createdAt: '刚刚',
    likes: 0,
    liked: false,
  };

  if (replyingToId.value) {
    emit(
      'update:comments',
      props.comments.map((c) => {
        if (c.id === replyingToId.value) {
          return { ...c, replies: [...c.replies, newReply] };
        }
        const replyIdx = c.replies.findIndex(
          (r) => r.id === replyingToId.value,
        );
        if (replyIdx !== -1) {
          const nextReplies = [...c.replies];
          nextReplies.push(newReply);
          return { ...c, replies: nextReplies };
        }
        return c;
      }),
    );
    showToast('回复已添加');
  } else {
    emit('update:comments', [
      {
        id: `c-${Date.now()}`,
        author: 'Theo',
        title: '竹林守护者',
        avatar: currentUserAvatar,
        content,
        createdAt: '刚刚',
        likes: 0,
        liked: false,
        replies: [],
      },
      ...props.comments,
    ]);
    showToast('评论已发布');
  }

  commentText.value = '';
  replyingToId.value = null;
}

function reportComment() {
  showToast('已模拟打开评论反馈入口', 'neutral');
}
</script>

<template>
  <section>
    <div class="flex items-center justify-between px-1">
      <h2 class="text-base font-bold text-panda-bark">评论</h2>
      <span class="text-xs text-muted-foreground"
        >{{ comments.length }} 条</span
      >
    </div>

    <div class="mt-3">
      <CommentInput
        v-model="commentText"
        :replying-to="replyingToAuthor"
        @submit="submitComment"
        @cancel-reply="cancelReply"
      />
    </div>

    <div class="mt-2 divide-y">
      <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        v-bind="comment"
        @toggle-like="toggleLike"
        @reply="startReply"
        @report="reportComment"
      />
    </div>
  </section>
</template>
