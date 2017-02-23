<template>
    <div id="index">
        <div class="sigo_container">
            rank page
        </div>
    </div>
</template>

<script>
  export default {
    name: 'index',
    data() {
      return {
        userToken: '',
      };
    },
    created() {
      this.userToken = this.$cookie.get('userToken');
      if (this.userToken == null) {
        alert('로그인 해주세요');
        location.href = '/';
      }
    },
  };
</script>
