<template>
    <!--细分菜单-->
    <a-menu mode="horizontal" @change="chang_route" :default-selected-keys="['1']" style="margin-bottom: 12px;">
        <a-menu-item key="1" style="align-items: center">
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
                <icon-question/>
            </template>
            {{ "提问" }}
        </a-menu-item>
    </a-menu>


</template>

<script lang="ts">
export default {
    data() {
        return {}
    },
    methods: {
        // todo 点击跳转路由
        chang_route(_key: string) {
            console.log(_key, arguments);
            // Message.info({content: `select ${key}`, showIcon: true});
        }
    },
}
</script>
