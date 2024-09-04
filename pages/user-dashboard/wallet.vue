<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">کیف پول</h1>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="mb-4">
        <label class="block text-gray-700">موجودی فعلی:</label>
        <p class="text-gray-900 text-2xl">{{ wallet.balance }} تومان</p>
      </div>
      <div>
        <h2 class="text-xl font-bold mb-2">تراکنش‌های اخیر:</h2>
        <ul>
          <li
            v-for="transaction in wallet.transactions"
            :key="transaction.id"
            class="mb-4"
          >
            <div class="p-4 border rounded-lg">
              <p class="text-gray-700">تاریخ: {{ transaction.date }}</p>
              <p
                :class="{
                  'text-green-600': transaction.type === 'واریز',
                  'text-red-600': transaction.type === 'برداشت',
                }"
              >
                نوع: {{ transaction.type }} - مبلغ:
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
import { ref } from "vue";

const wallet = ref({
  balance: 1500000,
  transactions: [
    { id: 1, date: "2024-09-10", type: "واریز", amount: 500000 },
    { id: 2, date: "2024-08-25", type: "برداشت", amount: 200000 },
    { id: 3, date: "2024-07-30", type: "واریز", amount: 700000 },
  ],
});
</script>

<style scoped></style>

<!-- اعمال Layout -->
<script>
export default {
  layout: "user-dashboard",
};
</script>
