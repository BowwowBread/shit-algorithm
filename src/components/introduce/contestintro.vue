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
      // 데이터 갱신 완료시 프로그레스바, 로딩창 종료
        this.$store.commit('loadingOff');
        this.$Progress.finish();
      });
    },
  };
</script>

<style src="../../assets/css/contestintro.css" scoped></style>
