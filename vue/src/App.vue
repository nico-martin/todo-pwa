<template>
  <div class="flex flex-col justify-start">
    <div class="bg-green-800 text-white w-full shadow-lg sticky top-0">
      <Header class="w-11/12 max-w-lg mx-auto" />
    </div>
    <Form class="w-11/12 max-w-lg mx-auto mt-10" :itemsAdd="itemsAdd" />
    <List
      class="w-11/12 max-w-lg mx-auto my-16"
      :items="items"
      :itemsRemove="itemsRemove"
      :itemsSet="itemsSet"
    />
    <Footer class="m-auto w-11/12 max-w-2xl" />
    <A2H />
  </div>
</template>

<script>
import Header from './app/Header';
import Form from './app/Form';
import List from './app/List';
import Footer from './app/Footer';
import A2H from './app/A2H';
import uuid from 'uuid/v4';
import idb from './app/vendor/db';

export default {
  data() {
    return {
      items: [],
    };
  },
  components: {
    Header,
    Form,
    List,
    Footer,
    A2H,
  },
  methods: {
    itemsAdd: function(title) {
      this.items = [
        {
          title,
          id: uuid(),
          done: false,
        },
        ...this.items,
      ];
    },
    itemsRemove: function(id) {
      this.items = this.items.filter(item => id !== item.id);
    },
    itemsSet: function(id, done) {
      this.items = this.items.map(item =>
        item.id === id ? { ...item, done } : item
      );
    },
  },
  watch: {
    items: function(newVal) {
      idb.set('items', newVal);
    },
  },
  mounted() {
    idb.get('items').then(items => {
      this.items = items || [];
    });
  },
};
</script>
