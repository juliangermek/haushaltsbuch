<template>
  <p>hello!</p>
  {{items}}
</template>

<script>
import {db} from '../store/db';
export default {
  data() {
    return {
      items: [],
    }
  },

  methods: {

  },

  firestore: {
    items: db.collection("Items")
  }
}
</script>