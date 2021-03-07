<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Stats</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <month-overview></month-overview>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/vue';

import MonthOverview from "../components/stats/MonthOverview.vue";

export default {
  components: { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, MonthOverview }
};
</script>