<script setup lang="ts">
import { ref } from "vue";

const {locales,locale ,setLocale }= useI18n();

const langs = ref(locales);
const selectLang= ref(locale.value);
function onChangeD():void{
  setLocale(selectLang.value)
  console.log(selectLang);
}
</script>

<template>
  <footer class="footer  mt-auto">

    <div v-for="category in langs" :key="category.code" class="flex items-center">
      <RadioButton v-model="selectLang" :inputId="category.code" name="dynamic" :value="category.code" @change="onChangeD" />
      <label :for="category.code" class="ml-2">{{ category.name }}</label>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <p>&copy;Iranian Java User Group</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  position: fixed;
  bottom: 0;
}
</style>