<template>
  <div class="notfound">
    <div class="notfound_img">
      <img src="../../assets/img/sigo_404.png" alt="">
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    beforeCreate() {
    this.$nextTick(() => {
      this.$store.commit('loadingOff');
      this.$Progress.finish();
    });
    },
  };
</script>
<style src="../../assets/css/404.css" scoped></style>