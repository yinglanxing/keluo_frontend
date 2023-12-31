<template>
    <!--文章列表-->
    <div class="q-gutter-y-lg">

        <!--列表为空-->
        <q-card v-if="pageItem.length == 0">
            <q-card-section class="q-pa-md q-gutter-md">
                <div class="text-h6">一片无人探索的领域</div>
            </q-card-section>
            <q-card-actions>
                <!-- 刷新 -->
                <q-btn class="full-width" icon="refresh" @click="getData(url)"></q-btn>
            </q-card-actions>
        </q-card>

        <!--列表内容-->
        <q-card v-for="item in pageItem" :key="item.articleInfo.id">

            <!--头部-->
            <q-card-section>
                <!--标题-->
                <router-link :to="'/article/' + item.articleInfo.id" class="q-btn ellipsis-2-lines text-left cursor-pointer">
                    <q-item-label class="ell_title text-h6 ellipsis">
                        {{ item.articleInfo.title }}
                    </q-item-label>
                </router-link>

                <q-item class="q-pb-md cursor-pointer">
                    <!--头像-->
                    <q-item-section avatar>
                        <q-avatar>
                            <q-img v-if="item.avatar" :src="item.avatar"></q-img>
                            <q-icon v-else name="person"></q-icon>
                        </q-avatar>
                    </q-item-section>

                    <!--名称与发布时间-->
                    <q-item-section>
                        <q-item-label>{{ item.authorName }}</q-item-label>
                        <q-item-label caption>
                            <!--时间-->
                            <div class="text-grey row no-wrap">
                                <q-icon name="schedule"></q-icon>
                                {{ item.articleInfo.format }}
                                <!-- {{ date.formatDate(item.articleInfo.createTime, 'YYYY-MM-DD | HH:mm:ss') }} -->
                            </div>
                        </q-item-label>
                    </q-item-section>
                </q-item>

                <!--评分-->
                <!--<q-rating v-model="stars" :max="5" size="32px"><q-rating>-->

                <!--文章内容，超过两行省略-->
                <div @click="goto(item.articleInfo.id)" class="text-subtitle1 ellipsis-2-lines cursor-pointer" style="height: 3.2em">
                    {{ item.articleInfo.content }}
                </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <!--数据统计-->
                <div class="text-caption text-grey">
                    <!--浏览-->
                    <q-icon name="visibility"></q-icon>
                    {{ item.articleInfo.viewCount }}
                    <!--评论-->
                    <q-icon class="q-pl-md" name="comment"></q-icon>
                    {{ item.articleInfo.comments }}
                    <!--关注-->
                    <q-icon class="q-pl-md" name="thumb_up"></q-icon>
                    {{ item.articleInfo.likes }}
                </div>
            </q-card-section>

            <!--分割线-->
            <q-separator></q-separator>

            <!--卡片底部内容-->
            <q-card-actions>
                <!-- 收藏 -->
                <q-btn round @click="article_collect(item.articleInfo)">
                    <q-icon v-if="item.articleInfo.isCollected" name="star"></q-icon>
                    <q-icon v-else name="star_border"></q-icon>
                </q-btn>

                <q-separator class="m3" vertical inset></q-separator>

                <!-- 标签 -->
                <q-btn size="sm" v-if="item.articleInfo.tags?.length > 0" :to="'/tag/' + item.articleInfo.tags[0].id">
                    {{ item.articleInfo.tags[0].name }}
                </q-btn>
                <q-btn size="sm" v-if="item.articleInfo.tags?.length > 1" :to="'/tag/' + item.articleInfo.tags[1].id">
                    {{ item.articleInfo.tags[1].name }}
                </q-btn>
                <q-btn size="sm" v-if="item.articleInfo.tags?.length > 2" :to="'/tag/' + item.articleInfo.tags[2].id">
                    {{ item.articleInfo.tags[2].name }}
                </q-btn>

                <q-space></q-space>

                <!-- 侧边更多功能 -->
                <q-btn flat icon="more_vert" round>
                    <q-menu>
                        <q-list bordered>
                            <!-- 点赞 -->
                            <q-item clickable v-ripple @click="article_thumbs(item.articleInfo)">
                                <q-item-section avatar>
                                    <q-icon v-if="item.articleInfo.isLiked" name="thumb_up"></q-icon>
                                    <q-icon v-else name="thumb_up_off_alt"></q-icon>
                                </q-item-section>
                                <q-item-section>
                                    点赞
                                </q-item-section>
                            </q-item>
                            <!-- 收藏 -->
                            <q-item clickable v-ripple @click="article_collect(item.articleInfo)">
                                <q-item-section avatar>
                                    <q-icon v-if="item.articleInfo.isCollected" name="star"></q-icon>
                                    <q-icon v-else name="star_border"></q-icon>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label> {{ $t('article.collect') }}</q-item-label>
                                </q-item-section>
                            </q-item>
                            <!-- 举报 -->
                            <!-- <q-item disable clickable v-ripple>
                                <q-item-section avatar>
                                    <q-icon color="red" name="report"></q-icon>
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label> {{ $t('article.report') }}</q-item-label>
                                </q-item-section>
                            </q-item> -->
                        </q-list>
                    </q-menu>
                </q-btn>
            </q-card-actions>
        </q-card>
    </div>

    <!--翻页器-->
    <div v-if="max_page" class="q-pa-lg flex flex-center">
        <q-pagination v-model="page_num" :max="max_page" :max-pages="6" boundary-links direction-links></q-pagination>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from 'boot/axios';
// import { date } from 'quasar';
import { useUser } from 'src/stores/useUser';
import { ApiArticleInfo, ArticleInfo } from 'src/stores/schemas/article';

export default defineComponent({
    props: {
        // 数据获取路径
        url: {
            type: String,
            default: '/api/v1/recommend/article',
        },
    },

    setup() {
        let self = useUser();
        return {
            self,
            // 日期api
            // date,
        };
    },

    mounted() {
        // 刷新数据
        this.getData(this.url);
    },

    data() {
        // 存储内容
        let dataList: ApiArticleInfo[] = [];
        // 页面内容
        let pageItem: ApiArticleInfo[] = [];

        return {
            // 所有数据
            dataList,
            // 页面元素
            pageItem,
            // 使用翻页模式
            usePage: true,
            // 当前页面
            page_num: 1,
            // 最大页面
            max_page: 0,
            // 锁
            lock: false,
            // ! 获取页面追加参数
            cursor: '',
            // 其他参数

        };
    },

    methods: {
        goto(take: number | string) {
            this.$router.push('/article/' + take);
        },

        // 获取新数据
        getData(url: string) {
            // if (!this.lock && url) {
            if (url) {
                api.get(url).then((req) => {
                    if (req.status == 200) {
                        // // 如果存在数据则装载数据
                        // if (req.data.data.results?.length) {
                        //     // 装载数据
                        //     this.dataList.push(...req.data.data.results);
                        // }
                        // // 是否已取完数据
                        // this.lock = !req.data.data.hasMore;
                        // // 最大页数刷新
                        // this.maxCount = this.dataList.length / 10;
                        this.max_page = Math.ceil(req.data.total / 10);
                        // // ! 下一个页面参数
                        // this.cursor = req.data.data.cursor;
                        //
                        // // 刷新页面内容
                        // this.cutPageItems();
                        if (req.data.list) {
                            this.pageItem = req.data.list;
                        }
                    }
                });
            }
        },

        initialization() {
            // 初始化所有内容
            this.dataList.length = 0;
            this.pageItem.length = 0;
            // 重置页数
            this.max_page = 0;
            this.page_num = 1;
            // this.lock = false;
            // 获取新数据
            this.getData(this.url);
        },

        cutPageItems() {
            // 裁出当前页面应有的元素
            this.pageItem = this.dataList.slice((this.page_num - 1) * 10, this.page_num * 10);
        },

        // 点赞
        article_thumbs(item: ArticleInfo) {
            // 判断已登录
            if (this.self.is_login()) {
                // 未点赞状态才能点赞
                api.post('/api/v1/article/like?id=' + item.id).then((req) => {
                    if (req.status == 200) {
                        // 操作成功
                        item.isLiked = !item.isLiked;
                    }
                });
            }
        },

        // 收藏文章
        article_collect(item: ArticleInfo) {
            // 判断已登录
            if (this.self.is_login()) {
                api.post('/api/v1/collect/', { 'aid': String(item.id) }).then((req) => {
                    if (req.status == 200) {
                        // 收藏成功
                        item.isCollected = !item.isCollected;
                    }
                });
            }
        },
    },

    watch: {
        'page_num'() {
            // 开启页面模式的状态下，数值变动更新列表
            if (this.usePage) {
                let pre = '';
                if (this.url.indexOf('?') == -1) {
                    pre += '?';
                } else {
                    pre += '&';
                }
                // this.cutPageItems();
                this.getData(this.url + pre + 'page=' + this.page_num);
            }

            // // 页面值达到最大，且未上锁
            // if (this.page_num == this.maxCount && !this.lock) {
            //     // 获取后续页面
            //     if (this.url.indexOf('?') >= 0) {
            //         this.getData(this.url + '&cursor=' + this.cursor);
            //     } else {
            //         this.getData(this.url + '?cursor=' + this.cursor);
            //     }
            // }
        },

        'url'() {
            // 切换数据获取地址后，清空默认存储数据
            this.initialization();
        },
    },
});
</script>

<style lang="css" scoped>
/* 解决 flex 带来的 nowrap 无法确定组件宽度问题 */
.ell_title {
    max-width: 80vw
}

@media screen and (max-width: 680px) {
    .ell_title {
        max-width: 70vw
    }
}
</style>
