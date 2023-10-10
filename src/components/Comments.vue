<template>
    <!--评论区-->
    <q-card>
    </q-card>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
// 状态
import {useUser} from 'stores/useUser';
// 模型
// import {UserInfo} from 'stores/schemas/user';

export default defineComponent({
    name: 'CommentsVue',

    props: {
        // 获取传入用户
        // user: {} as PropType<UserInfo>,
    },

    setup() {
        // 自身状态
        const self = useUser()
        return {
            self,
        }
    },

    methods: {}
})
</script>

<style scoped>

</style>
