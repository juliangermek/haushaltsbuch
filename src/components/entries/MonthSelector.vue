<template>
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
</template>

<script>
import { IonSlides, IonSlide } from "@ionic/vue";

export default {
  components: {
    IonSlides,
    IonSlide,
  },

  props: ["entriesMonths"],

  data() {
    return {
      slideOpts: {
        initialSlide: this.entriesMonths.length - 1, // Start with newest slide/month
        speed: 300,
        pagination: false,
      },
    };
  },

  methods: {
    async slideChanged() {
      // Get slider
      const s = await this.$refs.mySlider.$el.getSwiper();

      // Update activeSlide and button availability
      const activeSlide = s.activeIndex;
      console.log("changed to " + activeSlide)
      this.$emit('change-active-slide', activeSlide);
    },
  },
};
</script>

<style scoped>
ion-slide {
  height: 50px;
}
</style>
