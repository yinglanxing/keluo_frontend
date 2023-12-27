<template>
    <!-- 存在更新行为 -->
    <q-card class="q-ma-lg" v-if="pre.id">
        <q-item class="q-flex q-dir-column">
            <q-item-section>
                <q-item-label class="q-ma-xs">
                    <span class="text-h6">
                        {{ pre.title }}
                    </span>
                    <span class="text-caption m3">
                        {{ pre.subtitle }}
                    </span>
                </q-item-label>
                <q-item-label caption>{{ pre.format }}</q-item-label>
            </q-item-section>
            <q-item-section side>
                <q-btn round @click="update_send">
                    <q-icon name="upload" color="green">
                    </q-icon>
                    <q-tooltip>
                        提交更新
                    </q-tooltip>
                </q-btn>
            </q-item-section>
        </q-item>
    </q-card>
    <!--创建页面-->
    <q-card class="q-ma-lg q-pa-lg q-gutter-y-md column">
        <!--标题-->
        <q-input v-model="form.title" clearable filled label="title"></q-input>
        <!--副标题-->
        <q-input v-model="form.subtitle" clearable filled label="subtitle"></q-input>

        <!--tags组件 new-value-mode=唯一值-->
        <q-select label="tags" v-model="selected" :options="selectable_tags" option-value="id" option-label="name"
                  filled
                  @filter="select_filter_keys" multiple use-chips use-input>

            <template #before-options>
                <q-item v-if="!selectable_tags.length">
                    <q-item-section class="text-italic text-grey">
                        没有找到需要的 tag ？
                    </q-item-section>
                    <q-item-section side>
                        <q-btn color="primary" to="/edit/tag">创建</q-btn>
                    </q-item-section>
                </q-item>
            </template>
        </q-select>

        <!--内容-->
        <q-uploader class="full-width" label="封面上传" accept="jpg,jpeg,png" auto-upload hide-upload-btn
                    url="/api/v1/upload" disable></q-uploader>
        <q-editor v-model="form.content"></q-editor>

        <!-- <markdown v-bind:content="content"></markdown> -->

        <!--悬浮按钮列表-->
        <q-page-sticky :offset="fabPos" position="bottom-right">
            <!--绑定拖拽-->
            <q-fab v-touch-pan.prevent.mouse="moveFab" direction="left" :disable="draggingFab" color="info"
                   external-label
                   icon="edit">
                <!--提交按钮-->
                <q-fab-action :disable="draggingFab" :label="$t('submit')" color="primary" external-label icon="send"
                              label-position="top" @click="create_article">
                    <q-tooltip>
                        创建文章
                    </q-tooltip>
                </q-fab-action>
                <!--草稿按钮-->
                <q-fab-action :disable="draggingFab" :label="$t('draft')" color="primary" external-label
                              icon="edit_note"
                              label-position="top" @click="create_draft">
                    <q-tooltip>
                        创建草稿
                    </q-tooltip>
                </q-fab-action>
                <q-fab-action :disable="draggingFab" label="创建" color="green" external-label icon="send"
                              v-if="update == 'draft'" label-position="top" @click="create_article_by_draft">
                    <q-tooltip>
                        通过草稿创建文章
                    </q-tooltip>
                </q-fab-action>
            </q-fab>
        </q-page-sticky>
    </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {api} from 'boot/axios';
import { useUser } from 'src/stores/useUser';
import { TouchPanEvent } from 'stores/schemas/event';
import { SelectableTag } from 'stores/schemas/tag';
import { ArticleInfo, DraftDetail } from 'src/stores/schemas/article';

export default defineComponent({
    data() {
        let fabPos = ref([18, 18]);
        let draggingFab = ref(false);
        let selectable_tags: SelectableTag[] = [];
        let selected: SelectableTag[] = [];
        let tags_list: number[] = [];
        let self = useUser();
        return {
            self,
            // 可选标签
            selectable_tags,
            selected,
            form: {
                // 标题
                title: '',
                // 副标题
                subtitle: '',
                // 标签
                tags: tags_list,
                // 绑定内容
                content: '',
                // 封面
                image: '',
            },

            // 旧版
            pre: {} as ArticleInfo,

            // 悬浮按钮相关
            fabPos,
            draggingFab,
            moveFab(ev: TouchPanEvent) {
                if (ev && ev.delta) {
                    // 如果两个事件都为假，则判断为真(正在拖拽中)
                    draggingFab.value = ev.isFirst !== true && ev.isFinal !== true;
                    // 修改坐标
                    fabPos.value = [
                        fabPos.value[0] - ev.delta.x,
                        fabPos.value[1] - ev.delta.y,
                    ];
                }
            },

            // 加载状态
            loading: false,

            // 更新类型
            update: '',
        };
    },

    mounted() {
        // 作为修改进入此页面
        if (this.$route.params['id']) {
            // 开启加载状态
            this.loading = true;
            if (this.$route.path.indexOf('article') > -1) {
                this.update = 'article';
                // 编辑已存在文章
                api.get('/api/v1/article/' + this.$route.params['id']).then((req) => {
                    if (req.status == 200) {
                        let article: ArticleInfo = req.data.article;
                        this.pre = req.data.article;
                        // 判断不为作者
                        if (article.authorID != this.self.info.id) {
                            this.$router.back();
                            return;
                        }
                        article.tags = req.data.tags;
                        this.form.title = article.title;
                        this.form.subtitle = article.subtitle;
                        this.form.content = article.content;
                        this.form.image = article.image;
                        // 插入以选中的tags
                        for (const tag of article.tags) {
                            this.selected.push({
                                id: tag.id,
                                image: tag.image,
                                name: tag.name,
                                num: '0',
                                f_num: 0,
                                isFollow: tag.isFollow,
                            });
                        }
                    }
                    // 关闭加载状态
                    this.loading = false;
                });
            } else {
                this.update = 'draft';
                // 编辑已存在草稿
                api.get('/api/v1/draft/' + this.$route.params['id']).then((req) => {
                    if (req.status == 200) {
                        let draft: DraftDetail = req.data;
                        this.pre = req.data;
                        this.form.title = draft.title;
                        this.form.subtitle = draft.subtitle;
                        this.form.content = draft.content;
                        this.form.image = draft.image;
                        for (const tag of draft.tagSimple) {
                            this.selected.push({ ...tag } as SelectableTag);
                        }
                    }
                    // 关闭加载状态
                    this.loading = false;
                });
            }
        }
    },

    unmounted() {
        if (this.self.is_login()) {
            // 退出时内容不为空
            if (
                this.form.content ||
                this.form.title ||
                this.form.subtitle ||
                this.form.image ||
                this.selected.length
            ) {
                // 存在更新行为
                if (this.update) {
                    this.update_send();
                } else {
                    this.create_draft();
                }
            }
        }
    },

    methods: {
        get_tags() {
            // 获取id
            for (let item of this.selected) {
                this.form.tags.push(item.id);
            }
        },

        clear_json() {
            // 清空
            this.form = { title: '', subtitle: '', tags: [], content: '', image: '' };
            this.selected = [];
        },

        update_send() {
            if (this.self.is_login()) {
                this.get_tags();
                if (this.update == 'article') {
                    // 更新文章
                    api.patch('/api/v1/article/' + this.pre.id, this.form).then((req) => {
                        if (req.status == 200) {
                            this.clear_json();
                        }
                    });
                } else if (this.update == 'draft') {
                    // 更新草稿
                    api.patch('/api/v1/draft/', {id: this.pre.id, ...this.form}).then((req) => {
                        if (req.status == 200) {
                            this.clear_json();
                        }
                    });
                }
            }
        },

        create_article() {
            if (this.self.is_login()) {
                // 发送文章
                this.get_tags();
                api.post('/api/v1/article/', this.form).then((req) => {
                    if (req.status == 200) {
                        this.clear_json();
                    }
                });
            }
        },

        create_draft() {
            if (this.self.is_login()) {
                // 存为草稿
                this.get_tags();
                api.post('/api/v1/draft', this.form).then((req) => {
                    if (req.status == 200) {
                        this.clear_json();
                    }
                });
            }
        },

        create_article_by_draft() {
            if (this.self.is_login() && this.update == 'draft') {
                // 发送文章
                this.get_tags();
                api.post('/api/v1/article/', {id: this.pre.id, ...this.form}).then((req) => {
                    if (req.status == 200) {
                        this.clear_json();
                    }
                });
            }
        },


        select_filter_keys(val: string, update: (func: () => void) => void, abort: () => void) {
            if (this.self.is_login()) {
                // tag 过滤器
                if (val === '') {
                    // 获取所有可选标签
                    api.get('/api/v1/tag/all').then((req) => {
                        if (req.status == 200) {
                            update(() => {
                                this.selectable_tags = req.data.list;
                            });
                        }
                    }).catch(() => {
                        abort();
                    });
                } else {
                    // 根据关键字查询tag
                    api.get('/api/v1/tag/value/' + val).then((req) => {
                        if (req.status == 200) {
                            update(() => {
                                this.selectable_tags = req.data.list;
                            });
                        }
                    }).catch(() => {
                        abort();
                    });
                }
            }
        },
    },
});
</script>
