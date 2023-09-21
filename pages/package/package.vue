pnpm <template>
  <!--软件包市场页面组件-->
  <!-- 使用flex布局 -->
  <!--列表-->
  <n-card>
    <n-card style="min-width: 500px" v-for="x in 20">
      只要是 看到天边云一朵<br>
      逐天拢有好心情
    </n-card>
  </n-card>

</template>


<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "package"
})
</script>
<style scoped>

</style>