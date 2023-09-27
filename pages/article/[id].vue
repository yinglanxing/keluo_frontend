<template>
    <a-grid :cols="24" :colGap="16" :rowGap="16">

        <!--页面左侧边栏-->
        <a-grid-item :span="2" style="overflow: hidden;padding: 15px">
            <artile-affix></artile-affix>
        </a-grid-item>

        <a-grid-item :span="16">

            <a-space fill :direction="'vertical'">
                <!--内容-->
                <a-card>
                    <!--页头-->
                    <a-page-header>
                        <template #title>
                            page title
                        </template>
                        <!--面包屑-->
                        <template #breadcrumb>
                            <a-breadcrumb>
                                <a-breadcrumb-item>Home</a-breadcrumb-item>
                                <a-breadcrumb-item>Channel</a-breadcrumb-item>
                                <a-breadcrumb-item>News</a-breadcrumb-item>
                            </a-breadcrumb>
                        </template>
                        <template #subtitle>
                            ArcoDesign Vue 2.0
                        </template>
                        <template #extra>
                            00:00
                        </template>

                        <markdown-support :callback="render_call_back" :read="true" :content="value"></markdown-support>

                        <a-divider></a-divider>

                        <a-overflow-list>
                            <a-tag style="margin: 12px 0" v-for="i in 15">tag {{ i }}</a-tag>
                        </a-overflow-list>
                    </a-page-header>
                </a-card>

                <!--评论区-->
                <comment></comment>

                <!--其他文章-->
                <a-card>

                    <a-card-meta>
                        <template #title>为你推荐</template>
                    </a-card-meta>


                    <a-list :bordered="false">
                        <a-list-item v-for="idx in 10" :key="idx">
                            <a-list-item-meta
                                title="Beijing Bytedance Technology Co"
                            >
                                <template #description>
                                    <a-space>

                                        <template #split>
                                            <a-divider direction="vertical"/>
                                        </template>
                                        <a-link>name</a-link>
                                        <a-typography-text type="secondary">time</a-typography-text>
                                        <a-typography-text>
                                            <icon-eye></icon-eye>
                                            33
                                        </a-typography-text>
                                        <a-typography-text>
                                            <icon-message></icon-message>
                                            12
                                        </a-typography-text>
                                    </a-space>
                                </template>
                            </a-list-item-meta>
                        </a-list-item>
                    </a-list>

                </a-card>

                <div style="margin: 12px;"></div>

            </a-space>
        </a-grid-item>


        <!--页面右侧边栏-->
        <a-grid-item :span="6">

            <a-space fill :direction="'vertical'">

                <!--页面作者的信息-->
                <a-card>
                    <a-row>
                        <a-col :span="24">
                            <popup-user></popup-user>
                            <a-divider :direction="'vertical'"></a-divider>
                            suer name
                        </a-col>
                        <a-col :span="24" style="margin: 8px;"></a-col>
                        <a-col :span="8">
                            文章:
                        </a-col>
                        <a-col :span="8">
                            阅读:
                        </a-col>
                        <a-col :span="8">
                            粉丝:
                        </a-col>
                        <a-col :span="24" style="margin: 8px;"></a-col>
                        <a-col :span="12" style="padding: 2px">
                            <a-button long :size="'large'">关注</a-button>
                        </a-col>
                        <a-col :span="12" style="padding: 2px">
                            <a-button long :size="'large'">私信</a-button>
                        </a-col>
                    </a-row>

                </a-card>

                <!--目录-->
                <a-affix :offsetTop="20">

                    <a-space fill :direction="'vertical'">
                        <a-card>
                            <template #title>
                                {{ $t("side.md_dir") }}
                            </template>
                            <!--markdown 目录-->
                            <markdown-dir v-show="show_md_dir" :ready="render_ready"></markdown-dir>
                        </a-card>

                        <!--推荐-->
                        <a-card>
                            <template #title>
                                精选内容
                            </template>

                            <a-list :bordered="false" :size="'small'">
                                <a-list-item v-for="idx in 10">
                                    <a-list-item-meta title="Beijing Bytedance Technology Co">
                                    </a-list-item-meta>
                                </a-list-item>
                            </a-list>
                        </a-card>
                    </a-space>

                </a-affix>

            </a-space>

        </a-grid-item>
    </a-grid>

</template>

<script lang="ts">

export default {
    data() {
        return {
            render_ready: false,
            show_nav_user: false,
            value: ""
        }
    },
    methods: {
        // 页面渲染结束
        render_call_back() {
            // 通知渲染目录
            this.render_ready = true
            // 切换目录状态
        },
    },
    beforeRouteEnter() {
    },
}
</script>
