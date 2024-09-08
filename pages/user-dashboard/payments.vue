<template>
  <div>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div>
        <h2 class="text-xl font-bold mb-2">تراکنش‌های اخیر:</h2>
        <ul>
          <li
            v-for="transaction in payments"
            :key="transaction.id"
            class="mb-4"
          >
            <div class="p-4 border rounded-lg">
              <p class="text-gray-700">تاریخ: {{ transaction.createdAt }}</p>
              <p
                :class="{
                  'text-orange-600': transaction.status === 0,
                  'text-green-600': transaction.status === 1,
                  'text-red-600': transaction.status === 2,
                }"
              >
                نوع: واریز - مبلغ:
                {{ transaction.amount }} تومان
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import moment from "jalali-moment";

moment.locale("ir");

const cookieName = "userInfo";
const myCookie = useCookie(cookieName);
const userInfo = myCookie.value;

const payments = ref([]);

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

async function getAllPayments() {
  try {
    const response = await $fetch("https://api.awscloud.ir/api/payment", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    if (response.success) {
      const allPayments = response.data.map((data) => {
        return {
          id: data.id,
          createdAt: moment(data.created_at)
            .locale("fa")
            .format("YYYY/MM/DD HH:mm"),
          amount: formatPrice(data.amount),
          status: data.status,
          count: data.count,
        };
      });

      payments.value = allPayments;
    } else {
      alert("دریافت اطلاعات پرداخت ها ناموفق بود. لطفا دوباره تلاش کنید.");
    }
  } catch (error) {
    console.error("خطا در دریافت پرداخت ها:", error);
    alert("خطایی رخ داده است. لطفا دوباره تلاش کنید.");
  }
}

onMounted(() => {
  getAllPayments();
});
</script>

<style scoped></style>

<script>
export default {
  layout: "user-dashboard",
};
</script>
