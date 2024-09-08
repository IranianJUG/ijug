<script setup lang="ts">
import { ref, onMounted } from "vue";
import { jalaliCalendar } from "vue3-jalali-calendar";
import moment from "jalali-moment";

moment.locale("ir");

const events = ref([]);
// const blockedDates = ref([]);
const selectedEvent = ref(null);
const isModalVisible = ref(false);
const count = ref(1);
const router = useRouter();

const cookieName = "userInfo";
const myCookie = useCookie(cookieName);

const userInfo = myCookie.value;

const showEventModal = (event: any) => {
  selectedEvent.value = event;
  isModalVisible.value = true;
};

const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const handlePurchase = async () => {
  try {
    if (!!userInfo?.token) {
      const response = await $fetch(
        `https://api.awscloud.ir/api/smartis/event/${selectedEvent.value.id}/${count.value}`,
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

async function getAllEvents() {
  try {
    const response = await $fetch("https://api.awscloud.ir/api/event", {
      method: "GET",
    });

    if (response.success) {
      const allEvents = response.data.map((data: any) => {
        return {
          id: data.id,
          startDateTime: moment(data.event_time).locale("fa"),
          endDateTime: moment(data.event_time).add(3, "hours").locale("fa"),
          title: data.name,
          color: "#29B6F6",
          price: data.price,
          location: data.location_name,
        };
      });

      events.value = allEvents;
      // blockedDates.value = allEvents.map((event: any) =>
      //   event.startDateTime.format("YYYY-MM-DD")
      // );
    } else {
      alert("دریافت اطلاعات رویدادها ناموفق بود. لطفا دوباره تلاش کنید.");
    }
  } catch (error) {
    console.error("خطا در دریافت رویدادها:", error);
    alert("خطایی رخ داده است. لطفا دوباره تلاش کنید.");
  }
}

onMounted(() => {
  getAllEvents();
});
</script>

<template>
  <div>
    <!-- :disabledDates="blockedDates" -->
    <jalaliCalendar
      :eventsList="events"
      disablePastDays
      addEventButton
      @dayClick="showEventModal"
      @on-event-click="showEventModal"
    />

    <div v-if="isModalVisible" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close-icon" @click="isModalVisible = false">
          &times;
        </button>
        <h2 class="modal-title">{{ selectedEvent.title }}</h2>
        <p class="modal-detail">
          <strong>تاریخ:</strong>
          {{ selectedEvent.startDateTime.format("YYYY-MM-DD HH:mm") }}
        </p>

        <p class="modal-detail">
          <strong>مکان:</strong> {{ selectedEvent.location }}
        </p>

        <p class="modal-detail price">
          <strong>قیمت:</strong> {{ formatPrice(selectedEvent.price) }} ریال
        </p>

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
  </div>
</template>

<style scoped>
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
</style>
