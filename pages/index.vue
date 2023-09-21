<template>
    <!--主布局-->
    <!--todo 明天创建一下话题，文章等组件文件结构 --2023920-->
    <n-space justify="center">


        <!-- 首页左菜单-->
        <left-nav></left-nav>

        <!--列表-->
        <div style="max-width: 700px">
            <n-space vertical>
                <!--<n-card style="min-width: 700px" v-for="x in 20">-->
                <!--    只要是 看到天边云一朵<br>-->
                <!--    逐天拢有好心情-->
                <!--</n-card>-->
                <n-card v-for="q in 10">

                    <!--信息-->
                    <template #header>
                        <a-comment>
                            <template #avatar>
                                <!--弹出信息弹框-->
                                <popup-user></popup-user>
                            </template>

                            <template #author>
                                title
                            </template>

                            <template #content>
                                <n-space>
                                <span>
                                    <icon-heart-fill/>
                                    {{ 83 }}
                                </span>
                                    <span>
                                <icon-star-fill/>
                                    {{ 3 }}
                                </span>
                                    <span>
                                    <icon-message/>
                                    {{ 3 }}
                                </span>
                                    <span>
                                    <icon-eye></icon-eye>
                                    {{ 5 }}
                                </span>
                                </n-space>
                            </template>
                        </a-comment>
                    </template>

                    <!--更多操作-->
                    <template #header-extra>
                        <n-button circle>
                            <template #icon>
                                <icon-more-vertical/>
                            </template>
                        </n-button>
                    </template>

                    <n-space vertical>
                        <!--图片区-->
                        <n-space>
                            <a-image width="200" height="100"></a-image>
                            <a-image width="200" height="100"></a-image>
                            <a-image width="200" height="100"></a-image>
                        </n-space>

                        <!--文字部分-->
                        <n-skeleton text :repeat="2" :rows="2"></n-skeleton>
                    </n-space>
                </n-card>
            </n-space>
        </div>

        <!--右边组件-->

        <!--签到-->
        <index-right-sidebar></index-right-sidebar>

    </n-space>
</template>


<script lang="ts">
// arco 官方 布局示例
// https://arco.design/vue/component/layout#breakpoint

// import {defineComponent, ref} from 'vue';
// import {Message} from '@arco-design/web-vue';

export default {
    setup() {

        // 官方布局示例侧边栏参数

        // const collapsed = ref(false);
        // const onCollapse = (val: boolean, type: string) => {
        //     const content = type === 'responsive' ? '触发响应式收缩' : '点击触发收缩';
        //     Message.info({
        //         content,
        //         duration: 2000,
        //     });
        //     collapsed.value = val;
        // }
        // return {
        //     collapsed,
        //     onCollapse,
        // };
    },
}
</script>

<style scoped>
</style>
