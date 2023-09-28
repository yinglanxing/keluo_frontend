<template>
    <a-tabs size="large" v-model:active-key="state.login_plain">
        <!--登录页面-->
        <a-tab-pane :key="1" :title="$t('login')">
        </a-tab-pane>

        <!--注册页面-->
        <a-tab-pane :key="2" :title="$t('signup')">
        </a-tab-pane>
    </a-tabs>

    <a-form v-auto-animate :model="from">

        <a-form-item :label="$t('form.name')">
            <a-input v-model="from.account"/>
        </a-form-item>

        <a-form-item v-if="state.login_plain>1" :label="$t('form.email')">
            <a-input v-model="from.email"/>
        </a-form-item>

        <a-form-item :label="$t('form.pass')">
            <a-input-password v-model="from.password" type="password"/>
        </a-form-item>

        <a-form-item v-if="state.login_plain>1" :label="$t('form.r_pass')">
            <a-input-password type="password" v-model="from.re_pwd"/>
        </a-form-item>

        <a-form-item :label="$t('form.v_code')">
            <a-input v-model="from.verify"/>
            <a-divider direction="vertical"></a-divider>
            <a-image width="150px" height="50px"></a-image>
        </a-form-item>

        <a-button v-if="state.login_plain < 2" :type="'secondary'" status="success" long>{{ $t("login") }}</a-button>
        <a-button v-else :type="'secondary'" status="warning" long>{{ $t("signup") }}</a-button>

    </a-form>


    <!--卡片底部-->
    <a-divider>{{ $t("login_tips.other_account") }}</a-divider>

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
        // const show = show_login()
        const user_state = USER_STATE()
        return {
            state: user_state,
        }
    },
    data() {
        // todo
        return {
            // plain_page: "",
            from: {
                account: '',
                email: '',
                password: '',
                verify: '',
                re_pwd: '',
            },
        }
    },

}

</script>

<style scoped>

</style>
