<template>
  <p class="text-center" v-if="items.length === 0">
    Yay, you have nothing to do!
  </p>
  <ul class="border-gray-300 border-b" v-else>
    <li
      v-for="item in items"
      class="flex w-full border-gray-300 border-t p-4 items-center text-sm hover:bg-white c-list-item"
    >
      <input
        type="checkbox"
        :checked="item.done"
        @change="() => itemsSet(item.id, !item.done)"
        :class="
          `mr-4 focus:shadow-outline focus:outline-none cursor-pointer ${
            item.done ? 'opacity-50' : ''
          }`
        "
        :title="item.done ? `mark as not yet done` : 'mark as done'"
      />
      <span
        :class="
          `${item.done ? `line-through text-gray-400` : ''} mr-4 inline-block`
        "
      >
        {{ item.title }}
      </span>
      <PushReminder
        :id="item.id"
        :title="item.title"
        class="ml-auto"
        v-if="!item.done"
      />
      <button
        @click="() => itemsRemove(item.id)"
        class="bg-gray-400 hover:bg-red-700 text-white w-4 h-4 rounded-full relative c-list-item__delete ml-auto"
        title="delete list item"
        v-if="item.done"
      >
        delete list item
      </button>
    </li>
  </ul>
</template>
<script>
import './List.css';
import PushReminder from './List/PushReminder';
export default {
  props: {
    items: Array,
    itemsRemove: Function,
    itemsSet: Function,
  },
  data() {
    return {};
  },
  components: {
    PushReminder,
  },
};
</script>
