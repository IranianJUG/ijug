<script setup lang="ts">
import { ref } from "vue";

const localePath = useLocalePath()

const items = ref([
  {
    label:'menu_header',
    icon: 'pi pi-home',
    route: '/'
  },
  {
    label:'menu_about_us',
    icon: 'pi pi-bars',
    route: '/about'
  },
  {
    label: 'menu_contact_us',
    icon: 'pi pi-at',
    route: '/contact'
  },
  {
    label: 'menu_blog',
    icon: 'pi pi-align-justify',
    route: '/blog'
  },
  {
    label: 'menu_event',
    icon: 'pi pi-users',
    route: '/event'
  }, {
    label: 'menu_resource',
    icon: 'pi pi-book',
    route: '/resource'
  }
]);
</script>

<template>
  <div >
    <Menubar :model="items" >
      <template #item="{ item, props, hasSubmenu }">
        <NuxtLink v-if="item.route" v-slot="{ href, navigate }" :to="localePath(item.route)" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span :class="item.icon" />
            <span class="ml-2">{{$t(item.label) }}</span>
          </a>
        </NuxtLink>
        <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{$t( item.label)}}</span>
          <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
        </a>
      </template>
    </Menubar>
  </div>
</template>

<style scoped>

</style>