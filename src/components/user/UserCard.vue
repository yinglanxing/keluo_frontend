<template>
    <!--用户信息卡片-->
    <q-card>
        <!--统计数据-->
        <q-card-section class="row" @click="moreAboutUser">
            <!--名字-->
            <div class="text-h5">
                {{ user?.username }}
            </div>

            <q-space></q-space>

            <!--头像-->
            <q-avatar>
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
        <q-separator v-if="showActions && user?.id != self.info.id" inset></q-separator>
        <!--操作按钮-->
        <!--<q-card-actions v-if="user?.id != self.id">-->
        <q-card-actions v-if="showActions && user?.id != self.info.id">
            <q-btn :loading="loading" v-if="!follow" color="green" class="col" @click="user_follow">
                {{ $t('self.follow') }}
            </q-btn>
            <q-btn :loading="loading" v-else color="indigo-5" class="col" @click="cancel_follow">已关注</q-btn>
        </q-card-actions>
    </q-card>

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { useUser } from 'stores/useUser';

import { UserInfo } from 'stores/schemas/user';
import { api } from 'boot/axios';

export default defineComponent({
    props: {
        // 获取传入用户
        user: {} as PropType<UserInfo>,
        // type: {} as PropType<UserInfo>,
        // required: true,
        // 操作栏可见
        showActions: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        // 自身状态
        const self = useUser();
        return {
            self,
            follow: this.user?.isFollow || false,
            loading: false,
        };
    },

    mounted() {
        this.follow = this.user?.isFollow || false;
    },

    methods: {
        // 查看更多用户信息
        moreAboutUser() {
            this.$router.push('/user/' + this.user?.id);
        },

        // 关注用户
        user_follow() {
            if (this.self.is_login()) {
                this.loading = true;
                api.post('/api/v1/user/follow?fid=' + this.user?.id).then((req) => {
                    if (req.status == 200) {
                        this.follow = !this.follow;
                        this.loading = false;
                    }
                });
            }
        },

        // 取消关注
        cancel_follow() {
            if (this.self.is_login()) {
                this.loading = true;
                api.delete('/api/v1/user/follow?fid=' + this.user?.id).then((req) => {
                    if (req.status == 200) {
                        this.follow = !this.follow;
                        this.loading = false;
                    }
                });
            }
        },
    },
    watch: {
        'user'() {
            this.follow = this.user?.isFollow || false;
        },
    },
});
</script>
