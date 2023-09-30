export default defineNuxtPlugin((nuxtApp) => {
    // 页面加载结束后
    nuxtApp.hook('page:finish', () => {
        let dom_plain = document.querySelector(".max-cover-box")
        if (dom_plain) {
            dom_plain.className = ""
            dom_plain.style.display = "none"
            document.body.style.overflow = "auto"
        }
    })

    // 页面开始切换时
    nuxtApp.hook('page:start', () => {
        // console.log("start")
    })
})
