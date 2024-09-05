<script setup lang="ts">
import { ref, onBeforeMount, onMounted, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import { useState } from "#app";

const localePath = useLocalePath();
const { locales, locale, setLocale } = useI18n();

const savedLocale = useState("locale", () => "fa");
const selectLang = ref(savedLocale.value);

const cookieName = "userInfo";
const myCookie = useCookie(cookieName);
const isLoggedIn = ref(false);
const userName = ref("");

onBeforeMount(() => {
  if (process.client) {
    const localStorageLocale = localStorage.getItem("locale") || "fa";
    savedLocale.value = localStorageLocale;
    selectLang.value = localStorageLocale;

    const userInfo = myCookie["_rawValue"];
    if (!!userInfo?.token) {
      isLoggedIn.value = true;
      userName.value = `${userInfo.first_name} ${userInfo.last_name}`;
    }
  } else {
    savedLocale.value = "fa";
  }
});

onMounted(() => {
  setLocale(savedLocale.value);
});

const items = ref([]);

watchEffect(() => {
  items.value = [
    {
      label: "menu_header",
      icon: "pi pi-home",
      route: "/",
    },
    {
      label: "menu_about_us",
      icon: "pi pi-bars",
      route: "/about",
    },
    {
      label: "menu_contact_us",
      icon: "pi pi-at",
      route: "/contact",
    },
    {
      label: "menu_blog",
      icon: "pi pi-align-justify",
      route: "/blog",
    },
    {
      label: "menu_event",
      icon: "pi pi-users",
      route: "/event",
    },
    {
      label: "menu_resource",
      icon: "pi pi-book",
      route: "/resource",
    },
  ];

  if (!isLoggedIn.value) {
    items.value.push(
      {
        label: "menu_login",
        icon: "pi pi-sign-in",
        route: "/login",
      },
      {
        label: "menu_register",
        icon: "pi pi-user-plus",
        route: "/register",
      }
    );
  } else {
    items.value.push({
      label: `${userName.value}, خوش آمدید`,
      icon: "pi pi-user",
      items: [
        {
          label: "پروفایل",
          icon: "pi pi-user-edit",
          route: "/user-dashboard",
        },
        {
          label: "خروج از حساب کاربری",
          icon: "pi pi-sign-out",
          command: logout,
        },
      ],
    });
  }
});

function onChangeLang(lang: string) {
  setLocale(lang);
  savedLocale.value = lang;
  if (process.client) {
    localStorage.setItem("locale", lang);
  }
}

function logout() {
  myCookie.value = null;
  isLoggedIn.value = false;
  userName.value = "";
  navigateTo("/");
}
</script>

<template>
  <div>
    <Menubar :model="items">
      <template #item="{ item, props, hasSubmenu }">
        <NuxtLink
          v-if="item.route"
          v-slot="{ href, navigate }"
          :to="localePath(item.route)"
          custom
        >
          <a
            v-ripple
            :href="href"
            v-bind="props.action"
            @click="navigate"
            class="hover:bg-gray-200 rounded hover:text-black"
          >
            <span :class="item.icon" class="menu-icon" />
            <span class="menu-label">{{ $t(item.label) }}</span>
          </a>
        </NuxtLink>
        <a
          v-else-if="item.items"
          v-ripple
          href="#"
          class="menu-item"
          v-bind="props.action"
        >
          <span :class="item.icon" class="menu-icon" />
          <span class="menu-label">{{ item.label }}</span>
          <span
            v-if="hasSubmenu"
            class="pi pi-fw pi-angle-down menu-submenu-icon"
          />
          <ul v-if="hasSubmenu" class="submenu">
            <li v-for="subItem in item.items" :key="subItem.label">
              <NuxtLink
                v-if="subItem.route"
                :to="localePath(subItem.route)"
                custom
              >
                <a v-ripple class="submenu-item">{{ $t(subItem.label) }}</a>
              </NuxtLink>
              <a v-else @click="subItem.command" class="submenu-item">{{
                $t(subItem.label)
              }}</a>
            </li>
          </ul>
        </a>
        <a
          v-else
          v-ripple
          :href="item.url"
          :target="item.target"
          v-bind="props.action"
          class="menu-item"
        >
          <span :class="item.icon" class="menu-icon" />
          <span class="menu-label">{{ $t(item.label) }}</span>
        </a>
      </template>
      <template #end>
        <div class="px-3">
          <select
            v-model="selectLang"
            @change="onChangeLang(selectLang)"
            class="hover:bg-gray-200 bg-gray-100 rounded hover:text-black p-1"
          >
            <option
              v-for="lang in locales"
              :key="lang.code"
              :value="lang.code"
              class="text-sm"
            >
              {{ lang.code.toUpperCase() }}
            </option>
          </select>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<style scoped>
.menu-item {
  display: flex;
  align-items: center;
  color: #ffffff;
  text-decoration: none;
  padding: 10px 15px;
  transition: background-color 0.3s, color 0.3s;
  background-color: #1e3c72;
  border-radius: 5px;
}

.menu-item:hover {
  background-color: #2a5298;
}

.menu-icon {
  font-size: 18px;
  margin-right: 8px;
  margin-left: 8px;
}

.menu-label {
  font-size: 16px;
}

.menu-submenu-icon {
  margin-left: auto;
}

.language-dropdown {
  margin-left: auto;
}

.form-select {
  background-color: #1e3c72;
  color: white;
  border: 1px solid #2a5298;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  outline: none;
  margin-left: 10px;
}

.form-select:hover {
  background-color: #2a5298;
}

.menubar {
  background-color: #1e3c72;
}

.menubar a {
  color: white;
}

.menubar a:hover {
  color: #b3c7e6;
  text-decoration: underline;
}
</style>
