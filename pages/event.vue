<script setup lang="ts">
import { ref } from "vue";
import { jalaliCalendar } from "vue3-jalali-calendar";
import moment from "jalali-moment";

const showEventModal = (e: any) => (
  console.log(e), alert("جلسه انجمن کاربران جاوا ایران ساعت 11 تا 13")
);

moment.locale("ir");

const events = ref([
  {
    startDateTime: moment("2023-12-21T11:00:00"),
    endDateTime: moment("2023-12-21T13:00:00"),
    title: "جلسه انجمن کاربران جاوا ایران",
    color: "#29B6F6",
  },
  {
    startDateTime: moment("2024-08-15T10:00:00"),
    endDateTime: moment("2024-08-15T13:00:00"),
    title: "جلسه انجمن کاربران جاوا ایران",
    color: "#3cb01b",
  },
  {
    startDateTime: moment("2024-09-12T10:00:00"),
    endDateTime: moment("2024-09-12T13:00:00"),
    title: "جشن روز برنامه نویس",
    color: "#84031d",
  },
]);
</script>

<template>
  <jalaliCalendar
    :eventsList="events"
    disablePastDays
    addEventButton
    @dayClick="showEventModal"
    @on-event-click="showEventModal"
  />
  <ScrollToTop />
</template>

<style scoped></style>
