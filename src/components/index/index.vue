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
      // 컴포넌트 등록
      parallax,
      timeline,
    },
    data() {
      return {
      };
    },
    created() {
      this.$nextTick(() => {
        // 데이터 갱신 완료시 프로그레스바, 로딩창 종료
        this.$store.commit('loadingOff');
        this.$Progress.finish();
      });
    },
  };
</script>
<style src="../../assets/css/index.css" scoped></style>