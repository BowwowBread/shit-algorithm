<template>
    <div id="index">
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
};
</script>
<style src="../../assets/css/index.css" scoped></style>
