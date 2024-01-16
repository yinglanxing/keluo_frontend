<template>
    <!--用户面板-->
    <q-card flat bordered>
        <q-item>
            <q-item-section avatar>
                <!--头像-->
                <div class="q-py-sm">
                    <q-avatar v-if="self.info.avatar">
                        <q-img :src="self.info.avatar"></q-img>
                    </q-avatar>
                    <q-avatar v-else icon="person"></q-avatar>
                </div>
            </q-item-section>

            <q-item-section>
                <q-item-label>
                    {{ self.info.username }}
                </q-item-label>
                <q-item-label caption>
                    {{ self.info.follower}} 粉丝
                    |
                    {{ self.info.score }} 积分
                    |
                    {{}}
                </q-item-label>
            </q-item-section>
        </q-item>
    </q-card>
    <div class="q-ma-md"></div>
    <!--数据板-->
    <q-card flat bordered>
        <q-item clickable>
            <q-item-section class="text-h6 q-ma-sm">
                <q-item-label>
                    数据概览
                    <q-icon size="15px" name="bi-question-circle-fill">
                        <q-tooltip>
                            I am groot!
                        </q-tooltip>
                    </q-icon>
                </q-item-label>
            </q-item-section>
            <q-item-section side>
                <q-item-label caption>
                    <q-icon name="bi-chevron-right"></q-icon>
                </q-item-label>
            </q-item-section>
        </q-item>
        <q-separator></q-separator>
        <q-card-actions>
            <div v-for="i in 6" :key="i" class="col-4 q-pa-xs">
                <q-card flat bordered>
                    <q-card-section>
                        **数
                    </q-card-section>
                    <q-card-section class="text-h5">
                        统计 --
                    </q-card-section>
                    <q-card-section>
                        相较前日 --
                    </q-card-section>
                </q-card>
            </div>
        </q-card-actions>
    </q-card>
    <div class="q-ma-md"></div>
    <!--用户任务-->
    <q-card flat bordered>
        <q-item>
            <q-item-section class="text-h6 q-ma-sm">
                <q-item-label>
                    发布任务
                </q-item-label>
            </q-item-section>
        </q-item>
        <q-separator></q-separator>
        <q-card-actions>
            <div v-for="i in 2" :key="i" class="col-6 q-pa-xs">
                <q-card flat bordered>
                    <q-card-section>
                        发布文章
                        <q-icon color="grey" size="15px" name="bi-question-circle-fill">
                            <q-tooltip>
                                I am groot!
                            </q-tooltip>
                        </q-icon>
                    </q-card-section>
                    <q-card-actions>
                        <q-item-label>
                            奖励积分:***
                        </q-item-label>
                        <q-space></q-space>
                        <q-btn color="primary" size="xs">go</q-btn>
                    </q-card-actions>
                </q-card>
            </div>
        </q-card-actions>
    </q-card>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useUser } from 'stores/useUser';



export default defineComponent({

    components: {
    },

    setup() {
        // 获取自己
        const self = useUser();
        return {
            self,
            articleUrl: '/api/v1/articles_by_user?id='+self.info.id,
        };
    },

    methods:{
    },
});

</script>
