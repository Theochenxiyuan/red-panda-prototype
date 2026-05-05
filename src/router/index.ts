import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/', redirect: '/community' },
    { path: '/community', name: 'Community', component: () => import('@/views/CommunityView.vue') },
    { path: '/posts/:id', name: 'PostDetail', component: () => import('@/views/PostDetailView.vue'), props: true },
    { path: '/wiki', name: 'Wiki', component: () => import('@/views/WikiView.vue') },
    { path: '/wiki/:id', name: 'WikiDetail', component: () => import('@/views/WikiDetailView.vue'), props: true },
    { path: '/game', name: 'GameEntry', component: () => import('@/views/GameEntryView.vue') },
    { path: '/messages', name: 'Messages', component: () => import('@/views/MessagesView.vue') },
    { path: '/profile', name: 'Profile', component: () => import('@/views/ProfileView.vue') },
    { path: '/profile/:section', name: 'ProfileSection', component: () => import('@/views/ProfileSectionView.vue'), props: true },
    { path: '/settings', name: 'Settings', component: () => import('@/views/SettingsView.vue') },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFoundView.vue') },
  ],
})

export default router
