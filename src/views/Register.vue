<template>
  <base-layout page-title="Registrierung">
    <ion-card>
      <ion-card-content>
        <form @submit.prevent="submit_registration">
          <ion-item>
            <ion-label position="floating">Email</ion-label>
            <ion-input v-model="email"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label position="floating">Password</ion-label>
            <ion-input v-model="password" type="password"></ion-input>
          </ion-item>
          <ion-button type="submit">Account erstellen</ion-button>
        </form>
      </ion-card-content>
    </ion-card>
    <ion-card v-if="wasSuccessful" class="success-message">
      <ion-card-content>
        Dein Account wurde erfolgreich erstellt!
      </ion-card-content>
    </ion-card>
    <ion-card v-if="wasUnsuccessful" class="error-message">
      <ion-card-content>
        {{ errorMessage }}
      </ion-card-content>
    </ion-card>
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
    };
  },

  methods: {
    async submit_registration() {
      console.log("registering");
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.message = "Der Account wurde erfolgreich erstellt!";
          this.wasSuccessful = true;
          this.wasUnsuccessful = false;
        })
        .catch((error) => {
          console.log(error);
          if (error.code == "auth/email-already-in-use") {
            this.errorMessage = "Die E-Mail-Adresse ist schon vergeben.";
          } else if (error.code == "auth/invalid-email") {
            this.errorMessage = "Die E-Mail-Adresse ist schlecht formattiert.";
          } else if (error.code == "auth/weak-password") {
            this.errorMessage =
              "Das Passwort muss mindestens 6 Zeichen lang sein.";
          } else {
            this.errorMessage = "Es ist ein unbekannter fehler aufgetreten.";
          }
          this.wasSuccessful = false;
          this.wasUnsuccessful = true;
        });
    },
  },
};
</script>

<style scoped>
.success-message {
  background-color: lightgreen;
  color: black;
  text-align: center;
}
.error-message {
  background-color: tomato;
  color: black;
  text-align: center;
}
</style>
