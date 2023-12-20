<template>
    <!--左侧固定按钮-->
    <!--隐藏条件 xs sm-->
    <div></div>
    <div class="q-gutter-md xs-hide sm-hide" style="width: 10px;height: 10px;top: 20vh;position: sticky;left: 0;">
        <!--点赞-->
        <q-btn fab color="primary" @click="article_thumbs">
            <q-icon v-if="article.isLiked" name="thumb_up"></q-icon>
            <q-icon v-else name="thumb_up_off_alt"></q-icon>
            <q-tooltip anchor="center left" self="center end">
                点赞
            </q-tooltip>
        </q-btn>
        <!--收藏-->
        <q-btn fab color="primary" @click="article_collect">
            <q-icon v-if="article.isCollected" name="star"></q-icon>
            <q-icon v-else name="star_border"></q-icon>
            <q-tooltip anchor="center left" self="center end">
                {{ $t('article.collect') }}
            </q-tooltip>
        </q-btn>
        <!--评论区-->
        <q-btn fab color="primary" icon="comment" @click="scroll_to_comment">
            <q-tooltip anchor="center left" self="center end">
                {{ $t('article.comment') }}
            </q-tooltip>
        </q-btn>
        <!--举报-->
        <!-- <q-btn fab color="primary" icon="report" @click="article_report">
            <q-tooltip anchor="center left" self="center end">
                {{ $t('article.report') }}
            </q-tooltip>
        </q-btn> -->
        <!--作者+超过高度隐藏-->
        <q-btn v-show="showNavUser" fab color="primary" icon="person">
            <q-menu anchor="bottom middle" self="top middle" auto-close>
                <!--主页-->
                <user-card v-if="showNavUser" :user="author"></user-card>
            </q-menu>
            <q-tooltip anchor="center left" self="center end">
                {{ $t('article.author') }}
            </q-tooltip>
        </q-btn>
    </div>

    <!--固定内容-->
    <div class="row">
        <!--页面左侧边栏留白-->
        <div class="col-1 of-hidden p-5"></div>

        <!--中间页面内容-->
        <div class="col-8">
            <q-card class="q-my-md q-gutter-ma-md">
                <q-img :ratio="16 / 9" alt="bg" :src="article.image || '/card-bg.jpg'"></q-img>

                <!--页头-->
                <q-card-section>
                    <div class="row no-wrap items-center">
                        <!--标题-->
                        <div class="col text-h4 ellipsis">
                            {{ article.title }}
                        </div>
                        <!--时间-->
                        <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                            <q-icon name="schedule"></q-icon>
                            {{ date.formatDate(article.createTime, 'YYYY-MM-DD | HH:mm:ss') }}
                        </div>
                    </div>

                </q-card-section>

                <!--内容-->
                <q-card-section>
                    <q-editor v-model="article.content" min-height="10vh" :toolbar="[]"></q-editor>
                </q-card-section>

                <!--分割线-->
                <q-separator></q-separator>

                <!--tags-->
                <q-card-section class="q-gutter-md">
                    <div v-if="!tags?.length" class="text-grey-3">
                        empty
                    </div>
                    <q-chip v-for="i in tags" :key="i.id">{{ i.name }}</q-chip>
                </q-card-section>
            </q-card>

            <!--评论区-->
            <div id="comment_target"></div>
            <!--<comments></comments>-->
        </div>


        <!--页面右侧边栏-->
        <div class="col-3">
            <div class="q-ma-md q-gutter-md">
                <!--页面作者的信息-->
                <user-card v-intersection="onIntersection" :user="author" show-actions></user-card>

                <!--markdown 目录-->
                <!-- <q-card>
                    <q-card-section>
                        {{ $t('dir') }}
                    </q-card-section>
                </q-card> -->

                <!--推荐-->
                <q-card>
                    <!--精选内容-->
                    <q-card-section>
                        {{ $t('side.related') }}
                    </q-card-section>

                    <q-list bordered separator>
                        <q-item v-for="item in relatedList" :key="item.id" v-ripple clickable>
                            <q-item-section>
                                {{ item.title }}
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card>

            </div>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { date } from 'quasar';
import { useUser } from 'src/stores/useUser';

import { UserInfo } from 'stores/schemas/user';
import { SelectableTag } from 'stores/schemas/tag';
import { IntersectionEvent } from 'stores/schemas/event';
import { ArticleInfo, ArticleDetail } from 'stores/schemas/article';

import UserCard from 'components/user/UserCard.vue';

export default defineComponent({

    components: {
        UserCard,
    },

    data() {
        let article: ArticleInfo = { content: '' } as ArticleInfo;
        let tags: SelectableTag[] = [];
        let author: UserInfo = {} as UserInfo;
        let relatedList: ArticleInfo[] = [];
        let self = useUser();
        return {
            self,
            // 日期api
            date,
            // 状态切换
            renderReady: false,
            showNavUser: false,
            showFab: true,
            // 文章
            article,
            // 标签
            tags,
            // 作者
            author,
            // 相关推荐
            relatedList,
        };
    },


    mounted() {
        // 获取文章信息
        this.getData('/api/v1/article/' + this.$route.params['id']);
    },

    methods: {
        // 获取文章信息
        getData(url: string) {
            axios.get(url).then((req) => {
                if (req.status == 200) {
                    let data: ArticleDetail = req.data;
                    // 文章数据
                    this.article = req.data.article;
                    this.tags = req.data.tags;
                    // 用户数据
                    this.author = req.data.userInfo;
                    this.article.isLiked = data.isLiked;
                    this.article.isCollected = data.isCollected;
                    // 获取相关文章
                    // axios.get('/api/v1/article/related/' + this.$route.params['id']).then((req) => {
                    //     if (req.status == 200) {
                    //         this.relatedList = req.data.data || [];
                    //     }
                    // });
                }
            }).catch(() => {
                // 无法获取信息，返回上一页
                this.$router.back();
            });
        },

        // 用户卡片超过可视范围
        onIntersection(entry: IntersectionEvent) {
            // 左侧按钮显示用户信息按钮
            this.showNavUser = !Boolean(entry.isIntersecting);
        },

        // 滚动到评论区
        scroll_to_comment() {
            let target = document.getElementById('comment_target');
            console.log(target, target?.offsetTop);
            if (target) {
                window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
            }
        },

        // 点赞
        article_thumbs() {
            // 判断已登录
            if (this.self.is_login()) {
                // 未点赞状态才能点赞
                axios.post('/api/v1/article/like?id=' + this.article.id).then((req) => {
                    if (req.status == 200) {
                        // 操作成功
                        this.article.isLiked = !this.article.isLiked;
                    }
                });
            }
        },

        // 收藏文章
        article_collect() {
            // 判断已登录
            if (this.self.is_login()) {
                axios.post('/api/v1/collect/', { 'aid': String(this.article.id) }).then((req) => {
                    if (req.status == 200) {
                        // 收藏成功
                        this.article.isCollected = !this.article.isCollected;
                    }
                });
            }
        },

        // 举报文章
        article_report() {
            // 判断已登录
            if (this.self.is_login()) {
                // axios.post('')
            }
        },
    },

    watch: {
        '$route'() {
            // 切换 id 时刷新内容
            if (this.$route.params['id'] && this.$route.path.indexOf('/article') == 0) {
                this.getData('/api/v1/article/' + this.$route.params['id']);
            }
        },
    },
});
</script>
