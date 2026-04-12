# luci-theme-design-1 (AGENTS.md)

## 项目目标
这个仓库是 `luci-theme-design` 的个人 fork，目标是把原版主题迁移到 LuCI `24.10` 的 `ucode` 运行时，并保持：

- 登录页可用
- 侧边栏可展开且动画正常
- 图标映射兼容中英文菜单
- `status/index` 等现代 LuCI 视图有可接受的样式表现
- 默认安装后只注册主题，不强制切换当前主题

## 当前约束
- 上游原版 `luasrc/view/themes/design/*.htm` 仍保留，给旧版 Lua LuCI 使用。
- `24.10+` 兼容实现统一放在 `root/usr/share/ucode/luci/template/themes/design/`。
- 主题运行时依赖 `bootstrap` 的基础样式，所以 `header.ut` 必须加载：
  - `/luci-static/bootstrap/cascade.css`
  - `/luci-static/bootstrap/mobile.css`
- 自定义菜单渲染器在：
  - `htdocs/luci-static/resources/menu-design.js`
- 主题兼容补丁样式在：
  - `htdocs/luci-static/design/css/codex-compat.css`

## 资源准备
- `dev/` 目录视为可读源文件。
- 发布/打包前必须执行：

```sh
./scripts/prepare-package.sh
```

- 这个脚本会把 `dev/` 中的脚本和样式同步到 `htdocs/`，避免 Actions 打包到旧资源。

## 安装与验证
- 不要默认在用户路由器上直接替换当前主题；优先只安装包并注册 `luci.themes.Design`。
- 真机验证优先检查：
  - `/cgi-bin/luci/` 登录页
  - `/cgi-bin/luci/admin/status/overview`
  - `/cgi-bin/luci/admin/network/network`
  - `/cgi-bin/luci/admin/services/openclash`
- 若主题异常，先把路由器切回：

```sh
uci set luci.main.mediaurlbase='/luci-static/argon'
uci commit luci
/etc/init.d/uhttpd reload
```

## CI 目标
- GitHub Actions 负责拉取 OpenWrt SDK 并构建 `ipk`。
- 当前矩阵以 OpenWrt `24.10.0` 为基线，覆盖：
  - `x86/64`
  - `mediatek/filogic`
  - `ipq40xx/generic`
  - `ath79/generic`

## 提交原则
- 优先改 `root/usr/share/ucode/...`、`htdocs/luci-static/resources/menu-design.js`、`dev/script.js`。
- 若改了 `dev/script.js` / `dev/style.css` / `dev/design.js`，必须同步更新打包产物。
