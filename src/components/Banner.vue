<template>
    <div class="container">
        <div class="q-pa-md">
            <div class="row g-col-gutter-lg">
                <div class="col-md-3 g-hide-md">
                    开源热榜
                </div>
                <div class="col-md-6" style="
                    max-width: 940px; /* 指定最大宽度 */
                    max-height: 420px; /* 指定最大高度 */
                    width: 100%; /* 设置宽度为100% */
                    height: auto; /* 设置高度为自动，以保持宽高比 */
                    overflow: hidden; /* 隐藏超出部分 */
                  ">
                    <q-carousel
                        swipeable
                        animated
                        v-model="slide"
                        thumbnails
                        infinite
                    >
                        <q-carousel-slide
                            style=".img-src{
                                width: 100%; /* 图片宽度为100% */
                                height: auto; /* 图片高度为自动，以保持宽高比 */
                            };"
                            v-for="(item, index) in carouselItems"
                            :key="index"
                            :name="index + 1"
                            :img-src="item.imageUrl"
                            @click="handleSlideClick(item.redirectUrl)"
                        ></q-carousel-slide>
                    </q-carousel>
                </div>
                <div class="col-md-3">
                    <!-- 这个元素在 md 屏幕尺寸及以上显示 -->
                    <div class="announcement-box">
                        <!-- 在这里添加站点公告的内容 -->
                        <p>站点公告: 这里是站点公告的内容。</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';

export default defineComponent({
    name: 'Banner',
    data() {
        return {
            slide: 1,
            carouselItems: [], // 这里存储从后端获取的数据
        };
    },
    mounted() {
        // 在组件挂载后，从后端获取数据并更新carouselItems
        this.fetchCarouselData();
    },
    methods: {
        fetchCarouselData() {
            // 通过您的后端API获取数据，这里假设您使用axios库
            // 实际情况可能需要根据您的后端API进行调整
            axios.get('your-backend-api-url')
                .then(response => {
                    this.carouselItems = response.data;
                })
                .catch(error => {
                    console.error('Error fetching carousel data:', error);
                });
        },
        handleSlideClick(redirectUrl) {
            // 在这里执行点击轮播图后的导航操作
            // 例如，使用Vue Router进行页面跳转
            window.location.href = redirectUrl;
        },
    },
});
</script>

<style scoped>
.container {
    max-width: 1080px; /* 指定最大宽度 */
    max-height: 1920px; /* 指定最大高度 */
    width: 100%; /* 设置宽度为100% */
    height: auto; /* 设置高度为自动，以保持宽高比 */
    overflow: hidden; /* 隐藏超出部分 */
}

.container img {
    width: 100%; /* 图片宽度为100% */
    height: auto; /* 图片高度为自动，以保持宽高比 */
}
</style>
