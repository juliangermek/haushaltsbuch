<template>
  <ion-item-sliding>

    <ion-item>
      <div slot="start" class="date">{{ entry.date }}</div>
      <div>{{ entry.category }}</div>
      <div slot="end" :class="[entry.type === 'expense'  ? 'is_expense' : 'is_income']" >{{ entry.amount }} €</div>
    </ion-item>

    <ion-item-options>
      <ion-item-option color="primary">
        <ion-icon slot="icon-only" :icon="pencil"></ion-icon>
      </ion-item-option>
      <ion-item-option color="danger">
        <ion-icon slot="icon-only" :icon="trash"></ion-icon>
      </ion-item-option>
    </ion-item-options>

  </ion-item-sliding>
</template>

<script>
import { IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonIcon } from '@ionic/vue';
import { pencil, trash } from "ionicons/icons";

export default {
  props: ["entry"],
  components: {
    IonItem,
    IonItemOption, 
    IonItemOptions, 
    IonItemSliding,
    IonIcon,
  },
  data() {
    return { pencil, trash };
  },
}
</script>

<style scoped>
.date {
  background-color: var(--ion-color-medium);
  color: var(--ion-color-primary-contrast);
  padding:3px;
  border-radius:3px;
}
.is_expense {
  color: var(--ion-color-danger);
}
.is_income {
  color: var(--ion-color-success);
}
</style>