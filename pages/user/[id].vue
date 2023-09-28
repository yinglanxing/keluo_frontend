<template>
    <!--用户页面-->
    <!--顶部卡片-->
    <div class="q-my-lg">
        <q-card>
            <q-parallax
                src="https://cdn.quasar.dev/img/parallax1.jpg"
                style="height: 30vh"
            />
            <!--头像-->
            <div class="absolute-bottom q-pa-md">
                <!--<q-avatar v-if="user.data?.avatar">-->
                <!--    <a-image :preview="false" :src="user.data?.avatar"></a-image>-->
                <!--</q-avatar>-->
                <!--<q-avatar v-else>-->
                <!--    {{ user.data?.name }}-->
                <!--</q-avatar>-->
                <a-avatar>
                    {{ user.data?.name || user.data?.nickname }}
                </a-avatar>
            </div>
        </q-card>
    </div>

    <a-grid :cols="24" :colGap="16" :rowGap="16">
        <!--左侧操作栏-->
        <a-grid-item :span="6">
            <a-space fill :direction="'vertical'">

                <!--用户状态统计-->
                <a-card>
                    <template #title>{{ $t("self.achievements") }}</template>
                    <a-grid :cols="{ sm: 1, lg: 2}" :row-gap="20">
                        <!--积分-->
                        <a-grid-item>{{ $t("self.points") }}:{{ user.data?.score || 0 }}</a-grid-item>
                        <!--话题-->
                        <a-grid-item>{{ $t("self.talks") }}:{{ user.data?.topicCount || 0 }}</a-grid-item>
                        <!--评论-->
                        <a-grid-item>{{ $t("self.comment") }}:{{ user.data?.commentCount || 0 }}</a-grid-item>
                        <!--注册-->
                        <a-grid-item>{{ $t("self.signup_rank") }}:{{ user.data?.id || 0 }}</a-grid-item>
                    </a-grid>
                </a-card>


                <!--用户资料管理-->
                <a-card>
                    <template #title>{{ $t("self.edit") }}</template>
                    <a-space fill :direction="'vertical'">
                        <!--用户信息-->
                        <a-list :bordered="false">
                            <!---->
                            <a-list-item>
                                <template #extra>{{ user.data?.nickname }}</template>
                                {{ $t("self.name") }}
                            </a-list-item>
                            <a-list-item>
                                <template #extra>{{ user.data?.description }}</template>
                                {{ $t("self.motto") }}
                            </a-list-item>
                            <a-list-item>
                                <template #extra>{{ user.data?.homePage }}</template>
                                {{ $t("self.index") }}
                            </a-list-item>
                        </a-list>

                        <!--管理员模式-->
                        <a-button v-show="self.admin" :size="'large'" long>{{ $t("self.ban_7") }}</a-button>
                        <a-button v-show="self.admin" :size="'large'" long>{{ $t("self.ban_ever") }}</a-button>
                    </a-space>
                </a-card>

                <!--关注列表-->
                <a-card>
                    <template #title>{{ $t("self.follow") }}</template>
                    <a-space fill :direction="'vertical'">
                    </a-space>
                </a-card>

                <!--粉丝列表-->
                <a-card>
                    <template #title>{{ $t("self.fans") }}</template>
                    <a-space fill :direction="'vertical'">
                    </a-space>
                </a-card>

            </a-space>
        </a-grid-item>


        <!--管理作品-->
        <a-grid-item :span="18">
            <a-space fill :direction="'vertical'">
                <!--顶部nva-->
                <!--<default-nav></default-nav>-->

                <!--内容-->

                <a-card style="width:100%;margin-bottom: 18px;" :bordered="false">

                    <default-nav></default-nav>

                    <article-list></article-list>

                </a-card>

            </a-space>
        </a-grid-item>
    </a-grid>
</template>

<script lang="ts">

export default {
    setup() {
        // console.log(123)
        // console.log($fetch("").then(re=>{
        //     console.log(this.user)
        // }))
    },
    data() {
        // 获取用户信息
        $fetch("/api/user/" + useRoute().params['id']).then((req) => {
            this.changes(req)
            // todo 获取页面内其他数据
            // $fetch("/api/topic/user/topics?userId=" + useRoute().params['id']).then((topic_req) => {
            //     // this.changes_topic(topic_req)
            //     console.log(topic_req)
            // })
        }).catch(() => {
            // 无法获取信息，返回上一页
            useRouter().back()
        })
        return {
            user: {},
            self: {},
            topic: [],
        }
    },
    methods: {
        // 更新用户信息
        changes(take: UserInfo) {
            this.user = take
        },
        // change_topic(take: any) {
        //     this.topic = take
        // }
    },
}

</script>

<style scoped>

</style>
