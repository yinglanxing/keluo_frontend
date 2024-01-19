<template>
    <div class="q-pa-md">
        <div>
            <!-- 顶部幻灯片 -->
            <q-carousel animated v-model="slide" navigation infinite :autoplay="autoplay" arrows
                transition-prev="slide-right" transition-next="slide-left" @mouseenter="autoplay = false"
                @mouseleave="autoplay = true">
                <!-- 内容 -->
                <q-carousel-slide v-for="li in carousel_data" :key="li.id" :name="li.id" :img-src="li.src" />
            </q-carousel>
        </div>

        <div class="row q-py-md q-col-gutter-x-md q-col-gutter-y-md">
            <!-- 自适应大小 -->
            <div class="col-6 col-md-4 col-lg-3 col-xl-2" v-for="n in 12" :key="n">
                <q-card flat bordered>
                    <q-card-section>
                        {{ n }}
                    </q-card-section>
                </q-card>
            </div>
        </div>

        <article-list></article-list>
    </div>
</template>

<script lang="ts">
import ArticleList from 'src/components/article/ArticleList.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    components: {
        ArticleList,
    },
    data() {
        return {
            slide: 1,
            autoplay: true,
            // 幻灯片内容
            carousel_data: [
                { label: '1', id: 1, src: 'https://cdn.quasar.dev/img/mountains.jpg' },
                { label: '2', id: 2, src: 'https://cdn.quasar.dev/img/parallax1.jpg' },
                { label: '3', id: 3, src: 'https://cdn.quasar.dev/img/parallax2.jpg' },
                { label: '4', id: 4, src: 'https://cdn.quasar.dev/img/quasar.jpg' },
            ],
        };
    },
});
</script>