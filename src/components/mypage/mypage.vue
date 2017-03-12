<template>
    <div id='mypage'>
        <div class='myinfo'>
            <ul>
                <li>
                    <p>이름 {{username}}</p>
                    <p>학번 {{studentcode}}</p>
                </li>
            </ul>
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
