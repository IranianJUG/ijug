<script setup lang="ts">
import { ref } from "vue";
import {EventStatus} from "~/interfaces/EventStatus";

const events = ref([
  { title: 'جشن روز برنامه نویس', date: 'پنج‌شنبه 25 مرداد ۱۴۰۳ ساعت ۱۰:۰۰', icon: 'pi pi-spin pi-cog', color: '#84031d',image: '',description: "" },
  { title: 'جلسه پانزدهم تهران جاگ', date: 'پنج‌شنبه 25 مرداد ۱۴۰۳ ساعت ۱۰:۰۰', icon: 'pi pi-check-circle', color: '#3cb01b',image: '',description: "" },
  { title: 'جلسه چهاردهم تهران جاگ', date: 'پنج‌شنبه ۲۱ تیر ۱۴۰۳ ساعت ۱۰:۰۰', icon: 'pi pi-check-circle', color: '#3cb01b',image: 'https://raw.githubusercontent.com/TehJUG/assets/main/poster/session-014/14.jpg',description: "" },
  { title: 'جلسه سیزدهم تهران جاگ', date: 'پنج‌شنبه ۲۴ خرداد ۱۴۰۳ ساعت ۱۴:۳۰', icon: 'pi pi-check-circle', color: '#3cb01b',image: 'https://raw.githubusercontent.com/TehJUG/assets/main/poster/session-013/13.jpg',description: "" },
  { title: 'جلسه دوازدهم تهران جاگ', date: 'پنج‌شنبه ۶ اردیبهشت ۱۴۰۳ ساعت ۱۰:۰۰', icon: 'pi pi-check-circle', color: '#3cb01b',image: 'https://raw.githubusercontent.com/TehJUG/assets/main/poster/session-012/12.jpg',description: "" },
  { title: 'جلسه یازدهم تهران‌جاگ روز مهندس', date: 'پنج‌شنبه ۳ اسفند ۱۴۰۲ ساعت ۱۱:۰۰', icon: 'pi pi-check-circle', color: '#3cb01b' , image: 'https://raw.githubusercontent.com/TehJUG/assets/main/poster/session-011/11.jpg',description: "آشنایی با Microprofile" },
  { title: '25 سالگی JCP', date: 'پنج‌شنبه ۵ بهمن ۱۴۰۲ ساعت ۱۱:۰۰', icon: 'pi pi-check-circle', color: '#3cb01b', image: 'https://evand.com/_next/image?url=https%3A%2F%2Fstatic.evand.net%2Fimages%2Fevents%2Fcovers%2Foriginal%2F1ab11f591086e8c8c277352025a4fbcd.jpg&w=1920&q=100',description: "جشن 25 سالگی JCP (Java Community Process)" },





]);
function  setIcon(eventStatus : EventStatus) : string {
  if (eventStatus == EventStatus.done) {
    return "pi pi-check-circle";
  } else if (eventStatus == EventStatus.progress){
    return "pi pi-spin pi-spinner"
  } else if (eventStatus == EventStatus.preparation){
    return "pi pi-spin pi-cog"
  }
  return "pi pi-spin pi-ban"
}

</script>

<template>

    <div class="flex justify-center items-center">
      <div class="home-page text-center">
        <!-- Your content goes here -->
        <img src="/images/IranDuke-resize.png" alt="Duke of Java" class="img-fluid" />

        <h1>{{$t("home_header")}}</h1>
      </div>
    </div>
  <Divider/>
  <Timeline :value="events" align="alternate" class="customized-timeline">
    <template #marker="slotProps">
        <span class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm" :style="{ backgroundColor: slotProps.item.color }">
            <i :class="slotProps.item.icon"></i>
        </span>
    </template>
    <template #content="slotProps">
      <Card class="mt-4">
        <template #title>
          {{ slotProps.item.title }}
        </template>
        <template #subtitle>
          {{ slotProps.item.date }}
        </template>
        <template #content>
          <img v-if="slotProps.item.image" :src="`${slotProps.item.image}`" :alt="slotProps.item.name" width="200" class="shadow-sm" />
          <p>
            {{ slotProps.item.description }}
          </p>
        </template>
      </Card>
    </template>
  </Timeline>



</template>
<style scoped>


</style>