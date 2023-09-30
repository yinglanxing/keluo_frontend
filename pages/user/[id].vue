<template>
    <!--用户页面-->
    <!--    :src='user.backgroundImage  || "card-bg.jpg"'-->
    <a-grid :cols="24" :colGap="16" :rowGap="16">
        <!--顶部卡片-->
        <a-grid-item :span="24">
            <a-image
                :preview="false"
                :src='user.backgroundImage || "/card-bg.jpg"'
                :title='user.nickname'
                :description='user.description'
                style="width: 100%;height: 30vh;margin-bottom: 18px;overflow: hidden"
            >
                <template #extra>
                    <a-avatar>
                        <img alt="avatar" :src="user.avatar || '/favicon.ico'"/>
                    </a-avatar>
                </template>
            </a-image>
        </a-grid-item>

        <!--左侧操作栏-->
        <a-grid-item :span="6">
            <div class="c-rose-6"> 123</div>
            <a-grid-item :span="6">
                <user-sidebar :user="user"></user-sidebar>
            </a-grid-item>
        </a-grid-item>


        <!--右侧内容-->
        <a-grid-item :span="18">
            <!--顶部nva-->
            <default-nav></default-nav>
            <article-list></article-list>
        </a-grid-item>
    </a-grid>
</template>

<script lang="ts">

import axios from "axios";

export default {
    data() {
        // 获取自己
        const self = USER_STATE()
        return {
            user: {},
            self,
        }
    },
    mounted() {
        // 获取用户信息
        axios.get("/api/user/" + useRoute().params['id']).then((req) => {
            this.user = req.data.data
        }).catch(() => {
            // 无法获取信息，返回上一页
            useRouter().back()
        })
    },
}

</script>

<style scoped>

</style>
