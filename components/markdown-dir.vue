<template>
    <!--markdown 目录-->
    <div id="vditor-dir"></div>
</template>

<script lang="ts">
// markdown 支持
import Vditor from "vditor";
import "vditor/dist/index.css"

export default {
    props: {
        ready: {
            style: Boolean,
            default: false,
        }
    },
    methods: {
        init() {
            // 选中目标
            let dom_main = document.querySelector('#vditor') as HTMLDivElement | null;
            let dom = document.querySelector('#vditor-dir') as HTMLDivElement | null;
            if (dom_main && dom) {
                // 写入 markdown 目录
                Vditor.outlineRender(dom_main, dom)
                dom.style.display = 'block'
            }
        }
    },
    watch: {
        // 监听 ready 切换
        ready() {
            this.init()
        }
    },
}
</script>

<style scoped>

</style>
