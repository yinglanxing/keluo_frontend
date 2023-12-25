<template>
    <div class="q-pa-md">
        <q-stepper v-model="step" vertical color="primary" animated>
            <q-step :name="1" title="输入" :done="step > 1">
                <q-input v-model="email" name="email">
                    <template v-slot:prepend>
                        <q-icon name="person" />
                    </template>
                </q-input>
                <q-stepper-navigation>
                    <q-btn @click="step = 2" color="red">发送</q-btn>
                </q-stepper-navigation>
            </q-step>

            <q-step :name="2" title="验证" icon="assignment" :done="step > 2">
                <q-input v-model="code" name="code"></q-input>
                <q-stepper-navigation>
                    <q-btn @click="send_code" color="green">验证</q-btn>
                    <q-btn
                        flat
                        @click="step = 1"
                        color="warning"
                        class="q-ml-sm"
                        >返回</q-btn
                    >
                </q-stepper-navigation>
            </q-step>

            <q-step :name="3" title="成功" icon="assignment">
                邮箱绑定成功
                <q-stepper-navigation>
                    <q-btn color="primary" to="/">
                        {{ $t('back') }}
                    </q-btn>
                </q-stepper-navigation>
            </q-step>
        </q-stepper>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from 'boot/axios';

export default defineComponent({
    data() {
        return {
            step: 1,
            email: '',
            code: '',
        };
    },

    methods: {
        // 绑定邮箱
        send_email() {
            api.post('/api/v1/reset-password?email=' + this.email).then(
                (req) => {
                    if (req.status == 200) {
                        this.step = 2;
                    }
                }
            );
        },
        // 绑定代码
        send_code() {
            api.post('/api/v1/reset-password', {
                code: this.code,
                email: this.email,
            }).then((req) => {
                if (req.status == 200) {
                    this.step = 3;
                }
            });
        },
    },
});
</script>
