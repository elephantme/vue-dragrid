var store = {};

export default {
  set(key, val) {
    store[key] = val;
  },

  get(key) {
    return store[key];
  },

  remove(key) {
    store[key] = null;
    delete store[key];
  }
};