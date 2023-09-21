<template>
    <!--主布局-->
    <!--todo 明天创建一下话题，文章等组件文件结构 --2023920-->
    <n-space justify="center">
        <n-space vertical>
            <n-card v-for="q in 10">

                <!--信息-->
                <template #header>
                    <a-comment>
                        <template #avatar>
                            <!--弹出信息弹框-->
                            <popup-user></popup-user>
                        </template>

                        <template #author>
                            user name
                        </template>

                        <template #content>
                            <n-time></n-time>
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

                <n-h3>
                    title {{ q }}
                </n-h3>

                <a-input-tag style="margin-bottom: 6px" :default-value="['tag1', 2]" readonly/>

                <n-space vertical>
                    <!--文字部分-->
                    <n-skeleton text :repeat="2" :rows="2"></n-skeleton>

                    <!--图片区-->
                    <n-space>
                        <a-image width="200" height="100"></a-image>
                        <a-image width="200" height="100"></a-image>
                        <a-image width="200" height="100"></a-image>
                    </n-space>
                </n-space>

                <!--底部图标-->
                <!--<template #action>-->
                <template #footer>
                    <n-space justify="end">
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
            </n-card>

            <!--翻页器-->
            <a-pagination :total="100" show-jumper/>
            <a-pagination :total="100" simple/>
            <n-pagination :page-count="100" show-quick-jumper></n-pagination>
            <n-pagination :page-count="100" simple></n-pagination>
        </n-space>

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
