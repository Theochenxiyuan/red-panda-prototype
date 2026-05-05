<script setup lang="ts">
import { EyeOff } from 'lucide-vue-next';

import Button from '@/components/ui/button/Button.vue';

withDefaults(
  defineProps<{
    title?: string;
  }>(),
  { title: '内容包含剧透' },
);

defineEmits<{
  reveal: [];
}>();
</script>

<template>
  <div
    class="rounded-2xl border border-dashed border-orange-200 bg-orange-50/80 p-4 text-center"
  >
    <EyeOff class="mx-auto mb-2 size-5 text-panda-rust" />
    <p class="text-sm font-semibold text-panda-bark">{{ title }}</p>
    <p class="mt-1 text-xs text-muted-foreground">
      可能涉及未解锁章节或成就线索。
    </p>
    <Button class="mt-3" variant="secondary" size="sm" @click="$emit('reveal')"
      >查看预览</Button
    >
  </div>
</template>
