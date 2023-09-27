<template>
    <a-space direction="vertical">

        <!--用户组件-->
        <a-card>

            <template #title>
                <a-avatar>
                    <icon-user/>
                </a-avatar>
            </template>

            <template #extra>
                <a-button>
                    ￥: {{ 0 }}
                </a-button>
            </template>

            <!--v-show 姓名或登录邀请-->
            <a-typography>
                <user-profile-card></user-profile-card>
            </a-typography>

            <a-divider></a-divider>

            <a-space align="center">

                <a-tag>{{ $t("sidebar.article_count") }}:69</a-tag>
                <a-tag>{{ $t("sidebar.fans") }}:12</a-tag>
                <a-tag>{{ $t("sidebar.reply") }}:200</a-tag>

            </a-space>

        </a-card>

        <a-card>
            <!--todo 日历组件-->
            <!--<sign-calendar></sign-calendar>-->
            <a-button long>{{ $t("checkin") }}</a-button>
        </a-card>

        <a-divider>{{ $t("sidebar.points_rank") }}</a-divider>

        <a-space fill direction="vertical">
            <a-card v-for="x in 10">
                <a-avatar :style="{ marginRight: '8px', backgroundColor: '#165DFF' }" :size="28">
                    {{ x }}
                </a-avatar>
                <a-typography-text>Username</a-typography-text>
            </a-card>
        </a-space>

    </a-space>
</template>

<script lang="ts">

</script>

<style scoped>

</style>
