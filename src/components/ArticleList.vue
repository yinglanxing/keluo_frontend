<template>
    <!--文章列表-->
    <div class="q-gutter-y-lg">

        <q-card v-for="item in pageItem" :key="item.articleId" class="full-width">
            <!--头部-->
            <q-card-section class="row">
                <!--悬浮按钮-->
                <!--fab-->
                <!--<q-btn-->
                <!--    fab-mini-->
                <!--    icon="place"-->
                <!--    color="primary"-->
                <!--    class="absolute"-->
                <!--    style="top: 0; right: 12px; transform: translateY(-50%);"-->
                <!--&gt;-->
                <!--</q-btn>-->

                <div>
                    <!--标题-->
                    <router-link
                        :to="'/article/'+item.articleId"
                        class="q-btn full-width ellipsis-2-lines"
                        style="height: 72px"
                    >
                        <div class="text-h5 ellipsis-2-lines">
                            {{ item.title }}
                        </div>
                    </router-link>
                    <!--时间-->
                    <div class="text-grey text-caption q-pt-md row no-wrap items-center">
                        <q-icon name="schedule"/>
                        {{ date.formatDate(item.createTime, 'YYYY-MM-DD | HH:mm:ss') }}
                    </div>
                </div>
                <!--评分-->
                <!--<q-rating v-model="stars" :max="5" size="32px"/>-->
            </q-card-section>


            <q-card-section class="q-pt-none">
                <!--文章内容，超过两行省略-->
                <div class="text-subtitle1 ellipsis-2-lines">
                    {{ item.content }}
                    {{ item.summary }}
                </div>
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
                <q-btn flat icon="event" round/>
                <q-btn color="primary" flat>
                    Reserve
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
            if (!this.lock) {
                // 获取新数据
                axios.get(url).then((req) => {
                    // 装载数据
                    this.dataList.push(...req.data.data.results)
                    // 最大页数刷新
                    this.maxCount = this.dataList.length / 10
                    // ! 下一个页面参数
                    this.cursor = req.data.data.cursor
                    // 是否已取完数据
                    this.lock = !req.data.data.hasMore
                    // 刷新页面内容
                    this.cutPageItems()
                })
            }
        },

        cutPageItems() {
            // 裁出当前页面应有的元素
            this.pageItem = this.dataList.slice((this.pageNum - 1) * 10, this.pageNum * 10)
        },
    },
    watch: {
        pageNum() {
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

        url() {
            // 切换数据获取地址后，清空默认存储数据
            this.dataList.length = 0
            this.pageItem.length = 0
            // 重置页数
            this.maxCount = 0
            this.pageNum = 0
            this.lock = false
            // 获取新数据
            this.getData(this.url)
        }
    }
})
</script>

<style lang="sass" scoped>
// 交叉动画
//.example-item
//    height: 240px
//    width: 100%
</style>
