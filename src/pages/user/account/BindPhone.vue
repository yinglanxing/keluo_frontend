<template>
    <q-card class="q-my-md">
        <q-item>
            <q-item-section avatar>
                <!--头像-->
                <div>
                    <q-avatar icon="phone"></q-avatar>
                </div>
            </q-item-section>
            <q-item-section>
                <div class="text-h6">
                    手机号绑定
                </div>
            </q-item-section>
            <q-item-section side>
                <q-btn v-if="step<4" color="red" @click="cancel">取消</q-btn>
            </q-item-section>
        </q-item>
    </q-card>
    <q-card v-if="token">
        <q-stepper v-model="step" vertical color="primary" animated>
            <q-step :name="1" title="须知事项" :done="step > 1">
                ............................................................
                ............................................................
                ............................................................
                ............................................................
                <q-stepper-navigation>
                    <q-btn @click="step = 2" color="red" label="我已知晓"/>
                </q-stepper-navigation>
            </q-step>

            <q-step :name="2" title="输入手机号" icon="assignment" :done="step > 2">
                <q-input v-model="phone" name="phone" label="请输入手机号码">
                    <template v-slot:prepend>
                        <q-icon name="phone"></q-icon>
                    </template>
                </q-input>
                <q-stepper-navigation>
                    <q-btn @click="submit_phone" color="primary">提交</q-btn>
                    <q-btn flat @click="step = 1" color="warning" class="q-ml-sm">返回</q-btn>
                </q-stepper-navigation>
            </q-step>

            <q-step :name="3" title="验证并绑定" icon="assignment" :done="step > 2">
                <q-input v-model="code" name="code" label="验证码">
                    <template #prepend>
                        <q-icon name="article"/>
                    </template>
                </q-input>
                <q-stepper-navigation>
                    <q-btn @click="bind_phone" color="primary">绑定</q-btn>
                    <q-btn @click="step = 1" color="green" label="返回" class="q-ml-sm"/>
                </q-stepper-navigation>
            </q-step>

            <q-step :name="4" title="绑定成功" icon="assignment">
                成功绑定
                <q-stepper-navigation>
                    <q-btn color="primary" to="/">返回重新登录</q-btn>
                    <q-btn color="green" @click="auto_login" class="q-ml-sm">
                        直接登录
                    </q-btn>
                </q-stepper-navigation>
            </q-step>
        </q-stepper>
    </q-card>

    <!--localStorage 无 token-->
    <q-card v-else>
        <q-card-section>
            <q-img src="/image/wind-turbine.png"></q-img>
        </q-card-section>
        <q-card-section class="text-center">
            <q-icon name="error"></q-icon>
            没有身份令牌，无法绑定手机号。
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {api} from 'boot/axios';

import { useUser } from 'stores/useUser';

export default defineComponent({
    components: {},

    setup() {

        const self = useUser();
        return {
            self,
        };
    },

    mounted() {
        // todo 判断是否已绑定
        this.token = localStorage.getItem('token') || '';
    },

    data() {
        return {
            step: 1,
            token: '',
            phone: '',
            code: '',
        };
    },

    methods: {
        cancel() {
            // 取消行为
            this.token = '';
            localStorage.setItem('token', '');
            localStorage.setItem('token2', '');
            this.$router.back();
        },

        auto_login() {
            this.self.user_login({
                a_token: localStorage.getItem('token') || '',
                r_token: localStorage.getItem('token2') || '',
            });
        },


        submit_phone() {
            if (this.token) {
                api.post('/api/v1/verify_phone?phone=' + this.phone).then((req) => {
                    if (req.status == 200) {
                        this.step = 3;
                    }
                });
            }
        },

        bind_phone() {
            if (this.token) {
                // 头部携带身份令牌
                api.post('/api/v1/bind_phone?phone=' + this.phone + '&code=' + this.code, {}, {
                    headers: { Authorization: `Bearer ${this.token}` },
                }).then((req) => {
                    if (req.status == 200) {
                        this.step = 4;
                    }
                });
            }
        },
    },
});
</script>
