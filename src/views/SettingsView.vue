<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
  Bell,
  Cloud,
  Database,
  EyeOff,
  Mail,
  ShieldCheck,
  Smartphone,
  Trash2,
  UserRound,
} from 'lucide-vue-next';

import Avatar from '@/components/ui/avatar/Avatar.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import DetailHeader from '@/components/layout/DetailHeader.vue';
import Card from '@/components/ui/card/Card.vue';
import { userProfile } from '@/data/mock';

const router = useRouter();

const notificationSettings = [
  {
    icon: Bell,
    label: '评论与回复提醒',
    description: '社区互动、楼中楼回复和官方置顶评论。',
    enabled: true,
  },
  {
    icon: Mail,
    label: '系统公告推送',
    description: '保护行动、Wiki 更新和版本维护通知。',
    enabled: true,
  },
  {
    icon: EyeOff,
    label: '剧透内容过滤',
    description: '隐藏未解锁章节相关讨论和图片预览。',
    enabled: true,
  },
];

const storageItems = [
  { label: '图片缓存', value: '128 MB' },
  { label: 'Wiki 离线内容', value: '46 MB' },
  { label: '游戏快照', value: '12 MB' },
];
</script>

<template>
  <DetailHeader title="设置" @back="router.back()" />

  <div class="space-y-4 px-5 pt-4">
    <Card class="overflow-hidden p-5">
      <div class="flex items-center gap-4">
        <Avatar :name="userProfile.name" :src="userProfile.avatar" />
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <h2 class="truncate text-xl font-black tracking-tight text-panda-ink">
              {{ userProfile.name }}
            </h2>
            <Badge tone="green">已同步</Badge>
          </div>
          <p class="mt-1 text-sm font-medium text-muted-foreground">
            {{ userProfile.title }} · 游客进度已绑定本机
          </p>
        </div>
      </div>
      <div class="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div class="rounded-2xl bg-white/55 p-4 shadow-[inset_0_0_0_1px_rgba(79,53,40,0.06)]">
          <UserRound class="mb-2 size-4 text-panda-rust" />
          <p class="font-black text-panda-ink">账号状态</p>
          <p class="mt-1 text-xs font-medium text-muted-foreground">邮箱待绑定</p>
        </div>
        <div class="rounded-2xl bg-white/55 p-4 shadow-[inset_0_0_0_1px_rgba(79,53,40,0.06)]">
          <Cloud class="mb-2 size-4 text-panda-leaf" />
          <p class="font-black text-panda-ink">云端同步</p>
          <p class="mt-1 text-xs font-medium text-muted-foreground">今天 09:12</p>
        </div>
      </div>
    </Card>

    <Card class="overflow-hidden p-5">
      <div class="mb-4 flex items-center justify-between gap-3">
        <div>
          <p class="text-xs font-black uppercase tracking-[0.22em] text-panda-leaf">
            Preferences
          </p>
          <h2 class="mt-1 text-xl font-black tracking-tight text-panda-ink">
            通知与内容偏好
          </h2>
        </div>
        <ShieldCheck class="size-6 text-panda-rust" />
      </div>

      <div class="space-y-3">
        <div
          v-for="item in notificationSettings"
          :key="item.label"
          class="flex items-center gap-3 rounded-[1.35rem] bg-white/55 p-3 shadow-[inset_0_0_0_1px_rgba(79,53,40,0.06)]"
        >
          <div class="grid size-10 shrink-0 place-items-center rounded-2xl bg-orange-100 text-panda-rust">
            <component :is="item.icon" class="size-5" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="text-sm font-black text-panda-ink">{{ item.label }}</p>
            <p class="mt-0.5 text-xs font-medium leading-5 text-muted-foreground">
              {{ item.description }}
            </p>
          </div>
          <div
            class="flex h-7 w-12 shrink-0 items-center rounded-full p-1 shadow-[inset_0_1px_4px_rgba(79,53,40,0.14)]"
            :class="item.enabled ? 'justify-end bg-panda-leaf' : 'justify-start bg-muted'"
          >
            <span class="size-5 rounded-full bg-white shadow-sm" />
          </div>
        </div>
      </div>
    </Card>

    <Card class="overflow-hidden p-5">
      <div class="mb-4 flex items-center justify-between gap-3">
        <div>
          <p class="text-xs font-black uppercase tracking-[0.22em] text-panda-leaf">
            Storage
          </p>
          <h2 class="mt-1 text-xl font-black tracking-tight text-panda-ink">
            缓存与本机数据
          </h2>
        </div>
        <Database class="size-6 text-panda-rust" />
      </div>

      <div class="overflow-hidden rounded-[1.35rem] bg-white/55 shadow-[inset_0_0_0_1px_rgba(79,53,40,0.06)]">
        <div
          v-for="item in storageItems"
          :key="item.label"
          class="flex items-center justify-between border-b border-panda-bark/10 px-4 py-3 last:border-b-0"
        >
          <span class="text-sm font-bold text-panda-ink">{{ item.label }}</span>
          <span class="text-sm font-black text-panda-rust">{{ item.value }}</span>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-2 gap-3">
        <Button variant="secondary">
          <Smartphone class="size-4" />
          迁移进度
        </Button>
        <Button variant="outline">
          <Trash2 class="size-4" />
          清理缓存
        </Button>
      </div>
    </Card>

    <Card class="p-5 text-center text-xs font-medium leading-5 text-muted-foreground">
      Red Panda's Home V1.0 原型 · 隐私政策和用户协议入口将在正式版接入。
    </Card>
  </div>
</template>
