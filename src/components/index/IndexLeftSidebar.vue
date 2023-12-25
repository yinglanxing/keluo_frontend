<template>
    <q-card>
        <q-card-section>
            <q-tabs v-model="tab" vertical inline-label>
                <q-route-tab
                    v-for="item in dockerList"
                    :key="item.text"
                    :name="item.to"
                    :to="item.to"
                >
                    <q-avatar square>
                        <q-img :src="'/icons/' + item.icon + '.svg'"></q-img>
                    </q-avatar>
                    <div class="m-1"></div>
                    {{ item.text }}
                </q-route-tab>
            </q-tabs>
        </q-card-section>
        <q-separator></q-separator>
        <!--  热门tag-->
        <q-item>
            <q-item-section class="text-h6 q-ma-sm">
                <q-item-label> 标签排行 </q-item-label>
            </q-item-section>
        </q-item>
        <q-list bordered separator>
            <q-item
                clickable
                v-ripple
                v-for="i in hot_tag"
                :key="i.id"
                :to="'/tag/' + i.id"
            >
                <q-item-section>{{ i.name }}</q-item-section>
                <q-item-section side>
                    <q-chip>{{ i.num }}</q-chip>
                </q-item-section>
            </q-item>
        </q-list>
        <!--<div class="q-mx-auto q-gutter-lg">-->
        <!--    <div class="q-pa-md q-gutter-sm">-->
        <!--        &lt;!&ndash;                <q-chip v-for="i in 75" :key="i">&ndash;&gt;-->
        <!--        <q-chip v-for="i in hot_tag" :key="i">-->
        <!--            <div class="ellipsis">-->
        <!--                {{ i.name }}-->
        <!--                    <span v-if="i % 9 ==0">-->
        <!--                        {{ String(Math.random()).slice(0, 7) }}-->
        <!--                    </span>-->
        <!--            </div>-->
        <!--        </q-chip>-->
        <!--    </div>-->
        <!--</div>-->
    </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from 'boot/axios';
import { SelectableTag } from 'stores/schemas/tag';

export default defineComponent({
    data() {
        let hot_tag: SelectableTag[] = [];
        return {
            hot_tag,
            tab: '/',
            dockerList: [
                { icon: 'news', text: '推荐', to: '/' },
                { icon: 'maps', text: '探索', to: '/index/explore' },
                { icon: 'document', text: '草稿', to: '/index/drafts' },
                { icon: 'bookmarklist', text: '书签', to: '/index/bookmarks' },
            ],
        };
    },

    mounted() {
        // 获取推荐 tag
        api.get('/api/v1/recommend/tag').then((req) => {
            if (req.status == 200) {
                this.hot_tag = req.data;
            }
        });
    },

    methods: {},

    watch: {
        tab() {
            // 未登陆的页面无法前往
            if (this.tab != this.$route.path) {
                this.tab = this.$route.path;
            }
        },
    },
});
</script>

<style scoped></style>

<!--<template>-->
<!--    <q-list>-->
<!--        <q-item-->
<!--            v-for="item in dockerList"-->
<!--            :key="item.index"-->
<!--            :to="item.to"-->
<!--            clickable-->
<!--            @click="selectItem(item.index)">-->
<!--            <q-item-section avatar>-->
<!--                <q-icon :name="item.icon" />-->
<!--            </q-item-section>-->
<!--            <q-item-section>-->
<!--                {{ item.text }}-->
<!--            </q-item-section>-->
<!--            <div v-if="selectedItem === item.index" class="active-bar"></div>-->
<!--        </q-item>-->
<!--    </q-list>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--    data() {-->
<!--        return {-->
<!--            dockerList: [-->
<!--                { icon: 'home', text: '推荐', to: '/recommend', index: 0 },-->
<!--                { icon: 'map', text: '探索', to: '/explore', index: 1 },-->
<!--                { icon: 'book', text: '草稿', to: '/drafts', index: 2 },-->
<!--                { icon: 'bookmark', text: '书签', to: '/bookmarks', index: 3 }-->
<!--            ],-->
<!--            selectedItem: 0-->
<!--        };-->
<!--    },-->
<!--    methods: {-->
<!--        selectItem(index) {-->
<!--            this.selectedItem = index;-->
<!--        }-->
<!--    }-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.active-bar {-->
<!--    position: absolute;-->
<!--    right: 0;-->
<!--    top: 0;-->
<!--    bottom: 0;-->
<!--    width: 3px;-->
<!--    background-color: blue;-->
<!--    transition: all 0.3s ease;-->
<!--}-->
<!--.q-item&#45;&#45;clickable:hover {-->
<!--    background-color: #f5f5f5;-->
<!--}-->
<!--</style>-->
