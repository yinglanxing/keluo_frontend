<template>
    <!--主页-->
    <section class="index">
        <div class="wings">热搜榜单占位</div>
        <div class="torso">轮播图占位</div>
        <div class="wings">广告图占位</div>
    </section>
    <section>
        <div class="wings">左下角占位</div>
        <div class="torso">文章占位</div>
        <div class="wings">右下角占位</div>
    </section>
    <div v-if="0">

        <div class="row q-col-gutter-lg">
            <!--页面左侧边栏-->
            <div class="col-md-3">
                <index-left-sidebar />
            </div>

            <!--页面内容-->
            <div class="col-md-6">
                <!-- 顶部nav-->
                <!--<default-nav></default-nav>-->
                <article-list />
            </div>

            <!--页面右侧边栏-->
            <div class="col-md-3">
                <index-right-sidebar />
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

<style scoped lang="scss">
.index {
    height: 1500px;
    background-color: aquamarine;

    @media screen and (min-width: 1920px) {
        height: calc(100svh - 50px);
    }
}

section {
    display: grid;
    gap: 16px;

    &>* {
        background-color: azure;
    }

    @media screen and (min-width: 1920px) {
        grid-template-columns: $wings-width $torso-width $wings-width;
    }
}</style>
