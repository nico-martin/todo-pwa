<template>
  <div class="w-11/12 max-w-lg mx-auto my-16">
    <p class="text-center" v-if="isEmptyItemsList">
      <slot name="empty">Yay, you have nothing to do!</slot>
    </p>
    <transition-group v-else name="list" tag="ul" class="border-gray-300 border-b">
      <li
        :key="todo.id"
        v-for="todo in todos"
        class="flex w-full border-gray-300 border-t p-4 items-center text-sm hover:bg-white c-list-item"
      >
        <slot v-bind="{todo, remove, toggle}"/>
      </li>
    </transition-group >
  </div>
</template>

<script>
import PushReminder from './List/PushReminder';
export default {
  components: {
    PushReminder,
  },
  props: {
    todos: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    isEmptyItemsList() {
      return this.todos.length === 0
    }
  },
  data() {
    return {};
  },
  methods: {
    remove(id) {
      const items = this.todos.filter(item => id !== item.id);
      this.$emit('update', items)
    },
    toggle(id) {
      const items = this.todos.map(item => item.id === id ? { ...item, done: !item.done} : item);
      this.$emit('update', items)
    },
  }
};
</script>

<style scoped>
.list-enter-active {
  transition: all 200ms ease-in;
}

.list-leave-active {
  transition: all 200ms ease-out;
}

.list-enter { /* .list-leave-active below version 2.1.8 */
  opacity: 0;
  transform: translateY(-60px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(100vw);
}
</style>
