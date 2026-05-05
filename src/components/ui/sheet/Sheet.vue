<script setup lang="ts">
const open = defineModel<boolean>({ default: false });
</script>

<template>
  <Transition name="sheet">
    <div
      v-if="open"
      class="pointer-events-auto fixed inset-0 z-[60] flex items-end bg-panda-bark/30"
      @click.self="open = false"
    >
      <section class="w-full rounded-t-[2rem] bg-background p-5 shadow-soft">
        <slot />
      </section>
    </div>
  </Transition>
</template>

<style scoped>
.sheet-enter-active,
.sheet-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}

.sheet-enter-from section,
.sheet-leave-to section {
  transform: translateY(100%);
}

.sheet-enter-active section,
.sheet-leave-active section {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}
</style>
