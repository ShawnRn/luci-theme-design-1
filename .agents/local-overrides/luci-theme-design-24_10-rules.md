# luci-theme-design 24.10 local rules

- 优先修 `ucode` 模板，不要再把新逻辑塞回旧 `luasrc/view/themes/design/*.htm`。
- 任何与侧栏交互、动画、当前菜单高亮有关的修复，优先落到：
  - `htdocs/luci-static/resources/menu-design.js`
  - `dev/script.js`
- 任何只为了 24.10 适配的 CSS 修复，优先放进：
  - `htdocs/luci-static/design/css/codex-compat.css`
- 不要让包安装时强制切换当前主题。
