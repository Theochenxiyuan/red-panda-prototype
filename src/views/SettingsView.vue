<script setup lang="ts">
import { useRouter } from 'vue-router';

import DetailHeader from '@/components/layout/DetailHeader.vue';
import SettingList from '@/components/settings/SettingList.vue';
import Card from '@/components/ui/card/Card.vue';
import { useToast } from '@/composables/useToast';
import { settingItems } from '@/data/mock';
import type { MenuItem } from '@/types/app';

const router = useRouter();
const { showToast } = useToast();

function selectSetting(item: MenuItem) {
  showToast(`${item.label} 将进入具体设置页`, 'neutral');
}
</script>

<template>
  <DetailHeader title="设置" @back="router.back()" />

  <div class="space-y-4 px-5 pt-4">
    <SettingList :items="settingItems" @select="selectSetting" />
    <Card class="p-5 text-center text-xs leading-5 text-muted-foreground">
      小熊猫之家 V1.0 原型 · 隐私政策和用户协议入口将在正式版接入。
    </Card>
  </div>
</template>
