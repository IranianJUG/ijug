<template>
  <div class="container mx-auto py-8">
    <h1 class="text-4xl font-bold mb-8 text-center text-gray-800">
      بلیط‌های شما
    </h1>

    <div
      v-if="tickets.length"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <div
        v-for="ticket in tickets"
        :key="ticket.id"
        class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out relative"
      >
        <h2 class="text-2xl font-semibold text-indigo-700 mb-4">
          {{ ticket.name }}
        </h2>
        <p class="text-gray-600 text-sm mb-3">
          <span class="font-semibold">شرح مختصر:</span>
          {{ ticket.shortDescription }}
        </p>

        <div class="mb-4">
          <p class="text-gray-500 text-sm">
            <span class="font-bold">تاریخ خرید:</span> {{ ticket.createdAt }}
          </p>
          <p class="text-gray-500 text-sm">
            <span class="font-bold">تاریخ رویداد:</span> {{ ticket.eventTime }}
          </p>
          <p class="text-gray-500 text-sm">
            <span class="font-bold">تعداد بلیط:</span> {{ ticket.count }}
          </p>
        </div>

        <div class="border-t pt-4 mb-4">
          <h3 class="text-lg font-bold text-gray-700 mb-2">محل برگزاری</h3>
          <p class="text-gray-500 text-sm">
            <span class="font-semibold">نام:</span> {{ ticket.locationName }}
          </p>
          <p class="text-gray-500 text-sm">
            <span class="font-semibold">آدرس:</span>
            {{ ticket.locationAddress }}
          </p>
        </div>

        <div
          class="h-64 w-full rounded-lg overflow-hidden mb-4"
          :id="'map-' + ticket.id"
        ></div>

        <div class="border-t pt-4">
          <h3 class="text-lg font-bold text-gray-700 mb-2">اطلاعات خریدار</h3>
          <p class="text-gray-500 text-sm">
            <span class="font-semibold">نام:</span> {{ ticket.fullName }}
          </p>
          <p class="text-gray-500 text-sm">
            <span class="font-semibold">موبایل:</span> {{ ticket.mobile }}
          </p>
          <p class="text-gray-500 text-sm">
            <span class="font-semibold">ایمیل:</span> {{ ticket.email }}
          </p>
        </div>

        <div class="border-t pt-4 mt-4">
          <h3 class="text-lg font-bold text-gray-700 mb-2">شرح کامل</h3>
          <div v-html="ticket.description" class="text-gray-600 text-sm"></div>
        </div>

        <!-- <button
          class="absolute bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors duration-300"
        >
          دانلود بلیط
        </button> -->
      </div>
    </div>

    <p v-else>در حال بارگذاری...</p>

    <!-- بخش اسپانسرها -->
    <!-- <div class="mt-12">
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">
        اسپانسرهای رویداد
      </h2>
      <div class="flex flex-wrap justify-center space-x-6">
        <div
          v-for="sponsor in sponsors"
          :key="sponsor.name"
          class="text-center mb-6"
        >
          <img
            :src="sponsor.logo"
            :alt="sponsor.name"
            class="w-24 h-24 mx-auto mb-2 rounded-full border-2 border-gray-200 shadow-md"
          />
          <p class="text-sm text-gray-600">{{ sponsor.name }}</p>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import moment from "jalali-moment";

// چک کنید آیا کلاینت است
const isClient = process.client;

let L = null;

if (isClient) {
  // Leaflet را فقط در کلاینت ایمپورت کنید
  import("leaflet").then((leaflet) => {
    L = leaflet.default;
    import("leaflet/dist/leaflet.css");
  });
}

moment.locale("ir");

const cookieName = "userInfo";
const myCookie = useCookie(cookieName);
const userInfo = myCookie.value;

const tickets = ref([]);
const sponsors = ref([
  { name: "اسپانسر 1", logo: "/path-to-logo1.png" },
  { name: "اسپانسر 2", logo: "/path-to-logo2.png" },
  { name: "اسپانسر 3", logo: "/path-to-logo3.png" },
]);

async function getAllTickets() {
  try {
    const response = await $fetch("https://api.awscloud.ir/api/ticket", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    if (response.success) {
      const allTickets = response.data.map((data) => ({
        id: data.id,
        createdAt: moment(data.created_at)
          .locale("fa")
          .format("YYYY/MM/DD HH:mm"),
        eventTime: moment(data.event.event_time)
          .locale("fa")
          .format("YYYY/MM/DD HH:mm"),
        count: data.count,
        description: data.event.description,
        mobile: data.mobile,
        fullName: `${data.first_name} ${data.last_name}`,
        locationLat: data.event.location_lat,
        locationLng: data.event.location_lng,
        locationName: data.location_name,
        locationAddress: data.event.location_address,
        email: data.email,
        name: data.event.name,
        shortDescription: data.event.short_description,
      }));

      tickets.value = allTickets;
    } else {
      alert("دریافت اطلاعات بلیط ها ناموفق بود. لطفا دوباره تلاش کنید.");
    }
  } catch (error) {
    console.error("خطا در دریافت بلیط ها:", error);
    alert("خطایی رخ داده است. لطفا دوباره تلاش کنید.");
  }
}

function loadMaps() {
  tickets.value.forEach((ticket) => {
    const map = L.map(`map-${ticket.id}`).setView(
      [ticket.locationLat, ticket.locationLng],
      13
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([ticket.locationLat, ticket.locationLng])
      .addTo(map)
      .bindPopup(ticket.locationName)
      .openPopup();
  });
}

onMounted(() => {
  getAllTickets().then(() => {
    if (isClient && L) {
      loadMaps();
    }
  });
});
</script>

<style scoped>
#map {
  height: 300px;
  width: 100%;
}

.sponsor-logo {
  width: 100px;
  height: auto;
}
</style>
