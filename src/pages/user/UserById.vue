<template>
    <!--用户页面-->
    <!--顶部卡片-->
    <!--<div class="q-ma-lg">-->
    <!--    <q-card flat bordered>-->
    <!--        &lt;!&ndash;视差滚动&ndash;&gt;-->
    <!--        <q-parallax src="/card-bg.jpg" style="height: 30vh"></q-parallax>-->
    <!--        &lt;!&ndash;头像&ndash;&gt;-->
    <!--        <div class="absolute-bottom q-pa-md">-->
    <!--            <q-avatar v-if="user.avatar">-->
    <!--                <q-img :src="user.avatar"></q-img>-->
    <!--            </q-avatar>-->
    <!--            <q-avatar v-else icon="person"></q-avatar>-->
    <!--        </div>-->
    <!--    </q-card>-->
    <!--</div>-->


    <div class="q-ma-lg">


        <!--栅格布局-->
        <div class="row q-col-gutter-lg">
            <!--用户侧边栏-->
            <div class="col-3">
                <!--用户侧边栏页-->
                <div class="q-gutter-y-lg">

                    <!--用户信息-->
                    <user-card :user="user"></user-card>

                    <!--用户资料-->
                    <q-card flat bordered>
                        <q-card-section>
                            <q-list class="overflow-hidden">
                                <!--git-->
                                <q-item class="row">
                                    <div class="col-auto">
                                        github
                                    </div>
                                    <q-space></q-space>
                                    <div class="col-auto">
                                        {{ user.homePage }}
                                    </div>
                                </q-item>
                                <!--主页-->
                                <q-item class="row">
                                    <div class="col-auto">
                                        {{ $t('self.index') }}
                                    </div>
                                    <q-space></q-space>
                                    <div class="col-auto">
                                        {{ user.homePage }}
                                    </div>
                                </q-item>
                                <!---->
                                <q-item class="row">
                                    <div class="col-auto">
                                        地址
                                    </div>
                                    <q-space></q-space>
                                    <div class="col-auto">
                                        {{ user.position }}
                                    </div>
                                </q-item>
                            </q-list>
                        </q-card-section>

                        <!--用户操作-->
                        <!-- <q-card-actions class="col">
                            <q-btn class="col">{{ $t("self.change_info") }}</q-btn>
                            <q-btn class="col">{{ $t("self.safe") }}</q-btn>
                        </q-card-actions> -->

                        <q-card-actions v-if="self.userToken && self.info.status > 3" class="col">
                            <!--管理员模式-->
                            <q-btn class="col">{{ $t('self.ban_7') }}</q-btn>
                            <q-btn class="col">{{ $t('self.ban_ever') }}</q-btn>
                        </q-card-actions>
                    </q-card>

                    <!--关注列表-->
                    <q-card flat bordered>
                        <q-card-section>{{ $t('self.follow') }}</q-card-section>
                        <rank-list :rank="followingList"></rank-list>
                    </q-card>

                    <!--粉丝列表-->
                    <q-card flat bordered>
                        <q-card-section>{{ $t('self.fans') }}</q-card-section>
                        <rank-list :rank="followerList"></rank-list>
                    </q-card>
                </div>
            </div>
            <!--用户内容-->
            <div class="col-9">
                <!--<default-nav></default-nav>-->
                <article-list :url="articleUrl"></article-list>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from 'boot/axios';

import { useUser } from 'stores/useUser';

import ArticleList from 'components/article/ArticleList.vue';
import RankList from 'components/user/RankList.vue';
import UserCard from 'components/user/UserCard.vue';

import { UserInfo } from 'stores/schemas/user';

export default defineComponent({

    components: {
        ArticleList,
        RankList,
        UserCard,
    },

    data() {
        // 获取自己
        const self = useUser();
        // 默认用户属性值
        const user: UserInfo = {} as UserInfo;
        const followingList: UserInfo[] = [];
        const followerList: UserInfo[] = [];
        return {
            user,
            self,
            followingList,
            followerList,
            articleUrl: '',
        };
    },

    mounted() {
        // 获取用户信息
        this.getUser();
    },

    methods: {
        getUser() {
            // 获取用户数据
            api.get('/api/v1/user_id/' + this.$route.params['id']).then((req) => {
                if (req.status == 200) {
                    this.user = req.data;
                    // 定位到用户的文章列表
                    this.articleUrl = '/api/v1/articles_by_user?uid=' + this.user.id;
                    // 获取关注列表
                    api.get('/api/v1/user/following?uid=' + this.user.id).then((req) => {
                        if (req.status == 200) {
                            this.followingList = req.data.data.results || [];
                        } else {
                            this.followerList = [];
                        }
                    });
                    // 获取粉丝列表
                    api.get('/api/v1/user/follower?uid=' + this.user.id).then((req) => {
                        if (req.status == 200) {
                            this.followerList = req.data.data.results || [];
                        } else {
                            this.followerList = [];
                        }
                    });
                }
            }).catch(() => {
                // 无法获取信息，返回上一页
                this.$router.back();
            });
        },
    },

    watch: {
        '$route'() {
            // 切换 id 时刷新内容
            if (this.$route.params['id']) {
                this.getUser();
            }
        },
    },
});
</script>
