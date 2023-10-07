<template>
    <!--头像-->
    <div class="float-right">
        <q-avatar @click="clickInfo">
            <q-icon name="person"></q-icon>
        </q-avatar>
    </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue'
// 状态
import {useUser} from 'stores/useUser';
// 组件
// import LoginTips from 'components/LoginTips.vue';

export default defineComponent({
    name: 'PopupSelfVue',

    // 引用组件
    components: {
        // LoginTips,
    },

    setup() {
        // 用户状态
        const user = useUser()
        return {
            user,
        }
    },

    methods: {
        clickInfo() {
            // 点击用户信息
            if (this.user.isLogin) {
                this.$router.push('/user/' + this.user.info.id)
                // 查询用户信息
            } else {
                // 弹出登录窗口
                this.user.alert_plain(1)
            }
        }
    }

})
</script>

<style scoped>

</style>
