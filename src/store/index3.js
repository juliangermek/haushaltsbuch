import { createStore } from "vuex";

import moment from "moment";
import "moment/locale/de"; // without this line it didn't work
moment.locale("de");

const store = createStore({
  state() {
    return {
      categories: [
        {
          type: "expense",
          key: "living",
          value: "Wohnen",
        },
        {
          type: "expense",
          key: "household",
          value: "Haushalt",
        },
        {
          type: "expense",
          key: "groceries",
          value: "Lebensmittel",
        },
        {
          type: "income",
          key: "salary",
          value: "Gehalt",
        },
        {
          type: "income",
          key: "gift",
          value: "Geldgeschenk",
        },
      ],

      entries: [
        {
          id: 1,
          date: "2020-10-15T14:48:00.000Z",
          type: "expense",
          category: "Lebensmittel",
          amount: 15.24,
          note: "Edeka",
        },
        {
          id: 2,
          date: "2020-12-13T14:48:00.000Z",
          type: "expense",
          category: "Mobilität",
          amount: 2.31,
          note: "Edeka"
        },
        // {
        //   id: 3,
        //   date: "2020-11-28T14:48:00.000Z",
        //   type: "income",
        //   category: "Gehalt",
        //   amount: 2000.00,
        //   note: "Edeka"
        // },
        // {
        //   id: 4,
        //   date: "2020-11-14T14:48:00.000Z",
        //   type: "expense",
        //   category: "Wohnen",
        //   amount: 59.99,
        //   note: "Stuhl"
        // },
        // {
        //   id: 5,
        //   date: "2019-11-14T14:48:00.000Z",
        //   type: "expense",
        //   category: "Lebensmittel",
        //   amount: 123.45,
        //   note: "Steaks"
        // },
      ],

      entriesMonths: [],

      activeMonth: { month: 0, year: 0 },
    };
  },

  getters: {
    entries(state) {
      return state.entries;
    },
    categories(state) {
      return state.categories;
    },
    activeMonth(state) {
      return state.activeMonth;
    },
    entriesMonths(state) {
      return state.entriesMonths;
    },
  },

  mutations: {
    // Only once in beginning
    initialUpdateActiveMonth(state) {
      var entries = state.entries;

      //Sort entries
      var order = -1;
      entries.sort(function(a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        var results = a > b ? -1 : a < b ? 1 : 0;
        return results * order;
      });

      // Save newest month to store
      var newest_entry = entries[entries.length - 1];
      var newest_month = moment(String(newest_entry.date)).format("MM");
      var newest_year = moment(String(newest_entry.date)).format("YYYY");

      state.activeMonth.month = newest_month;
      state.activeMonth.year = newest_year;
    },

    updateEntriesMonths(state) {
      /* Create var "entriesMonths" that contains all available months in entries */
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
      state.entriesMonths = entriesMonths;
    },

    addEntry(state, entryData) {
      const newEntry = {
        id: new Date().toISOString(),
        date: entryData.date,
        type: entryData.type,
        category: entryData.category,
        amount: entryData.amount,
        note: entryData.note,
      };

      state.entries.push(newEntry);
    },

    updateActiveMonth(state, activeMonth) {
      state.activeMonth.month = activeMonth.month;
      state.activeMonth.year = activeMonth.year;
    },
  },

  actions: {
    addEntry(context, entryData) {
      context.commit("addEntry", entryData); // Place to store in backend server
      context.commit("updateEntriesMonths");
    },
    updateActiveMonth(context, activeMonth) {
      context.commit("updateActiveMonth", activeMonth); // Place to store in backend server
    },
  },
});

store.commit("initialUpdateActiveMonth");
store.commit("updateEntriesMonths");

export default store;
