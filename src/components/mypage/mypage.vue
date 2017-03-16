<template>
<div id='mypage' v-if="entering">
    <div class='myinfo'>
        <div id="userpage">
            <div class="usps">
                <div class="ui link cards">
                      <div class="card">
                        <div class="content">
                          <div class="header">내 정보</div>
                          <hr>
                          <div class="description">
                            <p>내 아이디 : <span>testting</span></p>
                            <p>내 이름 : <span>아이티</span></p>
                            <p>학번 : <span>10214</span></p>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="content">
                          <div class="header">내 활동</div>
                          <hr>
                          <div class="description">
                            <p>내 점수 : <span>1,212</span></p>
                            <p>문제 푼 수 : <span>12</span></p>
                          </div>
                        </div>
                      </div>
                      <div class="card">
                        <div class="content">
                          <div class="header">최근 푼 문제</div>
                          <hr>
                          <div class="description">
                            <p><span>1</span> : 번 문제</p>
                          </div>
                        </div>
                      </div>
                </div>
            </div>
            </div>
            </div>
            </div>
    <!-- <div id='mypage'>
        <div class='myinfo'>
            <ul>
                <li>
                    <p>이름 {{username}}</p>
                    <p>학번 {{studentcode}}</p>
                </li>
            </ul>
        </div>
    </div> -->
</template>

<script>
export default {
    name: 'index',
    data() {
      return {
        userToken: '',
        userid: '',
        username: '',
        studentcode: '',
        successCount: 0,
        recentProblem: [],
        entering: false,
      };
    },
  updated() {
    this.$nextTick(() => {
      this.$store.commit('loadingOff');
      this.$Progress.finish();
    });
  },
  beforeCreate() {
//          토큰 테스트
	    this.userToken = this.$cookie.get('userToken');
	    if (this.userToken != null) {
		    this.userToken = this.$cookie.get('userToken');
		    this.$http.defaults.headers.common.Authorization = this.userToken;
		    this.$http.get('users/my-info')
		    .then((resInfo) => {
                this.userid = resInfo.data.user.userId;
                this.username = resInfo.data.user.username;
                this.studentcode = resInfo.data.user.studentCode;
                this.$http.get(`solution/resultsuccess/${userid}`)
                  .then((res) => {
                    console.log(res);
                    this.entering = true;
                })
                  .catch((err) => {
                    this.$swal({
                       title: '문제 정답 로드 실패',
                       text: err,
                       type: 'error',
                    });
                });
		    })
		    .catch((error) => {
                this.$swal({
                    title: '유저 조회 실패',
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
};
</script>
<style scoped>

</style>
<style src="../../assets/css/mypage.css" scoped></style>

