<!-- pages/dashboard/index.vue -->
<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md h-full">
      <nav class="mt-10">
        <ul>
          <li class="mb-4">
            <NuxtLink
              to="/user-dashboard/profile"
              class="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-600 hover:text-white"
              >اطلاعات کاربر</NuxtLink
            >
          </li>
          <li class="mb-4">
            <NuxtLink
              to="/user-dashboard/registered-events"
              class="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-600 hover:text-white"
              >رویدادهای ثبت‌نام شده</NuxtLink
            >
          </li>
          <li class="mb-4">
            <NuxtLink
              to="/user-dashboard/wallet"
              class="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-600 hover:text-white"
              >کیف پول</NuxtLink
            >
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8">
      <NuxtPage />
      <!-- رندر کردن محتوای صفحات -->
    </main>
  </div>
</template>

<script setup></script>

<style scoped></style>
