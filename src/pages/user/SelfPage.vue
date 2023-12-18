<template>
    <!--用户页面-->
    <!--    &lt;!&ndash;顶部卡片&ndash;&gt;-->
    <!--    <div class="q-ma-lg">-->
    <!--        <q-card>-->
    <!--            &lt;!&ndash;视差滚动&ndash;&gt;-->
    <!--            <q-parallax src="/card-bg.jpg" style="height: 30vh"></q-parallax>-->
    <!--            &lt;!&ndash;头像&ndash;&gt;-->
    <!--            <div class="absolute-bottom q-pa-md">-->
    <!--                <q-avatar v-if="user.avatar">-->
    <!--                    <q-img :src="user.avatar"></q-img>-->
    <!--                </q-avatar>-->
    <!--                <q-avatar v-else icon="person"></q-avatar>-->
    <!--            </div>-->
    <!--        </q-card>-->
    <!--    </div>-->

    <div class="q-ma-lg">
        <!--栅格布局-->
        <div class="row q-col-gutter-lg">
            <!--用户侧边栏-->
            <div class="col-3">
                <self-left></self-left>
            </div>
            <!--用户内容-->
            <div class="col-6">
                <dashboard-vue></dashboard-vue>
                <div class="q-ma-md"></div>
                <article-list :url="articleUrl"></article-list>
            </div>
            <!--用户侧边栏-->
            <div class="col-3">
                <self-right></self-right>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useUser } from 'stores/useUser';

import SelfRight from 'components/user/self/SelfRightSidebar.vue';
import SelfLeft from 'components/user/self/SelfLeftSidebar.vue';
import DashboardVue from 'components/user/self/DashBoard.vue';

import { UserInfo } from 'stores/schemas/user';
import ArticleList from 'components/article/ArticleList.vue';

export default defineComponent({

    components: {
        ArticleList,
        DashboardVue,
        SelfLeft,
        SelfRight,
    },

    data() {
        // 获取自己
        const self = useUser();
        // 默认用户属性值
        const user: UserInfo = {} as UserInfo;
        return {
            user,
            self,
            articleUrl: '/api/v1/articles_by_user?id=' + self.info.id,
        };
    },

    methods: {},
});

</script>
