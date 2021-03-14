import { createStore } from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "./db";
import firebase from "firebase";

import moment from "moment";
import "moment/locale/de"; // without this line it didn't work
moment.locale("de");

const store = createStore({
  state() {
    return {
      categories: [
        {
          type: "expense",
          name: "Wohnen",
        },
        {
          type: "expense",
          name: "Haushalt",
        },
        {
          type: "expense",
          name: "Lebensmittel",
        },
        {
          type: "income",
          name: "Gehalt",
        },
        {
          type: "income",
          name: "Geldgeschenk",
        },
      ],

      entries: [
        // {
        //   id: 1,
        //   date: "2020-10-15T14:48:00.000Z",
        //   type: "expense",
        //   category: "Lebensmittel",
        //   amount: 15.24,
        //   note: "Edeka",
        // },
        // {
        //   id: 2,
        //   date: "2020-12-13T14:48:00.000Z",
        //   type: "expense",
        //   category: "Mobilität",
        //   amount: 2.31,
        //   note: "Edeka",
        // },
        // {
        //   id: 3,
        //   date: "2020-11-28T14:48:00.000Z",
        //   type: "income",
        //   category: "Gehalt",
        //   amount: 2000.0,
        //   note: "Edeka",
        // },
        // {
        //   id: 4,
        //   date: "2020-11-14T14:48:00.000Z",
        //   type: "expense",
        //   category: "Wohnen",
        //   amount: 59.99,
        //   note: "Stuhl",
        // },
        // {
        //   id: 5,
        //   date: "2019-11-14T14:48:00.000Z",
        //   type: "expense",
        //   category: "Lebensmittel",
        //   amount: 123.45,
        //   note: "Steaks",
        // },
        // {
        //   id: 6,
        //   date: "2020-12-19T14:48:00.000Z",
        //   type: "expense",
        //   category: "Haushalt",
        //   amount: 22,
        //   note: "Putzmittel",
        // },
        // {
        //   id: 7,
        //   date: "2020-12-20T14:48:00.000Z",
        //   type: "expense",
        //   category: "Haushalt",
        //   amount: 11,
        //   note: "Mehr Putzmittel",
        // },
      ],
    };
  },

  mutations: vuexfireMutations,

  actions: {
    bindEntries: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("entries", db.collection("Items"));
    }),

    addEntry: firestoreAction(async ({ state }, { entryData }) => {
      console.log(state);
      await db.collection("Items").add({
        date: entryData.date,
        type: entryData.type,
        category: entryData.category,
        amount: entryData.amount,
        note: entryData.note,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }),
  },

  getters: {
    entries(state) {
      return state.entries;
    },

    sorted_entries(state) {
      var sorted_entries = state.entries;

      //Sort entries
      var order = -1;
      sorted_entries.sort(function(a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        var results = a > b ? -1 : a < b ? 1 : 0;
        return results * order;
      });
      return sorted_entries;
    },

    categories(state) {
      return state.categories;
    },

    entriesMonths(state) {
      // Return an ordered arrays of all months present among entries
      var entriesMonths = [];
      var months_unique = [];
      var current_index = 0;

      const entries = state.entries;

      //Sort entries
      var order = -1;
      entries.sort(function(a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        var results = a > b ? -1 : a < b ? 1 : 0;
        return results * order;
      });

      // Add entry if not present yet
      for (var i in entries) {
        var month = moment(String(entries[i].date)).format("MM");
        var year = moment(String(entries[i].date)).format("YYYY");
        var displayMonth = moment(String(entries[i].date)).format("MMMM YYYY");

        if (!months_unique.includes(displayMonth)) {
          // Push if displayMonth not existent yet
          months_unique.push(displayMonth);
          entriesMonths.push({
            index: current_index,
            month: month,
            year: year,
            displayMonth: displayMonth,
          });
          current_index++;
        }
      }

      return entriesMonths;
    },
  },
});

store.dispatch("bindEntries");
export default store;
