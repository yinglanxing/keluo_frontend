<template>
    <div class="q-gutter-lg">

        <!--用户组件-->
        <login-tips></login-tips>

        <q-card>
            <!--todo 日历组件-->
            <!--<sign-calendar></sign-calendar>-->
            <q-btn class="full-width">{{ $t("checkin") }}</q-btn>
        </q-card>

        <q-card>
            <!--积分排行-->
            <q-card-section>
                {{ $t('side.point_rank') }}
            </q-card-section>

            <q-separator/>

            <q-list separator>
                <q-item v-for="item in rank" :key="item" v-ripple clickable>
                    <!--头像-->
                    <q-item-section avatar>
                        <q-avatar>
                            <q-icon name="person"></q-icon>
                        </q-avatar>
                    </q-item-section>
                    <q-item-section>
                        <!--名称-->
                        <q-item-label>
                            {{ item.nickname }}
                        </q-item-label>
                        <q-item-label caption>
                            {{ item.score }}
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-card>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import axios from 'axios';
// 组件
import LoginTips from 'components/LoginTips.vue';
import {UserInfo} from 'stores/schemas/user';

export default defineComponent({
    name: 'IndexRightSidebarVue',

    // 引用组件
    components: {
        LoginTips,
    },

    data() {
        const rank: UserInfo[] = []
        return {
            rank
        }
    },

    mounted() {
        // 获取用户排行
        axios.get('https://mlog.club/api/user/score/rank').then((req) => {
            if (req.data.success) this.rank = req.data.data;
        })
    },
})
</script>

<style scoped>

</style>
