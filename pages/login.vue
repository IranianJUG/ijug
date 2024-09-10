<template>
  <div class="flex items-center justify-center min-h-100%">
    <div class="w-full max-w-sm p-8 bg-white shadow-md rounded-lg">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        {{ isOtpMode ? $t("login_one_time_password") : $t("login_login") }}
      </h2>
      <form v-if="!isOtpMode" @submit.prevent="login">
        <div class="mb-4">
          <label
            for="mobileNumber"
            class="block text-gray-700 text-sm font-medium mb-2"
            >{{ $t("login_mobile_number") }}</label
          >
          <input
            type="mobileNumber"
            id="mobileNumber"
            v-model="mobileNumber"
            required
            class="mobileNumberInput w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <Button
          :loading="loading"
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {{ $t("login_login") }}
        </Button>
      </form>

      <div v-if="isOtpMode">
        <span>{{ $t("login_enter_your_one_time_password") }}</span>
<!--        <input-->
<!--          type="number"-->
<!--          id="otpInput"-->
<!--          v-model="otpCode"-->
<!--          class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"-->
<!--        />-->

        <InputOtp v-model="otpCode" :length="6" style="gap: 0;direction:ltr">
          <template #default="{ attrs, events, index }">
            <input type="text" v-bind="attrs" v-on="events" class="custom-otp-input" />
            <div v-if="index === 3" class="px-4">
              <i class="pi pi-minus" />
            </div>
          </template>
        </InputOtp>
        <Button
          :loading="loading"
          @click="verifyOtp"
          class="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {{ $t("login_confirm_code") }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputOtp from 'primevue/inputotp';
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
        path: "/user-dashboard",
      });
    } else {
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

#otpInput {
  direction: ltr;
}

.mobileNumberInput {
  direction: ltr;
}

.custom-otp-input {
  width: 48px;
  height: 48px;
  font-size: 24px;
  appearance: none;
  text-align: center;
  transition: all 0.2s;
  border-radius: 0;
  border: 1px solid #cbd5e1;
  background: transparent;
  outline-offset: -2px;
  outline-color: transparent;
  border-right: 0 none;
  transition: outline-color 0.3s;
  color: #334155;
}

.custom-otp-input:focus {
  outline: 2px solid var(--p-focus-ring-color);
}

.custom-otp-input:first-child,
.custom-otp-input:nth-child(5) {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

.custom-otp-input:nth-child(3),
.custom-otp-input:last-child {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  border-right-width: 1px;
  border-right-style: solid;
  border-color: cbd5e1;
}
</style>
