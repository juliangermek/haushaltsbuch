<template>
  <h3>Store Entries</h3>
  <p>{{ entries }}</p>
</template>

<script>
export default {
  computed: {
    entries() {
      console.log("Getting entries");
      console.log(this.$store.getters.entries);
      return this.$store.getters.entries;
    },
  },
};
</script>
