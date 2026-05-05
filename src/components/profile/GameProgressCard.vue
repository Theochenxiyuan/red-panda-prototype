<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Gamepad2, Trophy } from 'lucide-vue-next';

import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import Progress from '@/components/ui/progress/Progress.vue';
import type { GameProgress } from '@/types/app';

defineProps<{
  progress: GameProgress;
}>();

const router = useRouter();
</script>

<template>
  <Card class="p-5">
    <div class="flex items-center justify-between gap-3">
      <div>
        <p class="text-xs font-medium text-panda-leaf">游戏进度</p>
        <h2 class="text-lg font-bold text-panda-bark">
          亲密度 Lv.{{ progress.intimacyLevel }}
        </h2>
      </div>
      <div
        class="grid size-12 place-items-center rounded-2xl bg-orange-100 text-panda-rust"
      >
        <Trophy class="size-6" />
      </div>
    </div>

    <div class="mt-4 space-y-2">
      <div
        class="flex items-center justify-between text-xs text-muted-foreground"
      >
        <span>成就解锁</span>
        <span
          >{{ progress.achievementsUnlocked }}/{{
            progress.achievementsTotal
          }}</span
        >
      </div>
      <Progress
        :value="progress.achievementsUnlocked"
        :max="progress.achievementsTotal"
      />
    </div>

    <div
      class="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground"
    >
      <div class="rounded-2xl bg-muted p-3">
        <p class="text-base font-bold text-panda-bark">
          {{ progress.memoriesUnlocked }}
        </p>
        <p>记忆碎片</p>
      </div>
      <div class="rounded-2xl bg-muted p-3">
        <p class="text-base font-bold text-panda-bark">
          {{ progress.chaptersUnlocked }}
        </p>
        <p>章节</p>
      </div>
      <div class="rounded-2xl bg-muted p-3">
        <p class="text-base font-bold text-panda-bark">
          {{ progress.decorationCount }}
        </p>
        <p>装饰</p>
      </div>
    </div>

    <div class="mt-4 grid grid-cols-2 gap-2">
      <Button variant="secondary" @click="router.push('/profile/achievements')"
        >查看成就</Button
      >
      <Button @click="router.push('/game')">
        <Gamepad2 class="size-4" />
        开始游戏
      </Button>
    </div>
  </Card>
</template>
