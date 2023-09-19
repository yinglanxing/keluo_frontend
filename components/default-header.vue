<template>
    <!--头部-->
    <a-layout-header>
        <!--TODO-->
        <a-menu :default-selected-keys="[]">

            <n-space justify="space-around">

                <!--左边菜单-->
                <n-space>
                    <!--项目logo-->
                    <a-avatar :style="{ backgroundColor: '#09f' }">科洛</a-avatar>

                    <a-menu-item key="home">
                        {{ "首页" }}
                    </a-menu-item>

                    <a-menu-item key="2">
                        {{ "话题" }}
                    </a-menu-item>

                    <a-menu-item key="3">
                        {{ "文章" }}
                    </a-menu-item>
                </n-space>

                <!--右边菜单-->
                <n-space>
                    <!--搜索框-->
                    <n-input size="large" round>
                        <template #prefix>
                            <icon-search></icon-search>
                        </template>
                    </n-input>

                    <n-button secondary size="large" type="info">{{ "发布" }}</n-button>
                    <n-button secondary size="large" type="primary">{{ "登录" }}</n-button>

                    <!--主题切换-->
                    <n-button secondary size="large" @click="change_theme()" circle>
                        <template #icon>
                            <icon-sun v-show="!theme_style"/>
                            <icon-moon v-show="theme_style"/>
                        </template>
                    </n-button>
                </n-space>

            </n-space>

        </a-menu>
    </a-layout-header>
</template>

<script lang="ts">
export default {

    data() {
        return {
            // 主题 flag
            theme_style: false,
        }
    },
    methods: {
        // 切换主题
        change_theme() {
            // 切换 flag
            this.theme_style = !this.theme_style
        },
        // TODO 点击跳转路由
        chang_route(key: string) {
            // Message.info({content: `select ${key}`, showIcon: true});
        }
    },
    // 监听
    watch: {
        // TODO 切换主题flag时改动组件的配色
        theme_style() {
        },
    }
}
</script>
