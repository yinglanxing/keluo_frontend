<template>

    <!--预加载遮挡-->
    <div id="onload_plain_id" class="max-cover">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
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
    padding: 50vh 50vw;
    z-index: 1000000000;
    transform: translateY(-30px);
}

/*设置各竖条的共有样式*/
.max-cover > div {
    background-color: #279fcf;
    width: 4px;
    height: 35px;
    border-radius: 2px;
    margin: 2px;
    animation-fill-mode: both;
    display: inline-block;
    animation: anim 0.9s 0s infinite cubic-bezier(.11, .49, .38, .78);
}

/*设置动画延迟*/
.max-cover > :nth-child(2), .max-cover > :nth-child(4) {
    animation-delay: 0.25s !important;
}

.max-cover > :nth-child(1), .max-cover > :nth-child(5) {
    animation-delay: 0.5s !important;
}

/*定义动画*/
@keyframes anim {
    0% {
        transform: scaley(1);
    }
    80% {
        transform: scaley(0.3);
    }
    90% {
        transform: scaley(1);
    }
}
</style>
