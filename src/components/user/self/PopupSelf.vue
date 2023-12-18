<template>
    <q-avatar v-if="user.userToken">
        <!--头像-->
        <q-img v-if="user.info.avatar" :src="user.info.avatar"></q-img>
        <q-icon v-else name="account_circle"></q-icon>

        <!--弹窗菜单-->
        <q-menu anchor="bottom middle" self="top middle" v-if="user.userToken" auto-close>
            <!--          主页-->

            <q-list bordered separator>
                <q-item clickable v-ripple to="/account/self">
                    <q-item-section avatar>
                        <q-icon name="home"/>
                    </q-item-section>
                    <q-item-section>home</q-item-section>
                </q-item>

                <!---->
                <q-item clickable v-ripple disable>
                    <q-item-section avatar>
                        <q-icon name="lock"/>
                    </q-item-section>
                    <q-item-section>safe</q-item-section>
                </q-item>


                <!--编辑个人信息-->
                <q-item clickable v-ripple to="/account/edit_info">
                    <q-item-section avatar>
                        <q-icon name="bi-credit-card-2-front"/>
                    </q-item-section>
                    <q-item-section>info</q-item-section>
                </q-item>

                <!--登出-->
                <q-item clickable v-ripple @click="logout">
                    <q-item-section avatar>
                        <q-icon name="logout"/>
                    </q-item-section>
                    <q-item-section>logout</q-item-section>
                </q-item>
            </q-list>
        </q-menu>
    </q-avatar>

    <q-avatar v-else @click="show_login">
        <q-icon name="login"></q-icon>
    </q-avatar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useUser } from 'stores/useUser';

export default defineComponent({

    components: {},

    setup() {

        // 用户状态
        const user = useUser();
        return {
            user,
        };
    },

    methods: {
        show_login() {
            // 弹出登录窗口
            this.user.alert_plain(1);
        },

        logout() {
            // 用户登出
            this.user.user_logout();
        },

        info() {
            // 查询用户信息
            // this.$router.push('/user/' + this.user.info.id);
            this.$router.push('/account/self');
        },
    },

});
</script>

<style scoped>

</style>
