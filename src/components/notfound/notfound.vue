<template>
  <div class="notfound">
    <div class="notfound_container">
      <img src="../../assets/img/sigo_404.png" alt="">
      <span>페이지가 존재하지 않습니다.</span>
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
        // 데이터 갱신 완료시 프로그레스바, 로딩창 종료
        this.$store.commit('loadingOff');
        this.$Progress.finish();
      });
    },
  };
</script>

<style src="../../assets/css/404.css" scoped>
  
</style>