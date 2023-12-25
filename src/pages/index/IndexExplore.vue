<template>
    <q-card>
        <q-card-section class="text-center">
            <div class="text-h5">探索技术博客&标签</div>
            <div>在这里你能找到社区中的优质博客和你感兴趣的领域</div>
        </q-card-section>
    </q-card>
    <div class="q-ma-md"></div>
    <q-card>
        <q-card>
            <q-tabs v-model="tab" dense active-color="primary">
                <q-tab name="1" label="热门" />
                <q-tab name="2" label="全部标签" />
            </q-tabs>

            <q-tab-panels v-model="tab" animated>
                <!-- 热门 -->
                <q-tab-panel name="1" class="row">
                    <div class="col-6 p3" v-for="i in hot_tags" :key="i.id">
                        <q-card bordered>
                            <q-item>
                                <!--tag image -->
                                <q-item-section avatar>
                                    <q-avatar square>
                                        <q-img :src="i.image"></q-img>
                                    </q-avatar>
                                </q-item-section>
                                <q-item-section
                                    >tag:{{ i.name }}</q-item-section
                                >
                                <q-item-section side>
                                    <q-btn
                                        v-if="!i.isFollow"
                                        size="xs"
                                        round
                                        icon="add"
                                        @click="follow(i)"
                                    ></q-btn>
                                    <q-btn
                                        v-else
                                        size="xs"
                                        round
                                        icon="dash"
                                        @click="follow(i)"
                                    ></q-btn>
                                </q-item-section>
                            </q-item>
                        </q-card>
                    </div>
                </q-tab-panel>

                <!-- 全部标签 -->
                <q-tab-panel name="2" class="row">
                    <div class="col-6 p3" v-for="i in all_tags" :key="i.id">
                        <q-card bordered>
                            <q-item>
                                <!--tag image -->
                                <q-item-section avatar>
                                    <q-avatar square>
                                        <q-img :src="i.image"></q-img>
                                    </q-avatar>
                                </q-item-section>
                                <q-item-section
                                    >tag:{{ i.name }}</q-item-section
                                >
                                <q-item-section side>
                                    <q-btn
                                        v-if="!i.isFollow"
                                        size="xs"
                                        round
                                        icon="add"
                                        @click="follow(i)"
                                    ></q-btn>
                                    <q-btn
                                        v-else
                                        size="xs"
                                        round
                                        icon="dash"
                                        @click="follow(i)"
                                    ></q-btn>
                                </q-item-section>
                            </q-item>
                        </q-card>
                    </div>
                </q-tab-panel>
            </q-tab-panels>
        </q-card>
    </q-card>
</template>

<script lang="ts">
import { api } from 'boot/axios';
import { SelectableTag } from 'src/stores/schemas/tag';
import { useUser } from 'src/stores/useUser';
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        let hot_tags: SelectableTag[] = [];
        let all_tags: SelectableTag[] = [];
        let self = useUser();
        return {
            self,
            tab: '1',
            hot_tags,
            all_tags,
        };
    },
    mounted() {
        // 获取所有可选标签
        api.get('/api/v1/recommend/tag').then((req) => {
            if (req.status == 200) {
                this.hot_tags = req.data;
            }
        });
        // 获取所有可选标签
        api.get('/api/v1/tag/all').then((req) => {
            if (req.status == 200) {
                this.all_tags = req.data.list;
            }
        });
    },
    methods: {
        follow(item: SelectableTag) {
            if (this.self.is_login()) {
                api.post('/api/v1/tag/follow?tid=' + item.id).then((req) => {
                    if (req.status == 200) {
                        item.isFollow = true;
                    }
                });
            }
        },
    },
});
</script>

<style scoped></style>
