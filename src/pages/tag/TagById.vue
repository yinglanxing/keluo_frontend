<template>
    <q-card class="q-my-md q-gutter-ma-md">
        <q-img :ratio="16/9" alt="bg" :src="tagDetail.image || '/card-bg.jpg'"></q-img>

        <!--页头-->
        <q-card-section>
            <div class="row no-wrap items-center">
                <!--标题-->
                <div class="col text-h4 ellipsis">
                    {{ tagDetail.name }}
                </div>
            </div>

            <q-btn v-if="tagDetail.isFollow" color="grey-3">取消关注</q-btn>
            <q-btn v-else color="info">关注</q-btn>

        </q-card-section>

        <!--内容-->
        <q-card-section>
            <q-editor v-model="tagDetail.introduction" min-height="10vh" readonly :toolbar="[]"></q-editor>
        </q-card-section>
    </q-card>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { TagInfoDetail } from 'stores/schemas/tag';

export default defineComponent({

    components: {},

    setup() {
        return {
            count: 0,
        };
    },

    data() {
        // 用户信息
        let tagDetail: TagInfoDetail = {} as TagInfoDetail;
        return {
            // 状态切换
            renderReady: false,
            showNavUser: false,
            showFab: true,
            // 文章
            tagDetail,
        };
    },

    mounted() {
        // 获取文章信息
        this.getData('/api/v1/tag/info/' + this.$route.params['id']);
    },

    methods: {
        // 获取文章信息
        getData(url: string) {
            axios.get(url).then((req) => {
                if (req.status == 200) {
                    // 文章数据
                    this.tagDetail = req.data;
                }
            }).catch(() => {
                // 无法获取信息，返回上一页
                // this.$router.back();
            });
        },

    },

    watch: {
        '$route'() {
            // 切换 id 时刷新内容
            if (this.$route.params['id']) {
                this.getData('/api/v1/tag/info/' + this.$route.params['id']);
            }
        },
    },
});
</script>
