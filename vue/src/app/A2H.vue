<template>
  <button
    v-if="this.prompt"
    class="text-white hover:bg-green-800 bg-green-900 rounded-full shadow a2h"
    @click="() => this.prompt.prompt() /* fire the prompt on button click */"
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
    // this will catch the beforeinstallprompt and prevents the native prompt from appearing
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault();
      this.prompt = e;
    });
  },
};
</script>
