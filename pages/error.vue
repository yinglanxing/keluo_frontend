<template>
    <a-card style="max-width: 400px;margin: 24px auto">

        <a-space fill :direction="'vertical'">
            <a-typography-title>
                服务器出错了:
            </a-typography-title>

            <!--{{ error.detail }}-->
            <!--{{ props.status }}-->

            <a-result
                status="403"
                subtitle="Access to this resource on the server is denied."
            >
                <template #subtitle>

                    <a-alert type="error">
                        This is an error alert.
                    </a-alert>
                </template>
                <!--<template #extra>-->
                <!--    <a-space>-->
                <!--        <a-button type="primary">Back</a-button>-->
                <!--    </a-space>-->
                <!--</template>-->
            </a-result>

            <a-button :size="'large'" :type="'primary'" :status="'warning'" long @click="get_back">返回上一页</a-button>
        </a-space>

    </a-card>
</template>

<script lang="ts">
export default {
    setup() {
        const get_back = () => {
            useRouter().back()
        }

        return {
            get_back,
        }
    }
}

</script>
