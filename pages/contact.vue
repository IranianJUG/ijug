<script setup lang="ts">
import type ContactData from "@/interfaces/ContactData";

import type TeamData from "~/interfaces/TeamData";
const formData: ContactData = { name: "", email: "", message: "" };
const teamData: Array<TeamData> = [
  {
    name: "Majid Mostafavi",
    image: "/team/Majid-1.jpg",
    title: "",
    url: "http://www.majidmostafavi.com/",
    git: "",
    linkedin: "",
    description:
      "Experienced Java Developer and JUG Leader with a strong background in building efficient, high-performance software solutions. Committed to community engagement and professional development.",
  },
  {
    name: "Hesam Ghiasi",
    image: "/team/Hesam.jpg",
    title: "",
    url: "",
    git: "",
    linkedin: "",
    description:
      " Software Engineer | Specializing in Java, Spring, Hibernate, software architecture, TDD, DDD and agile | Leading development teams to higher quality and better productivity | Lifelong researcher and learner",
  },
  {
    name: "Farnaz Moghimi",
    image: "/team/Farnaz.png",
    title: "",
    url: "",
    git: "",
    linkedin: "",
    description: "Java Developer",
  },
  {
    name: "Amin Bazgir",
    image: "/team/AminB.jpg",
    title: "",
    url: "",
    git: "",
    linkedin: "",
    description: "Java Developer",
  },
  {
    name: "Amirreza Razazian",
    image: "/team/AmirReza.jpg",
    title: "",
    url: "",
    git: "",
    linkedin: "",
    description: "Java Developer",
  },
];
function submitForm(): void {
  // Handle form submission (e.g., send email)
  console.log("Form submitted:", formData);
}
</script>

<template>
  <div class="">
    <h2 class="text-lg font-bold">{{ $t("contact_header") }}:</h2>
    <div class="flex flex-row flex-wrap justify-start container mx-auto text-center" >
      <div
        v-for="(team, index) in teamData"
        :key="index"
        class="p-2 w-full md:w-1/2 lg:w-1/3"
      >
      <div class="flex flex-col justify-between items-center gap-2 shadow hover:shadow-lg h-full p-2 rounded">
        <div class="w-full bg-gray-200 rounded flex flex-row justify-center">
          <img alt="user header" class="max-h-64 " :src="team.image" />
        </div>
        <div class="text-gray-900">{{ team.name }}</div>
        <!--          <template #subtitle>Card subtitle</template>-->
          <p class="m-0 text-gray-700 text-sm">
            {{ team.description }}
          </p>
        <div class="!mt-auto">
          <div class="flex gap-4 mt-1">
            <Button icon="pi pi-link" :href="team.url" class="w-full hover:shadow p-1" />
            <Button icon="pi pi-github" class="w-full hover:shadow p-1" />
            <Button icon="pi pi-telegram" class="w-full hover:shadow p-1" />
            <Button icon="pi pi-facebook" class="w-full hover:shadow p-1" />
            <Button icon="pi pi-linkedin" class="w-full hover:shadow p-1" />
            <Button icon="pi pi-instagram" class="w-full hover:shadow p-1" />
            <Button icon="pi pi-discord" class="w-full hover:shadow p-1" />
            <Button icon="pi pi-whatsapp" class="w-full hover:shadow p-1" />
            <Button icon="pi pi-youtube" class="w-full hover:shadow p-1" />
          </div>
        </div></div>
      </div>
    </div>
    <ScrollToTop />
  </div>
</template>

