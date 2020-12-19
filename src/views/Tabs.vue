<template>
  <ion-page>
    hello
    <ion-tabs @ionTabsWillChange="beforeTabChange" @ionTabsDidChange="afterTabChange">
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="entries" href="/tabs/entries">
          <ion-icon :icon="list"></ion-icon>
          <ion-label>Einträge</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="stats" href="/tabs/stats">
          <ion-icon :icon="statsChart"></ion-icon>
          <ion-label>Statistiken</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script>
import { 
  IonIcon, 
  IonLabel, 
  IonPage,
  IonTabBar, 
  IonTabButton, 
  IonTabs
} from '@ionic/vue';
import { list, statsChart } from 'ionicons/icons';

export default {
  components: { IonIcon, IonLabel, IonPage, IonTabBar, IonTabButton, IonTabs },
  setup() {
    const beforeTabChange = () => {
      // do something before tab change
    }
    const afterTabChange = () => {
      // do something after tab change
    }
    return {
      list,
      statsChart,
      beforeTabChange,
      afterTabChange
    }
  }
};
</script>