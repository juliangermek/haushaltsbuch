import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      entries: [
        {
          id: 1,
          date: "2020-04-15T14:48:00.000Z",
          type: "expense",
          category: "Lebensmittel",
          amount: 15.24,
          note: "Edeka"
        },
        {
          id: 2,
          date: "2020-04-13T14:48:00.000Z",
          type: "expense",
          category: "Mobilität",
          amount: 2.31,
          note: "Edeka"
        },
        {
          id: 3,
          date: "2020-10-28T14:48:00.000Z",
          type: "income",
          category: "Gehalt",
          amount: 2000.00,
          note: "Edeka"
        },
      ],
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
    };
  },
  getters: {
    entries(state) {
      return state.entries;
    },
    categories(state) {
      return state.categories;
    },
  },
  mutations: {
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
    }
  },
  actions: {
    addEntry(context, entryData) {
      context.commit("addEntry", entryData); // Place to store in backend server
    }
  },
});

export default store;