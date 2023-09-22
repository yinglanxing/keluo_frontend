<template>

    <n-config-provider :theme="theme == 'dark' ? darkTheme: null">
        <nuxt-layout :name="layout">
            <nuxt-page/>
        </nuxt-layout>
    </n-config-provider>

</template>

<script lang="ts">
import {darkTheme} from "naive-ui";

export default {
    setup() {
        const layout = GLOBAL_LAYOUT()
        const theme = GLOBAL_THEME()
        return {
            layout,
            theme,
        }
    },
    data() {
        return {
            // 主题
            darkTheme,
        }
    }
}
</script>
