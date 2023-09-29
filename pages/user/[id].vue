<template>
    <!--用户页面-->
    <!--顶部卡片-->
    <div class="q-my-lg">
        <q-card>
            <!--视差滚动-->
            <q-parallax src="/card-bg.jpg" style="height: 30vh"/>
            <!--头像-->
            <div class="absolute-bottom q-pa-md">
                <!--<q-avatar v-if="user.data?.avatar">-->
                <!--    <a-image :preview="false" :src="user.data?.avatar"></a-image>-->
                <!--</q-avatar>-->
                <!--<q-avatar v-else>-->
                <!--    {{ user.data?.name }}-->
                <!--</q-avatar>-->
                <a-avatar>
                    {{ user.nickname }}
                </a-avatar>
            </div>
        </q-card>
    </div>

    <a-grid :cols="24" :colGap="16" :rowGap="16">
        <!--左侧操作栏-->
        <a-grid-item :span="6">
            <a-grid-item :span="6">
                <user-sidebar :user="user"></user-sidebar>
            </a-grid-item>
        </a-grid-item>


        <!--管理作品-->
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
