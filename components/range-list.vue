<template>
    <!--用户列表-->
    <!--todo 所有需要排列用户的页面，通过传参路由访问，积分排行、关注列表、粉丝列表-->
</template>

<script>
export default {
    props: {
        users: {
            type: Array,
            default() {
                return []
            },
        },
    },
    methods: {},
}
</script>
