<template>
    <!--页首顶栏-->
    <q-header bordered reveal>
        <q-toolbar class="header">
            <!--左-->
            <div class="hidari">
                <q-btn aria-label="menu" class="lg-hide xl-hide" flat icon="menu" round @click="toggleLeftDrawer" />
                <q-avatar class="xs-hide sm-hide md-hide">
                    <img alt="ico" src="/favicon.ico">
                </q-avatar>
            </div>
            <!--中-->
            <div class="chuukann md-hide xs-hide sm-hide">
                <q-tabs v-model="$route.path" inline-label shrink outside-arrows>
                    <q-tab v-for="item in essentialLinks" :key="item.title" :icon="item.icon"
                        @click="changeRoute(item.link)" :label="item.title" :name="item.link"></q-tab>
                </q-tabs>

                <!--搜索栏输入框-->
                <!--todo-->
                <q-input dark standout v-model="queryText" input-class="text-right" class="q-ml-md">
                    <template #append>
                        <q-icon v-if="queryText === ''" name="search"></q-icon>
                        <q-icon v-else name="clear" class="cursor-pointer" @click="queryText = ''"></q-icon>
                    </template>
                </q-input>
            </div>
            <!--右-->
            <div class="migi md-hide xs-hide sm-hide">
                <popup-self></popup-self><!--创作中心-->
                <q-tabs inline-label shrink>
                    <q-btn-dropdown :label="$t('menu.edit_space')" auto-close flat icon="edit" stretch>
                        <q-list>
                            <q-item clickable>
                                <q-item-section>
                                </q-item-section>
                            </q-item>

                            <q-item clickable>
                                <q-item-section>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-btn-dropdown>
                </q-tabs>


                <!--搜索栏输入框-->
                <!--todo-->
                <!--<q-input dark standout v-model="queryText" input-class="text-right" class="q-ml-md">-->
                <!--    <template v-slot:append>-->
                <!--        <q-icon v-if="queryText === ''" name="search"></q-icon>-->
                <!--        <q-icon v-else name="clear" class="cursor-pointer" @click="queryText = ''"></q-icon>-->
                <!--    </template>-->
                <!--</q-input>-->

                <!--设置按钮-->
                <q-btn :color="$q.dark.isActive ? 'purple' : 'amber'" :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'"
                    round @click="toggleMainTheme"></q-btn>
            </div>
        </q-toolbar>
    </q-header>

    <!--菜单抽屉-->
    <q-drawer v-model="leftDrawerOpen" bordered>
        <!--宽度如果足够，直接展开-->
        <!--show-if-above-->
        <q-card flat>
            <q-card-actions class="q-pa-lg">
                <q-btn color="grey-9" icon="settings" round @click="toggleMainTheme"></q-btn>

            </q-card-actions>

            <q-card-section>
                <q-tabs v-model="$route.path" inline-label outside-arrows shrink vertical>
                    <q-tab v-for="item in essentialLinks" :key="item.title" :icon="item.icon" :label="item.title"
                        :name="item.link" @click="changeRoute(item.link)"></q-tab>
                </q-tabs>
            </q-card-section>
        </q-card>
    </q-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// 状态
import { useQuasar } from 'quasar';
// 组件使用
import PopupSelf from 'components/PopupSelf.vue';

const linksList = [
    {
        title: '首页',
        caption: 'index',
        icon: 'home',
        link: '/',
    },
    {
        title: '话题',
        caption: 'subject',
        icon: 'subject',
        link: '/talks',
    },
    {
        title: '文章',
        caption: 'article',
        icon: 'article',
        link: '/article',
    },
    {
        title: '问答',
        icon: 'question_answer',
        caption: 'article',
        link: '/qa',
    },
    {
        title: '硬件商城',
        caption: 'hardware store',
        icon: 'memory',
        link: '/hardware',
    },
    {
        title: '文档',
        caption: 'document',
        icon: 'description',
        link: '/docs',
    },
];

export default defineComponent({
    // 组件名称
    name: 'HeaderVue',

    // 使用组件
    components: {
        PopupSelf,
    },

    setup() {
        // 状态管理
        let quasar = useQuasar();
        return {
            quasar,
        };
    },

    data() {
        return {
            // 左侧边栏状态
            leftDrawerOpen: false,

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

        // 切换主题颜色
        toggleMainTheme() {
            this.quasar.dark.toggle();
            const theme: 'dark' | 'light' = (['light', 'dark'] as const)[+this.quasar.dark.isActive];
            document.documentElement.dataset.theme = theme;
        },

        // 切换路径
        changeRoute(take: string) {
            this.$router.push(take);
        },
    },

});
</script>

<style lang="scss" scoped>
/*.header{
    background-color: $grey-4
}

// 毛玻璃效果
@supports (backdrop-filter: none){
    .header{
        background-color: rgba(0, 0, 0, .1);
        backdrop-filter: blur(15px);
    }
        
}*/
.header {
    justify-content: space-between;
    margin: auto;

    @media screen and (min-width: 1440px) {
        max-width: 1440px;
    }
    @media screen and (min-width: 1920px) {
        max-width: 1920px;
    }
}

.chuukann {
    width: $torso-width;
    justify-content: space-between;
    // background-color: wheat; // 调试用
}

.migi,
.hidari {
    flex: 1;
    max-width: $wings-width;
    // background-color: aqua; // 调试用
}

.migi,
.chuukann,
.hidari {
    display: flex;
}

.migi {
    justify-content: end;
}
</style>
