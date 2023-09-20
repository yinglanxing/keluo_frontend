<template>
    <!-- 登录页面 -->
    <n-form :model="login_from">

        <n-form-item label="账号">
            <n-input v-model="login_from.account"/>
        </n-form-item>

        <n-form-item label="密码">
            <n-input type="password" v-model="login_from.password"/>
        </n-form-item>

        <n-form-item label="验证码">
            <n-input v-model="login_from.verify"/>
            <n-divider vertical></n-divider>
            <a-image width="150px" height="50px"></a-image>
        </n-form-item>

        <n-button>{{ "登录" }}</n-button>
        <n-button quaternary>{{ "注册" }}</n-button>

    </n-form>
</template>


<script lang="ts">

export default {
    data() {
        return {
            login_from: {
                account: '',
                password: '',
                verify: '',
            },
        }
    },
}
</script>

<style scoped>

</style>
