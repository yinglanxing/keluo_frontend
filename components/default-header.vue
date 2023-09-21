<template>
    <!--头部-->
  <!-- 设置导航栏宽度为自动-->
    <a-layout-header :style="{
      width: 'auto'
    }">
        <!--TODO-->
        <a-menu :default-selected-keys="['/']">
<!--          在元素之间均匀分配空间，并在首尾两端留有一半的空间-->
            <n-space justify="space-around">

                <!--使用左边菜单当导航栏-->
                <n-space>

                    <!--项目logo-->
                    <!--<a-avatar :style="{ backgroundColor: '#09f' }">科洛</a-avatar>-->
                    <a-link>
                      <a-image src="/favicon.ico"></a-image>
                    </a-link>

                    <a-menu-item key="/">
<!--                        {{ "首页" }}-->
                       <nuxt-link to="/">首页</nuxt-link>
                    </a-menu-item>

                    <a-menu-item key="/talks">
<!--                        {{ "话题" }}-->
                       <nuxt-link to="/talks">话题</nuxt-link>
                    </a-menu-item>

                    <a-menu-item key="3">
<!--                        {{ "文章" }}-->
                      <nuxt-link to="/">文章</nuxt-link>
                    </a-menu-item>

                    <a-menu-item key="4">
<!--                        {{ "问答" }}-->
                        <nuxt-link to="/">问答</nuxt-link>
                    </a-menu-item>

                    <a-menu-item key="5">
<!--                      {{ "组件商城" }}-->
                      <nuxt-link to="/">硬件商城</nuxt-link>
                    </a-menu-item>

                    <a-menu-item key="6">
<!--                      {{ "文档" }}-->
                      <nuxt-link to="/">文档</nuxt-link>
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

                    <!--发布按钮 鼠标靠近时展开一个下拉菜单-->
                    <a-dropdown>
                      <n-button secondary size="large" type="info" shape="round">
                        <template #icon>
                          <icon-edit/>
                        </template>
                        {{ "创作中心" }}
                      </n-button>
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
                    </a-dropdown>

                  <!--弹窗登录-->
                  <popup-login></popup-login>

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

  setup() {
    // TODO setup
  },

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
        },
    },
    // 监听
    watch: {
        // TODO 切换主题flag时改动组件的配色
        theme_style() {
        },
    }
}
</script>
<style>
</style>
