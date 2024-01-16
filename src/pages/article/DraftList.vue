<template>
    <!-- Header -->
    <q-card flat bordered class="q-my-md">
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
    <q-card flat bordered v-for="draft in draftList" :key="draft.id" class="q-my-md">
        <q-card-section>
            <!-- Article -->
            <q-item class="q-flex q-dir-column">
                <q-item-section avatar>
                    <!-- Picture -->
                    <q-avatar square v-if="draft.image">
                        <q-img :src="draft.image"></q-img>
                    </q-avatar>
                    <q-avatar square v-else color="grey"></q-avatar>
                </q-item-section>

                <q-item-section>
                    <q-item-label class="q-ma-xs">
                        <span class="text-h6">
                            {{ draft.title }}
                        </span>
                        <span class="text-caption m3">
                            {{ draft.subtitle }}
                        </span>
                    </q-item-label>
                    <q-item-label caption>{{ draft.format }}</q-item-label>
                </q-item-section>
            </q-item>
        </q-card-section>

        <div class="ellipsis-2-lines m-x-5">
            {{ draft.content }}
        </div>

        <q-card-actions>
            <!-- Continue Writing -->
            <q-btn :to="`/edit/draft/${draft.id}`" color="primary" class="q-ma-sm">
                继续写作
            </q-btn>
            <!-- Delete -->
            <q-btn @click.prevent="showModal(draft)" color="negative">
                删除
            </q-btn>
        </q-card-actions>
    </q-card>

    <!-- End Message -->
    <q-card flat bordered class="q-mt-md q-pa-md q-text-center">
        <q-card-section>
            <span class="text-h6 font-semibold">到底啦！👋</span>
        </q-card-section>
    </q-card>

    <!-- Confirm Modal -->
    <q-dialog v-model="dialog">
        <q-card flat bordered style="width: 300px">
            <q-card-section>
                <div class="text-h6">确认操作</div>
            </q-card-section>

            <q-card-section>
                <q-item class="q-flex q-dir-column">
                    <q-item-section>
                        <q-item-label class="q-ma-xs">
                            <span class="text-h6">
                                {{ data.title }}
                            </span>
                            <span class="text-caption m3">
                                {{ data.subtitle }}
                            </span>
                        </q-item-label>
                        <q-item-label caption>{{ data.format }}</q-item-label>
                    </q-item-section>
                </q-item>
            </q-card-section>

            <q-card-section>
                确定要删除这篇草稿吗?
            </q-card-section>

            <q-separator></q-separator>

            <q-card-actions class="text-right">
                <q-btn color="negative" label="确定" @click="hideAndDelete" v-close-popup></q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {api} from 'boot/axios';
import { DraftInfo } from 'src/stores/schemas/article';

export default defineComponent({
    data() {
        let draftList: DraftInfo[] = [];
        return {
            data: {} as DraftInfo,
            dialog: false,
            draftList,
        };
    },

    mounted() {
        api.get('/api/v1/drafts').then((req) => {
            if (req.status == 200) {
                this.draftList = req.data;
            }
        });
    },

    methods: {
        hideAndDelete() {
            api.delete('/api/v1/draft?id=' + this.data.id).then((req) => {
                if (req.status == 200) {
                    // 删除当前页面内该id的草稿
                    this.draftList.splice(this.draftList.indexOf(this.data), 1);
                    this.data = {} as DraftInfo;
                }
            });
        },
        showModal(data: DraftInfo) {
            this.data = data;
            this.dialog = true;
        },
    },
});
</script>

<style scoped></style>
