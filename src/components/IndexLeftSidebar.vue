<template>
    <div class="q-gutter-lg">

        <q-card>

            <q-card-section>
                <q-icon name="whatshot"></q-icon>
                {{ $t("side.git_hot") }}
            </q-card-section>


            <div class="q-pa-md">
                <q-list separator>
                    <q-item>
                        <q-item-section>
                            <q-item-label>Single line item</q-item-label>
                            <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur
                                adipiscit elit.
                            </q-item-label>
                        </q-item-section>

                        <q-item-section side top>
                            <q-item-label caption>5 min ago</q-item-label>
                            <q-icon color="yellow" name="star"/>
                        </q-item-section>
                    </q-item>

                    <q-separator inset spaced/>

                    <q-item>
                        <q-item-section>
                            <q-item-label>Single line item</q-item-label>
                            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
                                elit.
                            </q-item-label>
                        </q-item-section>

                        <q-item-section side top>
                            <q-item-label caption>Voted!</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-separator inset spaced/>

                    <q-item>
                        <q-item-section>
                            <q-item-label>Single line item</q-item-label>
                            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
                                elit.
                            </q-item-label>
                        </q-item-section>

                        <q-item-section side top>
                            <q-badge color="teal" label="10k"/>
                        </q-item-section>
                    </q-item>

                    <q-separator inset spaced/>

                    <q-item>
                        <q-item-section>
                            <q-item-label>Single line item</q-item-label>
                            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
                                elit.
                            </q-item-label>
                        </q-item-section>

                        <q-item-section side top>
                            <q-item-label caption>2 min ago</q-item-label>
                            <div class="text-orange">
                                <q-icon name="star"/>
                                <q-icon name="star"/>
                                <q-icon name="star"/>
                            </div>
                        </q-item-section>
                    </q-item>

                    <q-separator inset spaced/>

                    <q-item>
                        <q-item-section>
                            <q-item-label>Single line item</q-item-label>
                            <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
                                elit.
                            </q-item-label>
                        </q-item-section>

                        <q-item-section side top>
                            <q-item-label caption>meta</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </q-card>

        <!--热门tag-->
        <q-card class="q-pa-md">
            <q-chip v-for="i in 75" :key="i">{{ i }}</q-chip>
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
