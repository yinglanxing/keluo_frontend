<template>
    <n-space vertical>

        <!--用户组件-->
        <n-card>
            user info
        </n-card>

        <!--todo 签到组件-->
        <n-card>
            <n-space vertical>
                <n-button block>
                    <template #icon>
                        <icon-calendar/>
                    </template>
                    {{ "签到" }}
                </n-button>
                <n-button block quaternary>
                    ￥: {{ 0 }}
                </n-button>
            </n-space>

            <!--日历组件-->
            <!--<sign-calendar></sign-calendar>-->

        </n-card>

        <n-divider style="margin: 0">积分排行</n-divider>

        <n-space vertical>
            <a-card v-for="x in 10">
                <a-avatar :style="{ marginRight: '8px', backgroundColor: '#165DFF' }" :size="28">
                    {{ x }}
                </a-avatar>
                <a-typography-text>Username</a-typography-text>
            </a-card>
        </n-space>

    </n-space>
</template>

<script lang="ts">

</script>

<style scoped>

</style>
