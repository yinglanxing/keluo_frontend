<template>
    <!--  推广-->
    <q-card>
        <q-item>
            <q-item-section class="text-h6 q-ma-sm">
                创作活动
            </q-item-section>
            <q-item-section side>
                <q-item-label caption>
                    <q-icon name="bi-chevron-right"></q-icon>
                </q-item-label>
            </q-item-section>
        </q-item>
        <q-img src="card-bg.jpg"></q-img>
    </q-card>

    <div class="q-ma-md"></div>

    <!--  话题-->
    <q-card>
        <q-list bordered>
            <q-item clickable>
                <q-item-section class="text-h6 q-ma-sm">
                    创作话题
                </q-item-section>
                <q-item-section side>
                    <q-item-label caption>
                        <q-icon name="bi-chevron-right"></q-icon>
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-separator/>

            <q-item clickable v-for="i in 10" :key="i">
                #
            </q-item>
        </q-list>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {api} from 'boot/axios';

import { useUser } from 'stores/useUser';
import { UserInfo } from 'stores/schemas/user';

export default defineComponent({

    components: {},

    setup() {

        // 用户状态
        const user = useUser();
        return {
            user,
        };
    },

    methods: {
        logout() {
            this.user.info = {} as UserInfo;
            this.user.userToken = this.user.resetToken = '';
            api.defaults.headers.common['Authorization'] = '';
        },
    },

});
</script>
