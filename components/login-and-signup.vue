<template>

    <n-card style="max-width: 500px">

        <n-tabs
            class="card-tabs"
            size="large"
            animated
            :default-value="show_signup_plain?'signup':'login'"
        >
            <!--登录页面-->
            <n-tab-pane name="login" tab="登录">

                <n-form :model="login_from">

                    <n-form-item label="账号">
                        <n-input v-model="login_from.account"/>
                    </n-form-item>

                    <n-form-item label="密码">
                        <n-input v-model="login_from.password" type="password"/>
                    </n-form-item>

                    <n-form-item label="验证码">
                        <n-input v-model="login_from.verify"/>
                        <n-divider vertical></n-divider>
                        <a-image width="150px" height="50px"></a-image>
                    </n-form-item>

                    <n-button block secondary type="success">{{ "登录" }}</n-button>

                </n-form>

            </n-tab-pane>

            <!--注册页面-->
            <n-tab-pane name="signup" tab="注册">

                <n-form :model="signup_from">

                    <n-form-item label="用户名">
                        <n-input v-model="signup_from.name"/>
                    </n-form-item>

                    <n-form-item label="邮箱">
                        <n-input v-model="signup_from.email"/>
                    </n-form-item>

                    <n-form-item label="密码">
                        <n-input type="password" v-model="signup_from.password"/>
                    </n-form-item>

                    <n-form-item label="重复密码">
                        <n-input type="password" v-model="signup_from.re_password"/>
                    </n-form-item>

                    <n-form-item label="验证码">
                        <n-input v-model="signup_from.verify"/>
                        <n-divider vertical></n-divider>
                        <a-image width="150px" height="50px"></a-image>
                    </n-form-item>

                    <n-button block secondary type="info">{{ "注册" }}</n-button>


                </n-form>

            </n-tab-pane>
        </n-tabs>

        <!--卡片底部-->
        <n-divider>{{ "第三方账号登录" }}</n-divider>

        <n-space justify="center">

            <n-button color="#555">
                <template #icon>
                    <icon-github/>
                </template>
                {{ "Github" }}
            </n-button>

            <n-button color="#0cf">
                <template #icon>
                    <icon-qq/>
                </template>
                {{ "QQ" }}
            </n-button>
        </n-space>

    </n-card>
</template>

<script lang="ts">
export default {
    setup() {
        // 是否进入注册页面状态
        const show_signup_plain = show_signup()
        return {
            show_signup_plain,
        }
    },
    data() {
        // todo
        return {
            login_from: {
                account: '',
                password: '',
                verify: '',
            },
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
