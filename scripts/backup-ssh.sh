#!/bin/bash
# 刷新 SSH 密钥备份到持久化工作区（在认证成功后运行）
# 用途：known_hosts 会随使用更新，定期刷新备份保持最新
set -euo pipefail

BACKUP="/workspace/.ssh-backup"

if [ ! -f ~/.ssh/id_ed25519 ]; then
  echo "错误：~/.ssh/id_ed25519 不存在，无可备份内容"
  exit 1
fi

mkdir -p "$BACKUP"
cp ~/.ssh/id_ed25519 ~/.ssh/id_ed25519.pub ~/.ssh/config "$BACKUP/"
[ -f ~/.ssh/known_hosts ] && cp ~/.ssh/known_hosts "$BACKUP/"
chmod 600 "$BACKUP/id_ed25519" "$BACKUP/config"

echo "✅ 备份已刷新到 $BACKUP："
ls -la "$BACKUP/"
echo "当前公钥指纹：$(ssh-keygen -lf ~/.ssh/id_ed25519.pub)"
