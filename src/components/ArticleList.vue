<template>
    <!--文章列表-->
    <div class="q-gutter-y-lg">

        <!--列表为空-->
        <q-btn v-if="dataList.length == 0"
               class="full-width" icon="refresh"></q-btn>

        <!--列表内容-->
        <q-card v-for="item in pageItem" :key="item.articleId">

            <!--头部-->
            <q-card-section>
                <!--标题-->
                <router-link
                    :to="'/article/'+item.articleId"
                    class="q-btn ellipsis-2-lines text-left"
                >
                    <q-item-label class="ell_title text-h6 ellipsis">
                        {{ item.title }}
                    </q-item-label>
                </router-link>

                <q-item class="q-pb-md">
                    <!--头像-->
                    <q-item-section avatar>
                        <q-avatar>
                            <!--<q-img v-if="user?.avatar" :src="user.avatar"></q-img>-->
                            <!--<q-icon v-else name="person"/>-->
                            <q-icon name="person"/>
                        </q-avatar>
                    </q-item-section>

                    <!--名称与发布时间-->
                    <q-item-section>
                        <q-item-label>{{ item.user.nickname }}</q-item-label>
                        <q-item-label caption>
                            <!--时间-->
                            <div class="text-grey row no-wrap">
                                <q-icon name="schedule"/>
                                {{ date.formatDate(item.createTime, 'YYYY-MM-DD | HH:mm:ss') }}
                            </div>
                        </q-item-label>
                    </q-item-section>
                </q-item>

                <!--评分-->
                <!--<q-rating v-model="stars" :max="5" size="32px"/>-->

                <!--文章内容，超过两行省略-->
                <div class="text-subtitle1 ellipsis-2-lines" style="height: 3.2em">
                    {{ item.summary }}
                </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <!--数据统计-->
                <div class="text-caption text-grey">
                    <!--浏览-->
                    <q-icon name="visibility"/>
                    {{ item.viewCount }}
                    <!--评论-->
                    <q-icon class="q-pl-md" name="comment"/>
                    {{ item.commentCount }}
                    <!--关注-->
                    <q-icon class="q-pl-md" name="star"/>
                    {{ item.likeCount }}
                </div>
            </q-card-section>

            <!--分割线-->
            <q-separator/>

            <!--卡片底部内容-->
            <q-card-actions>
                <q-btn flat v-if="item.content">
                    Reserve
                </q-btn>
                <q-space/>
                <q-btn flat icon="more_vert" round>
                    <q-menu cover>
                        <q-card>
                            <q-card-section>
                                123
                            </q-card-section>
                        </q-card>
                    </q-menu>
                </q-btn>
            </q-card-actions>
        </q-card>
    </div>

    <!--翻页器-->
    <div class="q-pa-lg flex flex-center">
        <q-pagination
            v-model="pageNum" :max="maxCount"
            :max-pages="6"
            boundary-links
            direction-links
        />
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
// 状态
import axios from 'axios';
import {date} from 'quasar';
// 声明
import {ArticleInfo} from 'src/stores/schemas/article';

export default defineComponent({
    name: 'ArticleListVue',

    props: {
        // 数据获取路径
        url: {
            type: String,
            default: 'https://mlog.club/api/article/articles',
        },
    },

    setup() {
        return {
            // 日期api
            date
        }
    },

    mounted() {
        // 刷新数据
        this.getData(this.url)
    },

    data() {
        // 存储内容
        let dataList: ArticleInfo[] = []
        // 页面内容
        let pageItem: ArticleInfo[] = []

        return {
            // 所有数据
            dataList,
            // 页面元素
            pageItem,
            // 使用翻页模式
            usePage: true,
            // 当前页面
            pageNum: 1,
            // 最大页面
            maxCount: 0,
            // 锁
            lock: false,
            // ! 获取页面追加参数
            cursor: '',
            // 其他参数

        }
    },

    methods: {
        getData(url: string) {
            // 获取新数据
            if (!this.lock && url) {
                axios.get(url).then((req) => {
                    // 如果存在数据则装载数据
                    if (req.data.data.results?.length) {
                        // 装载数据
                        this.dataList.push(...req.data.data.results)
                    }
                    // 是否已取完数据
                    this.lock = !req.data.data.hasMore
                    // 最大页数刷新
                    this.maxCount = this.dataList.length / 10
                    // ! 下一个页面参数
                    this.cursor = req.data.data.cursor

                    // 刷新页面内容
                    this.cutPageItems()
                })
            }
        },

        initialization() {
            // 初始化所有内容
            this.dataList.length = 0
            this.pageItem.length = 0
            // 重置页数
            this.maxCount = 0
            this.pageNum = 1
            this.lock = false
            // 获取新数据
            this.getData(this.url)
        },

        cutPageItems() {
            // 裁出当前页面应有的元素
            this.pageItem = this.dataList.slice((this.pageNum - 1) * 10, this.pageNum * 10)
        },
    },

    watch: {
        'pageNum'() {
            // 开启页面模式的状态下，数值变动更新列表
            if (this.usePage) {
                this.cutPageItems()
            }

            // 页面值达到最大，且未上锁
            if (this.pageNum == this.maxCount && !this.lock) {
                // 获取后续页面
                if (this.url.indexOf('?') >= 0) {
                    this.getData(this.url + '&cursor=' + this.cursor)
                } else {
                    this.getData(this.url + '?cursor=' + this.cursor)
                }
            }
        },

        'url'() {
            // 切换数据获取地址后，清空默认存储数据
            this.initialization()
        }
    }
})
</script>

<style lang="sass" scoped>
// 交叉动画
//.example-item
//    height: 240px
//    width: 100%

// 解决 flex 带来的 nowrap 无法确定组件宽度问题
.ell_title
    max-width: 80vw

@media screen and (max-width: 680px)
    .ell_title
        max-width: 70vw
</style>
