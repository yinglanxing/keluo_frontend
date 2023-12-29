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

        <div v-for="item in comment_list" :key="item.comment_id">

            <q-separator></q-separator>

            <q-item>
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
                    <q-item-label>
                        <!--点赞-->
                        <q-btn @click="comment_thumbs(item.comment_id, item)">
                            <q-icon v-if="item.isLiked" name="thumb_up"></q-icon>
                            <q-icon v-else name="thumb_up_off_alt"></q-icon>
                            {{ item.comment_info.likes }}
                            <q-tooltip anchor="center left" self="center end">
                                点赞
                            </q-tooltip>
                        </q-btn>
                        <q-btn v-if="rep_id == item.comment_id" color="primary" flat @click="rep_click(0)">取消回复
                        </q-btn>
                        <q-btn v-else flat color="primary" @click="rep_click(item.comment_id)">回复</q-btn>
                        <div v-if="rep_id == item.comment_id" class="mt2">
                            <q-editor min-height="9vh" v-model="rep_content" :toolbar="[]"></q-editor>
                            <q-btn color="primary" class="q-my-md full-width" @click="rep_create">回复</q-btn>
                        </div>
                    </q-item-label>
                </q-item-section>
            </q-item>
            <div v-for="li in item.reply_infos" :key="li.reply_id" class="q-ml-sm">
                <q-separator inset></q-separator>
                <q-item>
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
                        <q-item-label>
                            <!--点赞-->
                            <q-btn @click="comment_thumbs(li.reply_id, li)">
                                <q-icon v-if="li.isLiked" name="thumb_up"></q-icon>
                                <q-icon v-else name="thumb_up_off_alt"></q-icon>
                                {{ item.comment_info.likes }}
                                <q-tooltip anchor="center left" self="center end">
                                    点赞
                                </q-tooltip>
                            </q-btn>
                            <q-btn v-if="rep_id == li.reply_id" color="primary" flat @click="rep_click(0)">取消回复
                            </q-btn>
                            <q-btn v-else flat color="primary" @click="rep_click(li.reply_id)">回复</q-btn>
                            <div v-if="rep_id == li.reply_id" class="mt2">
                                <q-editor min-height="9vh" v-model="rep_content" :toolbar="[]"></q-editor>
                                <q-btn color="primary" class="q-my-md full-width" @click="rep_create">回复</q-btn>
                            </div>
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </div>
        </div>

        <q-inner-loading :showing="loading" label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em" />
    </q-list>

    <!--翻页器-->
    <div v-if="max_page" class="q-pa-lg flex flex-center">
        <q-pagination v-model="page_num" :max="max_page" :max-pages="6" boundary-links direction-links></q-pagination>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {api} from 'boot/axios';
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
            page_num: 1,
            // 评论
            comment_list,
            content: '',
            // 回复
            rep_id: '',
            rep_content: '',
            // loading 状态
            loading: false,
            // 排序
            order: 'time' || 'score',
        };
    },

    mounted() {
        this.comment_get();
    },

    methods: {
        clear_content(){
            // 清空所有状态与内容
            this.rep_id = this.content = this.rep_content = ''
            this.loading = false
        },

        // 获取评论
        comment_get() {
            this.loading = true;
            api.get(
                `/api/v1/comment/list?page=${this.page_num}&item=${this.$route.params['id']}&uid=${this.self.info.id || 0}`,
            ).then((req) => {
                if (req.status == 200) {
                    this.loading = false;
                    // 评论列表
                    this.comment_list = req.data.list;
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
                api.post('/api/v1/comment/', {
                    itemType: 2,
                    userID: this.self.info.id,
                    itemID: Number(this.$route.params['id']),
                    content: this.content,
                }).then((req) => {
                    if (req.status == 200) {
                        this.clear_content()
                        this.comment_get();
                        //动态加载
                        // this.loading = false;
                    }
                });
            }
        },

        // 点击事件
        rep_click(id: string) {
            if (this.rep_id == id) {
                this.rep_id = '';
            } else {
                this.rep_id = id;
            }
            this.rep_content = '';
        },

        rep_create(toCommentID: string) {
            // 判断 未登录 或评论为空
            if (this.self.is_login() && this.content) {
                this.loading = true;
                api.post('/api/v1/comment/', {
                    itemType: 1,
                    userID: this.self.info.id,
                    itemID: Number(this.$route.params['id']),
                    toCommentID: toCommentID,
                    content: this.rep_content,
                }).then((req) => {
                    if (req.status == 200) {
                        this.clear_content()
                    }
                });
            }
        },

        comment_thumbs(id: string, item: object) {
            // 判断已登录
            if (this.self.is_login()) {
                // 未点赞状态才能点赞
                api.post('/api/v1/comment/like?id=' + id).then((req) => {
                    if (req.status == 200) {
                        // 操作成功
                        item.isLiked = !item.isLiked;
                    }
                });
            }
        },
    },

    watch: {
        '$route'() {
            // 切换 id 时刷新内容
            if (this.$route.params['id'] && this.$route.path.indexOf('/article') == 0) {
                this.page_num = 1;
                this.comment_get();
            }
        },
    },
});
</script>
