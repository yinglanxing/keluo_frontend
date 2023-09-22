<template>
    <!--头部-->
    <!-- 设置导航栏宽度为自动-->
    <a-layout-header :style="{width: 'auto'}">
        <!--TODO-->
        <a-menu :default-selected-keys="['1']">
            <!--在元素之间均匀分配空间，并在首尾两端留有一半的空间-->
            <n-space justify="space-around">

                <!--使用左边菜单当导航栏-->
                <n-space>

                    <!--项目logo-->
                    <a-link>
                        <a-image src="/favicon.ico"></a-image>
                    </a-link>

                    <a-menu-item key="1">
                        <nuxt-link>首页</nuxt-link>
                    </a-menu-item>

                    <a-menu-item>
                        <nuxt-link>话题</nuxt-link>
                    </a-menu-item>

                    <a-menu-item>
                        <nuxt-link>文章</nuxt-link>
                    </a-menu-item>

                    <a-menu-item>
                        <nuxt-link>问答</nuxt-link>
                    </a-menu-item>

                    <a-menu-item>
                        <nuxt-link>硬件商城</nuxt-link>
                    </a-menu-item>

                    <a-menu-item>
                        <nuxt-link>{{ "文档" }}</nuxt-link>
                        <!--<nuxt-link>{{ $t("文档") }}</nuxt-link>-->
                    </a-menu-item>

                </n-space>

                <!--右边菜单-->
                <n-space>

                    <!--搜索框-->
                    <n-input size="large" round style="top : auto ">
                        <template #prefix>
                            <icon-search></icon-search>
                        </template>
                    </n-input>

                    <!--用户登录-->
                    <popup-login></popup-login>

                    <!--发布按钮 鼠标靠近时展开一个下拉菜单-->
                    <n-button-group size="large">
                        <!--左边按钮-->
                        <n-button color="#1e80ff">
                            <template #icon>
                                <icon-edit/>
                            </template>
                            {{ "创作中心" }}
                        </n-button>

                        <!--右边下拉按钮-->
                        <n-popover placement="bottom-end">

                            <template #trigger>
                                <n-button color="#1e80ff" style="width:8px">
                                    <template #icon>
                                        <icon-caret-down style="font-size: 14px"/>
                                    </template>
                                </n-button>
                            </template>
                            <!--推荐使用无边框组件包裹-->
                            <a-doption>
                                写文章
                            </a-doption>
                            <a-doption>
                                发表话题
                            </a-doption>
                            <a-doption>
                                提问
                            </a-doption>
                        </n-popover>
                    </n-button-group>

                    <!--主题切换-->
                    <n-button secondary size="large" @click="change_theme()" circle>
                        <template #icon>
                            <icon-sun v-show="theme == 'light'"/>
                            <icon-moon v-show="theme != 'light'"/>
                        </template>
                    </n-button>
                </n-space>
            </n-space>

        </a-menu>
    </a-layout-header>
</template>

<script lang="ts">

export default {
    setup() {
        // 获取主题
        const theme = GLOBAL_THEME()

        return {
            theme,
            // 切换主题
            change_theme() {
                let flag = theme.value == "light"
                if (flag) {
                    document.body.setAttribute('arco-theme', 'dark')
                    theme.value = "dark"
                } else {
                    document.body.removeAttribute('arco-theme')
                    theme.value = "light"
                }

            },
        }
    },
}
</script>
<style>
</style>
