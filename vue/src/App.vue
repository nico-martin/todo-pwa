<template>
  <div class="flex flex-col justify-start">
    <div class="bg-green-800 text-white w-full shadow-lg sticky top-0">
      <Header class="w-11/12 max-w-lg mx-auto" />
    </div>
    <Form class="w-11/12 max-w-lg mx-auto mt-10" @submit="itemsAdd" />
    <List :todos="items" @update="updateList">
      <template #default="{todo, toggle, remove}">
        <Todo :todo="todo" @toggle="toggle" @remove="remove"/>
      </template>
    </List>
    <Footer class="m-auto w-11/12 max-w-2xl" />
    <A2H />
  </div>
</template>

<script>
import Header from './app/Header';
import Form from './app/Form';
import List from './app/List';
import Todo from './app/ListItem';
import Footer from './app/Footer';
import A2H from './app/A2H';
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
    Todo
  },
  methods: {
    updateList(list) {
      this.items = list
    },
    itemsAdd(todo) {
      this.items = [todo, ...this.items]
    },
    getItems() {
      return idb.get('items').then(items => {
        this.items = items || []
        return itesm
      })
      return items
    }
  },
  watch: {
    // Whenever the items Array changes, the new Values should be stored in idb
    items(newVal) {
      idb.set('items', newVal);
    },
  },
  mounted() {
    // on mount, the items from the idb should be set
    this.getItems()
  },
};
</script>
