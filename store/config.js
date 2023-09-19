export const state = () => ({
    config: {},
})

export const mutations = {
    setConfig(state, config) {
        state.config = config
    },
}

export const actions = {
    // 加载配置
    async loadConfig(context) {
        const ret = await this.$axios.get('/api/config/configs')
        context.commit('setConfig', ret)
        return ret
    },
}

export const getters = {
    siteTitle(state) {
        return state.config.siteTitle || ''
    },
    siteDescription(state) {
        return state.config.siteDescription || ''
    },
    siteKeywords(state) {
        return state.config.siteKeywords || ''
    },
    isEnabledTweet(state) {
        for (let i = 0; i < state.config.modules.length; i++) {
            if (state.config.modules[i].module === 'tweet') {
                return state.config.modules[i].enabled
            }
        }
        return true
    },
    isEnabledTopic(state) {
        for (let i = 0; i < state.config.modules.length; i++) {
            if (state.config.modules[i].module === 'topic') {
                return state.config.modules[i].enabled
            }
        }
        return true
    },
    isEnabledArticle(state) {
        for (let i = 0; i < state.config.modules.length; i++) {
            if (state.config.modules[i].module === 'article') {
                return state.config.modules[i].enabled
            }
        }
        return true
    },
}
