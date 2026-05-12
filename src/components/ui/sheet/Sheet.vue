<script setup lang="ts">
const open = defineModel<boolean>({ default: false });

const emit = defineEmits<{
  afterEnter: [];
}>();
</script>

<template>
  <Teleport to="#app-shell-overlay">
    <Transition name="sheet" @after-enter="emit('afterEnter')">
      <div
        v-if="open"
        class="pointer-events-auto absolute inset-0 z-[60] flex items-end bg-panda-bark/35 backdrop-blur-sm"
        @click.self="open = false"
      >
        <section
          class="field-card max-h-[calc(100%-1rem)] w-full overflow-y-auto overscroll-contain rounded-t-[2rem] border-x border-t px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5 shadow-lifted"
        >
          <slot />
        </section>
      </div>
    </Transition>
  </Teleport>
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
