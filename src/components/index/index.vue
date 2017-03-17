<template>
  <div id="index">
    <div class="sigo_container">
      <parallax></parallax>
      <timeline></timeline>
      <!--<menubar></menubar>-->
    </div>
    <!--<div class="sigo_container">-->
    <!--</div>-->
  </div>
</template>

<script>
  import timeline from './timeline.vue';
  import parallax from './main.vue';

  export default {
    name: 'index',
    components: {
      parallax,
      timeline,
    },
    data() {
      return {

      };
    },
    created() {
      this.$nextTick(() => {
        this.$store.commit('loadingOff');
        this.$Progress.finish();
      });
    },
  };
</script>
<style src="../../assets/css/index.css" scoped></style>