<template>
    <!--设置-->

<!--    <q-card flat bordered>-->
        <!--  国际化-->
        <q-card-section>
            <div class="text-h4">language</div>
            <div class="text-subtitle2">language_detail</div>
            <q-select
                outlined
                :options="language_list"
                v-model="state.lang"
            >
                <template #prepend>
                    <q-icon name="language"></q-icon>
                </template>
            </q-select>
        </q-card-section>

        <!--  分割线-->
        <q-separator inset />
        <!--  颜色主题-->
        <q-card-section>
            <div class="text-h4">theme</div>
            <div class="text-subtitle2">theme_detail</div>
            <q-list>
                <!--          亮色-->
                <q-item tag="label" v-ripple>
                    <q-item-section avatar>
                        <q-radio v-model="state.theme" val="light" color="orange" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>light</q-item-label>
                    </q-item-section>
                </q-item>

                <!--          暗色-->
                <q-item tag="label" v-ripple>
                    <q-item-section avatar>
                        <q-radio v-model="state.theme" val="dark" color="black" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>dark</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-card-section>
<!--  </q-card>-->
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import {useState} from 'stores/useState';
import {useQuasar} from 'quasar';


export default defineComponent({
    setup() {
        const language_list = [
            'zh-CN',
            'en-US',
        ]
        let state = useState();
        let quasar = useQuasar()
        return {
            state,
            quasar,
            language_list,
        };
    },

    methods:{
    },

    watch:{
        // 切换主题颜色
        'state.theme'(){
            this.quasar.dark.set(this.state.theme=='dark');
        },
        // 切换语言
        'state.lang'(){
            this.$i18n.locale = this.state.lang
        },
    },
});
</script>
