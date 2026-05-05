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
    class="absolute inset-x-0 bottom-0 z-50 border-t bg-card/95 px-3 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur"
  >
    <RouterLink
      to="/game"
      class="absolute left-1/2 top-0 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-soft transition active:scale-95"
      aria-label="开始游戏"
    >
      <Gamepad2 class="size-7" />
    </RouterLink>

    <div class="grid grid-cols-5 items-end gap-1">
      <RouterLink
        v-for="item in sideItems.slice(0, 2)"
        :key="item.to"
        :to="item.to"
        class="flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-medium transition"
        :class="
          activeRoot === item.to ? 'text-primary' : 'text-muted-foreground'
        "
      >
        <component :is="item.icon" class="size-5" />
        <span>{{ item.label }}</span>
      </RouterLink>

      <RouterLink
        to="/game"
        class="flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-medium"
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
        class="flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-medium transition"
        :class="
          activeRoot === item.to ? 'text-primary' : 'text-muted-foreground'
        "
      >
        <component :is="item.icon" class="size-5" />
        <span>{{ item.label }}</span>
      </RouterLink>
    </div>
  </nav>
</template>
