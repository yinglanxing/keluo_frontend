<template>
    <!-- 签到组件 -->
    <q-date v-model:model-value="date_value" :events="events" :title="date_value" class="full-width" event-color="info">
        <q-btn class="full-width">
            {{ $t('checkin') }}
        </q-btn>
    </q-date>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { date } from 'quasar';

export default defineComponent({
    data() {
        return {
            // 日期
            date_value: date.formatDate(Date.now(), 'YYYY/MM/DD'),
            // 事件日期
            events: [
                date.formatDate(date.addToDate(Date.now(), { days: -1 }), 'YYYY/MM/DD'),
                date.formatDate(date.addToDate(Date.now(), { days: -2 }), 'YYYY/MM/DD'),
                date.formatDate(date.addToDate(Date.now(), { days: -3 }), 'YYYY/MM/DD'),
            ],
        };
    },
});
</script>
