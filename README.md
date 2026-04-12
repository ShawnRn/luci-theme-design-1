<div align="center">
  <h1 align="center">
    LuCI design theme for OpenWrt
  </h1>
<a href="/LICENSE">
    <img src="https://img.shields.io/github/license/gngpp/luci-theme-design?style=flat&a=1" alt="">
  </a>
  <a href="https://github.com/gngpp/luci-theme-design/pulls">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="">
  </a><a href="https://github.com/gngpp/luci-theme-design/issues/new">
    <img src="https://img.shields.io/badge/Issues-welcome-brightgreen.svg?style=flat">
  </a><a href="https://github.com/gngpp/luci-theme-design/releases">
    <img src="https://img.shields.io/github/release/gngpp/luci-theme-design.svg?style=flat">
  </a><a href="hhttps://github.com/gngpp/luci-theme-design/releases">
    <img src="https://img.shields.io/github/downloads/gngpp/luci-theme-design/total?style=flat&?">
  </a>
</div>
<br>

# luci-theme-design

这个 fork 面向 `OpenWrt / ImmortalWrt 24.10` 的 LuCI `ucode` 运行时做了兼容整理，目标是保留原版 Design 的视觉与交互，同时避免：

- 登录页模板直接报错
- 侧边栏不渲染或不能展开
- 图标映射丢失
- 主题安装后自动抢占当前主题

## 当前 fork 额外内容

- 新增 `ucode` 版 `header/footer/sysauth` 模板
- 新增 `menu-design.js`，兼容 24.10 的菜单树渲染
- 新增 `codex-compat.css` 处理登录页、侧栏、图标和内容区布局
- GitHub Actions 可为多个 `OpenWrt 24.10.0` 目标架构构建 `ipk`
- `scripts/prepare-package.sh` 用于把 `dev/` 资源同步到打包目录

## 注意

- 默认不会自动切换当前 LuCI 主题
- macOS 本地无法直接运行 Linux OpenWrt SDK，实际构建应交给 GitHub Actions

 luci-theme-design 是一个针对移动端和PC端的沉浸式WebApp体验和优化的OpenWrt LuCI主题
- **luci-theme-design**基于luci-theme-neobird二次开发, 适用于[lede](https://github.com/coolsnowwolf/lede)
- main支持lede源码的lua版本
- js分支开始由[papagaye744](https://github.com/papagaye744)维护

- 你可以使用[插件](https://github.com/gngpp/luci-app-design-config)定义一些设置
  - 支持更改主题深色/浅色模式
  - 支持显示/隐藏导航栏
  - 支持更换常用的代理图标

### 主要特点

- 适配移动端响应式优化，适合手机端做为WebApp使用
- 修改和优化了很多插件显示，完善的设备icon图标，视觉统一
- 简洁的登录界面，底部导航栏，类App的沉浸式体验
- 适配深色模式，适配系统自动切换，插件式自定义模式
- 支持插件式配置主题
- 流畅度比肩bootstrap

### 体验WebApp方法

- 在移动端(iOS/iPadOS、Android谷歌)浏览器打开设置管理，添加到主屏幕即可。

### 编译

```
git clone https://github.com/gngpp/luci-theme-design.git  package/luci-theme-design
make menuconfig # choose LUCI->Theme->Luci-theme-design  
make V=s
```

### Q&A

- 有bug欢迎提issue
- 主题个人配色可能会不符合大众胃口，欢迎提配色建议

### 预览

<details> <summary>iOS</summary>
<img src="./preview/webapp_home.PNG"/>
<img src="./preview/webapp_vssr.PNG"/>
</details>

<details> <summary>iPadOS</summary>
<img src="./preview/IMG_0328.PNG"/>
<img src="./preview/IMG_0329.PNG"/>
</details>

<img src="./preview/login.png"/>
<img src="./preview/login1.png"/>
<img src="./preview/page.png"/>
<img src="./preview/home.png"/>
<img src="./preview/light.png"/>
<img src="./preview/home1.png"/>
<img src="./preview/wifi.png"/>
<img src="./preview/iface.png"/>
<img src="./preview/firewall.png"/>
