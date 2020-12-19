<template>
  <base-layout page-title="Einträge">
    <template v-slot:actions-end>
      <ion-button router-link="/tabs/entries/add">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>

    <ion-content class="ion-padding">

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
    return { add };
  },
  computed: {
    entries() {
      return this.$store.getters.entries;
    }
  },
};
</script>