<script setup lang="ts">
import { Leaf, Play } from 'lucide-vue-next';

import PageHeader from '@/components/layout/PageHeader.vue';
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import Progress from '@/components/ui/progress/Progress.vue';
import { useToast } from '@/composables/useToast';
import { gameProgress } from '@/data/mock';

const { showToast } = useToast();
</script>

<template>
  <PageHeader title="开始游戏" />

  <div class="space-y-4 px-5 pt-4">
    <section
      class="overflow-hidden rounded-[2rem] bg-gradient-to-br from-panda-rust via-panda-orange to-amber-300 p-6 text-white shadow-soft"
    >
      <div
        class="grid size-16 place-items-center overflow-hidden rounded-3xl bg-white/20 backdrop-blur"
      >
        <img src="/game-logo.png" alt="游戏" class="size-full object-cover" />
      </div>
      <h1 class="mt-6 text-3xl font-bold leading-tight">进入小熊猫之家</h1>
      <p class="mt-3 text-sm leading-6 text-white/85">继续上次进度。</p>
      <Button
        variant="cream"
        class="mt-6 w-full border border-white/60 shadow-sm"
        @click="showToast('已模拟进入游戏启动流程')"
      >
        <Play class="size-4 fill-current" />
        继续游戏
      </Button>
    </section>

    <Card class="p-5">
      <div class="flex items-center gap-3">
        <div
          class="grid size-11 place-items-center rounded-2xl bg-green-100 text-panda-leaf"
        >
          <Leaf class="size-5" />
        </div>
        <div>
          <p class="text-sm font-semibold text-panda-bark">
            当前亲密度 Lv.{{ gameProgress.intimacyLevel }}
          </p>
          <p class="text-xs text-muted-foreground">前 3 章已开放</p>
        </div>
      </div>

      <div class="mt-4 space-y-2">
        <div
          class="flex items-center justify-between text-xs text-muted-foreground"
        >
          <span>成就进度</span>
          <span
            >{{ gameProgress.achievementsUnlocked }}/{{
              gameProgress.achievementsTotal
            }}</span
          >
        </div>
        <Progress
          :value="gameProgress.achievementsUnlocked"
          :max="gameProgress.achievementsTotal"
        />
      </div>

      <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div class="rounded-2xl bg-muted p-4">
          <p class="text-2xl font-bold text-panda-bark">
            {{ gameProgress.memoriesUnlocked }}
          </p>
          <p class="text-muted-foreground">记忆碎片</p>
        </div>
        <div class="rounded-2xl bg-muted p-4">
          <p class="text-2xl font-bold text-panda-bark">
            {{ gameProgress.decorationCount }}
          </p>
          <p class="text-muted-foreground">小屋装饰</p>
        </div>
      </div>
    </Card>
  </div>
</template>
