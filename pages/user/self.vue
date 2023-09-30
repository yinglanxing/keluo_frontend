<template>

    <!--用户页面-->
    <!--顶部卡片-->
    <a-image
        :preview="false"
        src=""
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
            <!--<user-sidebar :user=""></user-sidebar>-->
        </a-grid-item>


        <!--右侧内容-->
        <a-grid-item :span="18" style="min-height: 100vh">
        </a-grid-item>

    </a-grid>

</template>

<script lang="ts">

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
