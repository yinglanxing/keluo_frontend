<template>

  <!--创建一个16等分的grid布局-->
  <a-grid :cols="24" :colGap="16" :rowGap="16">
    <!--页面左侧边栏-->
    <a-grid-item :span="3" style="overflow: hidden;padding: 15px">
      <a-card>
        这是左侧边组件
      </a-card>
    </a-grid-item>
    <!--页面内容-->
    <a-grid-item :span="10" style="overflow: hidden;padding: 15px">
        <a-list>
          <template #header>
            热搜榜单
          </template>
          <a-list-item>汪峰终于上热搜了！！</a-list-item>
          <a-list-item>汪峰终于上热搜了！！</a-list-item>
          <a-list-item>汪峰终于上热搜了！！</a-list-item>
          <a-list-item>汪峰终于上热搜了！！</a-list-item>
          <a-list-item>汪峰终于上热搜了！！</a-list-item>
          <a-list-item>汪峰终于上热搜了！！</a-list-item>
          <a-list-item>汪峰终于上热搜了！！</a-list-item>
          <a-list-item>汪峰终于上热搜了！！</a-list-item>
          <a-list-item>汪峰终于上热搜了！！</a-list-item>
          <a-list-item>汪峰终于上热搜了！！</a-list-item>
          <a-list-item>汪峰终于上热搜了！！</a-list-item>
          <a-list-item>汪峰终于上热搜了！！</a-list-item>
          <a-list-item>汪峰终于上热搜了！！</a-list-item>
          <a-list-item>汪峰终于上热搜了！！</a-list-item>
          <a-list-item>汪峰终于上热搜了！！</a-list-item>
          <a-list-item>汪峰终于上热搜了！！</a-list-item>
        </a-list>
    </a-grid-item>
    <!--页面右侧边栏-->
    <a-grid-item :span="3" style="overflow: hidden;padding: 15px">
      <a-card>
        这是右侧边组件
      </a-card>
    </a-grid-item>
  </a-grid>



</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "hot-name-plates"
})
</script>
<style scoped>

</style>