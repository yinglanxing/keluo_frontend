<template>
    <a-grid :cols="{ xs: 1, lg: 2, xxl: 3 }" :colGap="12" :rowGap="12">
        <a-grid-item :span="4" style="font-size:20px">
            登录开启更多功能
        </a-grid-item>

        <a-grid-item :span="4" style="font-size:16px">
            <icon-check-circle-fill/>
            发布你的文章
        </a-grid-item>
        <a-grid-item :span="4" style="font-size:16px">
            <icon-check-circle-fill/>
            关注更多频道
        </a-grid-item>
        <a-grid-item :span="4" style="font-size:16px">
            <icon-check-circle-fill/>
            敬请期待
        </a-grid-item>

        <a-grid-item :span="3">
            <a-button long :type="'primary'" @click="alert_plane(1)"> 登录</a-button>
        </a-grid-item>

        <a-grid-item :span="3">
            没有账号？
            <a-link @click="alert_plane(2)">
                前往注册
            </a-link>
        </a-grid-item>
    </a-grid>
</template>

<script lang="ts">
import {USER_STATE} from "~/composables/user";

export default {
    setup() {
        // 切换登录框
        const user_state = USER_STATE()
        return {
            alert_plane: user_state.alert_plain,
        }
    },
}
</script>

<style scoped>

</style>
