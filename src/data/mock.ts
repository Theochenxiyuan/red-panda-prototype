import type { Achievement, Board, GameProgress, MenuItem, Message, Post, SocialUser, UserProfile, WikiArticle, WikiCategory } from '@/types/app'

export const boards: Board[] = [
  { id: 'home', label: '推荐' },
  { id: 'science', label: '小熊猫科普' },
  { id: 'game', label: '游戏讨论' },
  { id: 'creation', label: '用户创作' },
  { id: 'suggestion', label: 'App建议' },
]

export const posts: Post[] = [
  {
    id: 'post-1',
    boardId: 'science',
    title: '小熊猫为什么不是小浣熊？',
    excerpt: '从分类、脸部花纹到尾巴形态，三个角度快速分辨它们。',
    body: '小熊猫属于小熊猫科，浣熊属于浣熊科。虽然它们都有环纹尾巴，但小熊猫的脸部更圆，耳朵更尖，尾巴更蓬松，主要生活在喜马拉雅东部和中国西南山地森林。',
    author: { id: 'u1', name: '栗子管理员', title: '森林讲解员', avatar: '/images/avatars/lizi-admin.png' },
    createdAt: '12分钟前',
    isSpoiler: false,
    images: [
      '/images/content/red-panda-vs-raccoon.png',
      '/images/content/red-panda-patterns.png',
    ],
    comments: 2,
    likes: 86,
  },
  {
    id: 'post-2',
    boardId: 'game',
    title: '第三章记忆碎片位置整理',
    excerpt: '含主线章节线索，预览已折叠。',
    body: '第三章的记忆碎片主要集中在旧木桥、竹林深处和守林人小屋附近。建议先完成日常互动提升亲密度，再进入探索路线。',
    author: { id: 'u2', name: '竹叶汽水', title: '记忆收藏家', avatar: '/images/avatars/zhuye-soda.png' },
    createdAt: '36分钟前',
    isSpoiler: true,
    images: [
      '/images/content/memory-bridge-fragment.png',
    ],
    comments: 2,
    likes: 124,
  },
  {
    id: 'post-3',
    boardId: 'creation',
    title: '画了一只在树枝上打盹的小熊猫',
    excerpt: '暖色铅笔风，希望大家喜欢这个困困的小朋友。',
    body: '参考了 Wiki 里的尾巴纹路资料，也把耳朵边缘画得更蓬松了一点。之后想做成手机壁纸。',
    author: { id: 'u3', name: '半山风', title: '竹林画手', avatar: '/images/avatars/banshanfeng.png' },
    createdAt: '1小时前',
    isSpoiler: false,
    images: [
      '/images/content/red-panda-forest-bamboo.png',
      '/images/content/red-panda-sunset-bamboo.png',
      '/images/content/sleeping-red-panda-sketch.png',
    ],
    comments: 2,
    likes: 67,
  },
  {
    id: 'post-4',
    boardId: 'suggestion',
    title: '希望 Wiki 文章可以按阅读进度保存',
    excerpt: '如果从游戏跳转过来，可以回到上次读到的位置。',
    body: '目前收藏文章很好用，但长文章读到一半退出后需要重新找位置。建议增加上次阅读位置和最近阅读列表。',
    author: { id: 'u4', name: '云杉', title: 'App体验官', avatar: '/images/avatars/yunsong.png' },
    createdAt: '2小时前',
    isSpoiler: false,
    images: [],
    comments: 1,
    likes: 31,
  },
]

export const wikiCategories: WikiCategory[] = [
  { id: 'species', label: '物种信息' },
  { id: 'habitat', label: '栖息地' },
  { id: 'protection', label: '保护现状' },
  { id: 'myth', label: '常见误区' },
]

export const wikiArticles: WikiArticle[] = [
  {
    id: 'wiki-1',
    categoryId: 'species',
    title: '认识小熊猫',
    summary: '小熊猫的分类、外形、食性和行为习惯。',
    body: ['小熊猫是一种生活在亚洲山地森林中的珍稀动物，以竹叶、果实和嫩芽为主要食物。', '它们擅长攀爬，长而蓬松的环纹尾巴可以在树间活动时帮助保持平衡。'],
    tags: ['官方', '入门'],
    saved: true,
    readTime: '4分钟',
    image: '/images/content/red-panda-patterns.png',
  },
  {
    id: 'wiki-2',
    categoryId: 'habitat',
    title: '它们住在怎样的森林里？',
    summary: '高海拔阔叶林、竹林和栖息地破碎化问题。',
    body: ['小熊猫偏好温凉湿润的山地森林，林下竹类资源是否稳定会直接影响它们的活动范围。', '道路、采伐和人为干扰会让栖息地被分割，增加种群交流难度。'],
    tags: ['官方', '栖息地'],
    saved: false,
    readTime: '5分钟',
    image: '/images/content/red-panda-forest-bamboo.png',
  },
  {
    id: 'wiki-3',
    categoryId: 'myth',
    title: '常见误区：它不是小浣熊',
    summary: '用简单特征区分小熊猫和浣熊。',
    body: ['小熊猫和浣熊外形有相似之处，但亲缘关系并不近。', '小熊猫面部白色斑纹更明显，身体毛色偏红褐，活动环境也更依赖山地森林。'],
    tags: ['官方', '辟谣'],
    saved: true,
    readTime: '3分钟',
    image: '/images/content/red-panda-vs-raccoon.png',
  },
]

export const messages: Message[] = [
  { id: 'm1', type: 'comments', title: '竹叶汽水 回复了你', description: '“这个分辨方法太实用了！”', createdAt: '刚刚', unread: true, to: '/posts/post-1' },
  { id: 'm2', type: 'comments', title: '半山风 评论了你的帖子', description: '想看更多尾巴纹路资料。', createdAt: '18分钟前', unread: true, to: '/posts/post-1' },
  { id: 'm3', type: 'likes', title: '你的帖子获得 12 个赞', description: '《小熊猫为什么不是小浣熊？》', createdAt: '40分钟前', unread: false, to: '/posts/post-1' },
  { id: 'm4', type: 'system', title: '成就解锁：竹林观察员', description: '你已阅读 5 篇官方 Wiki。', createdAt: '今天 09:12', unread: true, to: '/profile/achievements' },
  { id: 'm5', type: 'system', title: '官方公告', description: '本周新增两篇保护行动指南。', createdAt: '昨天', unread: false, to: '/wiki/wiki-2' },
]

export const userProfile: UserProfile = {
  name: 'Theo',
  title: '竹林守护者',
  avatar: '/images/avatars/theo.png',
  followers: 128,
  following: 36,
}

export const gameProgress: GameProgress = {
  intimacyLevel: 8,
  achievementsUnlocked: 12,
  achievementsTotal: 30,
  memoriesUnlocked: 18,
  chaptersUnlocked: 3,
  decorationCount: 9,
}

export const profileMenuItems: MenuItem[] = [
  { id: 'saved', label: '收藏', description: '2 篇文章', to: '/profile/saved' },
  { id: 'comments', label: '评论', description: '最近互动', to: '/profile/comments' },
  { id: 'posts', label: '帖子', description: '2 篇发布', to: '/profile/posts' },
  { id: 'settings', label: '设置', description: '账号、通知、隐私', to: '/settings' },
]

export const followers: SocialUser[] = [
  { id: 'f1', name: '竹叶汽水', title: '记忆收藏家', avatar: '/images/avatars/zhuye-soda.png', bio: '热衷整理章节线索和记忆碎片位置。', followers: 342, isFollowing: true },
  { id: 'f2', name: '半山风', title: '竹林画手', avatar: '/images/avatars/banshanfeng.png', bio: '喜欢画睡觉的小熊猫和森林速写。', followers: 186, isFollowing: false },
  { id: 'f3', name: '云杉', title: 'App体验官', avatar: '/images/avatars/yunsong.png', bio: '关注社区体验和 Wiki 阅读细节。', followers: 91, isFollowing: false },
]

export const following: SocialUser[] = [
  { id: 'fo1', name: '栗子管理员', title: '森林讲解员', avatar: '/images/avatars/lizi-admin.png', bio: '官方科普维护者，负责物种知识和公告。', followers: 2048, isFollowing: true },
  { id: 'fo2', name: '红叶观察站', title: '官方账号', avatar: '/images/avatars/redleaf-station.png', bio: '发布保护行动、活动提醒和 Wiki 更新。', followers: 5200, isFollowing: true },
]

export const achievements: Achievement[] = [
  { id: 'a1', icon: '🌿', title: '竹林观察员', category: 'wiki', description: '阅读 5 篇官方 Wiki', unlocked: true, unlockedAt: '今天 09:12', progressLabel: '5/5 已完成' },
  { id: 'a2', icon: '🏡', title: '小屋整理师', category: 'game', description: '摆放 8 件小屋装饰', unlocked: true, unlockedAt: '昨天', progressLabel: '9/8 已完成' },
  { id: 'a3', icon: '🔎', title: '记忆搜寻者', category: 'game', description: '收集 20 个记忆碎片', unlocked: false, progressLabel: '18/20 进行中' },
  { id: 'a4', icon: '💬', title: '温柔回应者', category: 'community', description: '在社区获得 10 次评论互动', unlocked: false, progressLabel: '7/10 进行中' },
]

export const settingItems: MenuItem[] = [
  { id: 'account', label: '账号管理', description: '绑定邮箱、修改密码、注销账号' },
  { id: 'notifications', label: '通知开关', description: '评论、点赞、系统消息提醒' },
  { id: 'spoiler', label: '剧透过滤', description: '隐藏未解锁章节讨论' },
  { id: 'migration', label: '游客进度迁移', description: '注册后保存游戏进度' },
  { id: 'cache', label: '缓存清理', description: '释放图片和文章缓存' },
  { id: 'about', label: '关于我们', description: '隐私政策、用户协议' },
]
