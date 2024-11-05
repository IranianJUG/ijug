<template>
  <div class="flex items-center justify-center px-4 sm:px-0">
    <div
      class="w-full max-w-xs sm:max-w-sm p-6 sm:p-8 bg-white shadow-md rounded-lg"
    >
      <h2
        class="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-800"
      >
        {{
          isOtpMode ? $t("register_one_time_password") : $t("register_register")
        }}
      </h2>

      <p
        v-if="!isOtpMode && showWarning"
        class="text-yellow-600 mb-4 text-center shadow p-2 rounded"
      >
        {{ $t("register_warning_message") }}
      </p>

      <form v-if="!isOtpMode" @submit.prevent="register">
        <div class="mb-4 flex gap-4">
          <div class="w-1/2">
            <label
              for="fName"
              class="block text-gray-700 text-sm font-medium mb-2"
              >{{ $t("register_first_name") }}</label
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
              >{{ $t("register_last_name") }}</label
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
              >{{ $t("register_national_code") }}</label
            >
            <input
              type="text"
              id="nationalCode"
              v-model="nationalCode"
              class="numberInput w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div class="w-1/2">
            <label
              for="mobileNumber"
              class="block text-gray-700 text-sm font-medium mb-2"
              >{{ $t("register_mobile_number") }}</label
            >
            <input
              type="text"
              id="mobileNumber"
              v-model="mobileNumber"
              required
              class="numberInput w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div class="mb-4">
          <label
            for="email"
            class="block text-gray-700 text-sm font-medium mb-2"
            >{{ $t("register_email") }}</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="emailInput w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div class="mb-4 flex gap-4">
          <div class="w-1/2">
            <label
              for="position"
              class="block text-gray-700 text-sm font-medium mb-2"
              >{{ $t("register_job_position") }}</label
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
              >{{ $t("register_company") }}</label
            >
            <input
              type="text"
              id="company"
              v-model="company"
              class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <Button
          :loading="loading"
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {{ $t("register_register") }}
        </Button>
      </form>

      <div v-if="isOtpMode">
        <span class="block text-sm sm:text-base mb-4 text-gray-700">
          {{ $t("register_enter_your_one_time_password") }}
        </span>

        <InputOtp
          v-model="otpCode"
          :length="6"
          style="gap: 0; direction: ltr"
          class="flex justify-center"
        >
          <template #default="{ attrs, events, index }">
            <input
              type="text"
              v-bind="attrs"
              v-on="events"
              class="custom-otp-input"
            />
            <div v-if="index === 3" class="px-2 sm:px-4">
              <i class="pi pi-minus" />
            </div>
          </template>
        </InputOtp>

        <Button
          :loading="loading"
          @click="verifyOtp"
          class="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-700 justify-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {{ $t("register_confirm_code") }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputOtp from "primevue/inputotp";

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

const loading = ref(false);

async function register() {
  try {
    loading.value = true;
    const register = await $fetch("https://api.awscloud.ir/api/user", {
      method: "POST",
      body: {
        first_name: fName.value,
        last_name: lName.value,
        mobile: mobileNumber.value,
        email: email.value,
        national_code: nationalCode.value ?? nationalCode.value,
        position: position.value ?? position.value,
        company: company.value ?? company.value,
      },
    });
    loading.value = false;
    if (register.success) {
      isOtpMode.value = true;
    } else {
      alert("اطلاعات وارد شده تکراری است.");
    }
  } catch (error) {
    loading.value = false;
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
    alert(
      "مشکلی پیش آمده‌است. لطفا از طریق منوی ورود جهت وارد شدن به پنل اقدام نمایید."
    );
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

#otpInput,
.numberInput,
.emailInput {
  direction: ltr;
}

.custom-otp-input {
  width: 40px;
  height: 40px;
  font-size: 20px;
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
  border-color: #cbd5e1;
}
</style>
