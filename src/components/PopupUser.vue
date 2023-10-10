<template>
    <!--用户弹窗-->
    <!--头像-->
    <q-avatar>
        <q-img v-if="user?.avatar" :src="user.avatar"></q-img>
        <q-icon v-else name="person"></q-icon>
    </q-avatar>
    <!--内容-->
    <!--<login-tips></login-tips>-->

</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
// 状态
import { useUser } from 'stores/useUser';
// 模型
import { UserInfo } from 'stores/schemas/user';


export default defineComponent({
    name: 'PopupUserVue',

    props: {
        // 获取传入用户
        user: {} as PropType<UserInfo>,
    },

    setup() {
        // 自身状态
        const self = useUser();
        return {
            self: self.info,
        };
    },

    methods: {},

});
</script>

<style scoped>

</style>
