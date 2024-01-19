<template>
    <!-- 推荐状态 -->
    <div>
        <div class="m10 text-h4">
            <div>
                Find the most exciting
            </div>
            <div>
                ESP-IDF components
            </div>
        </div>
        <div class="m-y-4">
            <!-- 搜索框 -->
            <q-card-section>
                <q-input outlined v-model="text" @keyup.enter="search">
                    <template v-slot:append>
                        <q-icon v-if="text === ''" name="search"></q-icon>
                        <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''"></q-icon>
                    </template>
                </q-input>
            </q-card-section>
        </div>

        <div class="m-y-4">
            <div class="text-h6">Browse components</div>
            <div>
                Compatible with ESP-IDF:<q-chip square v-for="i in 4" :key="i">v{{ i }}</q-chip>
            </div>
            <div>
                Tag:<q-chip square v-for="i in 5" :key="i">{{ i }}{{ i % 3 ? '' : 'lic' }}</q-chip>
            </div>
        </div>

        <div class="row q-py-md q-col-gutter-x-md q-col-gutter-y-md">
            <!-- 自适应大小 -->
            <div class="col-6 col-md-4 col-lg-3 col-xl-2" v-for="n in 12" :key="n">
                <q-card flat bordered>
                    <q-card-section>
                        <!-- 包名 -->
                        <router-link :to="'/component/' + n" class="ellipsis-2-lines cursor-pointer"
                            style="text-decoration:none;">
                            <div class="font-size-5">
                                <span class="color-red-5 font-bold">
                                    {{ 'author' }}
                                    /
                                    {{ 'pack' }}
                                </span>

                                <span class="color-red-5">
                                    {{ n }}.{{ n }}
                                </span>
                            </div>
                        </router-link>
                        <!-- 时间 -->
                        <q-item-label caption>
                            12.14
                        </q-item-label>
                        <!-- 内容 -->
                        <q-item-label class="ellipsis-3-lines" style="min-height: 3rem;">
                            any
                        </q-item-label>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </div>
    <!-- 列表状态 -->
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            show_next_layout: false,
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
                this.article_url = `/api/v1/article?keywords=${this.keywords}`;
            } else {
                this.keywords = '';
                this.article_url = '/api/v1/recommend/article';
            }
        },
    },
});
</script>