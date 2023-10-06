<template>
    <!--用户侧边栏页-->
    <div class="q-gutter-y-lg">

        <!--用户资料管理-->
        <q-card>
            <q-card-section class="row">
            <span>
                {{ $t("self.info") }}
            </span>
                <q-space></q-space>
                <!--用户头像-->

                <!--头像-->
                <q-avatar>
                    <!--<q-img v-if="user?.avatar" :src="user.avatar"></q-img>-->
                    <!--<q-icon v-else name="person"/>-->
                    <q-icon name="person"/>
                </q-avatar>
            </q-card-section>

            <!--用户信息-->
            <q-card-section>
                <q-list>
                    <q-item>
                        {{ $t("self.name") }}
                        <q-space></q-space>
                        {{ user.nickname }}
                    </q-item>
                    <q-item>
                        {{ $t("self.motto") }}
                        <q-space></q-space>
                        {{ user.description }}
                    </q-item>
                    <q-item>
                        {{ $t("self.index") }}
                        <q-space></q-space>
                        {{ user.homePage }}
                    </q-item>
                </q-list>
            </q-card-section>

            <q-card-actions class="col">
                <!--用户操作-->
                <q-btn class="col">{{ $t("self.change_info") }}</q-btn>
                <q-btn class="col">{{ $t("self.safe") }}</q-btn>
            </q-card-actions>

            <q-card-actions v-if="self.userToken" class="col">
                <!--管理员模式-->
                <q-btn class="col">{{ $t("self.ban_7") }}</q-btn>
                <q-btn class="col">{{ $t("self.ban_ever") }}</q-btn>
            </q-card-actions>
        </q-card>

        <!--用户状态统计-->
        <q-card>
            <q-card-section>
                {{ $t("self.achievements") }}
            </q-card-section>

            <div class="row q-col-gutter-lg q-pa-lg">
                <!--积分-->
                <div class="col-6 text-center">
                    {{ $t("self.points") }}:{{ user.score }}
                </div>
                <!--统计文章-->
                <div class="col-6 text-center">
                    {{ $t("self.a_count") }}:{{ user.topicCount }}
                </div>
                <!--统计回复-->
                <div class="col-6 text-center">
                    {{ $t("self.r_count") }}:{{ user.commentCount }}
                </div>
                <!--注册-->
                <div class="col-6 text-center">
                    {{ $t("self.signup_rank") }}:{{ user.id }}
                </div>
            </div>
        </q-card>

        <!--关注列表-->
        <q-card>
            <q-card-section>{{ $t("self.follow") }}</q-card-section>
        </q-card>

        <!--粉丝列表-->
        <q-card>
            <q-card-section>{{ $t("self.fans") }}</q-card-section>
        </q-card>

    </div>
</template>

<script lang="ts">

import {defineComponent, PropType} from 'vue';
// 状态
import {useUser} from 'stores/useUser';
// 模型
import {UserInfo} from 'stores/schemas/user';

export default defineComponent({

    props: {
        // 获取传入用户
        user: {} as PropType<UserInfo>
    },

    data() {
        // 自身状态
        let self = useUser()
        return {
            self: self,
        }
    },

    methods: {}
})
</script>


<style scoped>

</style>
