// 全局状态

// 主题
export const GLOBAL_THEME = () => useState("theme", () => "light")
// TODO 切换主题flag时改动组件的配色

// 布局
export const GLOBAL_LAYOUT = () => useState("layout", () => "default")

// 语言
export const GLOBAL_LANG = () => useState("lang", () => "zh-CN")
