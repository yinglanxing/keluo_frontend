<template>
    <q-card class="items-center q-pa-lg" style="width: 500px; max-width: 80vw;">
        <q-card-section class="row">
            <q-tabs v-model="self.loginPlain">
                <!--登录页面-->
                <q-tab :label="$t('login')" :name="1"></q-tab>
                <!--注册页面-->
                <q-tab :label="$t('signup')" :name="2"></q-tab>
            </q-tabs>
        </q-card-section>

        <q-card-section>
            <q-form>
                <!--名称+滑动动画-->
                <q-slide-transition appear>
                    <q-input
                        v-show="self.loginPlain>1"
                        v-model="form.name" :label="$t('form.name')"
                        name="name" outlined
                    ></q-input>
                </q-slide-transition>
                <!--账户-->
                <q-input
                    v-model="form.email" :label="$t('form.email')" class="q-my-md"
                    name="username" outlined
                ></q-input>
                <!--密码-->
                <q-input
                    v-model="form.pass" :label="$t('form.pass')" class="q-my-md"
                    name="password" outlined type="password"
                ></q-input>
                <!--确认密码+滑动动画-->
                <q-slide-transition appear>
                    <q-input
                        v-show="self.loginPlain>1"
                        v-model="form.repass" :label="$t('form.repass')"
                        name="repass" outlined
                    ></q-input>
                </q-slide-transition>

                <!--验证码-->
                <q-card-section class="q-py-md" horizontal>
                    <q-img
                        :ratio="2.5" :src="captchaUrl"
                        class="q-mr-md cursor-pointer" @click="getCaptchaId"
                    ></q-img>
                    <!--<q-img :ratio="3" class="q-mr-md" src="card-bg.jpg"></q-img>-->
                    <q-input v-model="form.v_code" :label="$t('form.v_code')" name="captchaCode"></q-input>
                </q-card-section>

                <!--登录按钮-->
                <q-btn v-if=" self.loginPlain < 2" class="full-width" color="primary" @click="submit">
                    {{ $t('login') }}
                </q-btn>
                <!--注册按钮-->
                <q-btn v-else class="full-width" color="teal-3">
                    {{ $t('signup') }}
                </q-btn>
            </q-form>

        </q-card-section>

        <!--第三方登录提示-->
        <!--{{ $t("login_tips.other_account") }}-->
        <q-separator></q-separator>

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
import { defineComponent } from 'vue';
import axios from 'axios';
// 状态
import { useUser } from 'stores/useUser';

export default defineComponent({

    setup() {
        const self = useUser();
        return {
            self
        };
    },
    data() {
        return {
            captchaId: "",
            captchaUrl: "",
            form: {
                name: "",
                email: "",
                pass: "",
                repass: "",
                v_code: ""
            }
        };
    },
    mounted() {
        this.getCaptchaId();
    },
    methods: {
        getCaptchaId() {
            axios.get("/api/v1/captcha").then((req)=>{
                    this.captchaId = req.data.id;
                    this.captchaUrl = req.data.image;
                }
            );
        },
        getForm() {
            const formTable = new FormData();
            formTable.append("captcha", this.form.v_code);
            formTable.append("email", this.form.email);
            formTable.append("password", this.form.pass);
            if (this.self.loginPlain == 2) {
                if (this.form.pass == this.form.repass) {
                    formTable.append("name", this.form.repass);
                    formTable.append("name", this.form.name);
                } else {
                    throw Error(this.$t("different_passwords"));
                }
            }
            return formTable;
        },
        getQuery() {
            return `?verify_code=${this.form.v_code}&verify_id=${this.captchaId}`;
        },
        submit() {
            const formData = this.getForm();
            const queryUrl = this.getQuery();
            axios.post("/api/v1/login" + queryUrl, formData).then((req)=>{
                    if (req.status == 200) {
                        axios.defaults.headers.common["Authorization"] = `Bearer ` + req.data.aToken;
                        this.self.userToken = req.data.aToken;
                        this.self.resetToken = req.data.rToken;
                        this.userinfo();
                    }
                }
            );
        },
        userinfo() {
            axios.get("/api/v1/user/self").then((req)=>{
                    this.self.info = req.data;
                    this.self.alert_plain(0);
                }
            ).catch(()=>{
                    this.self.userToken = this.self.resetToken = "";
                    axios.defaults.headers.common["Authorization"] = "";
                }
            );
        }
    }
});
</script>

<style scoped>

</style>
