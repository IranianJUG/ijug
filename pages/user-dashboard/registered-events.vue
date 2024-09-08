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
        :id="'ticket-' + ticket.id"
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
          class="h-64 w-full rounded-lg overflow-hidden mb-4 hidden-for-pdf"
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

        <button
          @click="downloadTicketAsPdf(ticket.id)"
          class="absolute bottom-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition-colors duration-300 hidden-for-pdf"
        >
          دانلود بلیط
        </button>
      </div>
    </div>

    <p v-else>در حال بارگذاری...</p>

    <!-- بخش اسپانسرها -->
    <div class="mt-12">
      <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">
        اسپانسرهای رویداد
      </h2>
      <div class="flex flex-wrap justify-center space-x-6">
        <div
          v-for="sponsor in sponsors"
          :key="sponsor.name"
          class="text-center mb-6 mx-11"
        >
          <img
            :src="sponsor.logo"
            :alt="sponsor.name"
            class="w-24 h-24 mx-auto mb-2 border-2 border-gray-200 shadow-md"
          />
          <p class="text-sm text-gray-600">{{ sponsor.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import moment from "jalali-moment";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const isClient = process.client;

let L = null;

if (isClient) {
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
  { name: "راهبرد هوشمند شهر ", logo: "/sponsorsLogo/R.H.SH.jpg" },
  {
    name: "داده پردازان ارتباط گستر ویونا",
    logo: "/sponsorsLogo/VIUNA-ICT_LOGO.png",
  },
  { name: "پژوهشگاه دانش های بنیادی(ipm)", logo: "/sponsorsLogo/IPM-Logo.jpg" },
  { name: "ایران نت", logo: "/sponsorsLogo/Iranet-Logo.jpg" },
  { name: "irnic", logo: "/sponsorsLogo/irnic-logo.png" },
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
        count: 1,
        description: data.event.description,
        mobile: data.mobile,
        fullName: `${data.first_name} ${data.last_name}`,
        locationLat: data.event.location_lat,
        locationLng: data.event.location_lng,
        locationName: data.event.location_name,
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
    const lat = parseFloat(ticket.locationLat);
    const lng = parseFloat(ticket.locationLng);

    if (!isNaN(lat) && !isNaN(lng)) {
      const map = L.map(`map-${ticket.id}`).setView([lat, lng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(ticket.locationName)
        .openPopup();
    } else {
      console.error(
        `مختصات نامعتبر برای بلیط ${ticket.id}: (${ticket.locationLat}, ${ticket.locationLng})`
      );
    }
  });
}

async function downloadTicketAsPdf(ticketId) {
  const ticketElement = document.getElementById(`ticket-${ticketId}`);
  if (ticketElement) {
    try {
      // تبدیل کارت بلیط به تصویر با html2canvas
      const canvas = await html2canvas(ticketElement, {
        scale: 2, // کیفیت بهتر
        ignoreElements: (element) =>
          element.classList.contains("hidden-for-pdf"),
      });

      // تبدیل تصویر به PDF با jsPDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`ticket-${ticketId}.pdf`);
    } catch (error) {
      console.error("خطا در ایجاد PDF:", error);
    }
  } else {
    console.error("عنصر کارت بلیط پیدا نشد.");
  }
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
