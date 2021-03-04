<template>
  <ion-slides>
    <ion-slide v-for="month in entriesMonths" :key="month.index">
      {{ month.displayMonth }}
    </ion-slide>
  </ion-slides>

  <p v-for="month in entriesMonths" :key="month.index">
    <span>{{ month.displayMonth }}</span>
  </p>

  <ion-button color="primary" @click="add()">
    Add
  </ion-button>
</template>

<script>
import { IonButton } from "@ionic/vue";
import { IonSlides, IonSlide } from "@ionic/vue";
import moment from "moment";

export default {
  components: {
    IonSlides,
    IonSlide,
    IonButton,
  },

  data() {
    return {
      entries: [
        {
          id: 1,
          date: "2020-10-15T14:48:00.000Z",
        },
        {
          id: 2,
          date: "2020-12-13T14:48:00.000Z",
        },
        {
          id: 3,
          date: "2020-11-28T14:48:00.000Z",
        },
        {
          id: 4,
          date: "2020-11-14T14:48:00.000Z",
        },
      ],
    };
  },

  computed: {
    entriesMonths() {
      // Return an ordered arrays of all months present among entries
      var entriesMonths = [];
      var months_unique = [];
      var current_index = 0;

      const entries = this.entries;

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
  methods: {
    add() {
      const newEntry = {
        id: 5,
        date: "2019-11-14T14:48:00.000Z",
      };
      this.entries.push(newEntry);
    },
  },
};
</script>
