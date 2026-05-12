<script setup lang="ts">
import BottomNav from '@/components/layout/BottomNav.vue';
import StatusBar from '@/components/layout/StatusBar.vue';
import ToastViewport from '@/components/layout/ToastViewport.vue';
</script>

<template>
  <div
    class="paper-grain h-screen h-dvh overflow-hidden px-0 py-0 sm:grid sm:place-items-center sm:px-6 sm:py-8"
  >
    <div
      class="pointer-events-none fixed -left-24 top-12 hidden size-72 rounded-full bg-panda-leaf/15 blur-3xl sm:block"
    />
    <div
      class="pointer-events-none fixed -right-16 bottom-10 hidden size-80 rounded-full bg-panda-orange/20 blur-3xl sm:block"
    />
    <div
      class="app-shell-boundary leaf-shadow relative isolate mx-auto flex h-screen h-dvh w-full flex-col overflow-hidden bg-background shadow-lifted sm:h-[844px] sm:max-h-[calc(100dvh-4rem)] sm:w-[390px] sm:rounded-[2.75rem] sm:border-[7px] sm:border-white/70"
    >
      <div
        class="pointer-events-none absolute inset-x-6 top-16 z-0 h-px bg-gradient-to-r from-transparent via-panda-rust/20 to-transparent"
      />
      <div
        class="pointer-events-none absolute -right-16 top-20 z-0 size-48 rounded-full border border-panda-leaf/10"
      />
      <div
        id="app-shell-overlay"
        class="pointer-events-none absolute inset-0 z-[60]"
      />
      <StatusBar />
      <main
        class="scrollbar-hidden-desktop relative z-10 flex-1 overflow-y-auto pb-[calc(7.75rem+env(safe-area-inset-bottom))]"
      >
        <slot />
      </main>
      <ToastViewport />
      <BottomNav />
    </div>
  </div>
</template>
