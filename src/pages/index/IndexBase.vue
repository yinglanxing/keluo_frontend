<template>
    <div>
        <q-card flat bordered>
            <!-- 搜索框 -->
            <q-card-section>
                <q-input outlined v-model="text" input-class="text-right">
                    <template v-slot:append>
                        <q-icon v-if="text === ''" name="search"></q-icon>
                        <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''"></q-icon>
                    </template>
                </q-input>
            </q-card-section>

            <q-card-actions>
                <q-tabs v-model="tab" align="left">
                    <q-tab name="hot" label="最热"></q-tab>
                    <q-tab name="new" label="最新"></q-tab>
                </q-tabs>
            </q-card-actions>
        </q-card>

        <div class="q-mt-xl"></div>

        <!-- 顶部nav-->
        <article-list :url="article_url"></article-list>
    </div>
</template>


<script lang="ts">
import {defineComponent} from 'vue';
import ArticleList from '../../components/article/ArticleList.vue';

export default defineComponent({

    components: {
        ArticleList,
    },

    data() {
        return {
            text: '',
            keywords: '',
            tab: 'hot',
            article_url: '/api/v1/recommend/article',
        };
    },

    methods: {
        // 搜索函数
        search() {
            if (this.text) {
                //
                this.keywords = this.text;
                this.article_url = `/api/v1/article?keywords=${this.keywords}`;
            } else {
                this.keywords = '';
                this.article_url = '/api/v1/recommend/article';
            }
        },
    },
    watch: {
        //
        tab() {
            this.article_url = `/api/v1/article?keywords=${this.keywords}&limit=${this.tab}`;
        }
    }
});
</script>
