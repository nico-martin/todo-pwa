<template>
  <button
    v-if="this.prompt"
    class="text-white bg-blue-800 hover:bg-blue-700 rounded-full shadow a2h"
    @click="() => this.prompt.prompt()"
  >
    <svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
    </svg>
  </button>
</template>
<script>
import './A2H.css';
export default {
  data() {
    return {
      prompt: false,
    };
  },
  mounted: function() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      this.prompt = e;
    });
  },
};
</script>
