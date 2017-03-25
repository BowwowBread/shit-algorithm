<template>
  <div id="contest_intro">
    대회 소개 페이지
  </div>
</template>
<script>
  export default {
    name: 'contestIntroduce',
    data() {
      return {
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.$store.commit('loadingOff');
        this.$Progress.finish();
      });
    },
  };
</script>

<style src="../../assets/css/contestintro.css" scoped></style>
