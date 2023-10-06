<template>
    <!--用户信息卡片-->
    <q-card>
        <!--统计数据-->
        <q-card-section class="row">
            <!--名字-->
            <div class="text-h5">
                {{ user.nickname }}
            </div>

            <q-space></q-space>

            <!--头像-->
            <q-avatar color="blue-1" @click="moreAboutUser">
                <!--<q-img v-if="user?.avatar" :src="user.avatar"></q-img>-->
                <!--<q-icon v-else name="person"/>-->
                <q-icon name="person"/>
            </q-avatar>

            <!--motto / 格言 / 个性-->
            <div class="col-12">
                {{ user.description }}
            </div>
        </q-card-section>

        <q-separator inset/>

        <!--主页背景-->
        <q-card-section>
            <!--<q-img v-if="user?.backgroundImage" :src="user.backgroundImage"/>-->
            <!--<q-img v-else src="card-bg.jpg"/>-->
            <q-img src="card-bg.jpg"/>
        </q-card-section>

        <q-separator inset/>

        <!--信息统计-->
        <q-card-actions class="justify-around">
            <!--统计文章-->
            <div>{{ $t("self.a_count") }}:{{ user.topicCount }}</div>
            <!--统计粉丝-->
            <div>{{ $t("self.f_count") }}:{{ user.fansCount }}</div>
            <!--统计回复-->
            <div>{{ $t("self.r_count") }}:{{ user.commentCount }}</div>
        </q-card-actions>

        <q-separator inset/>

        <!--操作按钮-->
        <!--<q-card-actions v-if="user?.id != self.id">-->
        <q-card-actions v-if="showActions">
            <q-btn class="col">关注</q-btn>
            <q-btn class="col">私信</q-btn>
        </q-card-actions>
    </q-card>

</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
// 状态
import {useUser} from 'stores/useUser';
// 模型
import {UserInfo} from 'stores/schemas/user';

export default defineComponent({
    name: 'UserCard',

    props: {
        // 获取传入用户
        user: {} as PropType<UserInfo>,
        // 操作栏可见
        showActions: {
            type: Boolean,
            default: false,
        },
    },

    setup() {
        // 自身状态
        const self = useUser()
        return {
            self: self.info,
        }
    },

    methods: {
        // 查看更多用户信息
        moreAboutUser() {
            this.$router.push('/user/' + this.user?.id)
        }
    }
})
</script>

<style scoped>

</style>
