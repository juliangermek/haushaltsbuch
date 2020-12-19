import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      entries: [
        {
          id: 1,
          date: "15.04.2020",
          type: "expense",
          category: "Lebensmittel",
          amount: 15.24,
          note: "Edeka"
        },
        {
          id: 2,
          date: "17.04.2020",
          type: "expense",
          category: "Mobilität",
          amount: 2.31,
          note: "Edeka"
        },
        {
          id: 3,
          date: "28.04.2020",
          type: "income",
          category: "Gehalt",
          amount: 2000.00,
          note: "Edeka"
        },
      ],
    };
  },
  getters: {
    entries(state) {
      return state.entries;
    },
    // getElementById: (state) => (id) => {
    //   return state.elements.find(ele => ele.id == id)
    // },
  }
});

export default store;