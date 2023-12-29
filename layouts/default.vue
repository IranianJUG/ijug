<script setup lang="ts">
import Menu from '@/components/MenuPage.vue'
import Footer from "@/components/Footer.vue";

const currentLocale = useI18n();


</script>

<template>
  <div :dir="[currentLocale.locale.value === 'fa'?'rtl':'ltr']">
    <Menu/>
    <div>
      <slot/>
    </div>
    <Footer/>
  </div>
</template>

<style scoped>

</style>