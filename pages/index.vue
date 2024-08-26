<script setup lang="ts">
import { ref } from "vue";
import { EventStatus } from "~/interfaces/EventStatus";

const events = ref([
  {
    title: "جشن روز برنامه نویس",
    date: "پنج‌شنبه 25 مرداد ۱۴۰۳ ساعت ۱۰:۰۰",
    icon: "pi pi-spin pi-cog",
    color: "#84031d",
    image: "https://miro.medium.com/v2/resize:fit:640/0*cLBaON1rB2fRsj8w.jpg",
    description: "جشن روز برنامه نویس",
  },
  {
    title: "جلسه پانزدهم تهران جاگ",
    date: "پنج‌شنبه 25 مرداد ۱۴۰۳ ساعت ۱۰:۰۰",
    icon: "pi pi-check-circle",
    color: "#3cb01b",
    image:
      "https://media.licdn.com/dms/image/v2/D4D22AQH31MC6XQSpyg/feedshare-shrink_800/feedshare-shrink_800/0/1723631246854?e=2147483647&v=beta&t=K_Xv1Ez8kqWIAsglnyLi3SaeniYt4eKzXvLk1g9-Isk",
    description: "کارگاه DDD",
  },
  {
    title: "جلسه چهاردهم تهران جاگ",
    date: "پنج‌شنبه ۲۱ تیر ۱۴۰۳ ساعت ۱۰:۰۰",
    icon: "pi pi-check-circle",
    color: "#3cb01b",
    image:
      "https://raw.githubusercontent.com/TehJUG/assets/main/poster/session-014/14.jpg",
    description: "",
  },
  {
    title: "جلسه سیزدهم تهران جاگ",
    date: "پنج‌شنبه ۲۴ خرداد ۱۴۰۳ ساعت ۱۴:۳۰",
    icon: "pi pi-check-circle",
    color: "#3cb01b",
    image:
      "https://raw.githubusercontent.com/TehJUG/assets/main/poster/session-013/13.jpg",
    description: "",
  },
  {
    title: "جلسه دوازدهم تهران جاگ",
    date: "پنج‌شنبه ۶ اردیبهشت ۱۴۰۳ ساعت ۱۰:۰۰",
    icon: "pi pi-check-circle",
    color: "#3cb01b",
    image:
      "https://raw.githubusercontent.com/TehJUG/assets/main/poster/session-012/12.jpg",
    description: "",
  },
  {
    title: "جلسه یازدهم تهران‌جاگ روز مهندس",
    date: "پنج‌شنبه ۳ اسفند ۱۴۰۲ ساعت ۱۱:۰۰",
    icon: "pi pi-check-circle",
    color: "#3cb01b",
    image:
      "https://raw.githubusercontent.com/TehJUG/assets/main/poster/session-011/11.jpg",
    description: "آشنایی با Microprofile",
  },
  {
    title: "25 سالگی JCP",
    date: "پنج‌شنبه ۵ بهمن ۱۴۰۲ ساعت ۱۱:۰۰",
    icon: "pi pi-check-circle",
    color: "#3cb01b",
    image:
      "https://evand.com/_next/image?url=https%3A%2F%2Fstatic.evand.net%2Fimages%2Fevents%2Fcovers%2Foriginal%2F1ab11f591086e8c8c277352025a4fbcd.jpg&w=1920&q=100",
    description: "جشن 25 سالگی JCP (Java Community Process)",
  },
]);

function setIcon(eventStatus: EventStatus): string {
  if (eventStatus == EventStatus.done) {
    return "pi pi-check-circle";
  } else if (eventStatus == EventStatus.progress) {
    return "pi pi-spin pi-spinner";
  } else if (eventStatus == EventStatus.preparation) {
    return "pi pi-spin pi-cog";
  }
  return "pi pi-spin pi-ban";
}
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <div class="home-page text-center mb-8">
      <img
        src="/images/IranDuke-resize.png"
        alt="Duke of Java"
        class="img-fluid mx-auto mb-4"
      />
      <h1 class="text-4xl font-bold mb-4">{{ $t("home_header") }}</h1>
      <p class="text-xl text-gray-600">به جامعه جاوا ایران خوش آمدید!</p>
    </div>

    <Divider />

    <Timeline :value="events" align="alternate" class="customized-timeline">
      <template #marker="slotProps">
        <span
          class="flex w-12 h-12 items-center justify-center text-white rounded-full z-10 shadow-lg"
          :style="{ backgroundColor: slotProps.item.color }"
        >
          <i :class="slotProps.item.icon" class="text-lg"></i>
        </span>
      </template>

      <template #content="slotProps">
        <Card class="mt-6 shadow-lg">
          <template #title>
            <h3 class="text-2xl font-semibold">{{ slotProps.item.title }}</h3>
          </template>

          <template #subtitle>
            <p class="text-gray-500">{{ slotProps.item.date }}</p>
          </template>

          <template #content>
            <img
              v-if="slotProps.item.image"
              :src="`${slotProps.item.image}`"
              :alt="slotProps.item.name"
              class="w-full h-auto mt-4 mb-4 rounded-md shadow-md"
            />
            <p class="text-gray-700">
              {{ slotProps.item.description }}
            </p>
          </template>
        </Card>
      </template>
    </Timeline>

    <ScrollToTop />
  </div>
</template>

<style scoped>
.home-page img {
  max-width: 400px;
  border-radius: 8px;
}

.customized-timeline .p-timeline-event-opposite {
  display: none;
}

.customized-timeline .p-timeline-event-content {
  width: calc(100% - 3rem);
}

.customized-timeline .p-timeline-event-marker {
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 768px) {
  .customized-timeline {
    padding: 0;
  }

  .customized-timeline .p-timeline-event {
    flex-direction: column;
    align-items: center;
  }

  .customized-timeline .p-timeline-event-content {
    width: 100%;
    text-align: center;
  }
}
</style>
