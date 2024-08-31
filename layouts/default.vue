<script setup lang="ts">
import Menu from "@/components/MenuPage.vue";
import Footer from "@/components/Footer.vue";
import { useI18n } from "vue-i18n";
import { onMounted, watch } from "vue";

const { locale } = useI18n();

const setDirection = (newLocale: string) => {
  if (process.client) {
    document.documentElement.setAttribute(
      "dir",
      newLocale === "fa" ? "rtl" : "ltr"
    );
  }
};

onMounted(() => {
  setDirection(locale.value);
});

watch(
  () => locale.value,
  (newLocale) => {
    setDirection(newLocale);
  },
  { immediate: true }
);
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <Menu />
    <div class="flex-1 flex flex-col justify-center p-4">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style scoped></style>
