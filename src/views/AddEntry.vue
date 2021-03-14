<template>
  <base-layout
    page-title="Eintrag hinzufügen"
    default-back-link="/tabs/entries"
  >
    <new-entry-form @add-entry="addEntry"></new-entry-form>
  </base-layout>
</template>

<script>
import {} from "@ionic/vue";
import NewEntryForm from '@/components/entries/NewEntryForm.vue';

export default {
  components: {
    NewEntryForm,
  },
  methods: {
    addEntry(entryData) {
      this.$store.dispatch("addEntry", {entryData: entryData});
      this.$router.replace("/"); //replace: no going back (as against 'push')
    }
  }
};
</script>
