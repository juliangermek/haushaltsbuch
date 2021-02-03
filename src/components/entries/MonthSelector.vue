<template>
  <ion-button @click="prevSlide" :disabled="disablePrevBtn">
    <ion-icon slot="icon-only" :icon="chevronBack"></ion-icon>
  </ion-button>

  <ion-slides
    ref="mySlider"
    pager="true"
    :options="slideOpts"
    @ionSlideDidChange="slideChanged"
  >
    <ion-slide v-for="month in entriesMonths" :key="month.index">
      <span>{{ month.displayMonth }}</span>
    </ion-slide>
  </ion-slides>

  <ion-button @click="nextSlide" :disabled="disableNextBtn">
    <ion-icon slot="icon-only" :icon="chevronForward"></ion-icon>
  </ion-button>

  <p>activeSlide: {{activeMonth}}</p>
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

  props: [
    "entriesMonths"
  ],

  data() {
    return {
      chevronBack,
      chevronForward,
      slideOpts: {
        initialSlide: this.activeMonth,
        speed: 400,
        pagination: false,
      },
      disablePrevBtn: true,
      disableNextBtn: false,

      activeMonth: 0,
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
      const s = await this.$refs.mySlider.$el.getSwiper();

      const sliderLength = s.slides.length;
      const activeSlide = s.activeIndex;

      // Update activeMonth
      this.activeMonth = activeSlide;

      // Update availability
      this.disablePrevBtn = activeSlide === 0;
      this.disableNextBtn = activeSlide === sliderLength - 1;
    },
  },
};
</script>

<style scoped>
ion-slide {
  height: 50px;
}
</style>
