<template>
    <!--用户排行列表-->
    <q-list bordered class="overflow-hidden" separator>
        <q-item v-for="item in rank" :key="item.id" clickable @click="moreAboutUser(item.id)">
            <!--头像-->
            <q-item-section avatar>
                <q-avatar>
                    <q-icon name="person"></q-icon>
                </q-avatar>
            </q-item-section>
            <!-- 信息 -->
            <q-item-section>
                <!--名称-->
                <q-item-label>
                    {{ item.nickname }}
                </q-item-label>
                <!--介绍-->
                <q-item-label caption class="ellipsis-2-lines" style="height: 1.2em;">
                    {{ item.description }}
                </q-item-label>
            </q-item-section>

            <!-- 附加信息 -->
            <q-item-section v-if="extar" side top>
                <q-item-label caption>
                    <q-icon name="bi-coin"></q-icon>
                    {{ item.score }}
                </q-item-label>
            </q-item-section>
        </q-item>
    </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// 模型
import { UserInfo } from 'src/stores/schemas/user';

export default defineComponent({
    name: 'RankListVue',

    props: {
        // 获取传入用户
        rank: {
            // 类型注释
            type: Array<UserInfo>,
            // 强制非空
            required: true,
        },
        // 附加参数
        extar: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        // 前往用户信息界面
        moreAboutUser(id: number) {
            this.$router.push('/user/' + id);
        },
    },
});

</script>
