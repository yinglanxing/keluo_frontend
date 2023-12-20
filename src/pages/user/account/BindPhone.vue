<template>
    <q-card v-if="self.userToken" class="row">
        <user-card class="col-12 col-md-4" :user="self.info"></user-card>
        <q-separator></q-separator>
        <q-card-section class="col-12 col-md-8">

            <q-stepper v-model="step" vertical color="primary" animated>
                <q-step :name="1" title="须知事项" :done="step > 1">
                    ............................................................
                    ............................................................
                    ............................................................
                    ............................................................
                    <q-stepper-navigation>
                        <q-btn @click="step = 2" color="red" label="我已知晓" />
                    </q-stepper-navigation>
                </q-step>

                <q-step :name="2" title="输入账号" icon="assignment" :done="step > 2">
                    <q-input v-model="phone" name="email">
                        <template v-slot:prepend>
                            <q-icon name="person" />
                        </template>
                    </q-input>
                    <q-stepper-navigation>
                        <q-btn @click="submit_bind" color="primary">提交</q-btn>
                        <q-btn flat @click="step = 1" color="warning" class="q-ml-sm">返回</q-btn>
                    </q-stepper-navigation>
                </q-step>

                <q-step :name="3" title="重置成功" icon="assignment">
                    成功重置密码，请重新登录
                    <q-stepper-navigation>
                        <q-btn color="primary" to="/">
                            {{ $t("back") }}
                        </q-btn>
                    </q-stepper-navigation>
                </q-step>
            </q-stepper>
        </q-card-section>

    </q-card>
    <!--  无token-->
    <q-card v-else>
        <login-tips></login-tips>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';

import { useUser } from 'stores/useUser';
import LoginTips from 'components/LoginTips.vue';
import UserCard from 'components/UserCard.vue';

export default defineComponent({
    components: {
        UserCard,
        LoginTips
    },

    setup() {

        const self = useUser();
        return {
            self,
        };
    },

    mounted() {
        // todo 判断是否已绑定
        // axios.get('/api/v1/bind_phone')
    },

    data() {
        return {
            step: 0,
            phone: '',
        };
    },

    methods: {
        submit_bind() {
            axios.post('/api/v1/bind_phone?phone=' + this.phone).then((req) => {
                if (req.status == 200) {
                    // 返回上级路由
                    this.$router.back();
                }
            });
        }
    }
});
</script>
