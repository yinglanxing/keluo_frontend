<script setup lang="ts">

</script>

<template>
    <!--注册页面-->
    <a-form layout="vertical" :model="signup_from">

        <a-form-item label="用户名">
            <a-input v-model="signup_from.name"/>
        </a-form-item>

        <a-form-item label="邮箱">
            <a-input v-model="signup_from.email"/>
        </a-form-item>

        <a-form-item label="密码">
            <a-input-password v-model="signup_from.password"/>
        </a-form-item>

        <a-form-item label="重复密码">
            <a-input-password v-model="signup_from.re_password"/>
        </a-form-item>

        <a-form-item label="验证码">
            <a-input v-model="signup_from.verify"/>
            <n-divider vertical></n-divider>
            <a-image width="150px" height="50px"></a-image>
        </a-form-item>

        <a-button>{{ "登录" }}</a-button>


    </a-form>
</template>

<style scoped>

</style>
