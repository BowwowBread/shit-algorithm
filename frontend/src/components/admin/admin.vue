<template>
    <div id="admin">
        <div class="sigo_container">
            <div class="adminPage" v-if="adminState">
            <div class="ui">
                <h1 class="ui header">ADMINPAGE</h1>
                <div class="ui secondary pointing menu">
                    <a class="item" v-on:click="click_member">회원관리</a>
                    <a class="item" v-on:click="click_list">개시판관리</a>
                    <a class="item" v-on:click="click_problem">문제관리</a>
                </div>
                    <div class="twelve wide stretched column">
                        <member v-if="memberState"></member>
                        <problemmanage v-if="problemState"></problemmanage>
                        <notice v-if="listState"></notice>
                    </div>
                </div>
        </div>
    </div>
    </div>

</template>

<script>
import member from './member.vue';
import problemmanage from './problemmange.vue';
import notice from './notice.vue';

export default {
  name: 'admin',
  components: {
    member,
    problemmanage,
    notice,
  },
  data() {
    return {
      adminid: '',
      adminpw: '',
      memberState: true,
      problemState: false,
      listState: false,
      adminState: false,
      userRating: '',
      members: [],
      problems: [],
      notice: [],
      userToken: '',
    };
  },
  created() {
//          토큰 테스트
    this.userToken = this.$cookie.get('userToken');
    if (this.userToken != null) {
      this.userToken = this.$cookie.get('userToken');
      this.$http.defaults.headers.common.Authorization = this.userToken;
      this.$http.get('/api/users/my-info')
        .then((resInfo) => {
          if (resInfo.status === 200) {
            this.userRating = resInfo.data.user.rating;
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
    if (this.userRating === 1) {
    	alert('어드민이 아닙니다');
    	location.href = '/';
    } else {
    	this.adminState = true;
    }
  },
  methods: {
    openModal() {
      $('.adminLogin').modal({
        blurring: true,
      }).modal('show');
    },
    closeModal() {
      $('.adminLogin').modal('hide');
    },
    click_problem() {
      this.memberState = false;
      this.problemState = true;
      this.listState = false;
    },
    click_member() {
      this.memberState = true;
      this.problemState = false;
      this.listState = false;
    },
    click_list() {
      this.memberState = false;
      this.problemState = false;
      this.listState = true;
    },
    // 어드민이 아닐경우
  },
};
</script>
<style src="../../assets/css/admin.css"></style>
