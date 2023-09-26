<template>
    <!--markdown vditor 组件-->
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
    },
    data() {
        // 声明类型
        let editor: Object | object | String | undefined;
        return {
            tags: [],
            editor,
        }
    },
    mounted() {
        // https://b3log.org/vditor/demo/vue.html 官方写法

        if (this.read) {
            // 只读
            // todo
            // console.log(this.content)
        } else {
            // 编辑器
            this.editor = new Vditor('vditor', {
                minHeight: 360,

                value: this.content,

                // 工具栏按钮
                toolbar: [
                    // 第一组
                    'headings', 'bold', 'italic', 'strike', 'link', '|',
                    // 第二组
                    'list', 'br', 'ordered-list', 'check', 'outdent', 'indent', '|',
                    // 第三组
                    'quote', 'code', 'inline-code', 'insert-after', 'insert-before', '|',
                    // 第四组
                    'table', 'edit-mode', 'both', '|',
                    // 第四组
                    'undo', 'redo', 'fullscreen', 'outline',
                ],

                comment: {
                    enable: true
                },

                toolbarConfig: {
                    pin: true,
                },
                // 计数器
                counter: {
                    enable: true,
                },
                cache: {
                    // 使用 localStorage 进行缓存
                    enable: false,
                },
                after: () => {
                    // this.editor.setValue('hello, Vditor + Vue!')
                },
            })

        }
    },
    watch: {
        // editor() {
        //     console.log("change")
        // }
    }
}
</script>

<style scoped>

</style>
