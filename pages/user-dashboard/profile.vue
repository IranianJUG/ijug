<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">اطلاعات کاربر</h1>
    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="mb-4">
        <label class="block text-gray-700">نام کاربری:</label>
        <p class="text-gray-900">{{ user.username }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">ایمیل:</label>
        <p class="text-gray-900">{{ user.email }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">تلفن:</label>
        <p class="text-gray-900">{{ user.phone }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700">شرکت:</label>
        <p class="text-gray-900">{{ user.company }}</p>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700">جایگاه شغلی:</label>
        <p class="text-gray-900">{{ user.position }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const cookieName = "userInfo";
const myCookie = useCookie(cookieName);
const userInfo = myCookie["_rawValue"];

const user = ref({
  username: userInfo ? `${userInfo.first_name} ${userInfo.last_name}` : null,
  email: userInfo ? userInfo.email : null,
  phone: userInfo ? userInfo.mobile : null,
  company: userInfo ? userInfo.company_name : null,
  position: userInfo ? userInfo.position : null,
});
</script>

<style scoped></style>

<script>
export default {
  layout: "user-dashboard",
};
</script>
