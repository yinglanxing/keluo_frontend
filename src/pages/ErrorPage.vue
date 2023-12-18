<template>
    <div class="fullscreen text-center q-pa-md flex flex-center" style="background: #0005;">
        <div>
            <div class="text-h3">
                {{ $t('nothing_page') }}
            </div>

            <q-img class="my-15" src="/image/404.svg"></q-img>

            <q-btn class="q-mt-xl" color="dark" no-caps @click="turnBack">
                {{ $t('back') }}
            </q-btn>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    methods: {
        turnBack() {
            // 无上一页记录
            if (window.history.length == 1) {
                this.$router.push('/');
            } else {
                this.$router.back();
            }
        },
    },
});

</script>
