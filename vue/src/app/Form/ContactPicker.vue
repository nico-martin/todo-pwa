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
  model: {
    prop: 'value',
    event: 'update',
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      text: false,
    };
  },
  computed: {
    supported() {
      return 'contacts' in navigator && 'ContactsManager' in window;
    },
  },
  watch: {
    value(newValue) {
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
    async openPicker() {
      try {
        const contact = await navigator.contacts.select(['name', 'tel'], {
          multiple: false,
        });
        const payload = this.text[1].replace(
          '{contact}',
          contact[0].name[0] + ' - ' + contact[0].tel[0]
        );
        this.$emit('update', payload);
      } catch (ex) {
        alert('Contact Pick failed');
      }
    },
  },
};
</script>
