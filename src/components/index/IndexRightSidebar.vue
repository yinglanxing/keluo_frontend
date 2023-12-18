<template>
    <div class="q-gutter-lg">
        <!--用户组件-->
        <login-tips></login-tips>

        <!-- 签到组件 -->
        <q-card>
            <check-in></check-in>
        </q-card>

        <!--积分排行-->
        <q-card>
            <q-card-section>
                {{ $t('side.point_rank') }}
            </q-card-section>
            <q-list bordered separator>
                <rank-list :rank="rank" extar></rank-list>
            </q-list>
        </q-card>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import RankList from 'components/user/RankList.vue';
import CheckIn from 'components/index/CheckIn.vue';
import LoginTips from 'components/index/LoginTips.vue';

import { UserInfo } from 'stores/schemas/user';

export default defineComponent({

    components: {
        CheckIn,
        RankList,
        LoginTips,
    },

    data() {
        const rank: UserInfo[] = [];
        return {
            rank,
        };
    },

    mounted() {
        // 获取用户排行
        // axios.get('/api/v1/user/rank').then((req) => {
        //     if (req.status == 200) {
        //         if (req.data.success) this.rank = req.data.data;
        //     }
        // });
    },

});
</script>

<style scoped></style>
