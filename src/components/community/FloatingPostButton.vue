<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { ImagePlus, PencilLine } from 'lucide-vue-next'

import Button from '@/components/ui/button/Button.vue'
import ImagePlaceholder from '@/components/ui/image-placeholder/ImagePlaceholder.vue'
import Input from '@/components/ui/input/Input.vue'
import Sheet from '@/components/ui/sheet/Sheet.vue'
import { useToast } from '@/composables/useToast'
import { boards } from '@/data/mock'
import type { BoardId, PostDraft } from '@/types/app'
import { cn } from '@/lib/utils'

const emit = defineEmits<{
  publish: [draft: PostDraft]
}>()

const open = shallowRef(false)
const title = shallowRef('')
const body = shallowRef('')
const selectedBoard = shallowRef<Exclude<BoardId, 'home'>>('science')
const hasSpoiler = shallowRef(false)
const imageCount = shallowRef(0)
const { showToast } = useToast()

const postBoards = computed(() => boards.filter((board) => board.id !== 'home'))
const canPublish = computed(() => title.value.trim().length > 0)

function selectBoard(boardId: BoardId) {
  if (boardId !== 'home') {
    selectedBoard.value = boardId
  }
}

function addImagePlaceholder() {
  imageCount.value = Math.min(3, imageCount.value + 1)
}

function publishPost() {
  emit('publish', {
    boardId: selectedBoard.value,
    title: title.value.trim(),
    body: body.value.trim(),
    isSpoiler: hasSpoiler.value,
    imageSlots: imageCount.value,
  })
  open.value = false
  title.value = ''
  body.value = ''
  imageCount.value = 0
  hasSpoiler.value = false
  showToast('帖子已发布')
}
</script>

<template>
  <Teleport to="#app-shell-overlay">
    <Button class="pointer-events-auto absolute bottom-[calc(7.25rem+env(safe-area-inset-bottom))] right-6 z-30 size-12 shadow-lifted" size="icon" @click="open = true">
      <PencilLine class="size-5" />
    </Button>
  </Teleport>

  <Sheet v-model="open">
    <div class="space-y-4">
      <div>
        <p class="text-xs font-black uppercase tracking-[0.22em] text-panda-leaf">发布到社区</p>
        <h2 class="text-2xl font-black tracking-tight text-panda-ink">写一篇新帖子</h2>
      </div>

      <div class="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          v-for="board in postBoards"
          :key="board.id"
          type="button"
          :class="cn('shrink-0 rounded-full px-3 py-2 text-xs font-black transition active:scale-95', selectedBoard === board.id ? 'bg-panda-ink text-panda-parchment shadow-[0_10px_22px_rgba(47,32,24,0.18)]' : 'border border-white/60 bg-white/60 text-muted-foreground')"
          @click="selectBoard(board.id)"
        >
          {{ board.label }}
        </button>
      </div>

      <Input v-model="title" placeholder="标题" />
      <textarea v-model="body" class="min-h-28 w-full rounded-[1.25rem] border border-white/70 bg-white/70 p-4 text-sm font-medium outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.86),0_10px_24px_rgba(79,53,40,0.06)] placeholder:text-muted-foreground focus:border-primary/45 focus:bg-white focus:ring-4 focus:ring-primary/10" placeholder="正文内容" />

      <button type="button" class="flex w-full items-center justify-between gap-3 rounded-[1.25rem] border border-white/60 bg-white/60 p-4 text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]" @click="hasSpoiler = !hasSpoiler">
        <span class="font-black text-panda-ink">含剧透内容</span>
        <span class="rounded-full px-3 py-1 text-xs" :class="hasSpoiler ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'">
          {{ hasSpoiler ? '已开启' : '未开启' }}
        </span>
      </button>

      <button type="button" class="flex w-full items-center justify-center gap-2 rounded-[1.25rem] border border-dashed border-panda-rust/30 bg-white/50 p-4 text-sm font-bold text-muted-foreground" @click="addImagePlaceholder">
        <ImagePlus class="size-4" />
        添加图片占位 {{ imageCount }}/3
      </button>

      <div v-if="imageCount > 0" class="grid grid-cols-3 gap-2">
        <ImagePlaceholder v-for="index in imageCount" :key="index" size="sm" :label="`图 ${index}`" />
      </div>

      <Button class="w-full" :disabled="!canPublish" @click="publishPost">发布</Button>
    </div>
  </Sheet>
</template>
