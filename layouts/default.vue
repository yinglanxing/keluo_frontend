<template>
    <!--默认布局-->
    <div>
        <!--主布局，style 自适应屏幕高度-->
        <a-layout style="height: 100vh">
            <!--页首-->
            <default-header></default-header>

            <!--embedded 增加背景对于header、卡片等组件的对比度-->
            <n-layout embedded content-style="padding: 24px">

                <a-grid :cols="24" :colGap="16" :rowGap="16">
                    <!--空白边-->
                    <a-grid-item :span="{xl:3}"></a-grid-item>


                    <!--内容-->
                    <a-grid-item :span="{xs:22, sm:22, xl:18}">
                        <!-- 顶部nav-->
                        <default-nav></default-nav>

                        <a-grid :cols="24" :colGap="16" :rowGap="16">

                            <!--页面左侧边栏-->
                            <a-grid-item :span="5">
                                <default-left-sidebar></default-left-sidebar>
                            </a-grid-item>


                            <!--页面内容-->
                            <a-grid-item :span="14">
                                <slot/>
                            </a-grid-item>


                            <!--页面右侧边栏-->
                            <a-grid-item :span="5">
                                <default-right-sidebar></default-right-sidebar>
                            </a-grid-item>
                        </a-grid>

                    </a-grid-item>

                    <!--空白边-->
                    <a-grid-item :span="{xl:3}"></a-grid-item>
                </a-grid>

            </n-layout>

            <!--页尾-->
            <default-footer></default-footer>

        </a-layout>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {}
    }
}
</script>
<script setup lang="ts">
</script>

<!--<style scoped>-->
<!--.background {-->
<!--    background-color: #F2F3F5;-->
<!--}-->
<!--</style>-->
