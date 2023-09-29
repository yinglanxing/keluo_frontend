<template>

    <!--文章列表-->

    <!--<a-list :bordered="true">-->

    <!--<a-list-item>-->
    <q-card class="q-my-lg q-pa-lg" v-for="item in pageItem">
        <q-card-section>
            {{ item.createTime }}
        </q-card-section>

        <a-space direction="vertical" fill>
            <!--标题-->
            <nuxt-link :to="'/article/' + item" style="color: var(--color-neutral-1);">
                <a-typography-title :heading="5">
                    {{ item.title }}
                </a-typography-title>
            </nuxt-link>

            <div>
                {{ item.content }}
                {{ item.summary }}
            </div>
            <!--文字占位-->
            <!--<a-skeleton-line :rows="2"></a-skeleton-line>-->
            <!--图片区-->
            <a-space wrap>
                <a-image width="200" height="100" v-for="img in item.imageList"></a-image>
            </a-space>
        </a-space>

        <q-card-actions align="right">
            <!--<a-button :shape="'round'">-->
            <!--    <template #icon>-->
            <!--        <icon-heart-fill v-if="item.liked"/>-->
            <!--        <icon-heart/>-->
            <!--    </template>-->
            <!--    {{ item.likeCount }}-->
            <!--</a-button>-->

            <!--<a-button :shape="'round'">-->
            <!--    <template #icon>-->
            <!--        <icon-message/>-->
            <!--    </template>-->
            <!--    {{ item.commentCount }}-->
            <!--</a-button>-->

            <q-btn icon="visibility" round>
                <q-badge rounded floating>
                    {{ item.viewCount }}
                </q-badge>
            </q-btn>

            <q-btn icon="visibility" rounded>
                <!--<q-badge rounded floating>-->
                <!--</q-badge>-->
                {{ item.viewCount }}
            </q-btn>

            <!--<a-button :shape="'round'">-->
            <!--    <template #icon>-->
            <!--        <icon-eye/>-->
            <!--    </template>-->
            <!--    {{ item.viewCount }}-->
            <!--</a-button>-->
        </q-card-actions>
    </q-card>
    <!--</a-list-item>-->

    <!--<template #footer>-->
    <!--翻页器-->
    <a-pagination v-model:current="pageNum" :total="dataList.length" show-jumper/>
    <!--</template>-->
    <!--</a-list>-->


</template>

<script lang="ts">
import axios from "axios";


export default {
    props: {
        // 数据获取路径
        url: {
            type: String,
            default: "/api/top",
        },
    },
    setup() {
        return {}
    },
    mounted() {
        // 刷新数据
        axios.get(this.url).then((req) => {
            console.log(req.data.data.results)
            this.dataList = req.data.data.results
            this.cutPageItems()
            // 是否已取完数据
            // this.lock = this.dataList.length < 20
        })
    },
    data(vm) {
        let data: Object[] = []
        let item: Object[] = []
        return {
            // 所有数据
            dataList: data,

            // 页面参数
            usePage: true,
            pageItem: item,
            pageNum: 1,
            // lock: false

            // 其他参数

        }
    },
    methods: {
        getData() {
            // 获取新数据
            // if (!this.lock) {
            axios.get(this.url).then((req) => {
                console.log(req.data.data.results)
                // 装载数据
                this.dataList.push(req.data.data.results)
                // 重置页数
                this.pageNum = 0
                // 是否已取完数据
                // this.lock = this.dataList.length < 20
            })
            // }
        },
        changePage(num: number) {
            // 切换页面
            this.pageNum = num
        },
        cutPageItems() {
            // 裁出当前页面应有的元素
            let items = this.dataList.slice((this.pageNum - 1) * 10, this.pageNum * 10)
            // 限制图片数量上限为3
            for (const key in items) {
                if (items[key].imageList?.length > 3) {
                    items[key].imageList.length = 3
                }
            }
            this.pageItem = items

            // if (){}

        },
        onChange() {
            console.log(123)
        }
    },
    watch: {
        pageNum() {
            // 开启页面模式的状态下，数值变动更新列表
            if (this.usePage) {
                this.cutPageItems()
            }
        }
    }
}
</script>

<style scoped>

</style>
