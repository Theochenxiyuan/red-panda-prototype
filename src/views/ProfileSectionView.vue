<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import {
  CheckCircle2,
  LockKeyhole,
  UserCheck,
  UserPlus,
} from 'lucide-vue-next';

import Avatar from '@/components/ui/avatar/Avatar.vue';
import Badge from '@/components/ui/badge/Badge.vue';
import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';
import DetailHeader from '@/components/layout/DetailHeader.vue';
import Tabs from '@/components/ui/tabs/Tabs.vue';
import { useToast } from '@/composables/useToast';
import {
  achievements,
  followers,
  following,
  posts,
  wikiArticles,
} from '@/data/mock';
import type { AchievementCategory, SocialUser } from '@/types/app';

const props = defineProps<{
  section: string;
}>();

const router = useRouter();
const { showToast } = useToast();
const achievementStatusFilter = shallowRef('all');
const achievementCategoryFilter = shallowRef<'all' | AchievementCategory>(
  'all',
);
const followState = shallowRef<Record<string, boolean>>(
  [...followers, ...following].reduce<Record<string, boolean>>(
    (state, user) => {
      state[user.id] = user.isFollowing;
      return state;
    },
    {},
  ),
);

const sectionTitle = computed(() => {
  const titles: Record<string, string> = {
    saved: '收藏',
    comments: '评论',
    posts: '帖子',
    followers: '粉丝',
    following: '关注',
    achievements: '成就',
  };

  return titles[props.section] ?? '我的内容';
});

const savedArticles = computed(() =>
  wikiArticles.filter((article) => article.saved),
);
const myPosts = computed(() => posts.slice(0, 2));
const socialUsers = computed<SocialUser[]>(() =>
  props.section === 'followers' ? followers : following,
);
const achievementStatusItems = computed(() => [
  { id: 'all', label: '全部', badge: achievements.length },
  {
    id: 'unlocked',
    label: '已解锁',
    badge: achievements.filter((achievement) => achievement.unlocked).length,
  },
  {
    id: 'locked',
    label: '未解锁',
    badge: achievements.filter((achievement) => !achievement.unlocked).length,
  },
]);
const achievementCategoryItems: Array<{
  id: 'all' | AchievementCategory;
  label: string;
}> = [
  { id: 'all', label: '全部类型' },
  { id: 'game', label: '游戏' },
  { id: 'wiki', label: 'Wiki' },
  { id: 'community', label: '社区' },
];
const categoryLabels: Record<AchievementCategory, string> = {
  game: '游戏',
  wiki: 'Wiki',
  community: '社区',
};
const filteredAchievements = computed(() =>
  achievements.filter((achievement) => {
    const matchesStatus =
      achievementStatusFilter.value === 'all' ||
      (achievementStatusFilter.value === 'unlocked' && achievement.unlocked) ||
      (achievementStatusFilter.value === 'locked' && !achievement.unlocked);
    const matchesCategory =
      achievementCategoryFilter.value === 'all' ||
      achievement.category === achievementCategoryFilter.value;

    return matchesStatus && matchesCategory;
  }),
);

function isFollowing(userId: string) {
  return followState.value[userId] ?? false;
}

function toggleFollow(user: SocialUser) {
  const nextValue = !isFollowing(user.id);

  followState.value = {
    ...followState.value,
    [user.id]: nextValue,
  };
  showToast(
    nextValue ? `已关注 ${user.name}` : `已取消关注 ${user.name}`,
    'neutral',
  );
}
</script>

<template>
  <DetailHeader :title="sectionTitle" @back="router.back()" />

  <div class="space-y-4 px-5 pt-4">
    <section v-if="section === 'saved'" class="space-y-3">
      <Card v-for="article in savedArticles" :key="article.id" class="p-4">
        <button
          type="button"
          class="w-full text-left"
          @click="router.push(`/wiki/${article.id}`)"
        >
          <Badge tone="green">已收藏</Badge>
          <h2 class="mt-3 text-base font-bold text-panda-bark">
            {{ article.title }}
          </h2>
          <p class="mt-2 text-sm leading-6 text-muted-foreground">
            {{ article.summary }}
          </p>
        </button>
      </Card>
    </section>

    <section v-else-if="section === 'comments'" class="space-y-3">
      <Card class="p-4">
        <p class="text-sm leading-6 text-muted-foreground">
          这个解释很清楚，终于不会把它叫成小浣熊了。
        </p>
        <p class="mt-2 text-xs text-muted-foreground">
          来自帖子《小熊猫为什么不是小浣熊？》
        </p>
      </Card>
      <Card class="p-4">
        <p class="text-sm leading-6 text-muted-foreground">
          建议 Wiki 也放一张对比图。
        </p>
        <p class="mt-2 text-xs text-muted-foreground">
          来自帖子《小熊猫为什么不是小浣熊？》
        </p>
      </Card>
    </section>

    <section v-else-if="section === 'posts'" class="space-y-3">
      <Card v-for="post in myPosts" :key="post.id" class="p-4">
        <button
          type="button"
          class="w-full text-left"
          @click="router.push(`/posts/${post.id}`)"
        >
          <h2 class="text-base font-bold text-panda-bark">{{ post.title }}</h2>
          <p class="mt-2 text-sm leading-6 text-muted-foreground">
            {{ post.excerpt }}
          </p>
          <p class="mt-2 text-xs text-muted-foreground">
            {{ post.comments }} 评论 · {{ post.likes }} 赞
          </p>
        </button>
      </Card>
    </section>

    <section
      v-else-if="section === 'followers' || section === 'following'"
      class="space-y-3"
    >
      <Card v-for="user in socialUsers" :key="user.id" class="p-4">
        <div class="flex items-start gap-3">
          <Avatar :name="user.name" />
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <p class="text-sm font-bold text-panda-bark">{{ user.name }}</p>
              <Badge v-if="user.title" tone="green">{{ user.title }}</Badge>
            </div>
            <p class="mt-2 text-sm leading-5 text-muted-foreground">
              {{ user.bio }}
            </p>
            <p class="mt-2 text-xs text-muted-foreground">
              {{ user.followers }} 粉丝
            </p>
          </div>
          <Button
            :variant="isFollowing(user.id) ? 'secondary' : 'primary'"
            size="sm"
            @click="toggleFollow(user)"
          >
            <UserCheck v-if="isFollowing(user.id)" class="size-4" />
            <UserPlus v-else class="size-4" />
            {{ isFollowing(user.id) ? '已关注' : '关注' }}
          </Button>
        </div>
      </Card>
    </section>

    <section v-else-if="section === 'achievements'" class="space-y-3">
      <Tabs v-model="achievementStatusFilter" :items="achievementStatusItems" />
      <div
        class="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <button
          v-for="category in achievementCategoryItems"
          :key="category.id"
          type="button"
          class="shrink-0 rounded-full px-3 py-2 text-xs font-medium transition"
          :class="
            achievementCategoryFilter === category.id
              ? 'bg-panda-bark text-white'
              : 'bg-card text-muted-foreground'
          "
          @click="achievementCategoryFilter = category.id"
        >
          {{ category.label }}
        </button>
      </div>

      <Card
        v-for="achievement in filteredAchievements"
        :key="achievement.id"
        class="p-4"
      >
        <div class="flex items-start gap-3">
          <div
            class="grid size-12 shrink-0 place-items-center rounded-2xl bg-muted text-lg"
          >
            {{ achievement.icon }}
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex flex-wrap items-center gap-2">
              <h2 class="text-sm font-bold text-panda-bark">
                {{ achievement.title }}
              </h2>
              <Badge tone="outline">{{
                categoryLabels[achievement.category]
              }}</Badge>
              <CheckCircle2
                v-if="achievement.unlocked"
                class="size-4 text-panda-leaf"
              />
              <LockKeyhole v-else class="size-4 text-muted-foreground" />
            </div>
            <p class="mt-1 text-sm leading-5 text-muted-foreground">
              {{ achievement.description }}
            </p>
            <div
              class="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
            >
              <span class="rounded-full bg-card px-2 py-1">{{
                achievement.progressLabel
              }}</span>
              <span
                class="rounded-full px-2 py-1"
                :class="
                  achievement.unlocked
                    ? 'bg-green-100 text-panda-leaf'
                    : 'bg-muted text-muted-foreground'
                "
              >
                {{
                  achievement.unlocked
                    ? `解锁于 ${achievement.unlockedAt}`
                    : '尚未解锁'
                }}
              </span>
            </div>
          </div>
        </div>
      </Card>
      <Card
        v-if="filteredAchievements.length === 0"
        class="p-8 text-center text-sm text-muted-foreground"
        >没有匹配的成就</Card
      >
    </section>

    <Card v-else class="p-8 text-center text-sm text-muted-foreground"
      >这个内容页还在规划中</Card
    >
  </div>
</template>
