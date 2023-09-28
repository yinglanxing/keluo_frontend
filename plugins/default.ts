export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('page:finish', () => {
        // 加载结束后隐藏遮挡板
        let dom_plain = document.querySelector(".max-cover-box")
        if (dom_plain) {
            dom_plain.className = ""
            dom_plain.style.display = "none"
            document.body.style.overflow = "auto"
        }
    })
})
