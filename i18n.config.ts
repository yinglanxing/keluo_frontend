import zhCN from "~/locale/zh-CN";
// 国际化组件
export default defineI18nConfig(() => ({
        // legacy: false,
        // 默认语言
        locale: 'zh',
        // 回退语言
        fallbackLocale: 'zh',
        // 回退通知关闭
        silentFallbackWarn: true,

        // 国际化内容
        messages: {
            'zh': zhCN,
        }
    })
)
