<template>
  <ion-slides
    ref="mySlider"
    pager="true"
    :options="slideOpts"
    @ionSlideDidChange="slideChanged"
  >
    <ion-slide>
      <span>Juli 2020</span>
    </ion-slide>
    <ion-slide>
      <span>August 2020</span>
    </ion-slide>
    <ion-slide>
      <span>September 2020</span>
    </ion-slide>
  </ion-slides>
  
  <ion-button @click="prevSlide" :disabled="disablePrevBtn">
    <ion-icon slot="icon-only" :icon="chevronBack"></ion-icon>
  </ion-button>  
  <ion-button @click="nextSlide" :disabled="disableNextBtn">
    <ion-icon slot="icon-only" :icon="chevronForward"></ion-icon>
  </ion-button>

</template>

<script>
import { IonIcon, IonSlides, IonSlide, IonButton } from "@ionic/vue";
import { chevronBack, chevronForward } from "ionicons/icons";

export default {

  components: {
    IonIcon,
    IonSlides,
    IonSlide,
    IonButton,
  },

  data() {
    return {
      chevronBack,
      chevronForward,
      slideOpts: {
        initialSlide: 0,
        speed: 400,
        pagination: false,
      },
      disablePrevBtn: true,
      disableNextBtn: false,
    };
  },

  methods: {
    async prevSlide() {
      const s = await this.$refs.mySlider.$el.getSwiper();
      await s.slidePrev();
    },
    async nextSlide() {
      const s = await this.$refs.mySlider.$el.getSwiper();
      await s.slideNext();
    },
    async slideChanged() {
      console.log("slide changed 2");

      const s = await this.$refs.mySlider.$el.getSwiper();

      const sliderLength = s.slides.length;
      const activeSlide = s.activeIndex;

      this.disablePrevBtn = activeSlide === 0;
      this.disableNextBtn = activeSlide === sliderLength-1;
    },
  },

};


</script>

<style scoped>
ion-slide {
  height: 50px;
}
</style>