import { computed, shallowRef } from 'vue'

import { postComments } from '@/data/comments'
import { posts as seedPosts, userProfile } from '@/data/mock'
import type { CommentData, Post, PostDraft } from '@/types/app'

const createdPosts = shallowRef<Post[]>([])
const commentChanges = shallowRef<Record<string, CommentData[]>>({})

export function usePosts() {
  const posts = computed(() =>
    [...createdPosts.value, ...seedPosts].map((post) => ({
      ...post,
      comments: (commentChanges.value[post.id] ?? postComments[post.id] ?? []).length,
    })),
  )

  function findPost(id: string) {
    return posts.value.find((post) => post.id === id)
  }

  function commentsForPost(id: string) {
    return commentChanges.value[id] ?? postComments[id] ?? []
  }

  function setPostComments(id: string, comments: CommentData[]) {
    commentChanges.value = { ...commentChanges.value, [id]: comments }
  }

  function createPost(draft: PostDraft) {
    const post: Post = {
      id: `post-local-${createdPosts.value.length + 1}`,
      boardId: draft.boardId,
      title: draft.title,
      excerpt: draft.body.length > 48 ? `${draft.body.slice(0, 48)}…` : draft.body,
      body: draft.body,
      author: {
        id: 'me',
        name: userProfile.name,
        title: userProfile.title,
        avatar: userProfile.avatar,
      },
      createdAt: '刚刚',
      isSpoiler: draft.isSpoiler,
      images: [],
      imageSlots: draft.imageSlots,
      comments: 0,
      likes: 0,
    }

    createdPosts.value = [post, ...createdPosts.value]

    return post
  }

  return { posts, findPost, createPost, commentsForPost, setPostComments }
}
