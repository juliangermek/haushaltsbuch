import { createStore } from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "./db";

const store = createStore({
  state() {
    return {
      entries: [],
    };
  },

  mutations: vuexfireMutations,

  actions: {
    bindEntries: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef("entries", db.collection("Items"));
    }),
  },

  getters: {
    entries(state) {
      return state.entries;
    },
  },
});

store.dispatch("bindEntries");
export default store;
