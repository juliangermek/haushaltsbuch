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

  props: ["entriesMonths"],

  data() {
    return {
      chevronBack,
      chevronForward,
      disablePrevBtn: true,
      disableNextBtn: false,

      slideOpts: {
        initialSlide: this.entriesMonths.length - 1, // Start with newest slide / month
        speed: 300,
        pagination: false,
      },
      activeSlide: 0,
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

      // Update activeSlide and button availability
      this.activeSlide = activeSlide;
      this.disablePrevBtn = activeSlide === 0;
      this.disableNextBtn = activeSlide === sliderLength - 1;

      // Update store
      const entriesMonths = this.entriesMonths;
      const activeEntriesMonths = entriesMonths.filter(
        (entriesMonths) => entriesMonths.index == activeSlide // get only months on activeSlide
      );

      const activeMonth = {
        month: activeEntriesMonths[0].month, // Simply take first one as they all have same value
        year: activeEntriesMonths[0].year, // Simply take first one as they all have same value
      };
      this.$store.dispatch("updateActiveMonth", activeMonth);
    },
  },
};
</script>

<style scoped>
ion-slide {
  height: 50px;
}
</style>
