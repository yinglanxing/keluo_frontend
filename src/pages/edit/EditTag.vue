<template>
    <!--创建页面-->
    <q-card flat bordered class="q-ma-lg">

        <div class="full-width q-gutter-y-md column">
            <!--标题-->
            <q-input v-model="form.name" clearable filled label="title"></q-input>
            <!--内容-->
            <q-card flat bordered>
                <q-uploader class="full-width" label="封面上传" accept="jpg,jpeg,png" auto-upload hide-upload-btn
                    url="/api/v1/upload" disable></q-uploader>
                <q-editor v-model="form.introduction"></q-editor>
            </q-card>
            <q-btn class="full-width" @click="create_tag">创建标签</q-btn>
        </div>

    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {api} from 'boot/axios';

export default defineComponent({
    data() {
        return {
            form: {
                // 标题
                name: '',
                // 绑定内容
                introduction: '',
                // 图片
                image: '',
            },

        };
    },

    methods: {
        create_tag() {
            // 创建 tag
            api.post('/api/v1/tag', this.form).then(() => {
                // 清空
                this.form.name = this.form.introduction = '';
            });
        },
    },
});
</script>
