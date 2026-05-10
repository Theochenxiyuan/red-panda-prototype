<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { ImagePlus, PencilLine } from 'lucide-vue-next'

import Button from '@/components/ui/button/Button.vue'
import ImagePlaceholder from '@/components/ui/image-placeholder/ImagePlaceholder.vue'
import Input from '@/components/ui/input/Input.vue'
import Sheet from '@/components/ui/sheet/Sheet.vue'
import { useToast } from '@/composables/useToast'
import { boards } from '@/data/mock'
import type { BoardId } from '@/types/app'
import { cn } from '@/lib/utils'

const open = shallowRef(false)
const title = shallowRef('')
const body = shallowRef('')
const selectedBoard = shallowRef<Exclude<BoardId, 'home'>>('science')
const hasSpoiler = shallowRef(false)
const imageCount = shallowRef(0)
const { showToast } = useToast()

const postBoards = computed(() => boards.filter((board) => board.id !== 'home'))

function selectBoard(boardId: BoardId) {
  if (boardId !== 'home') {
    selectedBoard.value = boardId
  }
}

function addImagePlaceholder() {
  imageCount.value = Math.min(3, imageCount.value + 1)
}

function publishPrototypePost() {
  showToast('线框帖子已模拟发布')
  title.value = ''
  body.value = ''
  imageCount.value = 0
  hasSpoiler.value = false
}
</script>

<template>
  <Teleport to="#app-shell-overlay">
    <Button class="pointer-events-auto absolute bottom-[calc(6.5rem+env(safe-area-inset-bottom))] right-5 z-30 shadow-soft" size="icon" @click="open = true">
      <PencilLine class="size-5" />
    </Button>
  </Teleport>

  <Sheet v-model="open">
    <div class="space-y-4">
      <div>
        <p class="text-xs font-medium text-panda-leaf">发布到社区</p>
        <h2 class="text-xl font-bold text-panda-bark">写一篇新帖子</h2>
      </div>

      <div class="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          v-for="board in postBoards"
          :key="board.id"
          type="button"
          :class="cn('shrink-0 rounded-full px-3 py-2 text-xs font-medium', selectedBoard === board.id ? 'bg-panda-bark text-white' : 'bg-card text-muted-foreground')"
          @click="selectBoard(board.id)"
        >
          {{ board.label }}
        </button>
      </div>

      <Input v-model="title" placeholder="标题" />
      <textarea v-model="body" class="min-h-28 w-full rounded-[1.25rem] border bg-card p-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" placeholder="正文内容" />

      <button type="button" class="flex w-full items-center justify-between gap-3 rounded-[1.25rem] border bg-card p-4 text-sm" @click="hasSpoiler = !hasSpoiler">
        <span class="font-medium text-panda-bark">含剧透内容</span>
        <span class="rounded-full px-3 py-1 text-xs" :class="hasSpoiler ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'">
          {{ hasSpoiler ? '已开启' : '未开启' }}
        </span>
      </button>

      <button type="button" class="flex w-full items-center justify-center gap-2 rounded-[1.25rem] border border-dashed bg-card p-4 text-sm text-muted-foreground" @click="addImagePlaceholder">
        <ImagePlus class="size-4" />
        添加图片占位 {{ imageCount }}/3
      </button>

      <div v-if="imageCount > 0" class="grid grid-cols-3 gap-2">
        <ImagePlaceholder v-for="index in imageCount" :key="index" size="sm" :label="`图 ${index}`" />
      </div>

      <Button class="w-full" @click="publishPrototypePost">发布线框帖子</Button>
    </div>
  </Sheet>
</template>
