<template>
    <div id="problems">
        <div class="sigo_container">
            <problemlist></problemlist>

        </div>

    </div>
</template>

<script>
import problemlist from './problemlist.vue';

export default {
  name: 'index',
  components: {
    problemlist,
  },
  data() {
    return {

    };
  },
  created() {
    //      토큰 테스트
    this.userToken = this.$cookie.get('userToken');
    if (this.userToken != null) {
      this.userToken = this.$cookie.get('userToken');
      this.$http.defaults.headers.common.Authorization = this.userToken;
      this.$http.get('/api/users/my-info')
        .then((resInfo) => {
          if (resInfo.status === 200) {
            this.userid = resInfo.data.user.userId;
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert('로그인해주세요');
      location.href = '/';
    }
  },
};

</script>
<style src="../../assets/css/problems.css" scoped></style>
