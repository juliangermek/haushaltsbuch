<template>
  <ion-item-sliding>
    <ion-item>
      <ion-grid>
        <ion-row>
          <ion-col size="2">
            <span style="font-size:20px">{{ format_date(entry.date) }}</span>
          </ion-col>
          <ion-col size="5">
            <ion-row>
              <ion-col style="padding:0">
                {{ entry.category }}
              </ion-col>
            </ion-row>
            <ion-row>
              <ion-col style="padding:0">
                <span style="color:grey">{{ entry.note }}</span>
              </ion-col>
            </ion-row>
          </ion-col>
          <ion-col size="5" style="text-align: right">
            <div
              :class="[entry.type === 'expense' ? 'is_expense' : 'is_income']"
            >
              {{ entry.amount }} €
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-item>
    <p>{{ entry.date }}</p>

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
import {
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import { pencil, trash } from "ionicons/icons";
import moment from "moment";

export default {
  props: ["entry"],
  components: {
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
  },
  data() {
    return { pencil, trash };
  },
  methods: {
    format_date(value) {
      if (value) {
        return moment(String(value)).format("DD");
      }
    },
  },
};
</script>

<style scoped>
.date {
  background-color: var(--ion-color-medium);
  color: var(--ion-color-primary-contrast);
  padding: 3px;
  border-radius: 3px;
}
.is_expense {
  color: var(--ion-color-danger);
}
.is_income {
  color: var(--ion-color-success);
}

ion-row {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
