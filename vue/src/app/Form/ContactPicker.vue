<template>
  <button
    v-if="text && supported"
    @click="openPicker"
    class="text-sm text-gray-500 hover:text-black mt-2"
  >
    {{ text[0] }}
  </button>
</template>

<script>
export default {
  props: {
    value: String,
    setValue: Function,
    className: String,
  },
  data() {
    return {
      supported: 'contacts' in navigator && 'ContactsManager' in window,
      text: false,
    };
  },
  watch: {
    value: function(newValue) {
      let text = false;
      if (newValue.toLowerCase().indexOf('text') !== -1) {
        text = ['Do you want to text someone?', 'Write message to {contact}'];
      }

      if (newValue.toLowerCase().indexOf('call') !== -1) {
        text = ['Do you want to call someone?', 'Call {contact}'];
      }

      this.text = text;
    },
  },
  methods: {
    openPicker: async function() {
      try {
        const contact = await navigator.contacts.select(['name', 'tel'], {
          multiple: false,
        });
        this.setValue(
          this.text[1].replace(
            '{contact}',
            contact[0].name[0] + ' - ' + contact[0].tel[0]
          )
        );
      } catch (ex) {
        alert('Contact Pick failed');
      }
    },
  },
};
</script>
