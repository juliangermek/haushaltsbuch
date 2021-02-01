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
import { onMounted, ref } from 'vue';

export default {

  methods: {
    // nextSlide() {
    //   console.log("prevSlide");
    // }
  },

  components: {
    IonIcon,
    IonSlides,
    IonSlide,
    IonButton,
  },

  data() {
    return {
      chevronBack,
      chevronForward
    };
  },

  computed: {
    // activeSlide() {
    //   return this.myslider.getActiveIndex()
    // }
  },

  setup() {
    // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
    const slideOpts = {
      initialSlide: 1,
      speed: 400,
      pagination: false,
    };

    const mySlider = ref(null);
    const disablePrevBtn = ref(true);
    const disableNextBtn = ref(false);

    onMounted(()=>{
      // console.log(mySlider.value);
      // console.log(prevSlide);
    });

    const prevSlide = async () => {
      const s = await mySlider?.value?.$el.getSwiper();
      await s.slidePrev();
    }
    const nextSlide = async () => {
      const s = await mySlider?.value?.$el.getSwiper();
      await s.slideNext();
    }

    const slideChanged = async () => {
      // when slide changes, enable/disable respective buttons
      console.log("slide changed");
      const s = await mySlider?.value?.$el.getSwiper();
      
      const sliderLength = s.slides.length;
      const activeSlide = s.activeIndex;

      disablePrevBtn.value = activeSlide === 0;
      disableNextBtn.value = activeSlide === sliderLength-1;
    }

    return { slideOpts, mySlider, prevSlide, nextSlide, slideChanged, disablePrevBtn, disableNextBtn };
  },

};


</script>

<style scoped>
ion-slide {
  height: 50px;
}
</style>