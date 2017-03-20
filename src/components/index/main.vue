<template>
  <div class="main">
    <div class="parallax">
      <swiper :options="swiperOption">
        <div class="parallax-bg" slot="parallax-bg" data-swiper-parallax="-23%">
        </div>
        <swiper-slide>
          <div data-swiper-parallax="-100">
            <vue-typer
              text='대회시스템'
              :repeat="Infinity"
              :shuffle='false'
              initial-action='typing'
              :pre-type-delay='70'
              :type-delay='70'
              :pre-erase-delay='2000'
              :erase-delay='250'
              erase-style='backspace'
              :erase-on-complete='false'
              caret-animation='smooth'
            ></vue-typer>
          </div>
          <br>
        </swiper-slide>
        <swiper-slide>
          <div data-swiper-parallax="-100">
            <vue-typer
              text='메세지2'
              :repeat="Infinity"
              :shuffle='false'
              initial-action='typing'
              :pre-type-delay='70'
              :type-delay='70'
              :pre-erase-delay='2000'
              :erase-delay='250'
              erase-style='backspace'
              :erase-on-complete='false'
              caret-animation='smooth'
            ></vue-typer>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div data-swiper-parallax="-100">
            <vue-typer
              text='메세지3'
              :repeat="Infinity"
              :shuffle='false'
              initial-action='typing'
              :pre-type-delay='70'
              :type-delay='70'
              :pre-erase-delay='2000'
              :erase-delay='250'
              erase-style='backspace'
              :erase-on-complete='false'
              caret-animation='smooth'
            ></vue-typer>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: 'parallax',
  data() {
    return {
      swiperOption: {
        parallax: true,
        speed: 600,
        autoplay: 5000,
        autoplayDisableOnInteraction: false,
      },
    };
  },
};
</script>
<style>
  .typed{
    color: #fff !important;
    font-size: 200%;
  }
  .vue-typer .custom.caret {
    display: none;
  }
  .vue-typer span {
    color: white !important;
  }
</style>
<style src="../../assets/css/main.css" scoped></style>

