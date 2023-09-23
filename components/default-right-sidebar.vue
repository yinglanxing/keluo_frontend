<template>
    <a-space direction="vertical">

        <!--用户组件-->
        <a-card>

            <template #title>
                <user-self></user-self>
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

                <a-tag>文章总数:69</a-tag>
                <a-tag>关注人数:12</a-tag>
                <a-tag>回复统计:200</a-tag>

            </a-space>

        </a-card>

        <a-card>
            <!--todo 日历组件-->
            <!--<sign-calendar></sign-calendar>-->
        </a-card>

        <a-divider>积分排行</a-divider>

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
