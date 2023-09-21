// 暂未仔细学习了解，无法提供注释。

// https://github.com/H69220818/Nuxt3-NaiveUi-pinia/blob/main/plugins/naive-ui.ts

// 很奇怪，加上这段代码之后500页面报错消失了。
// 明明这依托ide都爆红了，可就是很神奇。
// 他居然可以跑。。。。算了，就这样吧。
// 能跑就不动了喵~
import {setup} from "@css-render/vue3-ssr";

import { defineNuxtPlugin } from '#app';


export default defineNuxtPlugin((nuxtApp) => {
    if (process.server) {
        const {collect} = setup(nuxtApp.vueApp);
        const originalRenderMeta = nuxtApp.ssrContext?.renderMeta;
        nuxtApp.ssrContext = nuxtApp.ssrContext || {};
        nuxtApp.ssrContext.renderMeta = () => {
            if (!originalRenderMeta) {
                return {
                    headTags: collect()
                };
            }
            const originalMeta = originalRenderMeta();
            if ("then" in originalMeta) {
                return originalMeta.then((resolvedOriginalMeta) => {
                    return {
                        ...resolvedOriginalMeta,
                        headTags: resolvedOriginalMeta["headTags"] + collect()
                    };
                });
            } else {
                return {
                    ...originalMeta,
                    headTags: originalMeta["headTags"] + collect()
                };
            }
        };
    }
});
