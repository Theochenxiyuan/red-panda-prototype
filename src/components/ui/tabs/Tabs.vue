<script setup lang="ts">
import { nextTick, shallowRef, watch } from 'vue'

import { cn } from '@/lib/utils'

const model = defineModel<string>({ required: true })

defineProps<{
  items: Array<{ id: string; label: string; badge?: number }>
}>()

const scroller = shallowRef<HTMLDivElement | null>(null)
const tabElements = new Map<string, HTMLButtonElement>()

function setTabRef(id: string, element: Element | null) {
  if (element instanceof HTMLButtonElement) {
    tabElements.set(id, element)
  } else {
    tabElements.delete(id)
  }
}

function scrollActiveTabIntoView() {
  const container = scroller.value
  const activeTab = tabElements.get(model.value)

  if (!container || !activeTab) {
    return
  }

  const targetLeft = activeTab.offsetLeft - (container.clientWidth - activeTab.clientWidth) / 2

  container.scrollTo({
    left: Math.max(0, targetLeft),
    behavior: 'smooth',
  })
}

watch(
  model,
  async () => {
    await nextTick()
    scrollActiveTabIntoView()
  },
  { immediate: true, flush: 'post' },
)
</script>

<template>
  <div ref="scroller" class="flex gap-2 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
    <button
      v-for="item in items"
      :key="item.id"
      :ref="(element) => setTabRef(item.id, element as Element | null)"
      type="button"
      :class="
        cn(
          'flex shrink-0 items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition',
          model === item.id ? 'bg-panda-bark text-white shadow-sm' : 'bg-card text-muted-foreground',
        )
      "
      @click="model = item.id"
    >
      <span>{{ item.label }}</span>
      <span v-if="item.badge" class="rounded-full bg-primary px-1.5 text-[10px] text-primary-foreground">{{ item.badge }}</span>
    </button>
  </div>
</template>
