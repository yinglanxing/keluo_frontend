<template>
    <!--markdown 组件-->
    <div id="vditor"></div>
</template>

<script lang="ts">
// markdown 支持
import Vditor from "vditor";
import "vditor/dist/index.css"

export default {
    props: {
        // 内容
        // todo 实时获取markdown内容
        content: {
            type: String,
            default: ""
        },
        // 只读
        read: {
            type: Boolean,
            default: false
        },
    },
    setup() {
        // 绑定状态
        const state = STATE()
        return {
            state,
        }
    },
    data() {
        // 声明类型
        let editor: Vditor | undefined;
        return {
            tags: [],
            editor,
        }
    },
    mounted() {
        // https://b3log.org/vditor/demo/vue.html 官方写法

        if (this.read) {
            // 只读模式
            let dom = document.querySelector('#vditor') as HTMLDivElement | null;
            if (dom) {
                // 写入 markdown
                Vditor.preview(dom, this.content)
            }
        } else {
            // 编辑器
            this.editor = new Vditor('vditor', {
                minHeight: 360,

                // 预览模式顶部选项
                preview: {
                    actions: []
                },

                value: this.content,

                // 工具栏按钮
                toolbar: [
                    // 第一组
                    'headings', 'bold', 'italic', 'strike', 'link', '|',
                    // 第二组
                    'list', 'br', 'ordered-list', 'check', 'outdent', 'indent', '|',
                    // 第三组
                    'quote', 'code', 'inline-code', 'insert-after', 'insert-before', 'table', '|',
                    // 第四组
                    'outline', 'edit-mode', 'preview', 'undo', 'redo', 'fullscreen',
                ],

                toolbarConfig: {
                    pin: true,
                },
                counter: {
                    // 计数器
                    enable: true,
                },
                cache: {
                    // 使用 localStorage 进行缓存
                    enable: false,
                },
                after: () => {
                },
            })
        }
    },
    watch: {
        // 主题切换
        "state.theme"() {
            // 判断含有 object 且主题为暗色
            if (this.editor && this.state.theme == "dark") {
                this.editor.setTheme("dark")
            } else {
                this.editor?.setTheme("classic")
            }
        }
    }
}
</script>

<style scoped>
</style>
