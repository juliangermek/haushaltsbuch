import { createStore } from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "./db";
import firebase from "firebase";

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

    addItem: firestoreAction(async ({ state }, { newItemsData }) => {
      console.log(state);
      await db.collection("Items").add({ value: newItemsData, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
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
