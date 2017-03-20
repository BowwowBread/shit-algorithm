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
                  <p>내 아이디 : <span>{{userid}}</span></p>
                  <p>내 이름 : <span>{{username}}</span></p>
                  <p>학번 : <span>{{studentcode}}</span></p>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="content">
                <div class="header">내 활동</div>
                <hr>
                <div class="description">
                  <p>내 점수 : <span>{{score}} 점</span></p>
                  <p>문제 푼 수 : <span>{{successCount}} 개</span></p>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="content">
                <div class="header">최근 푼 문제</div>
                <hr>
                <div class="description" v-for="i in recentProblem">
                  <p><span>{{i.num}}</span> : 번 문제 <span>{{i.date}}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
        score: 0,
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
        this.$http.defaults.headers.common.Authorization = this.userToken;
        this.$http.get('users/my-info')
          .then((resInfo) => {
            this.username = resInfo.data.user.username;
            this.studentcode = resInfo.data.user.studentCode;
            this.userid = resInfo.data.user.userId;
            this.score = resInfo.data.user.score;
            this.$http.get('solution/resultsuccess')
              .then((res) => {
                this.successCount = res.data.resolves.length;
                let i = res.data.resolves.length - 5;
                while (i < res.data.resolves.length) {
                  let date = res.data.resolves[i].resolveData.date.replace('T', ', ');
                  date = date.substring(0, date.length - 8);
                  this.recentProblem.push({
                    num: res.data.resolves[i].resolveData.problemNum,
                    date,
                  });
                  i += 1;
                }
                this.entering = true;
              })
              .catch((err) => {
                this.$swal({
                  title: '문제 결과 조회 실패',
                  text: err,
                  type: 'error',
                })
                .then(() => {
                  location.href = '/';
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