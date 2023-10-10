<template>
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// 状态
import { useQuasar } from 'quasar';
import { useState } from 'stores/useState';

export default defineComponent({
    name: 'App',

    setup() {
        // 状态管理
        const state = useState()
        const quasar = useQuasar()
        return {
            state,
            quasar,
        }
    },

    watch: {
        // 监听主题变动
        'state.theme'() {
            this.quasar.dark.set(
                this.state.theme == 'dark'
            )
        }
    }

});
</script>
