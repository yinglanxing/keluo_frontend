<template>
    <!--文章列表-->
    <div class="q-gutter-y-lg">

        <!--列表为空-->
        <q-card flat bordered v-if="pageItem.length == 0">
            <q-card-section class="q-pa-md q-gutter-md">
                <div class="text-h6">一片无人探索的领域</div>
                <q-btn color="primary" icon="add" to="/edit/article">创建</q-btn>
            </q-card-section>
            <q-card-actions>
                <!-- 刷新 -->
                <q-btn class="full-width" icon="refresh" @click="getData(url)"></q-btn>
            </q-card-actions>
        </q-card>

        <!--列表内容-->
        <q-card flat bordered v-for="item in pageItem" :key="item.id">

            <!--头部-->


            <q-card-section>
                <q-item class="q-flex q-dir-column">
                    <q-item-section>
                        <q-item-label class="q-ma-xs">
                            <span class="text-h6">
                                {{ item.title }}
                            </span>
                            <span class="text-caption m3">
                                {{ item.subtitle }}
                            </span>
                        </q-item-label>
                        <q-item-label caption>{{ item.format }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-card-section>

            <q-card-section>
                <div class="text-subtitle1 ellipsis-2-lines" style="height: 3.2em">
                    {{ item.content }}
                </div>
            </q-card-section>

            <!--分割线-->
            <q-separator></q-separator>

            <!--卡片底部内容-->
            <q-card-actions>
                <q-btn color="negative" icon="delete" @click="article_delete(item)">删除</q-btn>
                <q-btn color="green" icon="edit" :to="'/edit/article/' + item.id">修改</q-btn>
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
import {api} from 'boot/axios';
import { useUser } from 'src/stores/useUser';
import {  ArticleInfo } from 'src/stores/schemas/article';

export default defineComponent({
    setup() {
        let self = useUser();
        return {
            self,
        };
    },

    mounted() {
        // 刷新数据
        this.getData(this.url);
    },

    data() {
        // 存储内容
        let dataList: ArticleInfo[] = [];
        // 页面内容
        let pageItem: ArticleInfo[] = [];

        return {
            url: '/api/v1/articles_by_user?uid=',
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
        };
    },

    methods: {
        getData(url: string) {
            // 获取新数据
            // if (!this.lock && url) {
            if (url && this.self.is_login()) {
                api.get(url + this.self.info.id).then((req) => {
                    if (req.status == 200) {
                        this.max_page = Math.ceil(req.data.total / 10);
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

        // 删除文章
        article_delete(item: ArticleInfo) {
            // 判断已登录
            if (this.self.is_login()) {
                api.delete('/api/v1/article/' + item.id).then((req) => {
                    if (req.status == 200) {
                        // 删除成功
                        this.pageItem.splice(this.pageItem.indexOf(item), 1);
                    }
                });
            }
        },
    },

    watch: {
        'page_num'() {
            // 开启页面模式的状态下，数值变动更新列表
            if (this.usePage && this.self.is_login()) {
                // this.cutPageItems();
                this.getData(this.url + this.self.info.id + '&page=' + this.page_num);
            }
        },

        'url'() {
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
