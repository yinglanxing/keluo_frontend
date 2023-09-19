<template>
    <!--签到组件-->
    <a-card>

        <!--todo 签到货币-->
        <n-space>
            <a-button type="text">
                ￥: {{ 0 }}
            </a-button>

            <a-button>
                <icon-calendar/>
                {{ "签到" }}
            </a-button>
        </n-space>

        <a-divider></a-divider>

        <!--todo 积分排行-->
        <template #actions>
            <n-h4>
                {{ "今日排行" }}
            </n-h4>

            <a-card>
                <a-avatar
                    :style="{ marginRight: '8px', backgroundColor: '#165DFF' }"
                    :size="28"
                >
                    A
                </a-avatar>
                <a-typography-text>Username</a-typography-text>
            </a-card>

        </template>

    </a-card>

    <!--详细积分排行-->
    <a-card>
        <a-card>
            <a-avatar
                :style="{ marginRight: '8px', backgroundColor: '#165DFF' }"
                :size="28"
            >
                A
            </a-avatar>
            <a-typography-text>Username</a-typography-text>
        </a-card>

    </a-card>
</template>

<script lang="ts">

</script>

<style scoped>

</style>
