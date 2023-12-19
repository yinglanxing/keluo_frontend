<template>
    <q-card class="q-my-md q-gutter-ma-md">
        <!--页头-->
        <q-card-section>
            <q-item>
                <q-item-section avatar>
                    <q-avatar>
                        <q-img alt="bg" :src="tagDetail.image"></q-img>
                    </q-avatar>
                </q-item-section>
                <q-item-section>
                    {{ tagDetail.name }}
                </q-item-section>
                <q-item-section side>
                    <q-btn v-if="tagDetail.isFollow" color="grey-3">取消关注</q-btn>
                    <q-btn v-else color="info">关注</q-btn>
                </q-item-section>
            </q-item>
        </q-card-section>

        <!--内容-->
        <q-card-section>
            <q-editor v-model="tagDetail.introduction" min-height="10vh" readonly :toolbar="[]"></q-editor>
        </q-card-section>

        <q-card-actions>
            <q-chip>
                <q-avatar icon="group" color="red"></q-avatar>
                关注:{{ tagDetail.followerNum }}
            </q-chip>
            <q-chip>
                <q-avatar icon="article" color="orange"></q-avatar>
                文章:{{ tagDetail.articleNum }}
            </q-chip>
        </q-card-actions>
    </q-card>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { TagInfoDetail } from 'stores/schemas/tag';
import { useUser } from 'src/stores/useUser';

export default defineComponent({

    components: {},

    setup() {
        return {
            count: 0,
        };
    },

    data() {
        // 用户信息
        let self = useUser();
        let tagDetail: TagInfoDetail = {} as TagInfoDetail;
        return {
            self,
            // 状态切换
            renderReady: false,
            showNavUser: false,
            showFab: true,
            // tag
            tagDetail,
        };
    },

    mounted() {
        // 获取信息
        this.getData('/api/v1/tag/info/' + this.$route.params['id']);
    },

    methods: {
        // 获取信息
        getData(url: string) {
            axios.get(url).then((req) => {
                if (req.status == 200) {
                    // 数据
                    this.tagDetail = req.data;
                }
            }).catch(() => {
                // 无法获取信息，返回上一页
                this.$router.back();
            });
        },

        follow_tag() {
            if (this.self.is_login()) {
                axios.post('/api/v1/tag/follow').then((req) => {
                    if (req.status == 200) {
                        this.tagDetail.isFollow = true;
                    }
                });
            }
        }
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
