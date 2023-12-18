<template>
    <q-slide-transition>
        <q-form v-show="show_temp">
            <!--名称-->
            <q-input
                class="q-my-md"
                v-model="form.name" :label="$t('form.name')"
                name="name" outlined
            ></q-input>
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
            <!--确认密码-->
            <q-input
                class="q-my-md"
                v-model="form.repass" :label="$t('form.repass')"
                name="repass" outlined
                @keyup.enter="submit"
            ></q-input>

            <!--          验证码-->
            <slot name="code"></slot>
            <!--登录按钮-->
            <q-btn
                class="full-width q-mt-md"
                color="green-3"
                @click="submit">
                {{ $t('signup') }}
            </q-btn>
        </q-form>
    </q-slide-transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

import { useUser } from 'stores/useUser';

export default defineComponent({
    props:{
        show_temp:{
            type: Boolean,
            default: false,
        },
        callback:{
            type: Function,
            required: true,
        },
    },

    setup() {

        const self = useUser();
        return {
            self,
        };
    },

    data() {
        return {
            // 数据内容
            form: {
                name: '',
                email: '',
                pass: '',
                repass: '',
            },
        };
    },

    methods: {
        // 获取 form 数据
        getForm() {
            const formTable = new FormData();
            if (this.form.pass != this.form.repass) {
                throw Error(this.$t('different_passwords'));
            }
            formTable.append('email', this.form.email);
            formTable.append('password', this.form.pass);
            formTable.append('username', this.form.name);
            return formTable;
        },
        submit() {
            // 注册
            const formData = this.getForm();
            axios.post('/api/v1/signup', formData).then((req) => {
                if(req.status==200){
                    this.login(formData)
                }
            }).catch(()=>{
                this.callback()
            });
        },
        login(formData: object){
            // 登录
            axios.post('/api/v1/login', formData).then((req)=>{
                if (req.status== 200) {
                    this.self.user_login(req.data)
                }
            }).then(()=>{
                this.callback()
            })
        }
    },
});
</script>
