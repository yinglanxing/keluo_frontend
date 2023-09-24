<template>
    <!--<a-affix :offset-top="75">-->

    <a-space direction="vertical">

        <a-card>

            <a-card-meta>
                <template #title>
                    <icon-github/>
                    {{ "开源热榜" }}
                </template>
            </a-card-meta>

            <a-space style="margin-top: 12px" fill :size="'medium'" :direction="'vertical'">
                <!--<a-space fill :direction="'vertical'">-->
                <!--    <a-space v-for="idx in 7">-->
                <!--        <a-tag>-->
                <!--            <icon-arrow-up v-if="idx % 2 "/>-->
                <!--            <icon-arrow-down v-else/>-->
                <!--            {{ idx }}-->
                <!--        </a-tag>-->
                <!--        <a-comment style="width: auto" :align="'right'">-->
                <!--            <template #author>title {{ idx }}</template>-->
                <!--            <template #content>-->
                <!--                <a-space>-->
                <!--                    <icon-star/>-->
                <!--                    {{ 14 }}-->
                <!--                    <icon-subscribe-add/>-->
                <!--                    {{ 14 }}-->
                <!--                    <icon-branch/>-->
                <!--                    {{ 14 }}-->
                <!--                </a-space>-->
                <!--            </template>-->
                <!--            <template #datetime>-->
                <!--                <a-tag color="#f00" style="border-radius: 5px">hot</a-tag>-->
                <!--            </template>-->
                <!--        </a-comment>-->
                <!--    </a-space>-->
                <!--</a-space>-->

                <!--todo 图标 图片-->
                <a-typography v-for="idx in 7" style="overflow: hidden">
                    <!--<a-tag>-->
                    {{ idx }}
                    <icon-arrow-rise :size="20" style="color: red" v-if="idx % 4 "/>
                    <icon-arrow-fall :size="20" style="color: #f90" v-else/>
                    <!--</a-tag>-->
                    title {{ idx }} project
                    <a-typography-text style="float: right">
                        <!--<a-divider :direction="'vertical'"></a-divider>-->
                        <icon-star/>
                        <!--todo 小于1k显示具体关注数-->
                        <!--{{ Math.ceil(Math.random() * 100) }} K-->
                        {{ 100 - idx * 8 }} K
                        <a-tag color="#f00" style="border-radius: 15px" v-if="idx % 3">热</a-tag>
                        <a-tag color="#09f" style="border-radius: 15px" v-else>新</a-tag>
                    </a-typography-text>
                </a-typography>

                <a-button long>完整榜单</a-button>
            </a-space>
        </a-card>

        <!--热门tag-->
        <a-card>
            <a-space wrap>
                <a-tag checkable v-for="i in 75">
                    {{ i }}
                    <!--<a-typography-text v-if="i % 3 == 0">{{ Math.random() }}</a-typography-text>-->
                    <!--<a-typography-text v-else>#tags {{ i }}</a-typography-text>-->
                </a-tag>
            </a-space>
        </a-card>

    </a-space>
    <!--</a-affix>-->
</template>

<script lang="ts">
export default {
    data() {
        return {}
    },
}
</script>

<style scoped>
</style>
