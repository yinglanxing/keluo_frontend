<template>
    <div class="q-gutter-lg">

        <q-card>
            <!--开源热榜-->
            <q-card-section>
                <q-icon name="whatshot"/>
                {{ $t("side.git_hot") }}
            </q-card-section>

            <!--列表内容-->
            <!--<div class="q-pa-md">-->
            <div>
                <q-list separator>
                    <q-item v-for="x in 5" :key="x" v-ripple clickable>
                        <q-item-section>
                            <!--标题-->
                            <q-item-label>
                                {{ x + $t("side.git_hot") }}
                            </q-item-label>

                            <!--内容-->
                            <q-item-label caption class="ellipsis-2-lines" style="height: 2.5em">
                                {{ $t("side.git_hot") }}
                                {{ $t("side.git_hot") }}
                                {{ $t("side.git_hot") }}
                                {{ $t("side.git_hot") }}
                                {{ $t("side.git_hot") }}
                                {{ $t("side.git_hot") }}
                                {{ $t("side.git_hot") }} {{ x }}
                            </q-item-label>
                        </q-item-section>

                        <!--小标签-->
                        <q-item-section class="q-gutter-sm" side top>
                            <!--数字tag, 小于1k 显示原数值-->
                            <div class="text-caption">
                                {{ 100 - x * 6 }} K
                            </div>
                            <!--热tag-->
                            <q-badge v-if="x % 5 != 0" color="red">hot</q-badge>
                            <!--新tag-->
                            <q-badge v-else color="blue">new</q-badge>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </q-card>

        <!--热门tag-->
        <q-card>
            <div class="q-pa-md q-gutter-sm">
                <q-chip v-for="i in 75" :key="i" color="blue-1">
                    <div class="ellipsis">
                        {{ i }}tag
                    </div>
                </q-chip>
            </div>
        </q-card>

    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';


export default defineComponent({
    name: 'IndexLeftSidebarVue',

    data() {
        return {}
    },
})
</script>

<style scoped>
</style>
