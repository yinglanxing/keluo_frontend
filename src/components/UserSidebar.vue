<template>
    <!--用户侧边栏页-->
    <div class="q-gutter-y-lg">

        <!--用户资料管理-->
        <q-card>
            <q-card-section class="row">
                <span>
                    {{ $t('self.info') }}
                </span>
                <q-space></q-space>
                <!--用户头像-->

                <!--头像-->
                <q-avatar>
                    <!--<q-img v-if="user?.avatar" :src="user.avatar"></q-img>-->
                    <!--<q-icon v-else name="person"></q-icon>-->
                    <q-icon name="person"></q-icon>
                </q-avatar>
            </q-card-section>

            <!--用户信息-->
            <q-card-section>
                <q-list class="overflow-hidden">
                    <q-item class="row">
                        <div class="col-auto">
                            {{ $t('self.name') }}
                        </div>
                        <q-space></q-space>
                        <div class="col-auto">
                            {{ user.username }}
                        </div>
                    </q-item>
                    <q-item class="row">
                        <div class="col-auto">
                            {{ $t('self.motto') }}
                        </div>
                        <q-space></q-space>
                        <div class="col-auto">
                            <!--{{ user.description }}-->
                        </div>
                    </q-item>
                    <q-item class="row">
                        <div class="col-auto">
                            {{ $t('self.index') }}
                        </div>
                        <q-space></q-space>
                        <div class="col-auto">
                            {{ user.homePage }}
                        </div>
                    </q-item>
                </q-list>
            </q-card-section>

            <!--用户操作-->
            <!-- <q-card-actions class="col">
                <q-btn class="col">{{ $t("self.change_info") }}</q-btn>
                <q-btn class="col">{{ $t("self.safe") }}</q-btn>
            </q-card-actions> -->

            <q-card-actions v-if="self.userToken && self.info.status" class="col">
                <!--管理员模式-->
                <q-btn class="col">{{ $t('self.ban_7') }}</q-btn>
                <q-btn class="col">{{ $t('self.ban_ever') }}</q-btn>
            </q-card-actions>
        </q-card>

        <!--用户状态统计-->
        <q-card>
            <q-card-section>
                {{ $t('self.achievements') }}
            </q-card-section>

            <div class="row q-col-gutter-lg q-pa-lg">
                <!--积分-->
                <div class="col-6 text-center">
                    {{ $t('self.points') }}:{{ user.score }}
                </div>
                <!--统计文章-->
                <div class="col-6 text-center">
                    {{ $t('self.a_count') }}:{{ user.topicCount }}
                </div>
                <!--统计回复-->
                <div class="col-6 text-center">
                    {{ $t('self.r_count') }}:{{ user.commentCount }}
                </div>
                <!--注册-->
                <div class="col-6 text-center">
                    {{ $t('self.signup_rank') }}:{{ user.id }}
                </div>
            </div>
        </q-card>

        <!--关注列表-->
        <q-card>
            <q-card-section>{{ $t('self.follow') }}</q-card-section>
            <rank-list :rank="followingList"></rank-list>
        </q-card>

        <!--粉丝列表-->
        <q-card>
            <q-card-section>{{ $t('self.fans') }}</q-card-section>
            <rank-list :rank="followerList"></rank-list>
        </q-card>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import axios from 'axios';
// 状态
import { useUser } from 'stores/useUser';
// 模型
import { UserInfo } from 'stores/schemas/user';
// 组件
import RankList from 'components/RankList.vue';

export default defineComponent({
    name: 'UserSidebarVue',

    // 引用组件
    components: {
        RankList,
    },

    props: {
        // 获取传入用户
        user: {
            // 类型注释
            type: Object as PropType<UserInfo>,
            // 强制非空
            required: true,
        },
    },

    data() {
        // 自身状态
        const self = useUser();
        const followingList: UserInfo[] = [];
        const followerList: UserInfo[] = [];
        return {
            self,
            followingList,
            followerList,
        };
    },

    mounted() {
        this.getAll();
    },

    methods: {
        getAll() {
            // 获取关注列表
            axios.get('/api/v1/user/following?id=' + this.user.id).then((req) => {
                    this.followingList = req.data.data.results || [];
                },
            ).catch(() => {
                    this.followingList = [];
                },
            );
            // 获取粉丝列表
            axios.get('/api/v1/user/follower?id=' + this.user.id).then((req) => {
                    this.followerList = req.data.data.results || [];
                },
            ).catch(() => {
                    this.followerList = [];
                },
            );
        },

        // 查看用户信息
        moreAboutUser(id: number) {
            this.$router.push('/user/' + id);
        },
    },

    watch: {
        '$route'() {
            // 切换 id 时刷新内容
            if (this.$route.params['id']) {
                this.getAll();
            }
        },
    },
});
</script>

<style scoped></style>
