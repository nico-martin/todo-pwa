<template>
  <div class="flex-1 flex">
    <label class="block flex-1">
      <input
        type="checkbox"
        :checked="todo.done"
        @change="$emit('toggle', todo.id)"
        :class="checkboxClass"
      />
      <span :class="textClass">
        {{ todo.title }}
      </span>
    </label>
    <PushReminder
      :id="todo.id"
      :title="todo.title"
      class="ml-auto"
      v-if="!todo.done"
    />
    <button
      @click="$emit('remove', todo.id)"
      class="bg-gray-400 hover:bg-red-700 text-white w-4 h-4 rounded-full relative c-list-item__delete"
      title="delete list item"
      v-if="todo.done"
    ><span class="sr-only">delete list item</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4"><path class="fill-current"  d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"/></svg>
    </button>
  </div>
</template>

<script>
import PushReminder from './List/PushReminder';
export default {
  components: {
    PushReminder
  },
  props: {
    todo: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  computed: {
    textClass() {
      return `${this.todo.done ? `line-through text-gray-400` : ''} mr-4 inline-block`
    },
    checkboxClass() {
      return `mr-4 focus:shadow-outline focus:outline-none cursor-pointer ${this.todo.done ? 'opacity-50' : ''}`
    }
  }
}
</script>

<style src="./ListItem.css"></style>
