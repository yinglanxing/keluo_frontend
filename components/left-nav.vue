<template>
    <!-- 首页左菜单-->
    <a-menu :default-selected-keys="['1']">
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
                <icon-copyright rotate="90"/>
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

</script>
