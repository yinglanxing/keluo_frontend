<template>
    <!--默认布局-->
    <!--主布局，style 自适应屏幕高度-->
    <a-layout style="height: 100vh">
        <!--页首-->
        <default-header></default-header>

        <!--背景色 layout-->
        <a-layout style="padding-top: 24px;background-color: var(--color-neutral-2);">

            <a-grid :cols="24" :colGap="16" :rowGap="16">
                <!--空白边-->
                <a-grid-item :span="{xl:3}"></a-grid-item>


                <!--内容-->
                <a-grid-item :span="{xs:22, sm:22, xl:18}">


                    <!--页面内容-->
                    <slot/>
                    <!--<a-grid :cols="24" :colGap="16" :rowGap="16">-->

                    <!--    &lt;!&ndash;页面左侧边栏&ndash;&gt;-->
                    <!--    <a-grid-item :span="5">-->
                    <!--        <default-left-sidebar></default-left-sidebar>-->
                    <!--    </a-grid-item>-->

                    <!--    &lt;!&ndash;页面内容&ndash;&gt;-->
                    <!--    <a-grid-item :span="14">-->
                    <!--        &lt;!&ndash; 顶部nav&ndash;&gt;-->
                    <!--        <default-nav></default-nav>-->
                    <!--        <slot/>-->
                    <!--    </a-grid-item>-->


                    <!--    &lt;!&ndash;页面右侧边栏&ndash;&gt;-->
                    <!--    <a-grid-item :span="5">-->
                    <!--        <default-right-sidebar></default-right-sidebar>-->
                    <!--    </a-grid-item>-->
                    <!--</a-grid>-->

                </a-grid-item>

                <!--空白边-->
                <a-grid-item :span="{xl:3}"></a-grid-item>
            </a-grid>

        </a-layout>

        <!--登录器-->
        <a-modal :footer="false" :hide-title="true" @cancel="alert_plane(-1)" @close="alert_plane(0)"
                 :visible="state.loginPlain > 0">
            <login-and-signup></login-and-signup>
        </a-modal>
        <!--{{ state }}-->

        <!--页尾-->
        <default-footer></default-footer>

    </a-layout>
</template>

<script lang="ts">

import {USER_STATE} from "~/composables/user";

export default {
    setup() {
        // 切换登录框
        const user_state = USER_STATE()
        return {
            state: user_state,
            alert_plane: user_state.alert_plain,
        }
    },
    data() {
        return {}
    }
}
</script>
