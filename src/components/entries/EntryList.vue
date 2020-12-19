<template>

  <ion-list>
    <entry-list-item
      v-for="entry in entries"
      :key="entry.id"
      :entry="entry"
    ></entry-list-item>
  </ion-list>

</template>

<script>
import { IonList, } from "@ionic/vue";

import EntryListItem from "./EntryListItem.vue";

export default {
  props: ["entries"],
  components: {
    IonList,
    EntryListItem
  },
};
</script>
