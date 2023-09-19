<template>

    <n-card>

        <n-tabs
            class="card-tabs"
            size="large"
            animated
        >
            <!--登录页面-->
            <n-tab-pane name="login" tab="登录">

                <a-form layout="vertical" :model="login_from">

                    <a-form-item label="账号">
                        <a-input v-model="login_from.account"/>
                    </a-form-item>

                    <a-form-item label="密码">
                        <a-input-password v-model="login_from.password"/>
                    </a-form-item>

                    <a-form-item label="验证码">
                        <a-input v-model="login_from.verify"/>
                        <n-divider vertical></n-divider>
                        <a-image width="150px" height="50px"></a-image>
                    </a-form-item>

                    <a-button>{{ "登录" }}</a-button>


                </a-form>

            </n-tab-pane>

            <!--注册页面-->
            <n-tab-pane name="signup" tab="注册">

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

            </n-tab-pane>
        </n-tabs>

        <!--卡片底部-->
        <n-divider>{{ "第三方账号登录" }}</n-divider>

        <n-space justify="center">

            <a-button>
                <icon-github/>
                {{ "Github" }}
            </a-button>

            <a-button>
                <icon-qq/>
                {{ "QQ" }}
            </a-button>
        </n-space>

    </n-card>
</template>

<script lang="ts">
import {NTab, NTabPane} from "naive-ui"

export default {
    components: {
        NTab,
        NTabPane,
    },
    data() {

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
