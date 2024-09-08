<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">بلیط ها</h1>
    <div class="bg-white p-6 rounded-lg shadow-md" v-if="tickets">
      <ul>
        <li v-for="ticket in tickets" :key="event.id" class="mb-4">
          <div class="p-4 border rounded-lg">
            <h2 class="text-xl font-bold text-indigo-600">{{ ticket.name }}</h2>
            <p class="text-gray-700">تاریخ: {{ ticket.event_time }}</p>
            <p class="text-gray-700">
              محل برگزاری: {{ ticket.location_address }}
            </p>
          </div>
        </li>
      </ul>
    </div>
    <p v-else>در حال بارگذاری...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import moment from "jalali-moment";

moment.locale("ir");

const cookieName = "userInfo";
const myCookie = useCookie(cookieName);
const userInfo = myCookie.value;

const tickets = ref([]);

// const formatPrice = (price) => {
//   return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// };

async function getAllTickets() {
  try {
    const response = await $fetch("http://api.awscloud.ir/api/ticket", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    if (response.success) {
      const allTickets = response.data.map((data) => {
        return {
          id: data.id,
          createdAt: moment(data.created_at).format("YYYY/MM/DD HH:mm"),
          status: data.status,
          count: data.count,
        };
      });

      tickets.value = allTickets;
    } else {
      alert("دریافت اطلاعات بلیط ها ناموفق بود. لطفا دوباره تلاش کنید.");
    }
  } catch (error) {
    console.error("خطا در دریافت بلیط ها:", error);
    alert("خطایی رخ داده است. لطفا دوباره تلاش کنید.");
  }
}

onMounted(() => {
  getAllTickets();
});
</script>

<style scoped></style>

<script>
export default {
  layout: "user-dashboard",
};
</script>
