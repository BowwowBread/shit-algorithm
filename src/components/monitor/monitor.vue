<template>
    <div id="monitor">
            <div class="button">

            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'monitor',
    data() {
      return {

      };
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        this.$store.commit('loadingOff');
        this.$Progress.finish();
      });
    },
  };
</script>
<style src="../../assets/css/monitor.css" scoped></style>