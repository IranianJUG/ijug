<script setup lang="ts">
import { ref } from "vue";
import { EventStatus } from "~/interfaces/EventStatus";

const isModalVisible = ref(false);
const cookieName = "userInfo";
const myCookie = useCookie(cookieName);

const userInfo = myCookie.value;
const events = ref([
  {
    title: "home_programmer_day_celebration",
    date: "چهارشنبه 21 شهریور ۱۴۰۳ ساعت ۱6:۰۰",
    icon: "pi pi-spin pi-cog",
    color: "#84031d",
    image: "https://miro.medium.com/v2/resize:fit:640/0*cLBaON1rB2fRsj8w.jpg",
    description: "home_programmer_day_celebration",
    clickable: true,
  },
  {
    title: "home_15th_session_of_tehran_jug",
    date: "پنج‌شنبه 25 مرداد ۱۴۰۳ ساعت ۱۰:۰۰",
    icon: "pi pi-check-circle",
    color: "#3cb01b",
    image:
      "https://media.licdn.com/dms/image/v2/D4D22AQH31MC6XQSpyg/feedshare-shrink_800/feedshare-shrink_800/0/1723631246854?e=2147483647&v=beta&t=K_Xv1Ez8kqWIAsglnyLi3SaeniYt4eKzXvLk1g9-Isk",
    description: "home_ddd_workshop",
    clickable: false,
  },
  {
    title: "home_fourteenth_meeting_of_tehran_jug",
    date: "پنج‌شنبه ۲۱ تیر ۱۴۰۳ ساعت ۱۰:۰۰",
    icon: "pi pi-check-circle",
    color: "#3cb01b",
    image:
      "https://raw.githubusercontent.com/TehJUG/assets/main/poster/session-014/14.jpg",
    description: "",
    clickable: false,
  },
  {
    title: "home_thirteenth_meeting_of_tehran_jug",
    date: "پنج‌شنبه ۲۴ خرداد ۱۴۰۳ ساعت ۱۴:۳۰",
    icon: "pi pi-check-circle",
    color: "#3cb01b",
    image:
      "https://raw.githubusercontent.com/TehJUG/assets/main/poster/session-013/13.jpg",
    description: "",
    clickable: false,
  },
  {
    title: "home_twelfth_meeting_of_tehran_jug",
    date: "پنج‌شنبه ۶ اردیبهشت ۱۴۰۳ ساعت ۱۰:۰۰",
    icon: "pi pi-check-circle",
    color: "#3cb01b",
    image:
      "https://raw.githubusercontent.com/TehJUG/assets/main/poster/session-012/12.jpg",
    description: "",
    clickable: false,
  },
  {
    title: "home_11th_session_of_tehran_jug_on_engineer_day",
    date: "پنج‌شنبه ۳ اسفند ۱۴۰۲ ساعت ۱۱:۰۰",
    icon: "pi pi-check-circle",
    color: "#3cb01b",
    image:
      "https://raw.githubusercontent.com/TehJUG/assets/main/poster/session-011/11.jpg",
    description: "home_introduction_to_microprofile",
    clickable: false,
  },
  {
    title: "home_25th_anniversary_of_jcp",
    date: "پنج‌شنبه ۵ بهمن ۱۴۰۲ ساعت ۱۱:۰۰",
    icon: "pi pi-check-circle",
    color: "#3cb01b",
    image:
      "https://evand.com/_next/image?url=https%3A%2F%2Fstatic.evand.net%2Fimages%2Fevents%2Fcovers%2Foriginal%2F1ab11f591086e8c8c277352025a4fbcd.jpg&w=1920&q=100",
    description: "home_celebrating_25_years_of_jcp_java_community_process",
    clickable: false,
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

const handlePurchase = async () => {
  try {
    if (!!userInfo?.token) {
      const response = await $fetch(
        `https://api.awscloud.ir/api/smartis/event/11/1`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      if (response.success) {
        isModalVisible.value = false;
        window.location.replace(
          "https://wallet.smartispay.app/" + response.data.payment_id
        );
        // await router.push("/payment-success");
      } else {
        alert("خرید ناموفق بود. لطفا دوباره تلاش کنید.");
      }
    } else {
      alert("برای خرید بلیط رویداد ابتدا ثبت نام نمایید.");
    }
  } catch (error) {
    console.error("خطا در انجام خرید:", error);
  }
};
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
      <p class="text-xl text-gray-600">
        {{ $t("home_welcome_to_iran_java_community") }}
      </p>
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
        <Card
          class="mt-6 shadow-lg"
          :class="{ 'cursor-pointer': slotProps.item.clickable }"
          @click="slotProps.item.clickable ? (isModalVisible = true) : null"
        >
          <template #title>
            <h3 class="text-2xl font-semibold">
              {{ $t(slotProps.item.title) }}
            </h3>
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
              {{ $t(slotProps.item.description) }}
            </p>
          </template>
        </Card>
      </template>
    </Timeline>

    <ScrollToTop />
  </div>

  <div v-if="isModalVisible" class="modal-overlay">
    <div class="modal-content">
      <button class="modal-close-icon" @click="isModalVisible = false">
        &times;
      </button>
      <h2 class="modal-title">همایش بزرگ برنامه نویسی</h2>
      <p class="modal-detail">
        <strong>تاریخ:</strong>
        1403/06/21 16:00
      </p>

      <p class="modal-detail">
        <strong>مکان:</strong> پژوهشگاه دانش های بنیادی (IPM)
      </p>

      <p class="modal-detail price"><strong>قیمت:</strong> 100,000 تومان</p>

      <div class="modal-actions">
        <button class="modal-purchase" @click="handlePurchase">خرید</button>
        <button
          class="modal-close btn-outline-secondary"
          @click="isModalVisible = false"
        >
          بستن
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
@import url("https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700&display=swap");

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  position: relative;
  background-color: #fff;
  padding: 30px;
  border-radius: 12px;
  max-width: 450px;
  width: 100%;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  font-family: "Vazirmatn", sans-serif;
  text-align: center;
}

.modal-title {
  font-size: 26px;
  margin-bottom: 20px;
  color: #333;
  font-weight: 700;
}

.modal-detail {
  margin-bottom: 15px;
  font-size: 16px;
  color: #555;
}

.price {
  font-size: 18px;
  color: #d32f2f;
  font-weight: 500;
}

.modal-close-icon {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  color: #333;
  cursor: pointer;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.modal-close {
  padding: 12px 24px;
  background-color: transparent;
  color: #6c757d;
  border: 2px solid #6c757d;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.modal-purchase {
  padding: 12px 24px;
  background-color: #29b6f6;
  color: white;
  border: 2px solid #43a047;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.modal-purchase {
  background-color: #43a047;
  font-weight: 500;
}

.modal-close:hover {
  background-color: #6c757d; /* پس‌زمینه پر رنگ برای hover */
  color: white; /* تغییر رنگ متن به سفید در حالت hover */
}

.modal-purchase:hover {
  background-color: #1e88e5;
}

.modal-purchase:hover {
  background-color: #388e3c;
}
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
