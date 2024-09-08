<template>
  <div class="flex items-center justify-center min-h-100%">
    <div class="w-full max-w-sm p-8 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        {{ isOtpMode ? "رمز یکبار مصرف" : "ثبت‌نام" }}
      </h2>

      <p
        v-if="!isOtpMode && showWarning"
        class="text-red-600 mb-4 text-center shadow p-2 rounded"
      >
        *شماره موبایل و کد ملی باید مطابقت داشته باشند.
      </p>

      <form v-if="!isOtpMode" @submit.prevent="register">
        <div class="mb-4 flex gap-4">
          <div class="w-1/2">
            <label
              for="fName"
              class="block text-gray-700 text-sm font-medium mb-2"
              >نام</label
            >
            <input
              type="text"
              id="fName"
              v-model="fName"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div class="w-1/2">
            <label
              for="lName"
              class="block text-gray-700 text-sm font-medium mb-2"
              >نام خانوادگی</label
            >
            <input
              type="text"
              id="lName"
              v-model="lName"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div class="mb-4 flex gap-4">
          <div class="w-1/2">
            <label
              for="nationalCode"
              class="block text-gray-700 text-sm font-medium mb-2"
              >کد ملی</label
            >
            <input
              type="text"
              id="nationalCode"
              v-model="nationalCode"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div class="w-1/2">
            <label
              for="mobileNumber"
              class="block text-gray-700 text-sm font-medium mb-2"
              >شماره موبایل</label
            >
            <input
              type="text"
              id="mobileNumber"
              v-model="mobileNumber"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div class="mb-4">
          <label
            for="email"
            class="block text-gray-700 text-sm font-medium mb-2"
            >ایمیل</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div class="mb-4 flex gap-4">
          <div class="w-1/2">
            <label
              for="position"
              class="block text-gray-700 text-sm font-medium mb-2"
              >جایگاه شغلی</label
            >
            <input
              type="text"
              id="position"
              v-model="position"
              class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div class="w-1/2">
            <label
              for="company"
              class="block text-gray-700 text-sm font-medium mb-2"
              >شرکت</label
            >
            <input
              type="text"
              id="company"
              v-model="company"
              class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          ثبت‌نام
        </button>
      </form>

      <div v-if="isOtpMode">
        <span>رمز یکبار مصرف خود را وارد نمایید</span>
        <input
          type="number"
          id="otpInput"
          v-model="otpCode"
          class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          @click="verifyOtp"
          class="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          تایید کد
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const cookieName = "userInfo";
const myCookie = useCookie(cookieName);
const isOtpMode = ref(false);
const fName = ref("");
const lName = ref("");
const mobileNumber = ref("");
const email = ref("");
const company = ref("");
const nationalCode = ref("");
const position = ref("");
const otpCode = ref("");

const showWarning = computed(() => {
  return true;
});

async function register() {
  try {
    const register = await $fetch("https://api.awscloud.ir/api/user", {
      method: "POST",
      body: {
        first_name: fName.value,
        last_name: lName.value,
        mobile: mobileNumber.value,
        email: email.value,
        national_code: nationalCode.value,
        position: position.value ?? position.value,
        company: company.value ?? company.value,
      },
    });

    if (register.success) {
      isOtpMode.value = true;
    } else {
      alert("اطلاعات وارد شده تکراری است.");
    }
  } catch (error) {
    console.error("خطا در ثبت نام:", error);
    alert("خطایی رخ داده است. لطفا دوباره تلاش کنید.");
  }
}

async function verifyOtp() {
  try {
    const response = await $fetch("https://api.awscloud.ir/api/auth/login", {
      method: "POST",
      body: {
        mobile: mobileNumber.value,
        otp: otpCode.value,
      },
    });

    if (response.success) {
      myCookie.value = response.data;
      reloadNuxtApp({
        force: true,
        path: "/user-dashboard",
      });
    } else {
      alert("ثبت نام ناموفق بود. لطفا دوباره تلاش کنید.");
    }
  } catch (error) {
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
