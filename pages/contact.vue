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
  <div class="items-center justify-center content-center text-center">
    <h2>{{ $t("contact_header") }}:</h2>
    <div class="gap-4" style="display: inline-block">
      <Card
        v-for="(team, index) in teamData"
        :key="index"
        style="width: 25rem; overflow: hidden"
      >
        <template #header>
          <img alt="user header" :src="team.image" />
        </template>
        <template #title>{{ team.name }}</template>
        <!--          <template #subtitle>Card subtitle</template>-->
        <template #content>
          <p class="m-0">
            {{ team.description }}
          </p>
        </template>
        <template #footer>
          <div class="flex gap-4 mt-1">
            <Button icon="pi pi-link" :href="team.url" class="w-full" />
            <Button icon="pi pi-github" class="w-full" />
            <Button icon="pi pi-telegram" class="w-full" />
            <Button icon="pi pi-facebook" class="w-full" />
            <Button icon="pi pi-linkedin" class="w-full" />
            <Button icon="pi pi-instagram" class="w-full" />
            <Button icon="pi pi-discord" class="w-full" />
            <Button icon="pi pi-whatsapp" class="w-full" />
            <Button icon="pi pi-youtube" class="w-full" />
          </div>
        </template>
      </Card>
    </div>
    <ScrollToTop />
  </div>
</template>

<style scoped></style>
