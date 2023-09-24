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

                        <a-overflow-list>
                            <a-tag style="margin: 12px 0" v-for="i in 15">tag {{ i }}</a-tag>
                        </a-overflow-list>

                        <a-typography>
                            <a-typography-text v-for="y in 20">
                                text <br>
                                text <br>
                                text <br>
                                text <br>
                                text <br>
                                text <br>
                                text <br>
                                text <br>
                            </a-typography-text>
                        </a-typography>
                    </a-page-header>
                </a-card>

                <!--评论区-->
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
                        <!--界面进度-->
                        <a-card>
                            <template #title>
                                目录
                            </template>
                            <template #extra>
                                收起
                                <icon-up/>
                            </template>
                            <a-anchor>
                                <a-anchor-link href="#basic">Basic</a-anchor-link>
                                <a-anchor-link href="#line-less">LineLess Mode</a-anchor-link>
                                <a-anchor-link href="#affix">
                                    Affix
                                    <template #sublist>
                                        <a-anchor-link href="#boundary">Scroll Boundary</a-anchor-link>
                                        <a-anchor-link href="#hash">Hash mode</a-anchor-link>
                                    </template>
                                </a-anchor-link>
                            </a-anchor>
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
            show_nav_user: false
        }
    },
    methods: {},
    beforeRouteEnter() {
    },
}
</script>
