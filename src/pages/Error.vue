<template>
    <div class="fullscreen text-center q-pa-md flex flex-center" style="background: #0005;">
        <div>
            <div class="text-h3">
                {{ $t('nothing_page') }}
            </div>

            <div class="text-h6" style="opacity:.4">
                {{ $t('developing_or_waring') }}
            </div>

            <q-btn class="q-mt-xl" color="dark" no-caps @click="turnBack">
                {{ $t('back') }}
            </q-btn>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'ErrorPage',

    methods: {
        turnBack() {
            this.$router.back();
        },
    },
});

</script>
