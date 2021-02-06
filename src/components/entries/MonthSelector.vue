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
        initialSlide: this.entriesMonths.length - 1, // Start with newest slide / month
        speed: 300,
        pagination: false,
      },
      activeSlide: 0,
    };
  },

  methods: {
    async slideChanged() {
      // Get slider
      const s = await this.$refs.mySlider.$el.getSwiper();

      // Update activeSlide and button availability
      const activeSlide = s.activeIndex;
      this.activeSlide = activeSlide;

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
