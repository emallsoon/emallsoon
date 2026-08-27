# AGENTS.md — 智能体交接文档

本文档供后续接手本项目的智能体（AI agent）快速了解项目状态、架构与工作流程。人类开发者请阅读 `README.md`。

## 项目概述

**emallsoon.com** — 面向电商卖主的免费计算器工具站，零后端、零数据库，纯静态部署在 Cloudflare Pages（免费层）。商业模式：SEO 自然流量 → 广告变现（流量过万后接入 Ezoic）。

- 技术栈：Astro 5（静态输出）+ 原生 JS + CSS
- 线上地址：https://emallsoon.com
- 生产仓库：`github.com/emallsoon/emallsoon`（连接 Cloudflare Pages 自动部署）
- 镜像仓库：`github.com/emallsoon/emallsoon-agent`（本仓库，供智能体接手）
- 部署方式：push 到生产仓库 main 分支 → Cloudflare Pages 自动构建上线（约 1–2 分钟）

## 当前状态（截至 2026-08-27）

### 已上线工具（9 个）

| 工具 | 路径 | 状态 |
|------|------|------|
| Amazon FBA Profit Calculator | `/tools/amazon-fba-profit-calculator/` | ✅ 已上线 |
| Shopify Profit Margin Calculator | `/tools/shopify-profit-margin-calculator/` | ✅ 已上线 |
| Etsy Fee & Profit Calculator | `/tools/etsy-fee-calculator/` | ✅ 已上线 |
| ROAS & Break-Even Calculator | `/tools/roas-break-even-calculator/` | ✅ 已上线 |
| Discount Pricing Calculator | `/tools/discount-pricing-calculator/` | ✅ 已上线 |
| Break-Even Units Calculator | `/tools/break-even-units-calculator/` | ✅ 已上线 |
| TikTok Shop Fee Calculator | `/tools/tiktok-shop-fee-calculator/` | ✅ 已上线 |
| eBay Fee & Profit Calculator | `/tools/ebay-fee-calculator/` | ✅ 已上线 |
| Platform Fee Comparison（五平台对比） | `/tools/platform-fee-comparison/` | ✅ 已上线 |

### 已完成的基础设施

- [x] Cloudflare Pages 部署 + 自定义域名绑定（含 www 301 重定向）
- [x] Cloudflare Web Analytics 已开启（无 cookie、边缘注入）
- [x] Google Search Console 已提交（含 sitemap-index.xml）
- [x] Bing Webmaster Tools 已提交（IndexNow 已开）
- [x] 每页 SEO：独立 title/description/canonical + JSON-LD（WebApplication + BreadcrumbList + FAQPage）
- [x] `@astrojs/sitemap` 自动生成 sitemap

### 费率数据验证状态

`src/data/fees.ts` 最后验证日期：**2026-08-26**，全部费率与官方一致。

已覆盖并验证的 2026 年关键变化：
- Amazon：2026-01-15 费率生效 + **2026-04-17 起的 3.5% fuel & logistics surcharge**（加在 FBA 配送费上，约 $0.15–0.35/件）
- Shopify：Basic/Grow/Advanced 三档（2.9%/2.7%/2.5% + $0.30）
- Etsy：$0.20 + 6.5% + 3% + $0.25 + Offsite Ads 15%/12%
- TikTok Shop：6%/5%/3% 三档 + 退款管理费 20% 封顶 $5
- eBay：12 个类目双费率（个人 vs Store 订阅）+ 每单 $0.30/$0.40

## 核心架构与开发约定

### 目录结构（关键文件）

```
src/
├── data/
│   ├── fees.ts    # ★ 全部平台费率常量（费率更新优先只改这里）
│   └── tools.ts   # 工具注册表（新增工具页必须先在这里登记）
├── components/ToolCard.astro  # 工具卡片（含 SVG 图标映射，新增工具需加图标）
├── layouts/BaseLayout.astro   # SEO 骨架 + 结构化数据
└── pages/tools/*.astro        # 各计算器页（含内联计算脚本）
```

### 新增计算器的固定流程

1. 在 `fees.ts` 添加平台费率常量（接口 + 数组 + 默认值，附官方来源注释）
2. 在 `tools.ts` 登记工具（slug/name/tag/description/href/icon）
3. 在 `ToolCard.astro` 的 icons 映射中加对应 SVG 图标（更新 icon 类型联合类型）
4. 新建 `src/pages/tools/<slug>.astro`，参照现有页面结构：
   - 前置 frontmatter：SEO title/description + 3 个 JSON-LD（WebApplication/BreadcrumbList/FAQPage）
   - 面包屑导航 + page-head
   - `calc-grid` 布局：左侧表单（`calc-form`）+ 右侧粘性收据（`calc-sticky`）
   - `<script>` 内联计算逻辑（`$()` 取元素、`read()` 读数值、`recalc()` 主函数、Copy results 按钮）
   - 底部：how-the-math-works 内容区（SEO 长文）+ FAQ + 其他工具推荐
5. 更新 `index.astro`：hero 工具计数、ticker、meta description
6. `npm run build` 验证（应输出 12+ 页）→ commit → push 到生产仓库

### 设计系统

**"The Seller's Ledger"（卖家账本）风格**：
- 纸感底色 + 墨色文字 + 钞票绿（利润，`--green`）+ 印章红（费用）
- 字体：Fraunces（标题衬线）+ Archivo（正文）+ IBM Plex Mono（数字等宽）
- 结果面板做成"收据"：虚线分隔、点线引导、锯齿撕边（`tear`）、盖章徽标（`verdict`）

CSS 变量定义在 `src/styles/global.css`，全局公共类（`.calc-grid`/`.receipt`/`.rline`/`.formula-box`/`.faq` 等）也在其中，各页面 `<style>` 只写页面私有样式。

## 自动化任务（重要！）

**存在一个每日运行的定时任务：`emallsoon费率每日核查`**（schedule ID: `79ZQUNK_X.UX.1`）

- 运行时间：每天 09:00（Asia/Shanghai）
- 内容：联网核查 5 个平台费率 → 与 `fees.ts` 对比 → 有差异则更新+构建+push 部署 → 报告写入 `reports/YYYY-MM-DD-fee-check.md`
- 接手后如需管理此任务，使用 Schedule 工具（action: list/get/pause/resume/delete/update）

## 环境注意事项（沙箱特定）

- **网络出口**：SSH 22 端口直连被禁，必须走 HTTP 代理 `127.0.0.1:18080`。
  `~/.ssh/config` 已配置 `github-proxy` 别名（ProxyCommand 用 nc -X connect 走代理连 ssh.github.com:443）。
  git remote 已使用 `git@github-proxy:...` 格式。
- **密钥易失**：沙箱重置后 `~/.ssh/` 会丢失。若 push 报 `Permission denied (publickey)`，
  需重新 `ssh-keygen -t ed25519` 并请用户把新公钥加到 GitHub（Settings → SSH keys）。
- **依赖易失**：沙箱重置后 `node_modules/` 会丢失，构建前先 `npm install`。
- **构建命令**：`cd /workspace/emallsoon && npm install && npm run build`

## 待办与路线图（按优先级）

1. ~~盈亏平衡销量计算器~~ ✅ 已完成
2. ~~折扣定价计算器~~ ✅ 已完成
3. ~~平台横评对比工具~~ ✅ 已完成
4. **programmatic 变体页**：按"平台 × 场景"批量生成落地页（Astro 动态路由，`getStaticPaths`）
   例如：`/tools/amazon-fba-calculator/apparel/`、`/ebay-fees/electronics/` 等长尾词落地页
5. **Amazon 库存费估算器**（月度 + 长期仓储费）
6. **英文指南内容**：每个工具页配一篇更长的 how-to 指南（利用现有公式区块扩展）
7. **外链运营**：Reddit r/FulfillmentByAmazon、r/shopify、r/EtsySellers 真实回答问题带链接
8. 月流量过万后接入 Ezoic 广告（$20 起付）

## 运营节奏参考（原 12 周计划）

- 每周 2 个新工具或变体页
- Search Console 数据月度复盘：零展现的词砍掉，有展现的词加倍内容
- 核心关键词：`amazon fba calculator`、`ebay fee calculator`、`etsy fee calculator`、
  `shopify profit margin calculator`、`tiktok shop fee calculator`、`platform fee comparison`

## 快速上手命令

```bash
cd /workspace/emallsoon
npm run build                        # 构建验证（12+ 页）
npm run dev                          # 本地开发服务器
git push origin main                 # 部署到生产（Cloudflare Pages 自动上线）
git push agent main                  # 同步到智能体镜像仓库
```
