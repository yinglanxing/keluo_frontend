<template>
    <!--用户弹窗-->
    <!--头像-->
    <q-avatar>
        <q-img v-if="user?.avatar" :src="user.avatar"></q-img>
        <q-icon v-else name="person"></q-icon>
        <!--弹窗-->
        <q-menu anchor="bottom middle" self="top middle" auto-close>
            <!--主页-->
            <user-card :user="user"></user-card>
        </q-menu>
    </q-avatar>
    <!--内容-->
    <!--<login-tips></login-tips>-->

</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { useUser } from 'stores/useUser';

import { UserInfo } from 'stores/schemas/user';
import UserCard from './UserCard.vue';


export default defineComponent({
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
    components: { UserCard }
});
</script>

<style scoped>

</style>
