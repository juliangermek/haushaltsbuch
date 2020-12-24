<template>
  <ion-item>
    <ion-label>Typ</ion-label>
    <ion-select interface="action-sheet" value="expense" v-model="selectedCategoryType">
      <ion-select-option value="expense" selected>Expense</ion-select-option>
      <ion-select-option value="income">Income</ion-select-option>
    </ion-select>
  </ion-item>
</template>

<script>
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/vue";
export default {
  components: { IonItem, IonLabel, IonSelect, IonSelectOption },
  data() {
    return {
      selectedCategoryType: "expense",
    }
  }
}
</script>