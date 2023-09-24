<template>
    <!--主布局-->
    <!--todo 明天创建一下话题，文章等组件文件结构 --2023920-->

    <a-grid :cols="24" :colGap="16" :rowGap="16">

        <!--页面左侧边栏-->
        <a-grid-item :span="5">
            <default-left-sidebar></default-left-sidebar>
        </a-grid-item>

        <!--页面内容-->
        <a-grid-item :span="14">
            <!-- 顶部nav-->
            <default-nav></default-nav>

            <a-space direction="vertical" fill>
                <a-card v-for="q in 10">
                    <a-card-meta>
                        <template #title>
                            <a-comment align="right">
                                <template #avatar>
                                    <!--弹出信息弹框-->
                                    <popup-user></popup-user>
                                </template>

                                <template #datetime>
                                    time:00:00:00
                                </template>

                                <template #author>
                                    user name
                                </template>

                                <template #content>

                                </template>
                            </a-comment>
                        </template>

                        <template #description>

                            <a-typography>
                                <!--标题-->
                                <nuxt-link :to="'/article/' + q" style="color: var(--color-neutral-1);">
                                    <a-typography-title :heading="5">
                                        title {{ q }}
                                    </a-typography-title>
                                </nuxt-link>

                                <!--标签-->
                                <!--<a-typography-paragraph>-->
                                <!--</a-typography-paragraph>-->
                                <!--<a-input-tag :max-tag-count="5" style="margin-bottom: 6px"-->
                                <!--             :default-value="Array(10).fill('#tags')" readonly/>-->

                                <!--文字部分-->
                                <!--<a-typography-paragraph>-->
                                <!--</a-typography-paragraph>-->
                            </a-typography>

                            <a-overflow-list>
                                <a-tag style="margin: 12px 0" v-for="i in 15">tag {{ i }}</a-tag>
                            </a-overflow-list>

                            <a-space direction="vertical" fill>
                                <!--文字占位-->
                                <a-skeleton-line :rows="2"></a-skeleton-line>

                                <!--图片区-->
                                <a-space wrap>
                                    <a-image width="200" height="100"></a-image>
                                    <a-image width="200" height="100"></a-image>
                                    <a-image width="200" height="100"></a-image>
                                </a-space>
                            </a-space>

                        </template>
                    </a-card-meta>

                    <!--底部图标-->
                    <template #actions>

                        <!--更多操作-->
                        <!--<a-space fill :align="'start'">-->
                        <!--    <a-button>-->
                        <!--        <template #icon>-->
                        <!--            <icon-more-vertical/>-->
                        <!--        </template>-->
                        <!--    </a-button>-->
                        <!--</a-space>-->

                        <a-button :shape="'round'">
                            <template #icon>
                                <!--<icon-heart/>-->
                                <icon-heart-fill/>
                            </template>
                            {{ 3 }}
                        </a-button>

                        <a-button :shape="'round'">
                            <template #icon>
                                <!--<icon-star/>-->
                                <icon-star-fill/>
                            </template>
                            {{ 3 }}
                        </a-button>

                        <a-button :shape="'round'">
                            <template #icon>
                                <icon-message/>
                            </template>
                            {{ 3 }}
                        </a-button>

                        <a-button :shape="'round'">
                            <template #icon>
                                <icon-eye/>
                            </template>
                            {{ 5 }}
                        </a-button>
                    </template>
                </a-card>

                <!--翻页器-->
                <a-pagination :total="100" show-jumper/>
            </a-space>

        </a-grid-item>


        <!--页面右侧边栏-->
        <a-grid-item :span="5">
            <default-right-sidebar></default-right-sidebar>
        </a-grid-item>
    </a-grid>

</template>


<script lang="ts">
export default {
    setup() {

    },
}
</script>

<style scoped>
</style>
