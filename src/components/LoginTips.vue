<template>
    <!--用户登录信息-->

    <!--非登录状态-->
    <q-card v-if="!user.userToken" class="q-pa-lg">
        <div class="row q-col-gutter-lg">
            <!--提示标题-->
            <div class="col-12 text-h5">
                {{ $t("login_tips.title") }}：
            </div>
            <!--提示语句-->
            <div class="col-6 text-body1">
                <q-icon name="hotel_class"/>
                {{ $t("login_tips.p1") }}
            </div>
            <div class="col-6 text-body1">
                <q-icon name="groups"/>
                {{ $t("login_tips.p2") }}
            </div>
            <div class="col-6 text-body1">
                <q-icon name="feedback"/>
                {{ $t("login_tips.p3") }}
            </div>
            <div class="col-6 text-body1">
                <q-icon name="all_inbox"/>
                {{ $t("login_tips.p4") }}
            </div>
            <!--按钮-->
            <div class="col-12">
                <q-btn class="full-width" color="primary" @click="user.alert_plain(1)">
                    {{ $t("login") }}
                </q-btn>
            </div>
            <div class="col-12 text-body1">
                {{ $t('login_tips.req_account') }}
                <q-btn @click="user.alert_plain(2)">
                    {{ $t("signup") }}
                </q-btn>
            </div>
        </div>
    </q-card>


    <!--已登录状态-->
    <div v-else>
        <user-card :user="user.info"></user-card>
    </div>

</template>

<script lang="ts">
import {defineComponent} from 'vue'
// 状态
import {useUser} from 'stores/useUser';
// 组件
import UserCard from 'components/UserCard.vue';

export default defineComponent({
    name: 'LoginTips',

    // 引用组件
    components: {
        UserCard,
    },

    setup() {
        // 用户状态
        const user = useUser()
        return {
            user,
        }
    },
})
</script>

<style scoped>

</style>
