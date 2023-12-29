<script setup lang="ts">
import { ref } from "vue";
import { jalaliCalendar } from "vue3-jalali-calendar";


import moment from "jalali-moment";

const showEventModal = (e: any) => (console.log(e), alert("جلسه انجمن  کاربران جاوا ایران ساعت 11 تا 13")); // or open an modal

moment.locale('ir');
const events = ref([{
  startDateTime: moment("2023-12-21T11:00:00"),
  endDateTime: moment("2023-12-21T13:00:00"),
  title: "جلسه انجمن  کاربران جاوا ایران",
  color: "#29B6F6",
}
]);

/*const vacations = ref([
  {
    date:moment("2023-12-1"),
    title: "روز طبیعت",

  },
]);*/
</script>

<template>
  <jalaliCalendar
      :eventsList="events"
      :vacationsList="vacations"
      disablePastDays
      addEventButton
      @dayClick="showEventModal"
      @on-event-click="showEventModal"
  />
</template>

<style scoped>

</style>