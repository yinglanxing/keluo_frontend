<template>
    <a-card>
        <a-grid :cols="{ xs: 1, lg: 2 }" :colGap="24" :rowGap="24">
            <a-grid-item :span="3">
                {{ $t("login_tips.title") }}：
            </a-grid-item>

            <a-grid-item>
                <icon-bookmark/>
                {{ $t("login_tips.p1") }}
            </a-grid-item>

            <a-grid-item>
                <icon-user-group/>
                {{ $t("login_tips.p2") }}
            </a-grid-item>

            <a-grid-item>
                <icon-message/>
                {{ $t("login_tips.p3") }}
            </a-grid-item>

            <a-grid-item>
                <icon-pen-fill/>
                {{ $t("login_tips.p4") }}
            </a-grid-item>

            <a-grid-item :span="3">
                <a-button @click="alert_plane(1)" :type="'primary'" long>{{ $t("login") }}</a-button>
            </a-grid-item>

            <a-grid-item :span="3">
                {{ $t('login_tips.req_account') }}
                <a-link @click="alert_plane(2)">
                    {{ $t("signup") }}
                </a-link>
            </a-grid-item>
        </a-grid>
    </a-card>
</template>

<script lang="ts">
import {USER_STATE} from "~/composables/user";

export default {
    setup() {
        // 切换登录框
        const user_state = USER_STATE()
        return {
            alert_plane: user_state.alert_plain,
        }
    },
}
</script>

<style scoped>

</style>
