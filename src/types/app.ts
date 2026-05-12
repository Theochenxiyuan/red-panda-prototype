export type BoardId = 'home' | 'science' | 'game' | 'creation' | 'suggestion'

export interface Board {
  id: BoardId
  label: string
}

export interface UserSummary {
  id: string
  name: string
  title: string
  avatar?: string
}

export interface Post {
  id: string
  boardId: Exclude<BoardId, 'home'>
  title: string
  excerpt: string
  body: string
  author: UserSummary
  createdAt: string
  isSpoiler: boolean
  images: string[]
  comments: number
  likes: number
}

export interface WikiCategory {
  id: string
  label: string
}

export interface WikiArticle {
  id: string
  categoryId: string
  title: string
  summary: string
  body: string[]
  tags: string[]
  saved: boolean
  readTime: string
  image?: string
}

export type MessageType = 'comments' | 'likes' | 'system'

export interface Message {
  id: string
  type: MessageType
  title: string
  description: string
  createdAt: string
  unread: boolean
  to?: string
}

export interface GameProgress {
  intimacyLevel: number
  achievementsUnlocked: number
  achievementsTotal: number
  memoriesUnlocked: number
  chaptersUnlocked: number
  decorationCount: number
}

export interface UserProfile {
  name: string
  title: string
  followers: number
  following: number
  avatar?: string
}

export interface MenuItem {
  id: string
  label: string
  description?: string
  to?: string
}

export interface SocialUser {
  id: string
  name: string
  title?: string
  avatar?: string
  bio: string
  followers: number
  isFollowing: boolean
}

export type AchievementCategory = 'game' | 'wiki' | 'community'

export interface Achievement {
  id: string
  icon: string
  title: string
  category: AchievementCategory
  description: string
  unlocked: boolean
  unlockedAt?: string
  progressLabel: string
}
