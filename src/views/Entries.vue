<template>
  <base-layout page-title="Einträge">
    <template v-slot:actions-end>
      <ion-button router-link="/tabs/entries/add">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>

    <ion-content class="ion-padding">
      <!-- <ion-button color="medium" @click="toggleSort">Reihenfolge umkehren</ion-button> -->
      <entry-list :entries="entries"></entry-list>
    </ion-content>
  </base-layout>
</template>

<script>
import { IonButton, IonIcon, IonContent, } from "@ionic/vue";
import { add } from "ionicons/icons";

import EntryList from "../components/entries/EntryList.vue";

export default {
  components: {
    IonButton,
    IonIcon,
    IonContent,
    EntryList,
  },
  data() {
    return {
      add,
      oldestFirst: false,
    };
  },
  computed: {
    entries() {
      var entires = this.$store.getters.entries;

      var order = this.oldestFirst ? 1 : -1;
      entires.sort(function(a, b) { // this wegmachen?
        a = new Date(a.date);
        b = new Date(b.date);
        var results = a > b ? -1 : a < b ? 1 : 0;
        return results * order;
      });

      return entires;
    }
  },
  methods: {
    toggleSort: function() {
      this.oldestFirst = !this.oldestFirst;
    }
  },
};
</script>