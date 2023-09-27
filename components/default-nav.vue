<template>
    <!--细分菜单-->
    <a-menu mode="horizontal" @change="chang_route" :default-selected-keys="['1']" style="margin-bottom: 12px;">
        <a-menu-item key="1" style="align-items: center">
            <template #icon>
                <icon-fire/>
            </template>
            {{ $t("nav.hot") }}
        </a-menu-item>

        <a-menu-item key="2">
            <template #icon>
                <icon-brush/>
            </template>
            {{ $t("nav.new") }}
        </a-menu-item>

        <a-menu-item key="3">
            <template #icon>
                <icon-heart-fill/>
            </template>
            {{ $t("nav.follow") }}
        </a-menu-item>

        <a-menu-item key="4">
            <template #icon>
                <icon-question/>
            </template>
            {{ $t("nav.question") }}
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
