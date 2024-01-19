<template>
    <div>
        <q-card flat bordered>
            <!-- 搜索框 -->
            <q-card-section>
                <q-input outlined v-model="text" @keyup.enter="search">
                    <template v-slot:append>
                        <q-icon v-if="text === ''" name="search"></q-icon>
                        <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''"></q-icon>
                    </template>
                </q-input>
            </q-card-section>

            <q-card-actions>
                <q-tabs v-model="tab">
                    <q-tab name="top" label="最热"></q-tab>
                    <q-tab name="latest" label="最新"></q-tab>
                </q-tabs>
            </q-card-actions>
        </q-card>

        <div class="q-mt-xl"></div>

        <!-- 顶部nav-->
        <article-list :url="article_url"></article-list>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import ArticleList from '../../components/article/ArticleList.vue';

export default defineComponent({

    components: {
        ArticleList,
    },

    data() {
        return {
            text: '',
            keywords: '',
            tab: 'top',
            article_url: '/api/v1/recommend/article',
        };
    },

    methods: {
        // 搜索函数
        search() {
            if (this.text) {
                //
                this.keywords = this.text;
                this.article_url = `/api/v1/article/search?category=${this.tab}&key=${this.keywords}`;
            } else {
                this.keywords = '';
                this.article_url = '/api/v1/recommend/article';
            }
        },
    },
    watch: {
        // 切换查询排序
        tab() {
            if (this.keywords) {
                this.article_url += `/api/v1/article/search?category=${this.tab}&key=${this.keywords}`;
            } else {
                this.article_url = `/api/v1/recommend/article?category=${this.tab}`;
            }
        }
    }
});
</script>
