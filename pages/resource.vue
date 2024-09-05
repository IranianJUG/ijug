<script setup lang="ts">
import { ref, onMounted } from "vue";
import type BookData from "@/interfaces/BookData";
const layout = ref("grid");
const options = ref(["list", "grid"]);
//const bookData = ref();
const bookImages: Array<object> = [
  // Array of book images for the slideshow
  { image: "/images/Java_The_Complete_Reference.jpg" },

  { image: "/images/core_java.png" },
  // Add more book images as needed
];
const bookData: Array<BookData> = [
  // Array of book details for the data view
  {
    name: "Java Complete Reference Twelfth Edition",
    image: "/images/Java_The_Complete_Reference.jpg",
    rate: 4.5,
    downloads: 1000,
    url: "/ebook/Java_The_Complete_Reference.pdf",
  },
  {
    name: "Java A Beginners Guid Ninth Edition",
    image: "/images/A_Beginners_Guide_Ninth_Edition.jpg",
    rate: 4.0,
    downloads: 800,
    url: "/ebook/A_Beginners_Guide_Ninth_Edition.pdf",
  },
  {
    name: "Core Java Volume Fundamentals ",
    image: "/images/core_java.png",
    rate: 4.0,
    downloads: 800,
    url: "/ebook/compelete_refrence.jpg",
  },
  {
    name: "Java Performance In Depth Advice for Tuning and Programming",
    image:
      "/images/Java_Performance_In_Depth_Advice_for_Tuning_and_Programming.png",
    rate: 4.0,
    downloads: 800,
    url: "/ebook/Java_Performance_In_Depth_Advice_for_Tuning_and_Programming.pdf",
  },
  {
    name: "Effective Java",
    image: "/images/Effective_Java_2018.png",
    rate: 4.0,
    downloads: 800,
    url: "/ebook/Effective_Java_2018.pdf",
  },
  {
    name: "Modernizing Enterprise Java",
    image: "/images/ModerningEnterpriseInJava.jpg",
    rate: 4.0,
    downloads: 800,
    url: "/ebook/compelete_refrence.jpg",
  },
  {
    name: "Supercharge Your Applications with GraalVM",
    image: "/images/GraalVM.jpg",
    rate: 4.0,
    downloads: 800,
    url: "/ebook/Java_The_Complete_Reference.jpg",
  },
  {
    name: "Reactive System In Java",
    image: "/images/Reactive_Systems_in_Java_Resilient.jpg",
    rate: 4.0,
    downloads: 800,
    url: "/ebook/Reactive_Systems_in_Java_Resilient.pdf",
  },
  {
    name: "The Definitive Guide to Jakarta Faces in Jakarta EE 10",
    image: "/images/The_Definitive_Guide_to_Jakarta_Faces_in_Jakarta_EE_10.png",
    rate: 4.0,
    downloads: 800,
    url: "/ebook/The_Definitive_Guide_to_Jakarta_Faces_in_Jakarta_EE_10.pdf",
  },
  {
    name: "Pro Jakarta Persistence in Jakarta EE 10",
    image: "/images/Pro_Jakarta_Persistence_in_Jakarta_EE_10.png",
    rate: 4.0,
    downloads: 800,
    url: "/ebook/Pro_Jakarta_Persistence_in_Jakarta_EE_10.pdf",
  },

  {
    name: "Spring In Action",
    image: "/images/SpringInAction.png",
    rate: 4.0,
    downloads: 800,
    url: "/ebook/compelete_refrence.jpg",
  },
  {
    name: "Designing data-intensive applications: the big ideas behind reliable, scalable, and maintainable systems",
    image: "/images/Designing_data-intensive_applications.png",
    rate: 4.0,
    downloads: 800,
    url: "/ebook/compelete_refrence.jpg",
  },
  {
    name: "Unit Testing Principles, Practices, and Patterns",
    image: "/images/Unit_Testing_Principles_Practices_and_Patterns.png",
    rate: 4.0,
    downloads: 800,
    url: "/ebook/compelete_refrence.jpg",
  },
  {
    name: "The Pragmatic Programmer - 20th Anniversary Edition",
    image: "/images/The_Pragmatic_Programmer.png",
    rate: 4.0,
    downloads: 800,
    url: "/ebook/compelete_refrence.jpg",
  },
  {
    name: "The Phoenix Project : A Novel about IT, DevOps, and Helping Your Business Win",
    image: "/images/The_Phoenix_Project.png",
    rate: 4.0,
    downloads: 800,
    url: "/ebook/compelete_refrence.jpg",
  },
];
</script>

<template>
  <div class="source">
    <div id="page-banner" style="background-image: url(/images/JavaEbook.jpg)">
      <div
        class="content wow fdeInUp"
        style="visibility: visible; animation-name: fdeInUp"
      >
        <div class="container">
          <h1></h1>
        </div>
      </div>
    </div>
    <Divider />

    <DataView dir="ltr" :value="bookData" :layout="layout">
      <template #header>
        <div  class="flex justify-end">
          <SelectButton v-model="layout" :options="options" :allowEmpty="false">
            <template #option="{ option }">
              <i
                :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-th-large']"
              />
            </template>
          </SelectButton>
        </div>
      </template>

      <template #list="slotProps">
        <div class="flex flex-wrap">
          <div
            v-for="(item, index) in slotProps.items"
            :key="index"
            class="w-full"
          >
            <div
              class="flex flex-col sm:flex-row sm:items-center p-4 gap-3"
              :class="{
                'border-t border-surface-200 dark:border-surface-700':
                  index !== 0,
              }"
            >
              <div class="md:w-[10rem] relative">
                <img
                  class="block xl:block mx-auto rounded-md w-full"
                  :src="item.image"
                  :alt="item.name"
                />
              </div>
              <div
                class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-4"
              >
                <div
                  class="flex flex-row md:flex-col justify-between items-start gap-2"
                >
                  <div>
                    <span class="font-medium text-secondary text-sm">{{
                      item.category
                    }}</span>
                    <div
                      class="text-lg font-medium text-surface-900 dark:text-surface-0 mt-2"
                    >
                      {{ item.name }}
                    </div>
                  </div>
                  <div
                    class="bg-surface-100 dark:bg-surface-700 p-1"
                    style="border-radius: 30px"
                  >
                    <div
                      class="surface-0 flex items-center gap-2 justify-center py-1 px-2"
                      style="border-radius: 30px; shadow-md 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"
                    >
                      <span
                        class="text-surface-900 dark:text-surface-0 font-medium text-sm"
                        >{{ item.rate }}</span
                      >
                      <i class="pi pi-star-fill text-yellow-500"></i>
                    </div>
                  </div>
                </div>
                <div class="flex flex-col md:items-end gap-5">
                  <span
                    class="text-xl font-semibold text-surface-900 dark:text-surface-0"
                    >Download: {{ item.downloads }}</span
                  >
                  <div class="flex flex-row-reverse md:flex-row gap-2">
                    <Button
                      icon="pi pi-shopping-cart"
                      label="Download"
                      link
                      class="flex-auto md:flex-initial white-space-nowrap"
                    >
                      <a :href="item.url">Download</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="flex flex-wrap">
          <div
            v-for="(item, index) in slotProps.items"
            :key="index"
            class="w-full sm:w-1/2 md:w-4/12 xl:w-1/2 p-2"
          >
            <div
              class="p-4 h-full shadow bg-surface-0 dark:bg-surface-900 rounded-md flex flex-col"
            >
              <div class="surface-50 flex justify-center rounded-md p-3">
                <div class="relative mx-auto">
                  <img
                    class="rounded-md w-full max-h-60"
                    :src="item.image"
                    :alt="item.name"
                  />
                </div>
              </div>
              <div class="flex flex-row justify-between items-start gap-2">
                <div>
                  <span class="font-medium text-secondary text-sm">{{
                    item.category
                  }}</span>
                  <div
                    class="text-lg font-medium text-surface-900 dark:text-surface-0 mt-1"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div
                  class="bg-surface-100 dark:bg-surface-700 p-1"
                  style="border-radius: 30px"
                >
                  <div
                    class="surface-0 flex items-center gap-2 justify-center py-1 px-2"
                    style="border-radius: 30px; shadow-md 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)"
                  >
                    <span
                      class="text-surface-900 dark:text-surface-0 font-medium text-sm"
                      >{{ item.rate }}</span
                    >
                    <i class="pi pi-star-fill text-yellow-500"></i>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-1 mt-auto pt-2">
                <span class="text-sm text-surface-900 dark:text-surface-0"
                  >Downloads: {{ item.downloads }}</span
                >
                <div class="flex gap-2 flex-row justify-start">
                  <Button
                    icon="pi pi-shopping-cart"
                    label="Download"
                    class="bg-indigo-500 !rounded-lg p-2 text-white"
                  >
                    <a :href="item.url">Download</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
  <div class="mx-auto" style="width: 200px; height: 50px"></div>
  <ScrollToTop />
</template>

<style scoped>
#page-banner {
  background-repeat: no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-position: center;
  padding: 80px 0;
  height: 560px;
  position: relative;
  text-align: center;
}
#page-banner:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.7;
}
#page-banner .content {
  margin-top: 8em;
  position: relative;
}
#page-banner h1 {
  color: #fff;
  font-size: 6vh;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.2;
  font-weight: 600;
}
#page-banner span {
  font-size: 14px;
  color: #fff;
  font-style: italic;
}
#page-banner h5 {
  color: #fff;
  font-weight: 400;
  font-size: 12px;
  letter-spacing: 0.8px;
}
#page-banner .breadcrumb,
#single-banner .breadcrumb {
  background: none;
  color: #ccc;
  font-size: 14px;
  padding-left: 0;
  margin-bottom: 0;
}
#page-banner .breadcrumb > li > a,
#single-banner .breadcrumb > li > a {
  color: #fff;
  font-size: 14px;
}
#page-banner .breadcrumb > .active,
#single-banner .breadcrumb > .active {
  color: #fff;
}
#page-banner header {
  padding: 0;
}
#page-banner header .date-article {
  color: #fff;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.8px;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
}
#page-banner header .author.vcard a {
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.8px;
  font-family: "Montserrat", sans-serif;
  font-style: normal;
  color: #fff;
  font-weight: 600;
}
#page-banner header.entry-header {
  color: #fff;
  font-family: "Droid Serif", serif;
  text-transform: none;
  font-weight: 400;
  margin-top: 15px;
  font-style: italic;
}
</style>
