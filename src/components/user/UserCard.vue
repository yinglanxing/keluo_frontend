<template>
    <!--用户信息卡片-->
    <q-card>
        <!--统计数据-->
        <q-card-section class="row">
            <!--名字-->
            <div class="text-h5">
                {{ user?.username }}
            </div>

            <q-space></q-space>

            <!--头像-->
            <q-avatar @click="moreAboutUser">
                <q-img v-if="user?.avatar" :src="user?.avatar"></q-img>
                <q-icon v-else name="person"></q-icon>
            </q-avatar>

            <!--介绍-->
            <div class="col-12 q-mt-md">
                {{ user?.introduction }}
            </div>
        </q-card-section>

        <!--信息统计-->
        <q-card-actions class="justify-around">
            <!--统计关注-->
            <div>关注:{{ user?.following }}</div>
            <!--统计粉丝-->
            <div>粉丝:{{ user?.follower }}</div>
            <!--&lt;!&ndash;统计回复&ndash;&gt;-->
            <!--<div>:{{  }}</div>-->
        </q-card-actions>

        <!--底部分割线-->
        <q-separator v-if="showActions" inset></q-separator>

        <!--操作按钮-->
        <!--<q-card-actions v-if="user?.id != self.id">-->
        <q-card-actions v-if="showActions && user?.id != self.info.id">
            <q-btn v-if="!user?.isFollow" color="green" class="col">{{ $t('self.follow') }}</q-btn>
            <q-btn v-else color="indigo-5" class="col">已关注</q-btn>
        </q-card-actions>
    </q-card>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { useUser } from 'stores/useUser';

import { UserInfo } from 'stores/schemas/user';

export default defineComponent({
    props: {
        // 获取传入用户
        user: {} as PropType<UserInfo>,
        // type: {} as PropType<UserInfo>,
        // required: true,
        // 操作栏可见
        showActions: {
            type: Boolean,
            default: false,
        },
    },

    setup() {
        // 自身状态
        const self = useUser();
        return {
            self,
        };
    },

    methods: {
        // 查看更多用户信息
        moreAboutUser() {
            this.$router.push('/user/' + this.user?.id);
        },
    },
});
</script>

<style scoped>

</style>
