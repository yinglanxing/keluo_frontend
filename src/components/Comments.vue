<template>
    <!--评论区-->
    <q-card class="q-mb-lg">
        <q-list separator>
            <!--用户添加评论-->
            <q-item>
                <!--头像-->
                <q-item-section avatar top>
                    <q-avatar size="xl">
                        <q-icon size="xl" name="person"></q-icon>
                    </q-avatar>
                </q-item-section>
                <!--编辑内容-->
                <q-item-section>
                    <!--长文本输入框，根据换行自增高度-->
                    <q-input :label="'comment'" type="textarea" autogrow></q-input>
                    <!--todo 显示回复目标-->
                    <!--<div class="format">-->
                    <!--    <q-icon name="format_quote"></q-icon>-->
                    <!--    {{ comment.quote.content }}-->
                    <!--</div>-->
                    <!--提交按钮-->
                    <q-btn type="submit" class="q-mt-lg">{{ $t('send') }}</q-btn>
                </q-item-section>
            </q-item>

            <q-item v-for="item in commentsList" :key="item.commentId">
                <q-card flat class="full-width">
                    <!--主评论-->
                    <q-card-section>
                        <comments-item :comment="item"></comments-item>
                    </q-card-section>

                    <!--嵌套评论-->
                    <q-list class="full-width q-pl-xl" bordered separator v-if="item.replies?.results.length">
                        <q-item v-for="child in item.replies.results" :key="child.commentId">
                            <comments-item :comment="child"></comments-item>
                        </q-item>
                    </q-list>
                </q-card>
            </q-item>
        </q-list>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { date } from 'quasar';
// 状态
import { useUser } from 'stores/useUser';
// 模型
import { CommentInfo } from 'stores/schemas/comment';
// 组件
import CommentsItem from 'components/CommentsItem.vue';

export default defineComponent({
    name: 'CommentsVue',

    // 引用组件
    components: {
        CommentsItem,
    },

    setup() {
        // 自身状态
        const self = useUser();
        return {
            self,
            date,
        };
    },

    data() {
        return {
            // 用户评论列表
            commentsList: [] as CommentInfo[],
        };
    },

    mounted() {
        this.getData();
    },

    methods: {
        getData() {
            // 获取评论列表
            const url = 'https://mlog.club/api/comment/comments?entityType=article&entityId=';
            axios.get(url + this.$route.params['id']).then((req) => {
                this.commentsList = req.data.data.results;
            });
        },
    },

    watch: {
        '$route'() {
            // 切换 id 时刷新内容
            if (this.$route.params['id']) {
                this.getData();
            }
        },
    },
});
</script>
