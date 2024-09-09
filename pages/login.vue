<template>
  <div class="flex items-center justify-center min-h-100%">
    <div class="w-full max-w-sm p-8 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        {{ isOtpMode ? "رمز یکبار مصرف" : "ورود" }}
      </h2>
      <form v-if="!isOtpMode" @submit.prevent="login">
        <div class="mb-4">
          <label
            for="mobileNumber"
            class="block text-gray-700 text-sm font-medium mb-2"
            >شماره موبایل</label
          >
          <input
            type="mobileNumber"
            id="lName"
            v-model="mobileNumber"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <Button :loading="loading"
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          ورود
        </Button>
      </form>

      <div v-if="isOtpMode">
        <span>رمز یکبار مصرف خود را وارد نمایید</span>
        <input
          type="number"
          id="otpInput"
          v-model="otpCode"
          class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Button :loading="loading"
          @click="verifyOtp"
          class="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          تایید کد
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const cookieName = "userInfo";
const myCookie = useCookie(cookieName);
const isOtpMode = ref(false);
const mobileNumber = ref("");
const otpCode = ref("");
const loading = ref(false);
async function login() {
  try {
    loading.value = true;
    const login = await $fetch("https://api.awscloud.ir/api/auth/login", {
      method: "POST",
      body: {
        mobile: mobileNumber.value,
      },
    });
    loading.value = false;
    if (login.success) {
      isOtpMode.value = true;
    } else {
      alert("ورود ناموفق بود. لطفا دوباره تلاش کنید.");
    }
  } catch (error) {
    loading.value = false;
    console.error("خطا در ورود:", error);
    alert("خطایی رخ داده است. لطفا دوباره تلاش کنید.");
  }
}

async function verifyOtp() {
  try {
    loading.value = true;
    const response = await $fetch("https://api.awscloud.ir/api/auth/login", {
      method: "POST",
      body: {
        mobile: mobileNumber.value,
        otp: otpCode.value,
      },
    });
    loading.value = false;
    if (response.success) {
      myCookie.value = response.data;
      reloadNuxtApp({
  force: true,
  path: "/user-dashboard"
})
    }else {
      alert("ورود ناموفق بود. لطفا دوباره تلاش کنید.");
    }
  } catch (error) {
    loading.value = false;
    console.error("خطا در ورود:", error);
    alert("خطایی رخ داده است. لطفا دوباره تلاش کنید.");
  }
}
</script>

<style scoped>
.shadow-md {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.shadow-md-button {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>