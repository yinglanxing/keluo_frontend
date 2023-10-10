<template>
    <!--主页-->
    <div class="q-ma-lg">

        <div class="row q-col-gutter-lg">
            <!--页面左侧边栏-->
            <div class="col-md-3">
                <index-left-sidebar></index-left-sidebar>
            </div>

            <!--页面内容-->
            <div class="col-md-6">
                <!-- 顶部nav-->
                <!--<default-nav></default-nav>-->
                <article-list></article-list>
            </div>

            <!--页面右侧边栏-->
            <div class="col-md-3">
                <index-right-sidebar></index-right-sidebar>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
// 组件
import IndexLeftSidebar from 'components/IndexLeftSidebar.vue';
import IndexRightSidebar from 'components/IndexRightSidebar.vue';
import ArticleList from 'components/ArticleList.vue';

export default defineComponent({
    name: 'IndexPage',

    // 引用组件
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

<style scoped></style>
