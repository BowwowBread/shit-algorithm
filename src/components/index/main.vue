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
          <!--<div class="subtitle" data-swiper-parallax="-200">Subtitle</div>-->
          <!--<div class="text" data-swiper-parallax="-300">-->
            <!--<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit-->
              <!--amet-->
              <!--faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in-->
              <!--sem-->
              <!--justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit-->
              <!--lorem-->
              <!--at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia-->
              <!--nec,-->
              <!--tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>-->
          <!--</div>-->
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
          <!--<div class="subtitle" data-swiper-parallax="-200">Subtitle</div>-->
          <!--<div class="text" data-swiper-parallax="-300">-->
            <!--<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit-->
              <!--amet-->
              <!--faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in-->
              <!--sem-->
              <!--justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit-->
              <!--lorem-->
              <!--at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia-->
              <!--nec,-->
              <!--tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>-->
          <!--</div>-->
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
          <!--<div class="subtitle" data-swiper-parallax="-200">Subtitle</div>-->
          <!--<div class="text" data-swiper-parallax="-300">-->
            <!--<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dictum mattis velit, sit-->
              <!--amet-->
              <!--faucibus felis iaculis nec. Nulla laoreet justo vitae porttitor porttitor. Suspendisse in-->
              <!--sem-->
              <!--justo. Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod. Aliquam hendrerit-->
              <!--lorem-->
              <!--at elit facilisis rutrum. Ut at ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia-->
              <!--nec,-->
              <!--tincidunt ut libero. Aenean feugiat non eros quis feugiat.</p>-->
          <!--</div>-->
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

