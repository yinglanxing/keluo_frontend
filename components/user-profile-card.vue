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
      <n-button secondary type="info" block @click="alert_plane_func"> 登录</n-button>
    </a-grid-item>

    <a-grid-item :span="3">
      没有账号？
      <a-link @click="alert_plane_func">
        前往注册
      </a-link>
    </a-grid-item>
  </a-grid>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "user-profile-card"
})
</script>

<style scoped>

</style>