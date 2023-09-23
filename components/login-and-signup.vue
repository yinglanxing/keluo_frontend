<template>

    <a-tabs size="large" :active-key="show_signup_plain ? 'signup':'login'">
        <!--登录页面-->
        <a-tab-pane key="login" title="登录">

            <a-form :model="login_from">

                <a-form-item label="账号">
                    <a-input v-model="login_from.account"/>
                </a-form-item>

                <a-form-item label="密码">
                    <a-input-password v-model="login_from.password" type="password"/>
                </a-form-item>

                <a-form-item label="验证码">
                    <a-input v-model="login_from.verify"/>
                    <a-divider direction="vertical"></a-divider>
                    <a-image width="150px" height="50px"></a-image>
                </a-form-item>

                <a-button :type="'secondary'" status="success" long>登录</a-button>

            </a-form>

        </a-tab-pane>

        <!--注册页面-->
        <a-tab-pane key="signup" title="注册">

            <a-form :model="signup_from">

                <a-form-item label="用户名">
                    <a-input v-model="signup_from.name"/>
                </a-form-item>

                <a-form-item label="邮箱">
                    <a-input v-model="signup_from.email"/>
                </a-form-item>

                <a-form-item label="密码">
                    <a-input-password type="password" v-model="signup_from.password"/>
                </a-form-item>

                <a-form-item label="重复密码">
                    <a-input-password type="password" v-model="signup_from.re_password"/>
                </a-form-item>

                <a-form-item label="验证码">
                    <a-input v-model="signup_from.verify"/>
                    <a-divider direction="vertical"></a-divider>
                    <a-image width="150px" height="50px"></a-image>
                </a-form-item>

                <a-button :type="'secondary'" status="warning" long>注册</a-button>

            </a-form>

        </a-tab-pane>
    </a-tabs>

    <!--卡片底部-->
    <a-divider>第三方账号登录</a-divider>

    <a-space fill>
        <a-button>
            <template #icon>
                <icon-github/>
            </template>
            Github
        </a-button>

        <a-button>
            <template #icon>
                <icon-qq/>
            </template>
            QQ
        </a-button>
    </a-space>

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
