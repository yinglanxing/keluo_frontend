<template>
    <!--用户页面-->
    <!--顶部卡片-->
    <div class="q-ma-lg">
        <q-card>
            <!--视差滚动-->
            <q-parallax src="/card-bg.jpg" style="height: 30vh"></q-parallax>
            <!--头像-->
            <div class="absolute-bottom q-pa-md">
                <q-avatar v-if="user.avatar">
                    <q-img :src="user.avatar"></q-img>
                </q-avatar>
                <q-avatar v-else icon="person"></q-avatar>
            </div>
        </q-card>
    </div>


    <div class="q-ma-lg">


        <!--栅格布局-->
        <div class="row q-col-gutter-lg">
            <!--用户侧边栏-->
            <div class="col-3">
                <user-sidebar :user="user"></user-sidebar>
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
import axios from 'axios';

import { useUser } from 'stores/useUser';

import ArticleList from 'components/article/ArticleList.vue';
import UserSidebar from 'components/user/UserSidebar.vue';

import { UserInfo } from 'stores/schemas/user';

export default defineComponent({

    components: {
        ArticleList,
        UserSidebar,
    },

    data() {
        // 获取自己
        const self = useUser();
        // 默认用户属性值
        const user: UserInfo = {} as UserInfo;
        return {
            user,
            self,
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
            axios.get('/api/v1/user_id/' + this.$route.params['id']).then((req) => {
                if (req.status == 200) {
                    this.user = req.data;
                    // 定位到用户的文章列表
                    this.articleUrl = '/api/v1/articles_by_user?id=' + this.user.id;
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

<style scoped>

</style>
