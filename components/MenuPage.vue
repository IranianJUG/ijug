<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const localePath = useLocalePath();

const items = ref([
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
  {
    label: "menu_login",
    icon: "pi pi-sign-in",
    route: "/login",
  },
  {
    label: "menu_register",
    icon: "pi pi-user-plus",
    route: "/register",
  },
]);

const { locales, locale, setLocale } = useI18n();
const selectLang = ref(locale.value);

function onChangeLang(lang: string) {
  setLocale(lang);
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
            class="menu-item"
          >
            <span :class="item.icon" class="menu-icon" />
            <span class="menu-label">{{ $t(item.label) }}</span>
          </a>
        </NuxtLink>
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
          <span
            v-if="hasSubmenu"
            class="pi pi-fw pi-angle-down menu-submenu-icon"
          />
        </a>
      </template>
      <template #end>
        <div class="language-dropdown">
          <select
            v-model="selectLang"
            @change="onChangeLang(selectLang)"
            class="form-select"
          >
            <option v-for="lang in locales" :key="lang.code" :value="lang.code">
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
