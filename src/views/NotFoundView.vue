<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Home } from 'lucide-vue-next';

import Button from '@/components/ui/button/Button.vue';
import Card from '@/components/ui/card/Card.vue';

const router = useRouter();
</script>

<template>
  <div class="px-5 pt-5">
    <Card class="p-8 text-center">
      <div
        class="mx-auto grid size-16 place-items-center rounded-3xl bg-orange-100 text-panda-rust"
      >
        <Home class="size-8" />
      </div>
      <h1 class="mt-5 text-2xl font-bold text-panda-bark">页面走丢了</h1>
      <p class="mt-2 text-sm leading-6 text-muted-foreground">
        这只小熊猫还没有找到对应的原型页面。
      </p>
      <Button class="mt-6 w-full" @click="router.replace('/community')"
        >回到社区</Button
      >
    </Card>
  </div>
</template>
