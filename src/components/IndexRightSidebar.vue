<template>
    <div class="q-gutter-lg">

        <!--用户组件-->
        <login-tips></login-tips>

        <q-card>
            <!--todo 日历组件-->
            <!--<sign-calendar></sign-calendar>-->
            <q-btn class="full-width">{{ $t("checkin") }}</q-btn>
        </q-card>

        <q-card>
            <!--积分排行-->
            <q-card-section>
                {{}}
            </q-card-section>

            <q-separator/>

            <q-list separator>
                <q-item v-for="x in 10" :key="x" v-ripple clickable>
                    <q-item-section avatar>
                        <q-avatar color="primary" text-color="white">
                            {{ x }}
                        </q-avatar>
                    </q-item-section>
                    <q-item-section>Letter avatar-type</q-item-section>
                </q-item>
            </q-list>
        </q-card>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
// 组件
import LoginTips from 'components/LoginTips.vue';

export default defineComponent({
    name: 'IndexRightSidebarVue',

    // 引用组件
    components: {
        LoginTips,
    },

    data() {
        return {}
    },
})
</script>

<style scoped>

</style>
