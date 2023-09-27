<template>
    <a-card style="max-width: 400px;margin: 24px auto">

        <a-space fill :direction="'vertical'">
            <a-typography-title>
                {{ $t("error_page.title") }}
                <!--{{ props.status }}-->
            </a-typography-title>


            <a-result status="404">
                <template #default>
                    <!--{{ error.detail }}-->
                    <a-alert type="error">
                        发生错误了，请检查操作方式。
                    </a-alert>
                </template>
                <template #subtitle>
                    <!--{{ props.status }}-->
                </template>
                <template #extra>
                    <a-button :size="'large'" :type="'primary'" :status="'warning'" long @click="get_back">
                        {{ $t("btn.back") }}
                    </a-button>
                </template>
            </a-result>

        </a-space>

    </a-card>
</template>

<script lang="ts">
export default {
    setup() {
        const turn_back = () => {
            useRouter().back()
        }

        return {
            get_back: turn_back,
        }
    }
}

</script>
