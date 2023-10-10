<template>

    <q-avatar @click="clickInfo">
        <!--头像-->
        <q-icon name="person"></q-icon>

        <!--弹窗菜单-->
        <!--<q-menu v-if="user.userToken">-->
        <!--    <q-card>-->
        <!--    </q-card>-->
        <!--</q-menu>-->
    </q-avatar>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// 状态
import { useUser } from 'stores/useUser';

export default defineComponent({
    name: 'PopupSelfVue',

    // 引用组件
    components: {},

    setup() {

        // 用户状态
        const user = useUser();
        return {
            user,
        };
    },

    methods: {
        clickInfo() {
            // 点击用户信息
            if (!this.user.isLogin) {
                // 弹出登录窗口
                this.user.alert_plain(1);
            } else {
                this.checkInfo();
            }
        },

        checkInfo() {
            // 查询用户信息
            this.$router.push('/user/' + this.user.info.id);
        },
    },

});
</script>

<style scoped>

</style>
