<template>
  <base-layout page-title="Einloggen">
    <ion-card>
      <ion-card-content>
        <form @submit.prevent="submit_login">
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input v-model="email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input v-model="password" type="password"></ion-input>
          </ion-item>
          <br>
          <ion-button type="submit" expand="block">Einloggen</ion-button>
        </form>
        <br>
        <p align="center">Du hast noch keinen Account? <router-link to="/register" replace>Jetzt registrieren</router-link></p>
      </ion-card-content>
    </ion-card>
    <ion-card v-if="wasUnsuccessful" class="error-message">
      <ion-card-content>
        {{ errorMessage }}
      </ion-card-content>
    </ion-card>
    <p>auth.currentUser</p>
    {{auth.currentUser}}
    <br><br>
    <p>auth</p>
    {{auth}}
    

  </base-layout>
</template>

<script>
import { auth } from "../store/db";

import {
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonLabel,
  IonItem,
} from "@ionic/vue";

export default {
  components: {
    IonCard,
    IonCardContent,
    IonInput,
    IonButton,
    IonLabel,
    IonItem,
  },

  data() {
    return {
      email: "",
      password: "",
      error: "",
      wasSuccessful: false,
      wasUnsuccessful: false,
      errorMessage: "",
      auth: auth,
    };
  },

  methods: {
    async submit_login() {
      this.wasUnsuccessful = false;
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(data => {
          // E-Mail and PW match
          if (data.user.emailVerified) { // If E-Mail not verified
            this.errorMessage = "Deine E-Mail-Adresse ist nicht verifiziert. Klicke auf den Link in der E-Mail, um sie zu verifizieren.";
            this.wasUnsuccessful = true;
          } else {
            this.$router.replace("/tabs/entries");
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.code == "auth/invalid-email" || error.code == "auth/user-not-found") {
            this.errorMessage = "Diese E-Mail-Adresse existiert nicht in unserer Datenbank.";
          } else if (error.code == "auth/wrong-password") {
            this.errorMessage = "Dieses Passwort passt nicht zur E-Mail-Adresse.";
          } else {
            this.errorMessage = "Es ist ein unbekannter Fehler aufgetreten.";
          }
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
