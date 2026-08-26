# emallsoon.com — 电商卖家免费计算器工具站

一个零后端、零数据库、可整站部署到 Cloudflare Pages（免费层）的静态工具站。
首个版本包含 4 个核心计算器，全部纯客户端运行，用户数据不出浏览器。

**技术栈**：Astro 5（静态输出）+ 原生 JS + CSS（无框架、无追踪脚本）

## 本地开发

```bash
npm install
npm run dev      # 开发服务器 http://localhost:4321
npm run build    # 产出静态文件到 dist/
npm run preview  # 本地预览 dist/
```

## 目录结构

```
src/
├── data/
│   ├── tools.ts          # 工具注册表（新增工具页先在这里登记）
│   └── fees.ts           # ★ 平台费率预设（费率更新只改这一个文件）
├── styles/global.css     # 设计系统（Ledger 风格 token）
├── layouts/BaseLayout.astro   # SEO meta + 结构化数据骨架
├── components/           # 页头 / 页脚 / 工具卡片
└── pages/
    ├── index.astro       # 首页
    ├── about.astro
    ├── 404.astro
    └── tools/            # 4 个计算器页
```

## 部署到 Cloudflare Pages（约 10 分钟）

1. **推到 GitHub**
   ```bash
   git init && git add -A && git commit -m "emallsoon v0.1"
   git remote add origin git@github.com:<你的用户名>/emallsoon.git
   git push -u origin main
   ```

2. **连接 Cloudflare Pages**
   - 打开 dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
   - 选择仓库，构建配置：
     - Framework preset: `Astro`
     - Build command: `npm run build`
     - Build output directory: `dist`
   - 点击 Save and Deploy，等待首次构建

3. **绑定域名 emallsoon.com**
   - Pages 项目 → Custom domains → Set up a custom domain → 输入 `emallsoon.com`
   - 同时添加 `www.emallsoon.com`（301 跳转到主域）
   - DNS 配置（二选一）：
     - 域名 DNS 已在 Cloudflare：自动添加 CNAME 记录，无需操作
     - 域名 DNS 在其他注册商：添加 CNAME，`emallsoon.com → <项目名>.pages.dev`
   - 等待证书签发（通常几分钟）

4. **上线后必做清单**
   - [ ] Google Search Console 添加资源 → 提交 `https://emallsoon.com/sitemap-index.xml`
   - [ ] Bing Webmaster Tools 同样提交（IndexNow 顺便开启）
   - [ ] Cloudflare 面板开 Web Analytics（免费、无 cookie、不用改代码）
   - [ ] PageSpeed Insights 跑一次移动端分数，确保 90+
   - [ ] 手机实际打开一遍 4 个计算器，手动验算一组数字

## 费率维护

平台费率会不定期调整。所有默认费率集中在 `src/data/fees.ts`，
每季度核对一次：

- Amazon：Seller Central → Revenue Calculator（ referral + FBA fulfillment 费率表）
- Shopify：定价页（各 plan transaction fee + 各国支付费率）
- Etsy：Fee help center（listing / transaction / payment processing / Offsite Ads）

页面上的每个费率字段都是用户可编辑的，默认值只是合理起点——
这是刻意设计，避免过时数据误导，也让页面免责声明成立。

## 已完成的 SEO 基建

- 每页独立 title / description / canonical
- 结构化数据：WebSite（全站）、WebApplication + BreadcrumbList + FAQPage（每个工具页）
- `sitemap-index.xml` 自动生成（@astrojs/sitemap）
- `robots.txt` 指向 sitemap
- 语义化 HTML + aria-live 结果区 + 键盘可访问表单
- 内联关键计算逻辑，零第三方 JS 依赖（除 Google Fonts）

## 路线图（按优先级）

1. 盈亏平衡销量计算器（break-even units）
2. 折扣定价计算器（"打 8 折到底亏多少"）
3. Amazon 库存费估算器（月度 + 长期仓储）
4. 平台横评：同一产品在 Amazon / Shopify / Etsy 的真实利润对比（天然链接诱饵）
5. programmatic 变体页：按"平台 × 场景"批量生成落地页（Astro 动态路由）
6. 月流量过万后接入 Ezoic 广告（无最低流量门槛，$20 起付）

## 运营节奏（对应 12 周计划）

- 每周 2 个新工具或变体页
- 每个工具页配 1 篇英文指南（利用现有公式区块扩展）
- Reddit r/FulfillmentByAmazon、r/shopify、r/EtsySellers 真实回答问题带链接
- Search Console 数据月度复盘：零展现的词砍掉，有展现的词加倍内容

## 品牌与设计

设计语言：**The Seller's Ledger**（卖家账本）
- 纸感底色 + 墨色文字 + 钞票绿强调色（利润）+ 印章红（费用）
- Fraunces（标题衬线）+ Archivo（正文）+ IBM Plex Mono（数字，等宽对齐）
- 结果面板做成"收据"：虚线分隔、点线引导、锯齿撕边、盖章徽标
