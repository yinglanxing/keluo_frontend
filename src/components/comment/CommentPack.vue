<template>
    <!--翻页器-->
    <div v-if="max_page" class="q-pa-lg flex flex-center">
        <q-pagination v-model="page_num" :max="max_page" :max-pages="6" boundary-links direction-links></q-pagination>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { useUser } from 'src/stores/useUser';
import { CommentListItem } from 'src/stores/schemas/comment';

export default defineComponent({
    setup() {
        let self = useUser();
        return {
            self,
        };
    },

    data() {
        let comment_list: CommentListItem[] = [];
        return {
            max_page: 0,
            page_num: 0,
            // 评论
            comment_list,
            content: '',
            // 回复
            rep_id: 0,
            rep_content: '',
            // loading 状态
            loading: false,
            // 排序
            order: 'time' || 'score',
        };
    },

    methods: {
        // 获取评论
        comment_get(page = 1) {
            this.loading = true;
            axios.get('/api/v1/comment?page=' + page).then((req) => {
                if (req.status == 200) {
                    this.loading = false;
                    // 评论列表
                    this.comment_list = req.data.list;
                    // 当前页
                    this.page_num = req.data.page;
                    // 向上取整
                    this.max_page = Math.ceil(req.data.total / 10);
                }
            });
        },

        // 创建评论
        comment_create() {
            // 未登录 或评论为空
            if (this.self.is_login() && this.content) {
                this.loading = true;
                axios.post('/api/v1/comment', {
                    itemType: 2,
                    userID: this.self.info.id,
                    itemID: this.$route.params['id'],
                    content: this.content,
                }).then((req) => {
                    if (req.status == 200) {
                        this.loading = false;
                    }
                });
            }
        },

        // 点击事件
        rep_click(id: number) {
            this.rep_id = id;
            this.rep_content = '';
        },

        rep_create(toCommentID: string) {
            // 未登录 或评论为空
            if (this.self.is_login() && this.content) {
                this.loading = true;
                axios.post('/api/v1/comment', {
                    itemType: 1,
                    userID: this.self.info.id,
                    itemID: this.$route.params['id'],
                    toCommentID: toCommentID,
                    content: this.rep_content,
                }).then((req) => {
                    if (req.status == 200) {
                        this.loading = false;
                    }
                });
            }
        },
    },
});
</script>
