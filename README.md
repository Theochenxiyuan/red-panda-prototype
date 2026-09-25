# Red Panda's Home App 原型

基于 Vue 3 的移动端 App 可点击原型，覆盖社区、Wiki、消息、我的和“开始游戏”入口。

## 技术栈

```text
Vue 3 + Vite + TypeScript + Vue Router + Tailwind CSS + shadcn-vue style components + lucide-vue-next
```

## 运行

```bash
pnpm install
pnpm dev
```

## 构建检查

```bash
pnpm build
```

## 页面路由

```text
/community          社区
/posts/:id          帖子详情
/wiki               小熊猫 Wiki
/wiki/:id           Wiki 文章详情
/game               开始游戏入口
/messages           消息
/profile            我的
/profile/:section   我的内容占位页
/settings           设置
```

## 待办事项

未完成内容集中维护在 `TODO.md`。后续新增或完成事项时需要同步更新该文档。
