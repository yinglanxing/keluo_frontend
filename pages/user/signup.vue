<template>
    <!--注册页面-->
    <n-form layout="vertical" :model="signup_from">

        <n-form-item label="用户名">
            <n-input v-model="signup_from.name"/>
        </n-form-item>

        <n-form-item label="邮箱">
            <n-input v-model="signup_from.email"/>
        </n-form-item>

        <n-form-item label="密码">
            <n-input password v-model="signup_from.password"/>
        </n-form-item>

        <n-form-item label="重复密码">
            <n-input password v-model="signup_from.re_password"/>
        </n-form-item>

        <n-form-item label="验证码">
            <n-input v-model="signup_from.verify"/>
            <n-divider vertical></n-divider>
            <n-image width="150px" height="50px"></n-image>
        </n-form-item>

        <n-button>{{ "登录" }}</n-button>

    </n-form>
</template>

<script lang="ts">
export default {
    data() {

        return {
            signup_from: {
                name: '',
                email: '',
                password: '',
                re_password: '',
                verify: '',
            },
        }
    },
}
</script>


<style scoped>

</style>
