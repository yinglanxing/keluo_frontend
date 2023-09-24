<template>

    <!--文章列表-->

    <a-list :bordered="true">
        <a-list-item v-for="q in 10">
            <template #extra>time</template>

            <a-space direction="vertical" fill>
                <!--标题-->
                <nuxt-link :to="'/article/' + q" style="color: var(--color-neutral-1);">
                    <a-typography-title :heading="5">
                        title {{ q }}
                    </a-typography-title>
                </nuxt-link>

                <!--文字占位-->
                <a-skeleton-line :rows="2"></a-skeleton-line>
                <!--图片区-->
                <a-space wrap>
                    <a-image width="200" height="100"></a-image>
                    <a-image width="200" height="100"></a-image>
                    <a-image width="200" height="100"></a-image>
                </a-space>
            </a-space>

            <a-space>

                <a-button :shape="'round'">
                    <template #icon>
                        <!--<icon-heart/>-->
                        <icon-heart-fill/>
                    </template>
                    {{ 3 }}
                </a-button>

                <a-button :shape="'round'">
                    <template #icon>
                        <!--<icon-star/>-->
                        <icon-star-fill/>
                    </template>
                    {{ 3 }}
                </a-button>

                <a-button :shape="'round'">
                    <template #icon>
                        <icon-message/>
                    </template>
                    {{ 3 }}
                </a-button>

                <a-button :shape="'round'">
                    <template #icon>
                        <icon-eye/>
                    </template>
                    {{ 5 }}
                </a-button>
            </a-space>
        </a-list-item>

        <template #footer>
            <!--翻页器-->
            <a-pagination :total="100" show-jumper/>
        </template>
    </a-list>


</template>

<script lang="ts">

export default {
    props: {},
}
</script>

<style scoped>

</style>
