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
        <a-button long :type="'primary'" @click="alert_plane_func"> 登录</a-button>
    </a-grid-item>

    <a-grid-item :span="3">
      没有账号？
        <a-link @click="alert_plane_signup_func">
        前往注册
      </a-link>
    </a-grid-item>
  </a-grid>
</template>

<script lang="ts">
export default {
    setup() {
        const show_login_plain = show_login()
        const show_signup_plain = show_signup()
        return {
            show_login_plain,
            alert_plane_func() {
                // 弹出登录框
                show_login_plain.value = true
            },
            alert_plane_signup_func() {
                // 弹出登录框
                show_login_plain.value = true
                show_signup_plain.value = true
            },
        }
    },
}
</script>

<style scoped>

</style>
