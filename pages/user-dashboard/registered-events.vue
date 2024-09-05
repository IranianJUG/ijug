<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">رویدادهای ثبت‌نام شده</h1>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <ul>
        <li v-for="event in events" :key="event.id" class="mb-4">
          <div class="p-4 border rounded-lg">
            <h2 class="text-xl font-bold text-indigo-600">{{ event.title }}</h2>
            <p class="text-gray-700">تاریخ: {{ event.date }}</p>
            <p class="text-gray-700">محل برگزاری: {{ event.location }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const events = ref([
  {
    id: 1,
    title: "رویداد شماره ۱",
    date: "2024-09-15",
    location: "تهران",
  },
  {
    id: 2,
    title: "رویداد شماره ۲",
    date: "2024-10-20",
    location: "مشهد",
  },
  {
    id: 3,
    title: "رویداد شماره ۳",
    date: "2024-11-25",
    location: "اصفهان",
  },
]);
</script>

<style scoped></style>

<!-- اعمال Layout -->
<script>
export default {
  layout: "user-dashboard",
};
</script>
