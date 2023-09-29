<template>
    <!--头部-->
    <a-layout-header>
        <!--左边菜单导航-->
        <a-menu mode="horizontal" :default-selected-keys="['1']">
            <!--项目logo-->
            <a-link>
                <a-image :preview="false" src="/favicon.ico"></a-image>
            </a-link>

            <a-menu-item key="1">
                <nuxt-link to="/">{{ $t("menu.index") }}</nuxt-link>
            </a-menu-item>

            <a-menu-item>
                <nuxt-link>{{ $t("menu.talks") }}</nuxt-link>
            </a-menu-item>

            <a-menu-item>
                <nuxt-link>{{ $t("menu.article") }}</nuxt-link>
            </a-menu-item>

            <a-menu-item>
                <nuxt-link>{{ $t("menu.qa") }}</nuxt-link>
            </a-menu-item>

            <a-menu-item>
                <nuxt-link>{{ $t("menu.store") }}</nuxt-link>
            </a-menu-item>

            <a-menu-item>
                <nuxt-link>{{ $t("menu.docs") }}</nuxt-link>
            </a-menu-item>
            <!--TODO 在元素之间均匀分配空间，并在首尾两端留有一半的空间-->

            <!--右边菜单-->
            <a-space size="large" style="float: right">

                <!--搜索框-->
                <a-input size="large" round style="top : auto ">
                    <template #prefix>
                        <icon-search></icon-search>
                    </template>
                </a-input>

                <!--用户登录-->
                <user-self></user-self>

                <!--发布按钮 鼠标靠近时展开一个下拉菜单-->
                <a-button-group size="large">
                    <!--左边按钮-->
                    <a-button type="primary" @click="writer_page">
                        <template #icon>
                            <icon-edit/>
                        </template>
                        {{ $t("menu.edit_space") }}
                    </a-button>

                    <!--右边下拉按钮-->
                    <a-popover v-model:popup-visible="drop_down" trigger="click" placement="bottom-end">
                        <a-button type="primary">
                            <template #icon>
                                <icon-caret-down :style="drop_down? 'transform: rotate(180deg)':''"/>
                            </template>
                        </a-button>

                        <template #content>
                            <a-doption>
                                写文章
                            </a-doption>
                            <a-doption>
                                发表话题
                            </a-doption>
                            <a-doption>
                                提问
                            </a-doption>
                        </template>
                    </a-popover>
                </a-button-group>

                <!--主题切换-->
                <a-button size="large" @click="change_theme()" :shape="'circle'">
                    <template #icon>
                        <icon-sun v-show="theme == 'light'"/>
                        <icon-moon v-show="theme != 'light'"/>
                    </template>
                </a-button>
            </a-space>

        </a-menu>
        <!--</a-affix>-->
    </a-layout-header>
</template>

<script lang="ts">

export default {
    setup() {
        // 获取主题
        const state = STATE()
        const quasar = useQuasar()
        return {
            theme: state.theme,
            // 切换主题
            change_theme() {
                let flag = state.theme == "light"
                if (flag) {
                    document.body.setAttribute('arco-theme', 'dark')
                    state.theme = "dark"
                } else {
                    document.body.removeAttribute('arco-theme')
                    state.theme = "light"
                }
                quasar.dark.set(flag)
            },
        }
    },
    data() {
        return {
            drop_down: false,
        }
    },
    methods: {
        theme() {
            $q.dark.set(!this.theme)
        }
    }
}
</script>
