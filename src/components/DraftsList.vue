<template>
    <q-page class="q-pa-md">
        <!-- Header -->
        <q-card class="q-mb-md">
            <q-card-section class="q-pa-md q-gutter-md">
                <div class="text-h6 font-semibold">草稿</div>
                <div class="q-mt-sm text-subtitle2">所有待发布的草稿</div>
            </q-card-section>

            <q-card-actions class="q-mr-md q-mb-md">
                <q-btn
                    to="/create/draft"
                    color="primary"
                    class="q-mr-sm"
                >
                    <q-icon name="add" class="q-mr-xs" />
                    创建新的草稿
                </q-btn>
            </q-card-actions>
        </q-card>

        <!-- Draft List -->
        <q-card
            v-for="draft in draftList"
            :key="draft.id"
            class="q-mb-md"
        >
            <q-card-section class="q-pa-md q-gutter-md">
                <!-- Picture -->
                <q-avatar
                    v-if="draft.image"
                    :src="draft.image"
                    class="q-mr-md"
                />
                <div v-else class="q-avatar-placeholder bg-grey-4 q-mr-md">
                    <span class="text-grey-8">没有头图</span>
                </div>

                <!-- Article -->
                <div class="q-flex q-dir-column">
                    <q-item-label
                        header
                        class="text-h6 q-mb-xs"
                    >
                        <q-router-link :to="`/draft/${draft.id}`" class="text-primary">
                            {{ draft.title }}
                        </q-router-link>
                    </q-item-label>

                    <q-item-label
                        class="text-body2 text-grey-6 q-mb-md"
                    >
                        <q-router-link :to="`/draft/${draft.id}`" class="text-primary">
                            <span v-if="draft.subtitle">{{ draft.subtitle }} &#183; </span>
                            {{ draft.content }}
                        </q-router-link>
                    </q-item-label>

                    <q-item-label class="text-caption text-grey-7">
                        上一次更新: <span class="text-primary">{{ draft.format }}</span>
                    </q-item-label>
                </div>
            </q-card-section>

            <q-card-actions align="right">
                <!-- Continue Writing -->
                <q-btn
                    :to="`/draft/${draft.id}`"
                    color="primary"
                    class="q-mr-sm"
                >
                    继续写作
                </q-btn>

                <!-- Delete -->
                <q-btn
                    @click.prevent="showModal(draft.id)"
                    color="negative"
                >
                    删除
                </q-btn>
            </q-card-actions>
        </q-card>

        <!-- End Message -->
        <q-card class="q-mt-md q-pa-md q-text-center">
            <q-card-section>
                <span class="text-h6 font-semibold">到底啦！👋</span>
            </q-card-section>
        </q-card>

        <!-- Confirm Modal -->
        <ConfirmModal
            title="删除草稿"
            :visible="isModal"
            @modal-on-close="isModal = !isModal"
            @modal-on-confirm="hideAndDelete(did)"
        >
            <p>确定要删除这篇草稿吗?</p>
        </ConfirmModal>
    </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'DraftsList',
});
</script>

<style scoped>

</style>
