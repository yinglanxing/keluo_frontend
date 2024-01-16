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
            ></q-btn>

            <q-space></q-space>

            <!--项目logo-->
            <q-avatar class="xs-hide sm-hide">
                <img alt="ico" src="/favicon.ico">
            </q-avatar>

            <!--默认菜单效果-->
            <!--隐藏级别 xs sm-->
            <q-tabs
                v-model="$route.path"
                class="xs-hide sm-hide"
                inline-label shrink
                outside-arrows
            >
                <q-tab
                    v-for="item in essentialLinks"
                    :key="item.title"
                    :icon="item.icon" @click="changeRoute(item.link)"
                    :label="item.title" :name="item.link"
                ></q-tab>
            </q-tabs>

            <q-space></q-space>

            <popup-self></popup-self>

            <!--创作中心-->
            <q-tabs inline-label shrink>
                <q-btn-dropdown :label="$t('edit_space')" auto-close flat icon="edit" stretch>
                    <q-list>
                        <q-item clickable to="/edit/article">
                            <q-item-section>
                                {{ $t('menu.article') }}
                            </q-item-section>
                        </q-item>

                        <q-item clickable to="/index/drafts">
                            <q-item-section>
                                {{ $t('draft') }}
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-btn-dropdown>
            </q-tabs>

            <!--设置按钮-->
            <q-btn color="grey-9" icon="settings" round @click="setting"></q-btn>
            <q-space></q-space>
        </q-toolbar>
    </q-header>

    <!--        <q-toolbar class="header">-->
    <!--            &lt;!&ndash;左&ndash;&gt;-->
    <!--            <div class="hidari">-->
    <!--                <q-btn aria-label="menu" class="lg-hide xl-hide" flat icon="menu" round @click="toggleLeftDrawer"/>-->
    <!--                &lt;!&ndash;<q-avatar class="xs-hide sm-hide md-hide">&ndash;&gt;-->
    <!--                <q-avatar>-->
    <!--                    <img alt="ico" src="/favicon.ico">-->
    <!--                </q-avatar>-->
    <!--            </div>-->
    <!--            &lt;!&ndash;中&ndash;&gt;-->
    <!--            <div class="chuukann md-hide xs-hide sm-hide">-->
    <!--                <q-tabs v-model="$route.path" inline-label shrink outside-arrows>-->
    <!--                    <q-tab v-for="item in essentialLinks" :key="item.title" :icon="item.icon"-->
    <!--                           @click="changeRoute(item.link)" :label="item.title" :name="item.link"></q-tab>-->
    <!--                </q-tabs>-->

    <!--                &lt;!&ndash;搜索栏输入框&ndash;&gt;-->
    <!--                &lt;!&ndash;todo&ndash;&gt;-->
    <!--                <q-input dark standout v-model="queryText" input-class="text-right" class="q-ml-md">-->
    <!--                    <template #append>-->
    <!--                        <q-icon v-if="queryText === ''" name="search"></q-icon>-->
    <!--                        <q-icon v-else name="clear" class="cursor-pointer" @click="queryText = ''"></q-icon>-->
    <!--                    </template>-->
    <!--                </q-input>-->
    <!--            </div>-->
    <!--            &lt;!&ndash;右&ndash;&gt;-->
    <!--            <div class="migi md-hide xs-hide sm-hide">-->
    <!--                <popup-self></popup-self>-->
    <!--                &lt;!&ndash;创作中心&ndash;&gt;-->
    <!--                <q-tabs inline-label shrink>-->
    <!--                    <q-btn-dropdown label="创作中心" auto-close flat icon="edit" stretch>-->
    <!--                        <q-list>-->
    <!--                            <q-item clickable>-->
    <!--                                <q-item-section>-->
    <!--                                </q-item-section>-->
    <!--                            </q-item>-->

    <!--                            <q-item clickable>-->
    <!--                                <q-item-section>-->
    <!--                                </q-item-section>-->
    <!--                            </q-item>-->
    <!--                        </q-list>-->
    <!--                    </q-btn-dropdown>-->
    <!--                </q-tabs>-->

    <!--                &lt;!&ndash;设置按钮&ndash;&gt;-->
    <!--                <q-btn :color="$q.dark.isActive ? 'purple' : 'amber'"-->
    <!--                       :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'"-->
    <!--                       round @click="toggleMainTheme"></q-btn>-->
    <!--            </div>-->

    <!--菜单抽屉-->
    <q-drawer v-model="leftDrawerOpen" bordered>
        <q-card flat bordered>
            <q-card-section>
                <q-tabs v-model="$route.path" inline-label outside-arrows shrink vertical>
                    <q-tab v-for="item in essentialLinks" :key="item.title" :icon="item.icon" :label="item.title"
                           :name="item.link" @click="changeRoute(item.link)"></q-tab>
                </q-tabs>
            </q-card-section>
        </q-card>
    </q-drawer>

    <!--    设置抽屉-->
    <q-drawer
        side="right"
        v-model="rightDrawer"
        bordered
        overlay
    >
        <q-scroll-area class="fit">
            <setting-page></setting-page>
        </q-scroll-area>
    </q-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';
import PopupSelf from 'components/user/self/PopupSelf.vue';
import SettingPage from 'components/setting/ConfigSidebar.vue';

const linksList = [
    {
        title: '首页',
        caption: 'index',
        icon: 'home',
        link: '/',
    },
    // {
    //     title: '话题',
    //     caption: 'subject',
    //     icon: 'subject',
    //     link: '/talks',
    // },
];

export default defineComponent({
    // 使用组件
    components: {
        SettingPage,
        PopupSelf,
    },

    setup() {

        let quasar = useQuasar();
        return {
            quasar,
        };
    },

    data() {
        return {
            // 左侧边栏状态
            leftDrawerOpen: false,
            rightDrawer: false,

            // 菜单列表
            essentialLinks: linksList,

            // 查询内容
            queryText: '',

            path: '/',
        };
    },

    methods: {
        // 切换左侧边栏状态
        toggleLeftDrawer() {
            this.leftDrawerOpen = !this.leftDrawerOpen;
        },

        // 切换路径
        changeRoute(take: string) {
            this.$router.push(take);
        },

        setting() {
            this.rightDrawer = !this.rightDrawer;
        },
    },

});
</script>

<!--<style lang="scss" scoped>-->
<!--/*.header{-->
<!--    background-color: $grey-4-->
<!--}-->

<!--// 毛玻璃效果-->
<!--@supports (backdrop-filter: none){-->
<!--    .header{-->
<!--        background-color: rgba(0, 0, 0, .1);-->
<!--        backdrop-filter: blur(15px);-->
<!--    }-->

<!--}*/-->
<!--.header {-->
<!--    justify-content: space-between;-->
<!--    max-width: 1920px;-->
<!--    margin: auto;-->
<!--}-->

<!--.chuukann {-->
<!--    width: $torso-width;-->
<!--    justify-content: space-between;-->
<!--    // background-color: wheat; // 调试用-->
<!--}-->

<!--.migi,-->
<!--.hidari {-->
<!--    flex: 1;-->
<!--    max-width: $wings-width;-->
<!--    // background-color: aqua; // 调试用-->
<!--}-->

<!--.migi,-->
<!--.chuukann,-->
<!--.hidari {-->
<!--    display: flex;-->
<!--}-->

<!--.migi {-->
<!--    justify-content: end;-->
<!--}-->
<!--</style>-->

<style lang="sass" scoped>
// 毛玻璃效果
@supports (backdrop-filter: none)
    .header
        background-color: rgba(150, 150, 150, .3)
        backdrop-filter: blur(15px)

@supports not (backdrop-filter: none)
    .header
        background-color: $grey-4
</style>
