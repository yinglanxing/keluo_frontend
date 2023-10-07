<template>

    <!--页首顶栏-->
    <q-header :class="['header',$q.dark.isActive ? '' :'text-dark' ]" bordered reveal>
        <q-toolbar class="q-gutter-x-lg">
            <!--菜单展开按钮-->
            <!--隐藏级别 md lg xl-->
            <q-btn
                aria-label="menu" class="md-hide lg-hide xl-hide"
                dense flat icon="menu"
                round
                @click="toggleLeftDrawer"
            />

            <!--默认菜单效果-->
            <!--隐藏级别 xs sm-->
            <q-tabs
                v-model="$route.path"
                class="xs-hide sm-hide" outside-arrows
                shrink
            >
                <q-route-tab
                    v-for="item in essentialLinks" :key="item.title"
                    :icon="item.icon" :to="item.link"
                    :label="item.title" :name="item.link"
                />
            </q-tabs>

            <!--项目logo-->
            <q-avatar>
                <img alt="ico" src="/favicon.ico">
            </q-avatar>

            <q-space></q-space>

            <popup-self></popup-self>

            <!--创作中心-->
            <q-tabs inline-label shrink>
                <q-btn-dropdown :label="$t('menu.edit_space')" auto-close flat icon="edit" stretch>
                    <q-list>
                        <q-item clickable>
                            <q-item-section>Movies</q-item-section>
                        </q-item>

                        <q-item clickable>
                            <q-item-section>Photos</q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </q-tabs>


            <!--搜索栏输入框-->
            <!--todo-->
            <!--<q-input dark dense standout v-model="queryText" input-class="text-right" class="q-ml-md">-->
            <!--    <template v-slot:append>-->
            <!--        <q-icon v-if="queryText === ''" name="search"/>-->
            <!--        <q-icon v-else name="clear" class="cursor-pointer" @click="queryText = ''"/>-->
            <!--    </template>-->
            <!--</q-input>-->

            <!--设置按钮-->
            <q-btn color="grey-9" icon="settings" round @click="toggleMainTheme"></q-btn>
        </q-toolbar>
    </q-header>

    <!--菜单抽屉-->
    <q-drawer v-model="leftDrawerOpen" bordered>
        <!--宽度如果足够，直接展开-->
        <!--show-if-above-->
        <q-list>
            <q-item-label header>
                <q-avatar>
                    <img alt="ico" src="/favicon.ico">
                </q-avatar>
            </q-item-label>

            <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link"/>
        </q-list>
    </q-drawer>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
// 状态
import {useState} from 'stores/useState';
// 组件使用
import EssentialLink from 'components/EssentialLink.vue';
import PopupSelf from 'components/PopupSelf.vue';

const linksList = [
    {
        title: '首页',
        caption: 'index',
        icon: 'home',
        link: '/'
    },
    {
        title: '话题',
        caption: 'subject',
        icon: 'subject',
        link: '/talks'
    },
    {
        title: '文章',
        caption: 'article',
        icon: 'article',
        link: '/article'
    },
    {
        title: '问答',
        icon: 'question_answer',
        caption: 'article',
        link: '/qa'
    },
    {
        title: '硬件商城',
        caption: 'hardware store',
        icon: 'memory',
        link: '/hardware'
    },
    {
        title: '文档',
        caption: 'document',
        icon: 'description',
        link: '/docs'
    },
];

export default defineComponent({
    // 组件名称
    name: 'HeaderVue',

    // 使用组件
    components: {
        EssentialLink,
        PopupSelf,
    },

    setup() {
        // 状态管理
        let state = useState()
        return {
            state,
        }
    },

    data() {
        this.$route.path
        return {
            // 左侧边栏状态
            leftDrawerOpen: false,

            // 菜单列表
            essentialLinks: linksList,

            // 查询内容
            queryText: '',

            path: '/',
        }
    },

    methods: {
        // 切换左侧边栏状态
        toggleLeftDrawer() {
            this.leftDrawerOpen = !this.leftDrawerOpen
        },
        // 切换主题颜色
        toggleMainTheme() {
            if (this.state.theme == 'light') {
                this.state.theme = 'dark'
            } else {
                this.state.theme = 'light'
            }
        }
    },

});
</script>

<style lang="sass" scoped>
// 毛玻璃效果
@supports (backdrop-filter: none)
    .header
        background-color: rgba(0, 0, 0, .1)
        backdrop-filter: blur(15px)

@supports not (backdrop-filter: none)
    .header
        background-color: $grey-4
</style>
