<template>
    <!--细分菜单-->
    <a-menu mode="horizontal" :default-selected-keys="['1']">
        <!--todo 后台传参动态渲染-->
        <a-menu-item key="1">
            <template #icon>
                <icon-fire/>
            </template>
            {{ "热门" }}
        </a-menu-item>

        <a-menu-item key="2">
            <template #icon>
                <icon-brush/>
            </template>
            {{ "最新" }}
        </a-menu-item>

        <a-menu-item key="3">
            <template #icon>
                <icon-heart-fill/>
            </template>
            {{ "关注" }}
        </a-menu-item>

        <a-menu-item key="4">
            <template #icon>
                <icon-message/>
            </template>
            {{ "交流" }}
        </a-menu-item>

        <a-menu-item key="5">
            <template #icon>
                <icon-question/>
            </template>
            {{ "提问" }}
        </a-menu-item>

        <a-menu-item key="6">
            <template #icon>
                <icon-copyright :rotate="90"/>
            </template>
            {{ "开源" }}
        </a-menu-item>

        <a-menu-item key="7">
            <template #icon>
                <icon-thumb-up-fill/>
            </template>
            {{ "反馈" }}
        </a-menu-item>

    </a-menu>

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
        chang_route(_key: string) {
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
