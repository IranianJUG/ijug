<template>
  <div v-show="isVisible" class="scroll-to-top" @click="scrollToTop">
    <i class="pi pi-arrow-up"></i>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

export default {
  setup() {
    const isVisible = ref(false);

    const toggleVisibility = () => {
      isVisible.value = window.scrollY > 300;
    };

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    onMounted(() => {
      window.addEventListener("scroll", toggleVisibility);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", toggleVisibility);
    });

    return {
      isVisible,
      scrollToTop,
    };
  },
};
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s, transform 0.3s;
  font-size: 24px;
  z-index: 1000;
}

.scroll-to-top:hover {
  background-color: #0056b3;
  transform: scale(1.1);
}

.scroll-to-top i {
  margin: 0;
}
</style>
