<template>

    <q-list bordered>
        <!--用户信息-->
        <q-item>
            <q-item-section avatar>
                <q-avatar>
                    <q-img v-if="self.info.avatar" :src="self.info.avatar"></q-img>
                    <q-icon v-else name="person"></q-icon>
                </q-avatar>
            </q-item-section>
            <q-item-section>
                <q-item-label>{{ self.info.username || '请登录' }}</q-item-label>
            </q-item-section>
        </q-item>

        <q-item>
            <q-item-section>
                <q-editor min-height="9vh" v-model="content" :toolbar="[]"></q-editor>
                <q-btn color="primary" class="q-my-md" @click="comment_create">评论</q-btn>
            </q-item-section>
        </q-item>

        <q-item v-for="item in comment_list" :key="item.comment_id">
            <q-expansion-item v-if="item.reply_infos.length" class="full-width">
                <template v-slot:header>
                    <!--头像-->
                    <q-item-section avatar>
                        <q-avatar>
                            <q-img v-if="item.user_info.avatar" :src="item.user_info.avatar"></q-img>
                            <q-icon v-else name="person"></q-icon>
                        </q-avatar>
                        <q-space></q-space>
                    </q-item-section>
                    <q-item-section>
                        <!--名称-->
                        <q-item-label>
                            {{ item.user_info.username }}
                        </q-item-label>
                        <!--时间-->
                        <q-item-label caption>
                            {{ item.comment_info.format }}
                        </q-item-label>
                        <!--内容-->
                        <q-item-label>
                            {{ item.comment_info.content }}
                        </q-item-label>
                    </q-item-section>
                </template>
                <q-item v-for="li in item.reply_infos" :key="li.reply_id">
                    <!--头像-->
                    <q-item-section avatar>
                        <q-avatar>
                            <q-img v-if="li.reply_user.avatar" :src="li.reply_user.avatar"></q-img>
                            <q-icon v-else name="person"></q-icon>
                        </q-avatar>
                        <q-space></q-space>
                    </q-item-section>
                    <q-item-section>
                        <!--名称-->
                        <q-item-label>
                            {{ li.reply_user.username }}
                        </q-item-label>
                        <!--时间-->
                        <q-item-label caption>
                            {{ li.reply_info.format }}
                        </q-item-label>
                        <!--内容-->
                        <q-item-label>
                            {{ li.reply_info.reply_content }}
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </q-expansion-item>

            <q-item v-else class="full-width">
                <q-item-section avatar>
                    <q-avatar>
                        <q-img v-if="item.user_info.avatar" :src="item.user_info.avatar"></q-img>
                        <q-icon v-else name="person"></q-icon>
                    </q-avatar>
                    <q-space></q-space>
                </q-item-section>
                <q-item-section>
                    <!--名称-->
                    <q-item-label>
                        {{ item.user_info.username }}
                    </q-item-label>
                    <!--时间-->
                    <q-item-label caption>
                        {{ item.comment_info.format }}
                    </q-item-label>
                    <!--内容-->
                    <q-item-label>
                        {{ item.comment_info.content }}
                    </q-item-label>
                </q-item-section>
            </q-item>
        </q-item>
    </q-list>

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

    mounted() {
        // 测试获取评论数据
        // axios.get('/com1.json.log').then((req) => {
        //     if (req.status == 200) {
        //         this.loading = false;
        //         // 评论列表
        //         this.comment_list = req.data.list;
        //         // 当前页
        //         this.page_num = req.data.page;
        //         // 向上取整
        //         this.max_page = Math.ceil(req.data.total / 10);
        //     }
        // });
        this.comment_get();
    },

    methods: {
        // 获取评论
        comment_get() {
            this.loading = true;
            axios.get(
                `/api/v1/comment/list?page=${this.page_num}&item=${this.$route.params['id']}&uid=${this.self.info.id || 0}`,
            ).then((req) => {
                if (req.status == 200) {
                    this.loading = false;
                    // 评论列表
                    this.comment_list = req.data.data.list;
                    // 当前页
                    this.page_num = req.data.page;
                    // 向上取整
                    this.max_page = Math.ceil(req.data.total / 10);
                }
                this.loading = false;
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
            // 判断 未登录 或评论为空
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

    watch: {
        '$route'() {
            // 切换 id 时刷新内容
            if (this.$route.params['id'] && this.$route.path.indexOf('/article') == 0) {
                this.page_num = 0;
                this.comment_get();
            }
        },
    },
});
</script>
