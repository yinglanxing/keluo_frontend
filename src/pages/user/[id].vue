<template>
    <!--用户页面-->
    <!--顶部卡片-->
    <div class="q-ma-lg">
        <q-card>
            <!--视差滚动-->
            <q-parallax src="/card-bg.jpg" style="height: 30vh"/>
            <!--头像-->
            <!--<div class="absolute-bottom q-pa-md">-->
            <!--    <q-avatar v-if="user.avatar">-->
            <!--        <q-img :src="user.avatar"></q-img>-->
            <!--    </q-avatar>-->
            <!--    <q-avatar v-else icon="person">-->
            <!--    </q-avatar>-->
            <!--</div>-->
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
import {defineComponent} from 'vue';
import axios from 'axios';
// 状态
import {useUser} from 'stores/useUser';
// 组件
import ArticleList from 'components/ArticleList.vue';
import UserSidebar from 'components/UserSidebar.vue';
// 模型
import {UserInfo} from 'stores/schemas/user';

export default defineComponent({
    name: 'UserIdPage',
    // 引用组件
    components: {
        ArticleList,
        UserSidebar,
    },

    data() {
        // 获取自己
        const self = useUser()
        // 默认用户属性值
        const user: UserInfo = {} as UserInfo
        return {
            user,
            self,
            articleUrl: '',
        }
    },

    mounted() {
        // 获取用户信息
        axios.get('https://mlog.club/api/user/' + this.$route.params['id']).then((req) => {
            this.user = req.data.data;
            // 定位到用户的文章列表
            this.articleUrl = 'https://mlog.club/api/article/user/articles?userId=' + this.user.id
        }).catch(() => {
            // 无法获取信息，返回上一页
            this.$router.back()
        })
    },
})

</script>

<style scoped>

</style>
