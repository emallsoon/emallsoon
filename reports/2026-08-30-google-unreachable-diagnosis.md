# Google 不可达根因排查报告 — 2026-08-30

任务：诊断沙箱内为何无法访问 Google（含 GSC）。结论已用多组对照实验闭环验证。

## 最终结论

**沙箱网络出口位于中国大陆（天津电信，出口 IP 180.184.33.18），受 GFW 封锁。
Google 全系服务在 IP 层与 DNS 层同时被墙，无法从沙箱访问，且无技术绕行手段。**

## 证据链（按排查顺序）

### 1. 现象层

- 直连 `www.google.com`：TCP 失败
- 走代理（127.0.0.1:18080）：CONNECT 返回 200，但 TLS 握手阶段 `unexpected eof`
- 同代理下 Bing / GitHub / Cloudflare / 阿里 DoH 全部正常

### 2. DNS 层：域名选择性污染

| 域名 | 沙箱 DNS 返回值 | 判定 |
|------|----------------|------|
| www.google.com | `2001::1` | ❌ 假 IP（污染） |
| facebook.com | `2001::1` | ❌ 假 IP（污染） |
| twitter.com | `2001::1` | ❌ 假 IP（污染） |
| youtube.com | `2001::1` | ❌ 假 IP（污染） |
| www.gstatic.com | `220.181.174.98` | ❌ 百度 IP（污染重定向） |
| bing.com | `2620:1ec:33::10` | ✅ 真实微软 IP |
| github.com | `20.205.243.166` | ✅ 真实 |
| emallsoon.com | `2606:4700:3032::6815:40d6` | ✅ 真实 Cloudflare |

`2001::1` 是 GFW 对被封域名的典型污染应答特征。外部 UDP 53（8.8.8.8 等）被出口
防火墙拦截（超时），1.1.1.1 DoH 亦不可达，无法获得未污染解析。

### 3. IP 层：Google 网段被丢弃（与 SNI 无关）

- 直连（不走代理）TCP 443：`142.250.190.36` / `172.217.14.100` /
  `216.58.214.36` / `8.8.8.8` 全部失败
- 走代理 CONNECT 到真实 Google IP（绕过 DNS）：同样失败
- 走代理 CONNECT 到 Cloudflare IP：成功拿到真实 `emallsoon.com` 证书
- **无 SNI** 连 Google IP：同样失败 → 排除 SNI 过滤，确证 IP 层封锁

### 4. 归属地确认

出口 IP 查询：`180.184.33.18 — 中国 天津 电信`。沙箱直连与代理上游均从中国出口，
受 GFW 约束，与上述所有现象完全自洽。

## 排查中纠正的误判（重要方法论）

1. **误判一：SNI 过滤**。曾用"同一 IP 换 SNI"实验（Bing IP + google SNI 失败、
   + bing SNI 成功）得出出口做 SNI 检测的结论。复核发现：CDN 服务器端对不认识的
   SNI 会直接关闭连接（正常路由行为），并非出口封锁。补做"无 SNI 连 Google IP"
   实验后推翻该结论。
2. **误判二：以为代理会校验上游**。本地代理是"乐观型"——CONNECT 先回 200 再连上游，
   对不存在的域名同样回 200（已实测）。因此"CONNECT 200 + TLS eof"只说明上游不通，
   不能说明出口在检测 TLS 内容。

## 对项目的影响与对策

| 事项 | 影响 | 对策 |
|------|------|------|
| GSC（Search Console）面板 | ❌ 沙箱不可达 | 用户本机查看后转述；或用 Bing 数据近似 |
| Search Console API | ❌ 同被墙（googleapis.com） | 无法程序化拉取 |
| Bing Webmaster Tools | ✅ 可用（走代理） | 沙箱浏览器直接操作（已验证可登录） |
| 网站部署/验证（Cloudflare、GitHub、emallsoon.com） | ✅ 不受影响 | 维持现状 |
| 每日费率核查（各平台官网） | ✅ 不受影响 | Amazon/Shopify/Etsy/eBay/TikTok 官网均可达 |

## 已同步的文档修正

- `scripts/setup-browser.sh`：修正 f60269e 提交中错误的"SNI 过滤"归因注释
- `AGENTS.md`：新增"网络出口与封锁档案"章节（含封锁矩阵与排查方法论）
