<template>
  <div id="index" style="margin-bottom:1000px;">
    <div class="sigo_container">
      <parallax></parallax>
      <!--<menubar></menubar>-->
    </div>
    <div class="sigo_container">
      <timeline></timeline>
    </div>
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