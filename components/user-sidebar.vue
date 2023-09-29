<template>
    <!--用户侧边栏页-->
    <a-space fill :direction="'vertical'">

        <!--用户资料管理-->
        <a-card>
            <template #title>{{ $t("self.info") }}</template>
            <a-space fill :direction="'vertical'">
                <!--用户信息-->
                <a-list :bordered="false">
                    <!---->
                    <a-list-item>
                        <template #extra>{{ user.nickname }}</template>
                        {{ $t("self.name") }}
                    </a-list-item>
                    <a-list-item>
                        <template #extra>{{ user.description }}</template>
                        {{ $t("self.motto") }}
                    </a-list-item>
                    <a-list-item>
                        <template #extra>{{ user.homePage }}</template>
                        {{ $t("self.index") }}
                    </a-list-item>
                </a-list>

                <!--用户操作-->
                <a-button v-if="admin" :size="'large'" long>{{ $t("self.change_info") }}</a-button>
                <a-button v-if="admin" :size="'large'" long>{{ $t("self.safe") }}</a-button>
                <!--管理员模式-->
                <a-button v-if="admin" :size="'large'" long>{{ $t("self.ban_7") }}</a-button>
                <a-button v-if="admin" :size="'large'" long>{{ $t("self.ban_ever") }}</a-button>
            </a-space>
        </a-card>

        <!--用户状态统计-->
        <a-card>
            <template #title>{{ $t("self.achievements") }}</template>
            <a-grid :cols="{ sm: 1, lg: 2}" :row-gap="20">
                <!--积分-->
                <a-grid-item>{{ $t("self.points") }}:{{ user.score || 0 }}</a-grid-item>
                <!--话题-->
                <a-grid-item>{{ $t("self.talks") }}:{{ user.topicCount || 0 }}</a-grid-item>
                <!--评论-->
                <a-grid-item>{{ $t("self.comment") }}:{{ user.commentCount || 0 }}</a-grid-item>
                <!--注册-->
                <a-grid-item>{{ $t("self.signup_rank") }}:{{ user.id || 0 }}</a-grid-item>
            </a-grid>
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
</template>

<script lang="ts">

export default {
    props: {
        // 目标
        user: {
            type: Object,
            default: {},
        },
    },
    data(vm) {
        let self = USER_STATE()
        return {
            admin: self.currentUser,

        }
    },
    methods: {
        async loadIsFollowed() {
            // this.
        }
    }
}
</script>


<style scoped>

</style>
