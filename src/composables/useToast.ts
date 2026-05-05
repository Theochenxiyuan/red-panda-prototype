import { shallowRef } from 'vue'

export interface ToastItem {
  id: number
  message: string
  tone: 'success' | 'neutral'
}

const toasts = shallowRef<ToastItem[]>([])
let nextToastId = 1

export function useToast() {
  function dismissToast(id: number) {
    toasts.value = toasts.value.filter((toast) => toast.id !== id)
  }

  function showToast(message: string, tone: ToastItem['tone'] = 'success') {
    const id = nextToastId++

    toasts.value = [...toasts.value, { id, message, tone }]
    window.setTimeout(() => dismissToast(id), 2200)
  }

  return {
    toasts,
    showToast,
    dismissToast,
  }
}
