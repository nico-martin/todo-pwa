import { openDB } from 'idb';

const dbName = 'todo-pwa-vue';
const dbStore = 'data';

const dbPromise = openDB(dbName, 1, {
  upgrade(db) {
    db.createObjectStore(dbStore);
  },
});

export default {
  async get(key) {
    return (await dbPromise).get(dbStore, key);
  },
  async set(key, val) {
    return (await dbPromise).put(dbStore, val, key);
  },
  async delete(key) {
    return (await dbPromise).delete(dbStore, key);
  },
  async clear() {
    return (await dbPromise).clear(dbStore);
  },
  async keys() {
    return (await dbPromise).getAllKeys(dbStore);
  },
};
