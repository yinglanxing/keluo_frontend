<template>

    <!-- 主布局，style 自适应屏幕高度 -->
    <a-layout class="layout-demo" style="height: 100vh">


        <a-layout>
            <a-layout-header>
                <a-menu>

                    <n-space justify="space-around">

                        <!--顶部菜单-->
                        <n-space>

                            <!--项目logo-->
                            <a-avatar :style="{ backgroundColor: '#00d0b6' }">科洛</a-avatar>

                            <a-menu-item key="0_1">
                                {{ "首页" }}
                            </a-menu-item>

                            <a-menu-item key="0_1">
                                {{ "话题" }}
                            </a-menu-item>

                            <a-menu-item key="0_1">
                                {{ "文章" }}
                            </a-menu-item>
                        </n-space>

                        <n-space>
                            <!--搜索框-->
                            <n-input size="large">
                                <template #prefix>
                                    <icon-search></icon-search>
                                </template>
                            </n-input>

                            <n-button secondary size="large" type="info">{{ "发布" }}</n-button>
                            <n-button secondary size="large" type="primary">{{ "登录" }}</n-button>

                            <!--主题切换-->
                            <n-button secondary size="large" v-if="theme_style" @click="chane_theme()" circle>
                                <icon-sun/>
                            </n-button>
                            <n-button secondary size="large" v-else @click="chane_theme()" circle>
                                <icon-moon/>
                            </n-button>
                        </n-space>

                    </n-space>


                    <!--面包屑菜单-->
                    <a-sub-menu key="1">
                        <template #title>
                            <span><IconCalendar/>Navigation 1</span>
                        </template>
                        <a-menu-item key="1_1">Menu 1</a-menu-item>
                        <a-menu-item key="1_2">Menu 2</a-menu-item>
                        <a-sub-menu key="2" title="Navigation 2">
                            <a-menu-item key="2_1">Menu 1</a-menu-item>
                            <a-menu-item key="2_2">Menu 2</a-menu-item>
                        </a-sub-menu>
                        <a-sub-menu key="3" title="Navigation 3">
                            <a-menu-item key="3_1">Menu 1</a-menu-item>
                            <a-menu-item key="3_2">Menu 2</a-menu-item>
                            <a-menu-item key="3_3">Menu 3</a-menu-item>
                        </a-sub-menu>
                    </a-sub-menu>
                    <a-sub-menu key="4">
                        <template #title>
                            <span><IconCalendar/>Navigation 4</span>
                        </template>
                        <a-menu-item key="4_1">Menu 1</a-menu-item>
                        <a-menu-item key="4_2">Menu 2</a-menu-item>
                        <a-menu-item key="4_3">Menu 3</a-menu-item>
                    </a-sub-menu>
                </a-menu>
            </a-layout-header>

            <!--页脚-->
            <a-layout style="padding: 0 24px">
                <a-breadcrumb :style="{ margin: '16px 0' }">
                    <a-breadcrumb-item>Home</a-breadcrumb-item>
                    <a-breadcrumb-item>List</a-breadcrumb-item>
                    <a-breadcrumb-item>App</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content>Content</a-layout-content>
                <a-layout-footer>Footer</a-layout-footer>
            </a-layout>
        </a-layout>
    </a-layout>
</template>


<script lang="ts">
// arco 官方 布局实例
// https://arco.design/vue/component/layout#breakpoint
// TODO: 转TS格式

import {defineComponent, ref} from 'vue';
import {Message} from '@arco-design/web-vue';
import {
    IconSun,
    IconMoon,
    IconHome,
    IconSearch,
    IconCalendar,
} from '@arco-design/web-vue/es/icon';

export default defineComponent({
    components: {
        IconSun,
        IconMoon,
        IconHome,
        IconSearch,
        IconCalendar,
    },
    setup() {
        const collapsed = ref(false);
        const onCollapse = (val: boolean, type: string) => {
            const content = type === 'responsive' ? '触发响应式收缩' : '点击触发收缩';
            Message.info({
                content,
                duration: 2000,
            });
            collapsed.value = val;
        }
        return {
            collapsed,
            onCollapse,
            theme_style: false,
        };
    },
    methods: {
        // 查询
        chane_theme() {
            this.theme_style = !this.theme_style
            console.log(this.theme_style)
        },
        //
        onClickMenuItem(key: string) {
            // Message.info({content: `You select ${key}`, showIcon: true});
        }
    }
});
</script>

<style scoped>
</style>
