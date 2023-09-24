<template>

    <!--预加载遮挡-->
    <div id="onload_plain_id" class="max-cover">

    </div>

    <nuxt-layout :name="layout">

        <a-layout-content>

            <!--页面进度条-->
            <NuxtLoadingIndicator/>

            <!--页面内容-->
            <nuxt-page/>
        </a-layout-content>


    </nuxt-layout>

</template>

<script lang="ts">

export default {
    setup() {
        const layout = GLOBAL_LAYOUT()
        return {
            layout,
            chang_layout(str: string = "default") {
                layout.value = str || "default"
                // console.log("log layout", str)
            }
        }
    },

    watch: {
        // $route(a1, a2, a3) {
        //     // console.log("lic", a1)
        //     // console.log("lic", a2)
        //     // console.log("lic", a3)
        //     console.log(a1.name)
        //     console.log(arguments)
        //     this.chang_layout(a1.name)
        //
        // }
    }
}
</script>

<style>
body {
    overflow: hidden;
}

#onload_plain_id {
    background: #fff;
}

.max-cover {
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    position: absolute;
    z-index: 1000000000;
}
</style>
