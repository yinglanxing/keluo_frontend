<template>
    <a-grid :cols="24" :colGap="16" :rowGap="16">

        <!--页面左侧边栏-->
        <a-grid-item :span="5">
            <a-affix :offset-top="75" style="overflow: hidden">
                <a-space style="float: right" fill :direction="'vertical'">
                    <a-button :status="'success'" :size="'large'" :shape="'circle'">
                        1
                    </a-button>
                </a-space>
            </a-affix>
        </a-grid-item>

        <a-grid-item :span="14">
            <a-card>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
                text <br>
            </a-card>
        </a-grid-item>


        <!--页面右侧边栏-->
        <a-grid-item :span="5">

            <a-space fill :direction="'vertical'">

                <!--页面作者的信息-->
                <a-card>

                </a-card>

                <!--目录-->
                <a-card>
                    <template #title>
                        目录
                    </template>
                </a-card>

                <!--推荐-->
                <a-card>
                </a-card>

                <!--精选-->
                <a-card>
                </a-card>

            </a-space>

        </a-grid-item>
    </a-grid>

</template>

<script lang="ts">
import {definePageMeta} from "#imports";

export default {
    setup() {

        // todo 路由守卫检测用户输入 article id 存在
        const layout = GLOBAL_LAYOUT()

        definePageMeta({
            validate(route) {
                console.log(route)
                return true
            },

        })

        return {
            layout,
        }
    },
    beforeRouteEnter() {
        // const layout = GLOBAL_LAYOUT()
        // layout.value = "article"
        // this.layout.value = "article"
    },
}
</script>
