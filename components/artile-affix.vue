<template>
    <!--文章左部悬浮按钮-->
    <a-affix :offset-top="290">
        <a-space style="float: right" fill :direction="'vertical'">
            <!--todo 全局保存当前页面作者信息-->
            <!--<a-trigger :mouse-enter-delay="1000" :popup-translate="[0, 10]">-->
            <!--    <a-avatar :size="48" style="box-shadow: 3px 3px 3px #0003;">-->
            <!--        <icon-user/>-->
            <!--    </a-avatar>-->

            <!--    <template #content>-->
            <!--        <a-card>-->
            <!--            用户信息-->
            <!--            <a-button :size="'large'" long>关注</a-button>-->

            <!--        </a-card>-->
            <!--    </template>-->
            <!--</a-trigger>-->

            <!--评论区-->
            <a-button :size="'large'" :shape="'circle'"
                      style="box-shadow: 3px 3px 3px #0003;width: 48px;height: 48px">
                <template #icon>
                    <icon-message style="font-size: 36px"/>
                </template>
            </a-button>

            <!--推荐-->
            <a-button :size="'large'" :shape="'circle'"
                      style="box-shadow: 3px 3px 3px #0003;width: 48px;height: 48px">
                <template #icon>
                    <icon-thumb-up style="font-size: 36px"/>
                </template>
            </a-button>

            <!--收藏-->
            <a-button :size="'large'" :shape="'circle'"
                      style="box-shadow: 3px 3px 3px #0003;width: 48px;height: 48px">
                <template #icon>
                    <icon-star style="font-size: 36px"/>
                </template>
            </a-button>

            <!--分享-->
            <a-button :size="'large'" :shape="'circle'"
                      style="box-shadow: 3px 3px 3px #0003;width: 48px;height: 48px">
                <template #icon>
                    <icon-share-internal style="font-size: 36px"/>
                </template>
            </a-button>

            <!--举报-->
            <a-button :size="'large'" :shape="'circle'"
                      style="box-shadow: 3px 3px 3px #0003;width: 48px;height: 48px">
                <template #icon>
                    <icon-exclamation-polygon-fill style="font-size: 36px"/>
                </template>
            </a-button>

            <!--回到顶部-->
            <a-back-top>
                <a-button :size="'large'" :shape="'circle'"
                          style="box-shadow: 3px 3px 3px #0003;width: 48px;height: 48px">
                    <template #icon>
                        <icon-to-top style="font-size: 36px"/>
                    </template>
                </a-button>
            </a-back-top>

        </a-space>
    </a-affix>
</template>

<script lang="ts">
export default {
    setup() {
        return {}
    },
}
</script>

<style scoped>

</style>
