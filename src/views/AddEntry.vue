<template>
  <base-layout
    page-title="Eintrag hinzufügen"
    default-back-link="/tabs/entries"
  >
    <form class="ion-padding" @submit.prevent="submitForm">
      <ion-list>
        <ion-item>
          <ion-label>Datum</ion-label>
          <ion-datetime
            display-format="DD.MM.YYYY"
            v-bind:value="today"
          ></ion-datetime>
        </ion-item>

        <ion-item>
          <ion-label>Typ</ion-label>
          <ion-select interface="action-sheet" value="expense" v-model="selectedCategoryType">
            <ion-select-option value="expense" selected>Ausgabe</ion-select-option>
            <ion-select-option value="income">Einkommen</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-label>Kategorie</ion-label>
          <ion-select interface="action-sheet">
            <ion-select-option
              v-for="category in filteredCategories"
              :key="category.key"
              v-bind:value="category.key"
              >{{ category.value }}</ion-select-option
            >
          </ion-select>
        </ion-item>

        <ion-item>
          <ion-label>Betrag</ion-label>
          <ion-input align="right" type="number" min=0 step="0.01"></ion-input>
          <span slot="end">€</span>
        </ion-item>

        <ion-item>
          <ion-label>Notiz</ion-label>
          <ion-input align="right" type="text"></ion-input>
        </ion-item>

      </ion-list>
      <ion-button expand="full" type="submit">Eintrag speichern</ion-button>
    </form>

  </base-layout>
</template>

<script>
import {
  IonList,
  IonItem,
  IonButton,
  IonLabel,
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonInput,
} from "@ionic/vue";

export default {
  components: {
    IonList,
    IonItem,
    IonButton,
    IonLabel,
    IonDatetime,
    IonSelect,
    IonSelectOption,
    IonInput,
  },
  computed: {
    filteredCategories: function () {
      return this.categories.filter(category => category.type == this.selectedCategoryType)
    },
    categories() {
      return this.$store.getters.categories;
    }
  },
  data() {
    return {
      today: new Date().toISOString(),
      selectedCategoryType: "expense",
    };
  },
};
</script>
