<template>
    <div id="admin" v-if="entering">
        <div class="sigo_container">
            <div class="adminPage" v-if="adminState"
             style=
             "background-color: white ;
              color: black;">
            <div class="ui">
              <div class="adminmn">
                <h1 class="ui header admin">ADMINPAGE</h1>
                <div class="ui secondary pointing menu">
                  <a class="item" v-on:click="click_member">회원관리</a>
                  <a class="item" v-on:click="click_nonaccount">비승인 회원관리</a>
                  <a class="item" v-on:click="click_list">게시판관리</a>
                  <a class="item" v-on:click="click_problem">문제관리</a>
                  <a class="item" v-on:click="click_result">문제결과</a>
                </div>
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
    // 컴포넌트 등록
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
    this.$nextTick(() => {
      // 데이터 갱신 완료시 프로그레스바, 로딩창 종료
      this.$store.commit('loadingOff');
      this.$Progress.finish();
    });
  },
  beforeCreate() {
    // 토큰 테스트
	  this.userToken = this.$cookie.get('userToken');
    if (this.userToken != null) {
      this.$http.defaults.headers.common.Authorization = this.userToken;
      this.$http.get('users/my-info')
        .then((resInfo) => {
          // 유저 정보 확인
            this.userRating = resInfo.data.user.rating;
	          if (this.userRating !== 3) {
              // 어드민이 아닐 경우
                  this.$swal({
                    // 입장 실패 모달
                      title: '입장 실패',
                      text: '어드민이 아닙니다',
                      type: 'error',
                  })
                  .then(() => {
                    // 메인으로 이동
                      location.href = '/';
		          });
	          } else {
              // 어드민인 경우
		          this.adminState = true;
		          this.entering = true;
	          }
        })
        .catch((error) => {
          // 유저 정보 확인
		    this.$swal({
          // 입장 실패 모달
			    title: '유저 정보 조회 실패',
			    text: error,
			    type: 'error',
		    })
		    .then(() => {
          // 메인으로 이동
		    location.href = '/';
             });
    });
    } else {
      // 토큰 인증 실패시
	    this.$swal({
        // 입장 실패 모달
		    title: '입장 실패',
		    text: '로그인을 해주세요',
		    type: 'error',
	    })
	    .then(() => {
        // 메인으로 이동
		    location.href = '/';
         });
    }
  },
  methods: {
    // 메뉴 컴포넌트 클릭 함수
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
  },
};
</script>
<style src="../../assets/css/admin.css" scoped></style>
