<template>
    <a-card>
        <a-grid :cols="{ xs: 1, lg: 2 }" :colGap="24" :rowGap="24">
            <a-grid-item :span="3">
                登录开启更多功能：
            </a-grid-item>

            <a-grid-item>
                <icon-bookmark/>
                更懂你的优质内容
            </a-grid-item>

            <a-grid-item>
                <icon-user-group/>
                更专业的大咖答主
            </a-grid-item>

            <a-grid-item>
                <icon-message/>
                更深度的互动交流
            </a-grid-item>

            <a-grid-item>
                <icon-pen-fill/>
                更高效的创作环境
            </a-grid-item>

            <a-grid-item :span="3">
                <a-button @click="alert_plane(1)" :type="'primary'" long>登录</a-button>
            </a-grid-item>

            <a-grid-item :span="3">
                没有账号？
                <a-link @click="alert_plane(2)">
                    前往注册
                </a-link>
            </a-grid-item>
        </a-grid>
    </a-card>
</template>

<script lang="ts">
export default {
    setup() {
        const show_login_plain = show_login()
        return {
            show_login_plain,
            alert_plane(num: number = 0) {
                // 弹出登录框
                show_login_plain.value = num
            },
        }
    },
}
</script>

<style scoped>

</style>
