<template>
    <!--创建页面-->
    <a-card>
        <a-grid :cols="12" :col-gap="24" :row-gap="24">
            <!--title-->
            <a-grid-item :span="12">
                <a-input placeholder="title" :size="'large'" allow-clear></a-input>
            </a-grid-item>

            <!--内容-->
            <a-grid-item :span="12">
                <markdown-support v-model:content="content"></markdown-support>
            </a-grid-item>

            <!--tags组件 唯一值 可清空-->
            <a-grid-item :span="12">
                <a-input-tag placeholder="tags" unique-value v-model:model-value="tags" :size="'large'" allow-clear/>
            </a-grid-item>
            <!--tags组件 唯一值 可清空-->
            <a-grid-item :span="12">
                <a-button>提交</a-button>
            </a-grid-item>
        </a-grid>
    </a-card>
</template>

<script lang="ts">
export default {
    setup() {
    },
    data() {
        return {
            // 标题
            title: "",

            // 标签
            tags: [],

            // 绑定内容
            content: "",
        }
    },
    mounted() {
    },
}
</script>

<style scoped>

</style>
