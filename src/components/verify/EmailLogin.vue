<template>
    <q-slide-transition>
        <q-form v-show="show_temp">
            <!--账户-->
            <q-input
                v-model="form.email" :label="$t('form.email')" class="q-my-md"
                name="username" outlined
            ></q-input>
            <!--密码-->
            <q-input
                v-model="form.pass" :label="$t('form.pass')" class="q-my-md"
                name="password" outlined type="password"
                @keyup.enter="submit"
            ></q-input>

            <!--          验证码-->
            <slot name="code"></slot>
            <!--登录按钮-->
            <q-btn
                class="full-width q-mt-md"
                color="primary"
                @click="submit">
                {{$t('login')}}
            </q-btn>
        </q-form>
    </q-slide-transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

import { useUser } from 'stores/useUser';

export default defineComponent({
    name:'EmailLogin',

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
                email: '',
                pass: '',
            },
        };
    },

    methods: {
        // 获取 form 数据
        getForm() {
            const formTable = new FormData();
            formTable.append('email', this.form.email);
            formTable.append('password', this.form.pass);
            return formTable;
        },
        submit() {
            // 获取参数
            // 登录或注册
            const formData = this.getForm();
            axios.post('/api/v1/login', formData).then((req) => {
                if (req.status== 200) {
                    this.self.user_login(req.data)
                }
            }).catch(()=>{
                this.callback()
            });
        },
    },
});
</script>

<style scoped>

</style>
