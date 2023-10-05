<template>
    <q-card class="items-center q-pa-lg" style="width: 500px; max-width: 80vw;">
        <q-card-section class="row">
            <q-tabs v-model="state.loginPlain">
                <!--登录页面-->
                <q-tab :label="$t('login')" :name="1"/>
                <!--注册页面-->
                <q-tab :label="$t('signup')" :name="2"/>
            </q-tabs>
        </q-card-section>

        <q-card-section>
            <q-form>
                <!--名称+滑动动画-->
                <q-slide-transition appear>
                    <q-input
                        v-show="state.loginPlain>1"
                        v-model="form.name" :label="$t('form.name')"
                        name="name" outlined
                    ></q-input>
                </q-slide-transition>
                <!--账户-->
                <q-input
                    v-model="form.email" :label="$t('form.email')" class="q-my-md"
                    name="email" outlined
                ></q-input>
                <!--密码-->
                <q-input
                    v-model="form.pass" :label="$t('form.pass')" class="q-my-md"
                    name="pass" outlined
                ></q-input>
                <!--确认密码+滑动动画-->
                <q-slide-transition appear>
                    <q-input
                        v-show="state.loginPlain>1"
                        v-model="form.repass" :label="$t('form.repass')"
                        name="repass" outlined
                    ></q-input>
                </q-slide-transition>

                <!--验证码-->
                <q-card-section class="q-py-md" horizontal>
                    <q-img :ratio="3" class="q-mr-md" src="card-bg.jpg"></q-img>
                    <q-input v-model="form.v_code" :label="$t('form.v_code')" name="verify"></q-input>
                </q-card-section>

                <!--登录按钮-->
                <q-btn v-if=" state.loginPlain < 2" class="full-width" color="primary">
                    {{ $t("login") }}
                </q-btn>
                <!--注册按钮-->
                <q-btn v-else class="full-width" color="teal-3">
                    {{ $t("signup") }}
                </q-btn>
            </q-form>

        </q-card-section>

        <!--第三方登录提示-->
        <!--{{ $t("login_tips.other_account") }}-->
        <q-separator/>

        <!--卡片底部-->
        <q-card-actions>
            <q-btn class="col" color="black">
                Github
            </q-btn>
            <q-btn class="col" color="info">
                QQ
            </q-btn>
            <q-btn class="col" color="teal-3">
                other
            </q-btn>
        </q-card-actions>


    </q-card>


</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useUser} from 'stores/useUser';
// 状态

export default defineComponent({
    setup() {
        // 是否进入注册页面状态
        // const show = show_login()
        const state = useUser()
        return {
            state: state,
        }
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                pass: '',
                repass: '',
                v_code: '',
            },
        }
    },
})
</script>

<style scoped>

</style>
