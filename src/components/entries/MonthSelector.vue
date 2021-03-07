<template>
  <ion-slides
    ref="mySlider"
    pager="true"
    :options="slideOpts"
    @ionSlideDidChange="slideChanged"
  >
    <ion-slide>
      Initialize
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

  emits: ["change-active-slide"],

  data() {
    return {
      slideOpts: {
        initialSlide: this.$store.getters.entriesMonths.length - 1, // Start with newest slide/month
        speed: 300,
        pagination: false,
      },
    };
  },
  computed: {
    entriesMonths() {
      return this.$store.getters.entriesMonths;
    },
  },

  // Update slider when store changed
  watch: {
    async entriesMonths(val) {
      const s = await this.$refs.mySlider.$el.getSwiper();
      const entriesMonths = val;
      s.removeAllSlides();
      for (var i = 0; i < entriesMonths.length; i++) {
        const month = entriesMonths[i].displayMonth
        s.appendSlide("<ion-slide>" + month + "</ion-slide>");
      }
      s.update();
      s.slideTo(entriesMonths.length - 1);
    },
  },

  methods: {
    async slideChanged() {
      // Get slider
      const s = await this.$refs.mySlider.$el.getSwiper();
      // Update activeSlide and button availability
      const activeSlide = s.activeIndex;
      console.log("changed to " + activeSlide);
      this.$emit("change-active-slide", activeSlide);
    },
  },

  // Initialize slider
  async mounted () {
    const s = await this.$refs.mySlider.$el.getSwiper();
    const entriesMonths = this.entriesMonths;
    s.removeAllSlides();
    for (var i = 0; i < entriesMonths.length; i++) {
      const month = entriesMonths[i].displayMonth
      s.appendSlide("<ion-slide>" + month + "</ion-slide>");
    }
    s.update();
    s.slideTo(entriesMonths.length - 1);
  }
};
</script>

<style scoped>
ion-slide {
  height: 50px;
}
</style>
