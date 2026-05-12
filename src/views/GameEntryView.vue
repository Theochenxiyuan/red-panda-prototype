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
      class="relative overflow-hidden rounded-[2.25rem] bg-panda-ink p-6 text-white shadow-lifted"
    >
      <img
        src="/images/content/memory-bridge-fragment.png"
        alt="森林探险游戏场景"
        class="absolute inset-0 size-full object-cover opacity-50"
      />
      <div class="absolute inset-0 bg-gradient-to-br from-panda-ink via-panda-rust/75 to-panda-orange/55" />
      <div class="relative">
      <div
        class="grid size-16 place-items-center overflow-hidden rounded-3xl border border-white/45 bg-white/20 backdrop-blur"
      >
        <img src="/game-logo.png" alt="游戏" class="size-full object-cover" />
      </div>
      <p class="mt-6 text-xs font-black uppercase tracking-[0.28em] text-white/70">Memory Forest</p>
      <h1 class="mt-2 text-4xl font-black leading-none tracking-tight">进入 Red Panda's Home</h1>
      <p class="mt-3 text-sm font-medium leading-6 text-white/85">沿着旧木桥和竹影，继续上次的记忆收集。</p>
      <Button
        variant="cream"
        class="mt-6 w-full border border-white/60 shadow-sm"
        @click="showToast('已模拟进入游戏启动流程')"
      >
        <Play class="size-4 fill-current" />
        继续游戏
      </Button>
      </div>
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
        <div class="rounded-2xl bg-white/55 p-4 shadow-[inset_0_0_0_1px_rgba(79,53,40,0.06)]">
          <p class="text-2xl font-bold text-panda-bark">
            {{ gameProgress.memoriesUnlocked }}
          </p>
          <p class="text-muted-foreground">记忆碎片</p>
        </div>
        <div class="rounded-2xl bg-white/55 p-4 shadow-[inset_0_0_0_1px_rgba(79,53,40,0.06)]">
          <p class="text-2xl font-bold text-panda-bark">
            {{ gameProgress.decorationCount }}
          </p>
          <p class="text-muted-foreground">小屋装饰</p>
        </div>
      </div>
    </Card>
  </div>
</template>
