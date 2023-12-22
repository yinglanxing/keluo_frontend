<template>
    <!--主页-->

    <!--<section class="index">-->
    <!--    <div class="wings">-->
    <!--        <div class="row q-col-gutter-lg">-->
    <!--                <index-left-sidebar/>-->
    <!--        </div>-->
    <!--    </div>-->
    <!--    <div class="torso">-->
    <!--        &lt;!&ndash;页面内容&ndash;&gt;-->
    <!--        <div class="col-md-6">-->
    <!--            &lt;!&ndash; 顶部nav&ndash;&gt;-->
    <!--            &lt;!&ndash;<default-nav></default-nav>&ndash;&gt;-->
    <!--            <article-list/>-->
    <!--        </div>-->
    <!--    </div>-->
    <!--    <div class="wings"><index-right-sidebar/></div>-->
    <!--</section>-->
    <!--<section>-->
    <!--    <div class="wings">左下角占位</div>-->
    <!--    <div class="torso">文章占位</div>-->
    <!--    <div class="wings">右下角占位</div>-->
    <!--</section>-->
    <div class="index q-ma-md">
        <!--文侧边栏始终吸顶-->
        <div class="row q-col-gutter-lg">
            <!--页面左侧边栏-->
            <div class="col-md-2" v-if="$q.screen.gt.md">
                <!--吸顶-->
                <index-left-sidebar class="sticky top-17"></index-left-sidebar>
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
                <index-right-sidebar class="sticky top-17"></index-right-sidebar>
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

<style scoped lang="scss">
//.index {
//     height: 100%;
//     background-color: aquamarine;
//
//    //@media screen and (min-width: 1920px) {
//    //    height: calc(100svh - 50px);
//    //}
//}

//section {
//    display: grid;
//    gap: 16px;
//
//    & > * {
//        background-color: azure;
//    }
//
//    @media screen and (min-width: 1920px) {
//        grid-template-columns: $wings-width $torso-width $wings-width;
//    }
// }
</style>
