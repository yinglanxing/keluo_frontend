<template>
    <!--主布局-->
    <n-space justify="center">


        <!-- 首页左菜单-->
        <left-nav></left-nav>

        <!--列表-->
        <n-card>
            <n-card style="min-width: 500px" v-for="x in 20">
                只要是 看到天边云一朵<br>
                逐天拢有好心情
            </n-card>
        </n-card>

    <!--右边组件-->

            <!--签到-->
            <checkin></checkin>

        </a-space>

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
