<template>
    <!-- Header -->
    <q-card class="q-my-md">
        <q-card-section class="q-pa-md q-gutter-md">
            <div class="text-h6">草稿</div>
            <div class="q-mt-sm text-subtitle2">所有待发布的草稿</div>
        </q-card-section>

        <q-card-actions class="q-my-md">
            <q-btn to="/edit/article" color="primary" class="q-mr-sm">
                <q-icon name="add" class="q-mr-xs" />
                创建文章
            </q-btn>
        </q-card-actions>
    </q-card>

    <!-- Draft List -->
    <q-card v-for="draft in draftList" :key="draft.id" class="q-my-md">
        <q-card-section class="q-pa-md q-gutter-md">
            <!-- Picture -->
            <q-avatar v-if="draft.image" :src="draft.image" />
            <div v-else class="q-avatar-placeholder bg-grey-4">
                <span class="text-grey-8">没有头图</span>
            </div>

            <!-- Article -->
            <q-item class="q-flex q-dir-column">
                <q-item-label header class="text-h6 q-ma-xs">
                    <router-link :to="`/draft/${draft.id}`" class="text-primary">
                        {{ draft.title }}
                    </router-link>
                </q-item-label>

                <q-item-label class="text-body2 text-grey-6 q-my-md">
                    <router-link :to="`/draft/${draft.id}`" class="text-primary">
                        <span v-if="draft.subtitle">{{ draft.subtitle }} &#183; </span>
                        {{ draft.content }}
                    </router-link>
                </q-item-label>

                <q-item-label class="text-caption text-grey-7">
                    上一次更新:
                    <span class="text-primary">{{ draft.format }}</span>
                </q-item-label>
            </q-item>
        </q-card-section>

        <q-card-actions>
            <!-- Continue Writing -->
            <q-btn :to="`/draft/${draft.id}`" color="primary" class="q-mr-sm">
                继续写作
            </q-btn>

            <!-- Delete -->
            <q-btn @click.prevent="showModal(draft.id)" color="negative">
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
    <q-dialog title="删除草稿" v-model="dialog" @modal-on-confirm="hideAndDelete(did)">
        <p>确定要删除这篇草稿吗?</p>
    </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import axios from 'axios';
import { DraftInfo } from 'src/stores/schemas/article';

export default defineComponent({
    data() {
        let draftList: DraftInfo[] = [];
        return {
            did: 0,
            dialog: false,
            draftList,
        };
    },

    mounted() {
        axios.get('/api/v1/drafts').then((req) => {
            if (req.status == 200) {
                this.draftList = req.data;
            }
        });
    },

    methods: {
        hideAndDelete(did: number) {
            this.dialog = false;
            axios.delete('/api/v1/draft?id=' + did).then((req) => {
                if (req.status == 200) {
                    // 删除当前页面内该id的草稿
                }
            });
        },
        showModal(id: number) {
            this.did = id;
            this.dialog = true;
        },
    },
});
</script>

<style scoped></style>
