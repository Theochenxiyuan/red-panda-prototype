<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { Bell, BookOpenText, Gamepad2, Home, UserRound } from 'lucide-vue-next';

const route = useRoute();

const activeRoot = computed(() => {
  if (route.path.startsWith('/posts')) return '/community';
  if (route.path.startsWith('/wiki')) return '/wiki';
  if (route.path.startsWith('/settings')) return '/profile';
  if (route.path.startsWith('/profile')) return '/profile';

  return route.path;
});

const sideItems = [
  { to: '/community', label: '社区', icon: Home },
  { to: '/wiki', label: 'Wiki', icon: BookOpenText },
  { to: '/messages', label: '消息', icon: Bell },
  { to: '/profile', label: '我的', icon: UserRound },
];
</script>

<template>
  <nav
    class="glass-panel absolute inset-x-3 bottom-3 z-50 rounded-[2rem] border px-3 pb-[calc(0.55rem+env(safe-area-inset-bottom))] pt-2"
  >
    <RouterLink
      to="/game"
      class="absolute left-1/2 top-0 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-[1.6rem] border-[5px] border-panda-parchment bg-gradient-to-br from-panda-orange via-primary to-panda-rust text-primary-foreground shadow-lifted transition active:scale-95"
      aria-label="开始游戏"
    >
      <Gamepad2 class="size-7" />
    </RouterLink>

    <div class="grid grid-cols-5 items-end gap-1">
      <RouterLink
        v-for="item in sideItems.slice(0, 2)"
        :key="item.to"
        :to="item.to"
        class="flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-semibold transition active:scale-95"
        :class="
          activeRoot === item.to ? 'bg-white/65 text-primary shadow-[inset_0_0_0_1px_rgba(217,91,43,0.08)]' : 'text-muted-foreground'
        "
      >
        <component :is="item.icon" class="size-5" />
        <span>{{ item.label }}</span>
      </RouterLink>

      <RouterLink
        to="/game"
        class="flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-semibold transition active:scale-95"
        :class="
          activeRoot === '/game' ? 'text-primary' : 'text-muted-foreground'
        "
      >
        <span class="mt-6">游戏</span>
      </RouterLink>

      <RouterLink
        v-for="item in sideItems.slice(2)"
        :key="item.to"
        :to="item.to"
        class="flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-semibold transition active:scale-95"
        :class="
          activeRoot === item.to ? 'bg-white/65 text-primary shadow-[inset_0_0_0_1px_rgba(217,91,43,0.08)]' : 'text-muted-foreground'
        "
      >
        <component :is="item.icon" class="size-5" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </div>
  </nav>
</template>
