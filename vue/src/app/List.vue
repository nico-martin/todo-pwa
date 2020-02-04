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
        class="mr-4 focus:shadow-outline focus:outline-none cursor-pointer"
        :title="item.done ? `mark as not yet done` : 'mark as done'"
      />
      <span :class="`${item.done ? `line-through` : ''} mr-4 inline-block`">
        {{ item.title }}
      </span>
      <button
        @click="() => itemsRemove(item.id)"
        class="ml-auto text-red-600 hover:text-red-800 c-list-item__delete"
        title="delete list item"
      >
        delete list item
      </button>
    </li>
  </ul>
</template>
<script>
import './List.css';

export default {
  props: {
    items: Array,
    itemsRemove: Function,
    itemsSet: Function,
  },
  data() {
    return {};
  },
};
</script>
