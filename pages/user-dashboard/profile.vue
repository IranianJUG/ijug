<script setup>
import { ref } from "vue";
import "primeicons/primeicons.css";

import Avatar from "primevue/avatar";
import Badge from "primevue/badge";
import Button from "primevue/button";

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

<template>
  <div class="p-8 bg-gradient-to-r to-indigo-200 min-h-screen">
    <div class="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-2xl relative">
      <div class="text-center mb-6">
        <Avatar
          image="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
          size="xlarge"
          shape="circle"
          class="mx-auto mb-4"
        />
        <h1 class="text-3xl font-bold text-gray-900">{{ user.username }}</h1>
      </div>

      <div class="grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="flex items-center mb-4">
          <i class="pi pi-envelope text-blue-600 text-2xl m-4"></i>
          <div>
            <label class="block text-gray-500">{{ $t("profile_email") }}</label>
            <p class="text-xl text-gray-900 font-semibold">{{ user.email }}</p>
          </div>
        </div>

        <div class="flex items-center mb-4">
          <i class="pi pi-phone text-blue-600 text-2xl m-4"></i>
          <div>
            <label class="block text-gray-500">{{
              $t("profile_mobileNumber")
            }}</label>
            <p class="text-xl text-gray-900 font-semibold">{{ user.phone }}</p>
          </div>
        </div>

        <div class="flex items-center mb-4">
          <i class="pi pi-briefcase text-blue-600 text-2xl m-4"></i>
          <div>
            <label class="block text-gray-500">{{
              $t("profile_company")
            }}</label>
            <p class="text-xl text-gray-900 font-semibold">
              {{ user.company }}
            </p>
          </div>
        </div>

        <div class="flex items-center mb-4">
          <i class="pi pi-id-card text-blue-600 text-2xl m-4"></i>
          <div>
            <label class="block text-gray-500">{{
              $t("profile_position")
            }}</label>
            <p class="text-xl text-gray-900 font-semibold">
              {{ user.position }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1,
h2 {
  font-family: "IRANSans", sans-serif;
}
</style>

<script>
export default {
  layout: "user-dashboard",
};
</script>
