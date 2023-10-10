<template>
    <!--左侧固定按钮-->
    <q-fab
        color="primary" direction="down" icon="add"
        style="top: 10vh;position: sticky;left: 0;"
    >
        <!--评论区-->
        <q-fab-action
            :label="$t('article.comment')" color="primary" external-label
            fab icon="comment"
            label-position="left"
        ></q-fab-action>
        <!--收藏-->
        <q-fab-action
            :label="$t('article.collect')" color="primary" external-label
            fab icon="star"
            label-position="left"
        ></q-fab-action>
        <!--分享-->
        <q-fab-action
            :label="$t('article.share')" color="primary" external-label
            fab icon="share"
            label-position="left"
        ></q-fab-action>
        <!--举报-->
        <q-fab-action
            :label="$t('article.report')" color="primary" external-label
            fab icon="report"
            label-position="left"
        ></q-fab-action>
        <!--作者+滑动动画-->
        <q-fab-action
            v-show="showNavUser"
            :label="$t('article.author')" color="primary" external-label
            fab icon="person"
            label-position="left"
        ></q-fab-action>
    </q-fab>


    <!--固定内容-->
    <div class="row">
        <!--页面左侧边栏留白-->
        <div class="col-1" style="overflow: hidden;padding: 15px"></div>


        <!--中间页面内容-->
        <div class="col-8">
            <q-card class="q-my-md q-gutter-ma-md">
                <q-img :ratio="16/9" alt="bg" src="/card-bg.jpg"></q-img>

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
                    <q-editor v-model="article.content" min-height="10vh" readonly></q-editor>
                </q-card-section>

                <!--分割线-->
                <q-separator></q-separator>

                <!--tags-->
                <q-card-section class="q-gutter-md">
                    <div v-if="!article.tags?.length" class="text-grey-3">
                        empty
                    </div>
                    <q-chip v-for="i in article.tags" :key="i.tagId">{{ i.tagName }}</q-chip>
                </q-card-section>
            </q-card>

            <!--评论区-->
            <!--<comment></comment>-->
        </div>


        <!--页面右侧边栏-->
        <div class="col-3">
            <div class="q-ma-md q-gutter-md">
                <!--页面作者的信息-->
                <user-card v-intersection="onIntersection" :user="author" show-actions></user-card>

                <!--markdown 目录-->
                <q-card>
                    <q-card-section>
                        {{ $t('dir') }}
                    </q-card-section>
                </q-card>

                <!--推荐-->
                <q-card>
                    <!--精选内容-->
                    <q-card-section>
                        {{ $t('side.related') }}
                    </q-card-section>

                    <q-list bordered separator>
                        <q-item v-for="item in relatedList" :key="item.articleId" v-ripple clickable>
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
// 模型
import { UserInfo } from 'stores/schemas/user';
import { ArticleView } from 'stores/schemas/article';
import { IntersectionEvent } from 'stores/schemas/event';
// 组件
import UserCard from 'components/UserCard.vue';

export default defineComponent({
    name: 'ArticleIdPage',

    // 引用组件
    components: {
        UserCard,
    },

    data() {
        // 用户信息
        let article: ArticleView = {} as ArticleView;
        let author: UserInfo = {} as UserInfo;
        let relatedList: ArticleView[] = [];
        return {
            // 日期api
            date,
            // 状态切换
            renderReady: false,
            showNavUser: false,
            // 文章
            article,
            // 作者
            author,
            // 相关推荐
            relatedList,
        };
    },


    mounted() {
        // 获取文章信息
        this.getData('https://mlog.club/api/article/' + this.$route.params['id']);
    },

    methods: {
        // 获取文章信息
        getData(url: string) {
            axios.get(url).then((req) => {
                // 文章数据
                this.article = req.data.data;
                // 用户数据
                this.author = req.data.data.user;
                // 获取相关文章
                axios.get(
                    'https://mlog.club/api/article/related/' + this.$route.params['id'],
                ).then((req) => {
                    this.relatedList = req.data.data || [];
                });
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
    },
});
</script>

<style scoped></style>
