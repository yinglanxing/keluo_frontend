<template>
    <!--文章-->
    <div class="index q-ma-md">
        <!--文侧边栏始终吸顶-->
        <div class="row q-col-gutter-lg">
            <!--页面左侧边栏-->
            <div class="col-md-3" v-if="$q.screen.gt.md">
                <!--吸顶-->
                <index-left-sidebar class="sticky top-15"></index-left-sidebar>
            </div>

            <!--页面内容-->
            <div class="col-12 col-md-6">
                <!-- 顶部nav-->
                <!--<default-nav></default-nav>-->
                <article-list v-if="$route.path == '/'"></article-list>
                <router-view></router-view>
            </div>

            <!--页面右侧边栏-->
            <div class="col-md-3" v-if="$q.screen.gt.md">
                <!--吸顶-->
                <index-right-sidebar class="sticky top-15"></index-right-sidebar>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

import IndexLeftSidebar from 'components/index/IndexLeftSidebar.vue';
import IndexRightSidebar from 'components/index/IndexRightSidebar.vue';
import ArticleList from 'components/article/ArticleList.vue';

export default defineComponent({

    components: {
        IndexLeftSidebar,
        IndexRightSidebar,
        ArticleList,
    },

    setup() {
        return {
            count: 0,
        };
    },
});
</script>
