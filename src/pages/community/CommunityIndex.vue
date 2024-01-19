<template>
    <!--主页-->
    <div class="index q-ma-md">
        <!--文侧边栏始终吸顶-->
        <div class="row q-col-gutter-lg">
            <!--页面左侧边栏-->
            <!-- <div class="col-md-2" v-if="$q.screen.gt.md"> -->
            <div class="col-md-2 xs-hide sm-hide">
                <!--吸顶-->
                <index-left-sidebar class="sticky top-17"></index-left-sidebar>
            </div>

            <!--页面内容-->
            <!-- <div class="col-12 col-md-6"> -->
            <div class="col-12 col-md-7">
                <!-- 顶部nav-->
                <!--<default-nav></default-nav>-->
                <router-view></router-view>
            </div>

            <!--页面右侧边栏-->
            <!-- <div class="col-md-3" v-if="$q.screen.gt.md"> -->
            <div class="col-md-3 xs-hide sm-hide">
                <!--吸顶-->
                <index-right-sidebar class="sticky top-17"></index-right-sidebar>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

import IndexLeftSidebar from '../../components/index/IndexLeftSidebar.vue';
import IndexRightSidebar from '../../components/index/IndexRightSidebar.vue';

export default defineComponent({

    components: {
        IndexLeftSidebar,
        IndexRightSidebar,
    },

    setup() {
        return {
            count: 0,
        };
    },
});
</script>