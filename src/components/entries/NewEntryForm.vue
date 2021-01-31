<template>
  <form class="ion-padding" @submit.prevent="submitForm">
    <ion-list>
      <ion-item>
        <ion-label>Datum</ion-label>
        <ion-datetime
          display-format="DD.MM.YYYY"
          v-model="selectedDate"
        ></ion-datetime>
      </ion-item>

      <ion-item>
        <ion-label>Typ</ion-label>
        <ion-select
          interface="action-sheet"
          value="expense"
          v-model="selectedCategoryType"
        >
          <ion-select-option value="expense" selected
            >Ausgabe</ion-select-option
          >
          <ion-select-option value="income">Einkommen</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-label>Kategorie</ion-label>
        <ion-select
          interface="action-sheet"
          v-model="selectedCategory"
          aria-required="required"
        >
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
        <ion-input
          align="right"
          type="number"
          min="0"
          step="0.01"
          v-model="enteredAmount"
          required
        ></ion-input>
        <span slot="end">€</span>
      </ion-item>

      <ion-item>
        <ion-label>Notiz</ion-label>
        <ion-input align="right" type="text" v-model="enteredNote"></ion-input>
      </ion-item>
    </ion-list>
    <ion-button expand="full" type="submit">Eintrag speichern</ion-button>
  </form>
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
  data() {
    return {
      selectedDate: new Date().toISOString(),
      selectedCategoryType: "expense",
      selectedCategory: "",
      enteredAmount: "",
      enteredNote: "",
    };
  },
  emits: ["add-entry"],
  methods: {
    submitForm() {
      // Validation could be here
      const entryData = {
        date: this.selectedDate,
        type: this.selectedCategoryType,
        category: this.selectedCategory,
        amount: this.enteredAmount,
        note: this.enteredNote,
      };
      this.$emit("add-entry", entryData);
    },
  },
  computed: {
    filteredCategories: function() {
      return this.categories.filter(
        (category) => category.type == this.selectedCategoryType
      );
    },
    categories() {
      return this.$store.getters.categories;
    },
  },
};
</script>
