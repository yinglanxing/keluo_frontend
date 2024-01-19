<template>
    <q-card flat bordered>
        <q-card-section>
            <q-item>
                <!-- 标题信息 -->
                <q-item-section avatar>
                    <span class="text-h4 text-weight-bold">{{ 'author' }} / {{ 'pack' }}</span>
                </q-item-section>
                <!-- 版本选择 -->
                <q-item-section avatar>
                    <q-select class="inline" outlined v-model="version_select" :options="version_selectable"></q-select>
                </q-item-section>
            </q-item>
            <!-- 时间 -->
            <q-item>
                <q-item-label caption>
                    时间
                </q-item-label>
            </q-item>
        </q-card-section>
        <!-- 简介 -->
        <q-card-section class="m3">
            any
        </q-card-section>
    </q-card>

    <!-- 内容详情 -->
    <div class="row q-ma-md q-col-gutter-x-md q-col-gutter-y-md">
        <!-- read me -->
        <div class="col-12 col-md-8 col-lg-8">
            <hr>
            ReadME

            <h3 class="text-weight-bold">example</h3>
            <ul>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
            </ul>
        </div>
        <!-- 操作详情 -->
        <div class="col-12 col-md-4 col-lg-4 q-gutter-y-md">
            <div>
                <span>链接：</span>
                <ul>
                    <li><q-icon name="home"></q-icon>home</li>
                </ul>
            </div>

            <div>
                <span>协议：</span>
                <span class="text-red">Apache-2.0</span>
            </div>

            <div>
                <div>
                    添加此组件到你的项目中:
                </div>
                <q-card flat bordered class="m-y-3">
                    <q-card-section horizontal>
                        <q-card-section>
                            <code>{{ 'command' }}</code>
                        </q-card-section>
                        <q-space></q-space>
                        <q-card-section>
                            <q-btn size="sm" round flat icon="content_copy"><q-tooltip>复制</q-tooltip></q-btn>
                            <q-space></q-space>
                        </q-card-section>
                    </q-card-section>
                </q-card>
                <div>或：<span class="text-red">下载存档</span></div>
            </div>

            <div>
                <span>依赖</span>
                <ul>
                    <li>lib ...</li>
                </ul>
            </div>

            <div>
                <span>示例：</span>
                <q-card flat bordered class="m-y-3">
                    <q-item>
                        <q-item-section>更多细节</q-item-section>
                        <q-item-section side><q-icon name="navigate_next"></q-icon></q-item-section>
                    </q-item>
                    <q-separator></q-separator>
                    <q-card-section horizontal>
                        <q-card-section>
                            <code>{{ 'command' }}</code>
                        </q-card-section>
                        <q-space></q-space>
                        <q-card-section>
                            <q-btn size="sm" round flat icon="content_copy"><q-tooltip>复制</q-tooltip></q-btn>
                            <q-space></q-space>
                        </q-card-section>
                    </q-card-section>
                </q-card>
            </div>


            <div>
                <span>状态：</span>
                <div><q-icon name="download"></q-icon>下载总量 1k 次</div>
                <div><q-icon name="download"></q-icon>此版本 1k 次</div>
            </div>

            <div>
                <span>标签：</span>
                <div>
                    <q-chip square>11111</q-chip>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { api } from 'boot/axios';
import { useUser } from 'src/stores/useUser';

export default defineComponent({

    components: {
    },

    data() {
        let self = useUser();
        return {
            self,

            // 版本选择
            version_selectable: [
                '1.0',
                '1.1',
                '1.2',
                '2.0',
            ],
            version_select: '1.0',
        };
    },


    mounted() {
        // 获取文章信息
        // this.getData('/api/v1/' + this.$route.params['id']);
    },

    methods: {
        // 获取文章信息
        // getData(url: string) {
        //     api.get(url).then((req) => {
        //         if (req.status == 200) {
        //         }
        //     }).catch(() => {
        //         // 无法获取信息，返回上一页
        //         this.$router.back();
        //     });
        // },
    },

    watch: {
        '$route'() {
            // 切换 id 时刷新内容
            if (this.$route.params['id'] && this.$route.path.indexOf('/component') == 0) {
                // this.getData('/api/v1/' + this.$route.params['id']);
            }
        },
    },
});
</script>