<template>
  <button
    v-if="prompt"
    class="text-white hover:bg-green-800 bg-green-900 rounded-full shadow a2h"
    @click="() => prompt.prompt() /* fire the prompt on button click */"
  >
    <svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
    </svg>
  </button>
</template>
<script>
export default {
  data() {
    return {
      prompt: false,
    };
  },
  methods: {
    handlePrompt(e) {
      e.preventDefault();
      this.prompt = e;
    },
  },
  mounted() {
    // this will catch the beforeinstallprompt and prevents the native prompt from appearing
    window.addEventListener('beforeinstallprompt', this.handlePrompt);
  },
  beforeDestroy() {
    // clean
    window.removeEventListener('beforeinstallprompt', this.handlePrompt);
  },
};
</script>

<style src="./A2H.css"></style>
