<script setup lang="ts">
import type ContactData from "@/interfaces/ContactData"
const formData :ContactData = {name: '', email: '', message: ''};
function submitForm(): void {
  // Handle form submission (e.g., send email)
  console.log('Form submitted:', formData);
}
</script>

<template>
  <div class="mx-auto" style="width: 200px; height: 20px">

  </div>
  <div class="contact-us text-center">
    <div class="mx-auto" style="width: 200px; height: 20px">

    </div>
    <h2>{{$t("contact_header")}}: </h2>
    <div class="mx-auto" style="width: 200px; height: 20px">

    </div>


        <div class=" grid grid-cols-1 gap-4 content-center">
          <form @submit.prevent="submitForm" >
            <div class="form-group">
              <label for="name"> {{$t("contact_name")}}: </label>
              <InputText type="text" id="name" v-model="formData.name"  placeholder="Name" />
            </div>
            <div class="form-group">
              <label for="email">{{$t("contact_email")}}: </label>
              <InputText type="email" id="email" v-model="formData.email"  placeholder="Email " required />

            </div>
            <div class="form-group">
              <label for="message">{{$t("contact_message")}}:</label>
              <Textarea id="message" v-model="formData.message" autoResize rows="5" cols="30" required />

            </div>
            <Button type="submit"    @click="submitForm" > {{$t("contact_button")}} </Button>
          </form>
        </div>
      </div>


</template>

<style scoped>

</style>