<template>

    <!--用户页面-->
    <!--顶部卡片-->

    <a-image
        :preview="false"
        src='https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/cd7a1aaea8e1c5e3d26fe2591e561798.png~tplv-uwbnlip3yd-webp.webp'
        title='A user’s avatar'
        description='Present by Arco Design'
        style="width: 100%;height: 30vh;margin-bottom: 18px;overflow: hidden"
    >
        <template #extra>
            <a-comment>
                <a-avatar></a-avatar>
            </a-comment>
        </template>
    </a-image>

    <a-grid :cols="24" :colGap="16" :rowGap="16">
        <!--左侧操作栏-->
        <a-grid-item :span="6">
            <a-space fill :direction="'vertical'">

                <!--用户状态统计-->
                <a-card>
                    <template #title>个人成就</template>
                    <a-grid :cols="{ sm: 1, lg: 2, xl: 4,}">
                        <a-grid-item>积分:0</a-grid-item>
                        <a-grid-item>话题:0</a-grid-item>
                        <a-grid-item>评论:0</a-grid-item>
                        <a-grid-item>注册:0</a-grid-item>
                    </a-grid>
                </a-card>


                <!--用户资料管理-->
                <a-card>
                    <template #title>账号管理</template>
                    <a-space fill :direction="'vertical'">
                        <!--用户信息-->
                        <a-list :bordered="false">
                            <a-list-item>
                                <template #extra>name</template>
                                名称
                            </a-list-item>
                            <a-list-item>
                                <template #extra></template>
                                签名
                            </a-list-item>
                            <a-list-item>
                                <template #extra>https://xxxxxxxxxx</template>
                                主页
                            </a-list-item>
                        </a-list>

                        <!--用户本人操作-->
                        <a-button :size="'large'" long>修改信息</a-button>
                        <a-button :size="'large'" long>账号安全</a-button>
                        <!--管理员模式-->
                        <a-button :size="'large'" long>封禁七天</a-button>
                        <a-button :size="'large'" long>永久封禁</a-button>
                    </a-space>
                </a-card>

                <!--关注列表-->
                <a-card>
                    <template #title>关注</template>
                    <a-space fill :direction="'vertical'">
                    </a-space>
                </a-card>

                <!--粉丝列表-->
                <a-card>
                    <template #title>粉丝</template>
                    <a-space fill :direction="'vertical'">
                    </a-space>
                </a-card>

            </a-space>
        </a-grid-item>


        <!--管理作品-->
        <a-grid-item :span="18">
            <a-space fill :direction="'vertical'">
                <!--顶部nva-->
                <!--<default-nav></default-nav>-->

                <!--内容-->

                <a-card style="width:100%;margin-bottom: 18px;" :bordered="false">

                    <default-nav></default-nav>

                    <article-list></article-list>

                </a-card>

            </a-space>
        </a-grid-item>
    </a-grid>

</template>

<script>
export default {
    // props: {
    //     user: {
    //         type: Object,
    //         required: true,
    //     },
    // },
    // data() {
    //     return {
    //         localUser: Object.assign({}, this.user),
    //         followed: false,
    //     }
    // },
    // computed: {
    //     backgroundImage() {
    //         if (this.localUser.smallBackgroundImage) {
    //             return this.localUser.smallBackgroundImage
    //         }
    //         return require('~/assets/images/default-user-bg.jpg')
    //     },
    //     currentUser() {
    //         return this.$store.state.user.current
    //     },
    //     // 是否是主人态
    //     isOwner() {
    //         const current = this.$store.state.user.current
    //         return this.localUser && current && this.localUser.id === current.id
    //     },
    // },
    // mounted() {
    //     this.loadIsFollowed()
    // },
    // methods: {
    //     async uploadBackground(e) {
    //         const files = e.target.files
    //         if (files.length <= 0) {
    //             return
    //         }
    //         try {
    //             // 上传头像
    //             const file = files[0]
    //             const formData = new FormData()
    //             formData.append('image', file, file.name)
    //             const ret = await this.$axios.post('/api/upload', formData, {
    //                 headers: {'Content-Type': 'multipart/form-data'},
    //             })
    //
    //             // 设置头像
    //             await this.$axios.post('/api/user/set/background/image', {
    //                 backgroundImage: ret.url,
    //             })
    //
    //             // 重新加载数据
    //             this.localUser = await this.$store.dispatch('user/getCurrentUser')
    //
    //             this.$message.success('背景设置成功')
    //         } catch (e) {
    //             this.$message.error(e.message || e)
    //             console.error(e)
    //         }
    //     },
    //     async loadIsFollowed() {
    //         this.followed = await this.$axios.get(
    //             '/api/fans/isfollowed?userId=' + this.user.id
    //         )
    //     },
    //     onFollowed(userId, followed) {
    //         this.followed = followed
    //     },
    // },
}
</script>

<style scoped>
</style>
