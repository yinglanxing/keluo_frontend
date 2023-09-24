export default defineNuxtPlugin((nuxtApp) => {
    // nuxtApp.hook('', () => {
    //     console.log("start")
    //     document.body.style.overflow  = "hidden"
    // })
    nuxtApp.hook('page:transition:start', () => {
        let value = GLOBAL_LAYOUT()
        console.log("value", 1)
    })
    nuxtApp.hook('page:finish', () => {
        // 加载结束后隐藏遮挡板
        let dom_plain = document.querySelector("#onload_plain_id")
        if (dom_plain) {
            dom_plain.className = ""
            dom_plain.style.display = "none"
        }
        document.body.style.overflow = "auto"
        console.log("finish")
    })
})
