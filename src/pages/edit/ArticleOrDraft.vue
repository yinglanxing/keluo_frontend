<template>
    <!--创建页面-->
    <q-card class="q-ma-lg q-pa-lg q-gutter-y-md column">
        <!--标题-->
        <q-input v-model="form.title" clearable filled label="title"></q-input>
        <!--副标题-->
        <q-input v-model="form.subtitle" clearable filled label="subtitle"></q-input>

        <!--tags组件 new-value-mode=唯一值-->
        <q-select label="tags" v-model="selected" :options="selectable_tags" option-value="id" option-label="name" filled
            @filter="select_filter_keys" multiple use-chips use-input>

            <template #before-options>
                <q-item v-if="!selectable_tags.length">
                    <q-item-section class="text-italic text-grey">
                        没有找到需要的 tag ？
                    </q-item-section>

                    <q-btn color="primary" to="/edit/tag">创建</q-btn>
                </q-item>
            </template>
        </q-select>

        <!--内容-->
        <q-uploader class="full-width" label="封面上传" accept="jpg,jpeg,png" auto-upload hide-upload-btn
            url="/api/v1/upload"></q-uploader>
        <q-editor v-model="form.content"></q-editor>

        <!-- <markdown v-bind:content="content"></markdown> -->

        <!--悬浮按钮列表-->
        <q-page-sticky :offset="fabPos" position="bottom-right">
            <!--绑定拖拽-->
            <q-fab v-touch-pan.prevent.mouse="moveFab" direction="left" :disable="draggingFab" color="info" external-label
                icon="edit">
                <!--提交按钮-->
                <q-fab-action :disable="draggingFab" :label="$t('submit')" color="primary" external-label
                    icon="mark_as_unread" label-position="top" @click="create_article">
                </q-fab-action>
                <!--草稿按钮-->
                <q-fab-action :disable="draggingFab" :label="$t('draft')" color="primary" external-label icon="edit_note"
                    label-position="top" @click="create_article">
                </q-fab-action>
            </q-fab>
        </q-page-sticky>
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


import { TouchPanEvent } from 'stores/schemas/event';
import axios from 'axios';
import { SelectableTag } from 'stores/schemas/tag';

export default defineComponent({
    data() {
        let fabPos = [18, 18];
        let draggingFab = false;
        let selectable_tags: SelectableTag[] = []
        let selected: SelectableTag[] = []
        let tags_list: number[] = []

        return {
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

            // 悬浮按钮相关
            fabPos,
            draggingFab,
            moveFab(ev: TouchPanEvent) {
                if (ev && ev.delta) {
                    // 如果两个事件都为假，则判断为真(正在拖拽中)
                    draggingFab = ev.isFirst !== true && ev.isFinal !== true;
                    // 修改坐标
                    fabPos = [
                        fabPos[0] - ev.delta.x,
                        fabPos[1] - ev.delta.y,
                    ];
                }
            },
        };
    },

    mounted() {
        function test_author(article_feed_back:any) {
            if (article_feed_back) { }
        }
        if (this.$route.params['id']) {
            console.log(this.$route.params['id'])
            // 编辑已存在文章
            if (this.$route.path.indexOf('/edit/draft') > -1) {
                // this.form.content =
                axios.get('/api/v1/article/' + this.$route.params['id']).then((req) => {
                    if (req.status == 200) {
                        test_author(req.data)
                    }
                })
            }
        }
    },

    unmounted() {
        // 退出时内容不为空
        if (this.form.content.length) {
            this.create_draft()
        }
    },

    methods: {
        get_tags() {
            // 获取id
            for (let item of this.selected) {
                this.form.tags.push(item.id)
            }
        },

        create_article() {
            // 发送文章
            this.get_tags()
            axios.post('/api/v1/article/', this.form).then((req) => {
                if (req.status == 200) {
                    // 清空
                    this.form = { title: '', subtitle: '', tags: [], content: '', image: '', }
                }
            })
        },

        create_draft() {
            // 存为草稿
            this.get_tags()
            axios.post('/api/v1/draft/', this.form).then((req) => {
                if (req.status == 200) {
                    this.form = { title: '', subtitle: '', tags: [], content: '', image: '', }
                }
            })
        },


        select_filter_keys(val: string, update: (func: () => void) => void, abort: () => void) {
            // tag 过滤器
            if (val === '') {
                // 获取所有可选标签
                axios.get('/api/v1/tag/all').then((req) => {
                    if (req.status == 200) {
                        update(() => {
                            this.selectable_tags = req.data.list
                        })
                    }
                }).catch(() => { abort() })
            } else {
                // 根据关键字查询tag
                axios.get('/api/v1/tag/value/' + val).then((req) => {
                    if (req.status == 200) {
                        update(() => {
                            this.selectable_tags = req.data.list
                        })
                    }
                }).catch(() => { abort() })
            }
        }
    },
});
</script>
