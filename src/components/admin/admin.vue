<template>
    <div id="admin" v-if="entering">
        <div class="sigo_container">
            <div class="adminPage" v-if="adminState"
             style=
             "background-color: white ;
              color: black;">
            <div class="ui">
                <h1 class="ui header admin">ADMINPAGE</h1>
                <div class="ui secondary pointing menu">
                    <a class="item" v-on:click="click_member">회원관리</a>
                    <a class="item" v-on:click="click_nonaccount">비승인 회원관리</a>
                    <a class="item" v-on:click="click_list">게시판관리</a>
                    <a class="item" v-on:click="click_problem">문제관리</a>
                    <a class="item" v-on:click="click_result">문제결과</a>
                </div>
                    <div class="twelve wide stretched column">
                        <member v-if="memberState"></member>
                        <nonaccount v-if="nonaccountState"></nonaccount>
                        <problemmanage v-if="problemState"></problemmanage>
                        <notice v-if="listState"></notice>
                        <problemresult v-if="problemresultState"></problemresult>
                    </div>
                </div>
        </div>
    </div>
    </div>

</template>

<script>
import member from './member.vue';
import problemmanage from './problemmanage.vue';
import notice from './noticemanage.vue';
import nonaccount from './nonaccount.vue';
import problemresult from './problemresult.vue';

export default {
  name: 'admin',
  components: {
    member,
    problemmanage,
    notice,
    nonaccount,
    problemresult,
  },
  data() {
    return {
      entering: false,
      memberState: true,
      nonaccountState: false,
      problemState: false,
      listState: false,
      adminState: false,
      problemresultState: false,
      userRating: '',
      members: [],
      problems: [],
      notice: [],
      userToken: '',
    };
  },
  updated() {
    this.$Progress.start();
    this.$nextTick(() => {
      this.$store.commit('loadingOff');
      this.$Progress.finish();
    });
  },
  beforeCreate() {
//          토큰 테스트
	  this.userToken = this.$cookie.get('userToken');
    if (this.userToken != null) {
      this.$http.defaults.headers.common.Authorization = this.userToken;
      this.$http.get('users/my-info')
        .then((resInfo) => {
            this.userRating = resInfo.data.user.rating;
	          if (this.userRating !== 3) {
                  this.$swal({
                      title: '입장 실패',
                      text: '어드민이 아닙니다',
                      type: 'error',
                  })
                  .then(() => {
                      location.href = '/';
		          });
	          } else {
		          this.adminState = true;
		          this.entering = true;
	          }
        })
        .catch((error) => {
		    this.$swal({
			    title: '유저 정보 조회 실패',
			    text: error,
			    type: 'error',
		    })
		    .then(() => {
		    location.href = '/';
             });
    });
    } else {
	    this.$swal({
		    title: '입장 실패',
		    text: '로그인을 해주세요',
		    type: 'error',
	    })
	    .then(() => {
		    location.href = '/';
         });
    }
  },
  methods: {
    click_problem() {
      this.memberState = false;
      this.problemState = true;
      this.listState = false;
      this.nonaccountState = false;
      this.problemresultState = false;
    },
    click_member() {
      this.memberState = true;
      this.problemState = false;
      this.listState = false;
      this.nonaccountState = false;
      this.problemresultState = false;
    },
    click_nonaccount() {
      this.nonaccountState = true;
      this.memberState = false;
      this.problemState = false;
      this.listState = false;
      this.problemresultState = false;
    },
    click_list() {
      this.memberState = false;
      this.problemState = false;
      this.listState = true;
      this.nonaccountState = false;
      this.problemresultState = false;
    },
    click_result() {
      this.memberState = false;
      this.problemState = false;
      this.listState = false;
      this.nonaccountState = false;
      this.problemresultState = true;
    },
    // 어드민이 아닐경우
  },
};
</script>
<style src="../../assets/css/admin.css" scoped></style>
