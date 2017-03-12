<template>
<<<<<<< HEAD
<div id='mypage'>
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
=======
    <div id='mypage'>
        <div class='myinfo'>
            <ul>
                <li>
                    <p>이름 {{username}}</p>
                    <p>학번 {{studentcode}}</p>
                </li>
            </ul>
>>>>>>> 28248b49dda9afc37af3c3167998f0aa841f8a54
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
      };
    },
    beforeCreate() {
        const ROOT_URL = 'http://121.186.23.245:9999';
        this.$http.defaults.baseURL = ROOT_URL;

<<<<<<< HEAD
        //          토큰 테스트
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
=======
//          토큰 테스트
	    this.userToken = this.$cookie.get('userToken');
	    if (this.userToken != null) {
		    this.userToken = this.$cookie.get('userToken');
		    this.$http.defaults.headers.common.Authorization = this.userToken;
		    this.$http.get('/api/users/my-info')
		    .then((resInfo) => {
                this.userid = resInfo.data.user.userId;
                this.username = resInfo.data.user.username;
                this.studentcode = resInfo.data.user.studentCode;
                this.$http.get('api/solution')
                  .then((res) => {
                    let i = 0;
                    while (i < res.data.resolves.length) {
                      this.$http.get(`api/solution/findsuccess/${this.userid}/${i}`)
                        .then((resFind) => {
                            if (resFind.data.result === 'true') {
                              this.successCount += 1;
                            }
                        })
                        .catch((err) => {
                            this.$swal({
                            title: '문제 정답 로드 실패',
                            text: err,
                            type: 'error',
                          });
                      });
                      i += 1;
                    }
                    console.log(this.successCount);
                })
                  .catch((err) => {
                    this.$swal({
                       title: '문제 결과 로드 실패',
                       text: err,
                       type: 'error',
                    });
                });
		    })
		    .catch((error) => {
                this.$swal({
                    title: '유저 조회 실패',
                    text: error,
>>>>>>> 28248b49dda9afc37af3c3167998f0aa841f8a54
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
hr{
  width: 376px;
  border-color: rgba(214,214,214,.43);
  margin-left: -15px;
}
.ui.link.cards{
  height: 700px;
  border-radius: 5px;
  padding: 50px;
}
.usps {
    margin-top: 170px;
    padding: 0px 130px 40px 130px;
}
.header{
  font-size: 30px !important;
  font-weight: 400 !important;
  margin: 10px 0px -5px 15px;
}
.description {
    font-size: 17px;
    padding-left: 16px;
}
.card{
  width: 375px !important;
  height: 300px;
  box-shadow: 2px 3px 5px 0 rgba(0,0,0,0.26) !important;
}
</style>
