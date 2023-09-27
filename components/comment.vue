<template>
    <!--评论组件-->
    <a-card>
        <a-card-meta>
            <template #title>评论</template>
        </a-card-meta>

        <a-comment>
            <template #avatar>
                <popup-self></popup-self>
            </template>
            <template #author>user name</template>
            <a-textarea></a-textarea>
        </a-comment>


        <a-comment
            author="Socrates"
            avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
            content="Comment body content."
            datetime="1 hour"
        >
            <template #actions>
                <span class="action"> <IconMessage/> Reply </span>
            </template>
            <a-comment
                author="Balzac"
                avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9eeb1800d9b78349b24682c3518ac4a3.png~tplv-uwbnlip3yd-webp.webp"
                content="Comment body content."
                datetime="1 hour"
            >
                <template #actions>
                    <span class="action"> <IconMessage/> Reply </span>
                </template>
                <a-comment
                    author="Austen"
                    avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp"
                    content="Reply content"
                    datetime="1 hour"
                >
                    <template #actions>
                        <span class="action"> <IconMessage/> Reply </span>
                    </template>
                </a-comment>
                <a-comment
                    author="Plato"
                    avatar="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
                    content="Reply content"
                    datetime="1 hour"
                >
                    <template #actions>
                        <span class="action"> <IconMessage/> Reply </span>
                    </template>
                </a-comment>
            </a-comment>
        </a-comment>
    </a-card>

</template>

<script lang="ts">

</script>

<style scoped>

</style>
