<template>
    <!--创建页面-->
    <q-card class="q-ma-lg" flat>

        <div class="full-width q-gutter-y-md column">

            <!--标题-->
            <q-input v-model="title" clearable filled label="title"></q-input>

            <!--tags组件 new-value-mode=唯一值-->
            <q-select
                v-model="tags"
                filled hide-dropdown-icon
                input-debounce="0"
                label="tag" multiple
                new-value-mode="add-unique" use-chips use-input
            />

            <!--内容-->
            <q-editor v-model="content"></q-editor>
            <!-- <markdown v-bind:content="content"></markdown> -->

            <!--悬浮按钮列表-->
            <q-page-sticky :offset="fabPos" position="bottom-right">
                <!--绑定拖拽-->
                <q-fab
                    v-touch-pan.prevent.mouse="moveFab"
                    :disable="draggingFab"
                    color="info"
                    external-label icon="edit"
                >
                    <!--发送按钮-->
                    <q-fab-action
                        :disable="draggingFab"
                        :label="$t('send')"
                        color="primary"
                        external-label icon="send"
                        label-position="left"
                    >
                    </q-fab-action>
                </q-fab>
            </q-page-sticky>

            {{ title }}

        </div>

    </q-card>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';

// 组件
// import Markdown from 'components/Markdown.vue';
import {TouchPanEvent} from 'stores/schemas/event';


export default defineComponent({
    name: 'WriterPage',

    // 组件
    components: {
        // Markdown,
    },

    data() {
        const fabPos = ref([18, 18])
        const draggingFab = ref(false)
        return {
            // 标题
            title: '',

            // 标签
            tags: [],

            // 绑定内容
            content: '',

            // 悬浮按钮相关
            fabPos,
            draggingFab,
            moveFab(ev: TouchPanEvent) {
                // 如果两个事件都为假，则判断为真(正在拖拽中)
                draggingFab.value = ev.isFirst !== true && ev.isFinal !== true
                // 修改坐标
                fabPos.value = [
                    fabPos.value[0] - ev.delta.x,
                    fabPos.value[1] - ev.delta.y
                ]
            }
        }
    },


    methods: {},
})
</script>
