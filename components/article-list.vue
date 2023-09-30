<template>

    <!--文章列表-->
    <a-card class="q-pa-lg" v-for="q in pageItem">

        <!--标题-->
        <template #title>
            {{ q.title }}
        </template>

        <!--时间-->
        <template #extra>{{ q.createTime }}</template>

        <a-space direction="vertical" fill>
            <!--简述内容-->
            <div>
                {{ q.content }}
                {{ q.summary }}
            </div>
            <!--图片区-->
            <a-space wrap>
                <a-image width="200" height="100" v-for="img in q.imageList"></a-image>
            </a-space>
        </a-space>

        <a-space>
            <!--底部按钮-->
            <a-button :shape="'round'">
                <template #icon>
                    <icon-heart-fill v-if="q.liked"/>
                    <icon-heart/>
                </template>
                {{ q.likeCount }}
            </a-button>

            <a-button :shape="'round'">
                <template #icon>
                    <icon-message/>
                </template>
                {{ q.commentCount }}
            </a-button>

            <a-button :shape="'round'">
                <template #icon>
                    <icon-eye/>
                </template>
                {{ q.viewCount }}
            </a-button>
        </a-space>
    </a-card>
    <!--翻页器-->
    <a-pagination v-model:current="pageNum" :total="dataList.length" show-jumper/>

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
