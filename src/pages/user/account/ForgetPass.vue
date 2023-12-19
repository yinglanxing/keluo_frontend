<template>
    <div class="q-pa-md">
        <q-stepper
            v-model="step"
            vertical
            color="primary"
            animated
        >
            <q-step
                :name="1"
                title="须知事项"
                :done="step > 1"
            >
                For each ad campaign that you create, you can control how much you're willing to
                spend on clicks and conversions, which networks and geographical locations you want
                your ads to show on, and more.
                <q-stepper-navigation>
                    <q-btn @click="step = 2" color="red" label="我已知晓" />
                </q-stepper-navigation>
            </q-step>

            <q-step
                :name="2"
                title="输入账号"
                icon="assignment"
                :done="step > 2"
            >
                <q-input v-model="email" name="email">
                    <template v-slot:prepend>
                        <q-icon name="person" />
                    </template>
                </q-input>
                <q-stepper-navigation>
                    <q-btn @click="send_email" color="primary" label="提交" />
                    <q-btn flat @click="step = 1" color="primary" label="返回" class="q-ml-sm" />
                </q-stepper-navigation>
            </q-step>

            <q-step
                :name="3"
                title="重置成功"
                icon="assignment"
            >
                成功重置密码，请重新登录
                <q-stepper-navigation>
                    <q-btn color="primary" to="/">
                        {{ $t("back") }}
                    </q-btn>
                </q-stepper-navigation>
            </q-step>
        </q-stepper>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import axios from 'axios';

export default defineComponent({
    data(){
        return{
            step:1,
            email:'',
        }
    },

    methods:{
        send_email(){
            const formTable = new FormData();
            formTable.append('email', this.email);
            axios.post('/api/v1/reset-password',formTable).then((req)=>{
                if(req.status == 200){
                    this.step = 4
                }
            })
        }
    }
})
</script>

