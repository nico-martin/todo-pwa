<template>
  <div>
    <form
      class="flex items-stretch"
      @submit.prevent="onsubmit"
      autocomplete="off"
    >
      <input
        type="text"
        name="title"
        id="title"
        class="appearance-none border rounded rounded-r-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        v-model="value"
        autocomplete="off"
        placeholder="Add new todo"
      />
      <button
        type="submit"
        class="font-bold rounded rounded-l-none text-white px-4 hover:bg-green-800 bg-green-900 text-center no-underline block focus:shadow-outline focus:outline-none"
      >
        Add
      </button>
    </form>
    <ContactPicker class="w-full" :value="value" :set-value="setNewValue" />
  </div>
</template>
<script>
import ContactPicker from './Form/ContactPicker';

export default {
  props: {
    itemsAdd: Function,
  },
  data() {
    const params = new URL(window.location).searchParams;
    const v = [
      ...(params.get('title') ? [params.get('title')] : []),
      ...(params.get('text') ? [params.get('text')] : []),
      ...(params.get('url') ? [params.get('url')] : []),
    ];

    return {
      value: v.join(' - '),
    };
  },
  methods: {
    onsubmit: function(e) {
      if (this.value !== '') {
        this.itemsAdd(this.value);
        this.$el.querySelector('[name=title]').focus();
        this.value = '';
      }
    },
    setNewValue: function(newValue) {
      this.value = newValue;
    },
  },
  components: {
    ContactPicker,
  },
};
</script>
