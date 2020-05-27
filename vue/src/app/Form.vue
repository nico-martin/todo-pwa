<template>
  <div>
    <form
      class="flex items-stretch"
      @submit.prevent="onSubmit"
      autocomplete="off"
    >
      <input type="hidden" v-model="form.done" />
      <label class="flex-1">
        <span class="sr-only">New Todo</span>
        <input
          type="text"
          name="todo"
          ref="input"
          class="appearance-none border rounded rounded-r-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          v-model="form.title"
          autocomplete="off"
          placeholder="Add new todo"
        />
      </label>
      <button
        class="font-bold rounded rounded-l-none text-white px-4 hover:bg-green-800 bg-green-900 text-center no-underline block focus:shadow-outline focus:outline-none"
      >
        Add
      </button>
    </form>
    <ContactPicker class="w-full" v-model="form.title" />
  </div>
</template>
<script>
import ContactPicker from './Form/ContactPicker';
import uuid from 'uuid/v4';

export default {
  components: {
    ContactPicker,
  },
  data() {
    // The shareTargetAPI creates a get Request that looks like this:
    // /vue/?title={title}&text={text}&url={url}
    const params = new URL(window.location).searchParams;
    const title = [
      ...(params.get('title') ? [params.get('title')] : []),
      ...(params.get('text') ? [params.get('text')] : []),
      ...(params.get('url') ? [params.get('url')] : []),
    ];

    return {
      form: {
        done: false,
        title: title.join(' - '),
      },
    };
  },
  computed: {
    isEmptyTitle() {
      return this.form.title === '';
    },
  },
  methods: {
    onSubmit() {
      if (!this.isEmptyTitle) {
        this.$emit('submit', { ...this.form, id: uuid() });
        this.$nextTick(() => {
          this.form.title = '';
          this.$refs.input.focus();
        });
      }
    },
  },
};
</script>
