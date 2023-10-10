<template>
    <!--评论单例-->
    <q-card flat class="full-width">
        <!--头像-->
        <q-card-section horizontal>
            <q-avatar>
                <q-icon name="person"></q-icon>
            </q-avatar>
            <!--侧边信息-->
            <q-card-section>
                <!--用户名称-->
                <q-item-label>
                    {{ comment.user.nickname }}
                </q-item-label>
                <!--发布时间-->
                <q-item-label caption>
                    {{ date.formatDate(comment.createTime, 'YYYY-MM-DD | HH:mm:ss') }}
                </q-item-label>
            </q-card-section>
        </q-card-section>
        <!--评论内容，不限制长度-->
        <q-card-section>
            {{ comment.content }}
        </q-card-section>

        <!--追加回复目标-->
        <q-card-section v-if="comment?.quoteId">
            <div class="format">
                <q-icon name="format_quote"></q-icon>
                {{ comment.quote.content }}
            </div>
        </q-card-section>
        <!--底部按钮-->
        <q-card-actions>
            <!--赞-->
            <q-btn round size="sm" icon="thumb_up"></q-btn>
            <!--回复-->
            <q-btn round size="sm" icon="comment"></q-btn>
        </q-card-actions>
    </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { date } from 'quasar';
// 状态
import { useUser } from 'stores/useUser';
// 模型
import { CommentInfo } from 'stores/schemas/comment';

export default defineComponent({
    name: 'CommentsItemVue',

    props: {
        // 评论内容
        comment: {} as PropType<CommentInfo>,
    },

    setup() {
        // 自身状态
        const self = useUser();
        return {
            self,
            // 时间 api
            date,
        };
    },
});
</script>

<style lang="sass">
// 引用块
.format
    border-bottom-right-radius: 9px
    border-bottom: 3px solid skyblue
</style>
