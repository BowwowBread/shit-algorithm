<template>
    <div id="problems" v-if="entering">
        <div class="container">
            <h2 class="ui center aligned header"> 문제풀기
                <div class="sub header">Manage your account settings and set e-mail preferences.</div>
            </h2>
            <div class="ui top attached tabular menu">
                <a class="item active" data-tab="first" id="item">문제</a>
                <a class="item" data-tab="second">출처</a>
                <a class="item" data-tab="third">단계</a>
                <a class="item" data-tab="four">최근 문제</a>
                <a class="item" data-tab="five">기타</a>
                <button v-on:click="shuffle">Shuffle</button>
            </div>
            <div class="ui bottom attached tab segment active" :style="{ 'max-height': lineheight + 'px' }" data-tab="first">
              <div class="ui items">
                    <div class="item">
                        <div class="content">
                          <div class="ui top attached tabular menu" id="pob">
                            <div class="ui grid">
                              <div class="three wide column">
                                <p id="ltemone">번호</p>
                              </div>
                              <div class="five wide column">
                                <p id="ltemtwo">문제 이름</p>
                              </div>
                              <div class="two wide column">
                                <p id="ltemthr">푼 횟수</p>
                              </div>
                              <div class="two wide column">
                                <p id="ltemfou">정답자 수</p>
                              </div>
                              <div class="two wide column">
                                <p id="ltemfiv">틀린사람 수</p>
                              </div>
                              <div class="two wide column">
                                <p id="ltemsix">정답률</p>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
                <transition-group name="flip-list, problemlist" tag="ul">
                <div class="ui items" v-for="item in items" v-bind:key="item">
                    <div class="item">
                        <div class="content" v-on:click='result(item.num)'>
                          <div class="ui grid">
                            <div class="three wide column">
                              <p class="header"><span>{{item.num}}</span></p>
                            </div>
                            <div class="five wide column">
                              <a class="ui disabled header"><span>{{item.name}}</span></a>
                            </div>
                            <div class="eight wide column">
                              <div class="description">
                                <p>소스 : <span>{{item.source}}</span>
                                  난이도 : <span>난이도</span>
                                  점수 : <span>{{item.score}}</span>
                                  성공 : <span>{{item.success}}</span>
                                  실패 : <span>{{item.fail}}</span>
                                  정답률 : <span>{{item.ratio}}</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
                </transition-group>
            </div>
            <a href="#"><i class="huge chevron circle up icon"></i></a>
            <button class="ui button" v-on:click="loadList"><i class="large chevron down icon"></i></button>
        </div>
    </div>
</template>
<script>
let i = 0;
let end = 10;
let length;
export default {
  name: 'index',
  data() {
    return {
      test: 'test',
      items: [],
      loadState: true,
      entering: false,
      lineheight: 0,
    };
  },
  created() {
    i = 0;
    end = 10;
    const ROOT_URL = 'http://121.186.23.245:9999';
    this.$http.defaults.baseURL = ROOT_URL;
    //토큰테스트
    this.userToken = this.$cookie.get('userToken');
    if (this.userToken != null) {
      this.userToken = this.$cookie.get('userToken');
      this.$http.defaults.headers.common.Authorization = this.userToken;
      this.$http.get('/api/users/my-info')
        .then((resInfo) => {
            this.userid = resInfo.data.user.userId;
          this.$http.defaults.headers.common.Authorization = this.userToken;
          this.$http.get('api/problems')
            .then((res) => {
              length = res.data.problems.length;
              //문제 결과 로드
              this.$http.defaults.headers.common.Authorization = this.userToken;
              this.$http.get('api/solution')
                .then((resRatio) => {
                  //문제 개수 반복
                  if (length < 10) {
                    end = length;
                  }
                  while (i < end) {
                    const num = res.data.problems[i].num;
                    const name = res.data.problems[i].problemName;
                    const source = res.data.problems[i].source;
                    const score = res.data.problems[i].score;
                    let count = 0;
                    let success = 0;
                    let fail = 0;
                    let ratio = 0;
                    let j = 0;
                    //문제 결과 수 반복
                    while (j < resRatio.data.resolves.length) {
                      //문제 번호 === 문제 결과 번호
                      if (i === resRatio.data.resolves[j].resolveData.problemNum) {
                        //문제 결과 카운트
                        if (resRatio.data.resolves[j].resolveData.result === 'success') {
                          success += 1;
                        } else {
                          fail += 1;
                        }
                        count += 1;
                      }
                      j += 1;
                    }
                    //결과 수정
                    ratio = success / count;
                    if (isNaN(ratio)) {
                      ratio = `${0} %`;
                    } else if (ratio === 0) {
                      ratio = `${0} %`;
                    } else if (ratio !== 0) {
                      ratio = `${parseInt(ratio * 100, 10)} %`;
                    }
                    this.lineheight = 45 * i;
                    this.items.push({
                      num,
                      name,
                      source,
                      score,
                      success,
                      fail,
                      count,
                      ratio,
                    });
                    i += 1;
                  }
                  this.entering = true;
                })
                .catch((err) => {
                  this.$swal({
                      title: '문제 기록 로드 실패',
                      text: err,
                      type: 'error',
                    })
                    .then(() => {
                      location.href = '/';
                    });
                });
            })
            .catch((err) => {
              this.$swal({
                  title: '문제 로드 실패',
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
                title: '입장 실패',
                text: '유저 조회 실패',
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
    shuffle() {
      this.items = _.shuffle(this.items);
    },
  	loadList() {
		  //문제 로드
      this.$http.defaults.headers.common.Authorization = this.userToken;
		  this.$http.get('api/problems')
			  .then((res) => {
				  i = end;
                  end += 10;
                  if (i / 10 === parseInt(length / 10, 10)) {
                  	end = length;
                  	this.loadState = false;
                  }
				  //문제 결과 로드
				  this.$http.defaults.headers.common.Authorization = this.userToken;
				  this.$http.get('api/solution')
					  .then((resRatio) => {
						  //문제 개수 반복
						  while (i < end) {
							  const num = res.data.problems[i].num;
							  const name = res.data.problems[i].problemName;
							  const source = res.data.problems[i].source;
							  const score = res.data.problems[i].score;
							  let count = 0;
							  let success = 0;
							  let fail = 0;
							  let ratio = 0;
							  let j = 0;
							  //문제 결과 수 반복
							  while (j < resRatio.data.resolves.length) {
								  //문제 번호 === 문제 결과 번호
								  if (i === resRatio.data.resolves[j].resolveData.problemNum) {
									  //문제 결과 카운트
									  if (resRatio.data.resolves[j].resolveData.result === 'success') {
										  success += 1;
									  } else {
										  fail += 1;
									  }
									  count += 1;
								  }
								  j += 1;
							  }
							  //결과 수정
							  ratio = success / count;
							  if (isNaN(ratio)) {
								  ratio = `${0} %`;
							  } else if (ratio === 0) {
								  ratio = `${0} %`;
							  } else {
								  ratio = `${ratio.toString().substring(2, 4)} %`;
							  }
							  this.lineheight = 45 * i;
							  console.log(this.lineheight);
							  this.items.push({
								  num,
								  name,
								  source,
								  score,
								  success,
								  fail,
								  count,
								  ratio,
							  });
							  i += 1;
						  }
					  })
					  .catch((err) => {
						  this.$swal({
								  title: '문제 기록 로드 실패',
								  text: err,
								  type: 'error',
							  })
							  .then(() => {
								  location.href = '/';
							  });
					  });
			  })
			  .catch((err) => {
				  this.$swal({
						  title: '문제 로드 실패',
						  text: err,
						  type: 'error',
					  })
					  .then(() => {
						  location.href = '/';
					  });
			  });
    },
  	result(num) {
		  this.$http.defaults.headers.common.Authorization = this.userToken;
		  this.$http.get(`api/solution/findsuccess/${this.userid}/${num}`)
			  .then((resresult) => {
                  if (resresult.data.result === true) {
                      this.$swal(
                          '입장 실패',
                          '이미 푼 문제입니다',
                          'warning',
                      );
                  } else {
	                  this.$router.push({
		                  path: `problems/${num}`,
	                  });
                  }
			  })
			  .catch((err) => {
				  this.$swal(
					  '결과 조회 실패',
					  err,
					  'error',
				  );
			  });
    },
  },
};
</script>
<style src="../../assets/css/problems.css" scoped></style>
