<template>
  <base-layout page-title="Profil">
    <ion-button @click="signOut" expand="block">Ausloggen</ion-button>
    <ion-card v-if="wasUnsuccessful" class="error-message">
      <ion-card-content>
        Beim Ausloggen ist ein Fehler aufgetreten.
      </ion-card-content>
    </ion-card>
  </base-layout>
</template>

<script>
import { IonButton } from "@ionic/vue";
import { auth } from "../store/db";

export default {
  components: { IonButton },

  data() {
    return {
      wasUnsuccessful: false,
    }
  },

  methods: {
    signOut() {
      this.wasUnsuccessful = false;
      auth
        .signOut()
        .then(() => {
          // Sign-out successful.
          console.log("successfully signed out");
          this.$router.replace("/");
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
          this.wasUnsuccessful = true;
        });
    },
  },
};
</script>

<style scoped>
.error-message {
  background-color: tomato;
  color: black;
  text-align: center;
}
</style>