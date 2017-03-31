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
        // 데이터 갱신 완료시 프로그레스바, 로딩창 종료
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
                if (res.resolves != null) {
                  // 문제 푼 결과가 있는 경우
                  this.successCount = res.data.resolves.length;
                  // 최근 5문제만 출력
                  let i = res.data.resolves.length - 5;
                  while (i < res.data.resolves.length) {
                    let date = res.data.resolves[i].resolveData.date.replace('T', ', ');
                    date = date.substring(0, date.length - 8);
                    // 데이터 추가
                    this.recentProblem.push({
                      num: res.data.resolves[i].resolveData.problemNum,
                      date,
                    });
                    i += 1;
                  }
                }
                this.entering = true;
              })
              .catch((err) => {
                // 문제 결과 조회 실패
                this.$swal({
                    // 실패 모달
                    title: '문제 결과 조회 실패',
                    text: err,
                    type: 'error',
                    allowOutsideClick: false,
                  })
                  .then(() => {
                    // 메인으로 이동
                    location.href = '/';
                  });
              });
          })
          .catch((error) => {
            // 유저 조회 실패
            this.$swal({
                // 실패 모달
                title: '유저 조회 실패',
                text: error,
                type: 'error',
                allowOutsideClick: false,
              })
              .then(() => {
                // 메인으로 이동
                location.href = '/';
              });
          });
      } else {
        // 토큰 인증 실패
        this.$swal({
            // 실패 모달
            title: '입장 실패',
            text: '로그인을 해주세요',
            type: 'error',
            allowOutsideClick: false,
          })
          .then(() => {
            // 메인으로 이동
            location.href = '/';
          });
      }
    },
  };
</script>

<style scoped>
  
</style>

<style src="../../assets/css/mypage.css" scoped>
  
</style>