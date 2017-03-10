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

<style scoped>
  .main {
    height: 100%;
    z-index: 3;
  }
  .parallax {
    height: 100%;
  }
  .swiper-container {
    height: 100%;
  }

  .swiper-slide {
    font-size: 18px;
    color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 40px 60px;
    background-color: transparent !important;
    justify-content: space-around !important;
    height: 100%;
  }

  .parallax-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 130%;
    height: 100%;
    background-image: url(../../assets/img/bg.jpg);
    -webkit-background-size: cover;
    background-size: cover;
    background-position: center;
    height: 100%;
  }

  .swiper-slide {
    margin-top: 300px;
    text-align: center;
  }

  .swiper-slide .title {
    font-size: 41px;
    font-weight: 300;
    color: #fff;

  }

  .swiper-slide .subtitle {
    font-size: 21px;
    color: #fff;

  }

  .swiper-slide .text {
    font-size: 14px;
    max-width: 400px;
    line-height: 1.3;
    color: #fff;

  }
</style>
<style>
  /*.vue-typer {*/
    /*color: #fff !important;*/
  /*}*/
  .typed{
    color: #fff !important;
    font-size: 200%;
  }
  .vue-typer .custom.caret {
    display: none;
  }
</style>
