<script setup lang="ts">

import type BookData from "@/interfaces/BookData";

const bookImages : Array<object>= [ // Array of book images for the slideshow
  { image: 'assets/images/Java_The_Complete_Reference.jpg' },

  { image: 'assets/images/core_java.png' },
  // Add more book images as needed
];
const bookData : Array<BookData> = [ // Array of book details for the data view
  {
    name: 'Java Complete Reference Twelfth Edition',
    image: 'assets/images/Java_The_Complete_Reference.jpg',
    rate: 4.5,
    downloads: 1000,
    url:'assets/ebook/Java_The_Complete_Reference.pdf'
  },
  {
    name: 'Java A Beginners Guid Ninth Edition',
    image: 'assets/images/A_Beginners_Guide_Ninth_Edition.jpg',
    rate: 4.0,
    downloads: 800,
    url:'assets/ebook/A_Beginners_Guide_Ninth_Edition.pdf'
  },
  {
    name: 'Core Java Volume Fundamentals ',
    image: 'assets/images/core_java.png',
    rate: 4.0,
    downloads: 800,
    url:'assets/ebook/compelete_refrence.jpg'
  },
  {
    name: 'Java Performance In Depth Advice for Tuning and Programming',
    image: 'assets/images/Java_Performance_In_Depth_Advice_for_Tuning_and_Programming.png',
    rate: 4.0,
    downloads: 800,
    url:'assets/ebook/Java_Performance_In_Depth_Advice_for_Tuning_and_Programming.pdf'
  },
  {
    name: 'Effective Java',
    image: 'assets/images/Effective_Java_2018.png',
    rate: 4.0,
    downloads: 800,
    url:'assets/ebook/Effective_Java_2018.pdf'
  },
  {
    name: 'Modernizing Enterprise Java',
    image: 'assets/images/ModerningEnterpriseInJava.jpg',
    rate: 4.0,
    downloads: 800,
    url:'assets/ebook/compelete_refrence.jpg'
  },
  {
    name: 'Supercharge Your Applications with GraalVM',
    image: 'assets/images/GraalVM.jpg',
    rate: 4.0,
    downloads: 800,
    url:'assets/ebook/Java_The_Complete_Reference.jpg'
  },
  {
    name: 'Reactive System In Java',
    image: 'assets/images/Reactive_Systems_in_Java_Resilient.jpg',
    rate: 4.0,
    downloads: 800,
    url:'assets/ebook/Reactive_Systems_in_Java_Resilient.pdf'
  },
  {
    name: 'The Definitive Guide to Jakarta Faces in Jakarta EE 10',
    image: 'assets/images/The_Definitive_Guide_to_Jakarta_Faces_in_Jakarta_EE_10.png',
    rate: 4.0,
    downloads: 800,
    url:'assets/ebook/The_Definitive_Guide_to_Jakarta_Faces_in_Jakarta_EE_10.pdf'
  },
  {
    name: 'Pro Jakarta Persistence in Jakarta EE 10',
    image: 'assets/images/Pro_Jakarta_Persistence_in_Jakarta_EE_10.png',
    rate: 4.0,
    downloads: 800,
    url:'assets/ebook/Pro_Jakarta_Persistence_in_Jakarta_EE_10.pdf'
  },

  {
    name: 'Spring In Action',
    image: 'assets/images/SpringInAction.png',
    rate: 4.0,
    downloads: 800,
    url:'assets/ebook/compelete_refrence.jpg'
  }
]
</script>

<template>
  <div class="source">

    <div id="page-banner" style="background-image: url(assets/images/JavaEbook.jpg)">
      <div class="content  wow fdeInUp" style="visibility: visible; animation-name: fdeInUp;">
        <div class="container ">
          <h1></h1>
        </div>
      </div>
    </div>
    <Divider />

    <div class="card flex items-center justify-center" v-for="(book, index) in bookData" :key="index">
      <Card style="width: 25em">
        <template #header>
          <img alt="user header" :src="book.image" />
        </template>
        <template #title> {{ book.name }} </template>
        <template #subtitle> {{ book.rate }}</template>
        <template #content>
          <p class="m-0">
            {{ book.name }}
          </p>
        </template>
        <template #footer>
          <Button icon="pi pi-check" :href="book.url" label="Download" />
        </template>
      </Card>
    </div>

  </div>
  <div class="mx-auto" style="width: 200px; height: 50px">

  </div>
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
#page-banner .breadcrumb, #single-banner .breadcrumb {
  background: none;
  color: #ccc;
  font-size: 14px;
  padding-left: 0;
  margin-bottom: 0;
}
#page-banner .breadcrumb > li > a, #single-banner .breadcrumb > li > a {
  color: #fff;
  font-size: 14px;
}
#page-banner .breadcrumb > .active, #single-banner .breadcrumb > .active {
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
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
}
#page-banner header .author.vcard a {
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.8px;
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  color: #fff;
  font-weight: 600;
}
#page-banner header.entry-header {
  color: #fff;
  font-family: 'Droid Serif', serif;
  text-transform: none;
  font-weight: 400;
  margin-top: 15px;
  font-style: italic;
}
</style>