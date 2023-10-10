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
import axios from 'axios';
// 组件
import LoginTips from 'components/LoginTips.vue';
import RankList from 'components/RankList.vue';
import CheckIn from 'components/CheckIn.vue';
// 模型
import { UserInfo } from 'stores/schemas/user';

export default defineComponent({
    name: 'IndexRightSidebarVue',

    // 引用组件
    components: {
        LoginTips,
        RankList,
        CheckIn,
    },

    data() {
        const rank: UserInfo[] = [];
        return {
            rank,
        };
    },

    mounted() {
        // 获取用户排行
        axios.get('https://mlog.club/api/user/score/rank').then((req) => {
            if (req.data.success) this.rank = req.data.data;
        });
    },

});
</script>

<style scoped></style>
