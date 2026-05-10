<script setup lang="ts">
import BottomNav from '@/components/layout/BottomNav.vue';
import StatusBar from '@/components/layout/StatusBar.vue';
import ToastViewport from '@/components/layout/ToastViewport.vue';
</script>

<template>
  <div
    class="h-screen h-dvh overflow-hidden bg-[radial-gradient(circle_at_top,_#fff7ed_0,_#f7efe4_42%,_#eadccb_100%)] px-0 py-0 sm:grid sm:place-items-center sm:px-6 sm:py-8"
  >
    <div
      class="app-shell-boundary relative isolate mx-auto flex h-screen h-dvh w-full flex-col overflow-hidden bg-background shadow-soft sm:h-[844px] sm:max-h-[calc(100dvh-4rem)] sm:w-[390px] sm:rounded-[2.5rem] sm:border sm:border-white/70"
    >
      <div
        id="app-shell-overlay"
        class="pointer-events-none absolute inset-0 z-[60]"
      />
      <StatusBar />
      <main
        class="scrollbar-hidden-desktop flex-1 overflow-y-auto pb-[calc(7rem+env(safe-area-inset-bottom))]"
      >
        <slot />
      </main>
      <ToastViewport />
      <BottomNav />
    </div>
  </div>
</template>
