<template>
  <div id="problems" v-if="entering">
    <div class="container">
      <h2 class="ui center aligned header"> 문제풀기
        <div class="sub header">프로그래밍 문제를 풀고 맞추어 보는 곳 입니다.</div>
      </h2>
      <div class="ui top attached tabular menu">
        <a class="item " data-tab="first" id="item" v-on:click="clickNormal" :class="{active: normal_problem}">일반 문제</a>
        <a class="item" data-tab="third" v-on:click="clickContest" :class="{active: contest_problem}">대회 문제</a>
        <a class="item" data-tab="fourth" v-on:click="shuffle" :class="{active: random_problem}">문제 섞기</a>
      </div>
      <div class="ui bottom attached tab segment active" data-tab="first">
        <div class="ui items" id="mnit">
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
        <div id="list" class="ui bottom attached tab segment active"  data-tab="first">
          <transition-group name="flip-list, problemlist" tag="ul" :style="{ 'max-height': lineheight + 'px' , 'min-height' : lineheight + 'px', 'overflow': 'hidden'}">
            <div class="ui items" v-for="item in items" v-bind:key="item">
              <div class="item">
                <div class="content" v-on:click='result(item.num)'>
                  <div class="ui grid" id="blemlist">
                    <div class="three wide column">
                      <p class="header"><span>{{item.num}}</span></p>
                    </div>
                    <div class="five wide column">
                      <a class="ui disabled header"><span>{{item.name}}</span></a>
                    </div>
                    <div class="eight wide column">
                      <div class="description">
                        <div class="ui grid">
                          <div class="four wide column" id="one"><span>{{item.count}}</span></div>
                          <div class="four wide column" id="second"><span>{{item.success}}</span></div>
                          <div class="four wide column" id="three"><span>{{item.fail}}</span></div>
                          <div class="four wide column" id="fooo"><span>{{item.ratio}}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
      <a href="#">
        <i class="huge chevron circle up icon" v-on:click="scrollUp"></i>
      </a>
      <button class="ui button" v-if="loadState" v-on:click="loadList(false)">
        <i class="large chevron down icon"></i>
      </button>
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
        normal_problem: true,
        contest_problem: false,
        random_problem: false,
        test: 'test',
        items: [],
        loadState: true,
        entering: false,
        lineheight: 1,
        changeLoad: false,
      };
    },
    created() {
      i = 0;
      end = 10;
      //토큰테스트
      this.userToken = this.$cookie.get('userToken');
      if (this.userToken != null) {
        this.userToken = this.$cookie.get('userToken');
        this.$http.defaults.headers.common.Authorization = this.userToken;
        // 유저 정보 로드
        this.$http.get('users/my-info')
          .then((resInfo) => {
            this.userid = resInfo.data.user.userId;
            this.$http.defaults.headers.common.Authorization = this.userToken;
            // 공지 로드
            this.$http.get('problems')
              .then((res) => {
                length = res.data.problems.length;
                //문제 결과 로드
                this.$http.defaults.headers.common.Authorization = this.userToken;
                // 문제 결과 로드
                this.$http.get('solution')
                  .then((resRatio) => {
                    //문제 개수 반복
                    if (length <= 10) {
                      // 문제가 10개 이하인 경우
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
                        if (i + 101 === resRatio.data.resolves[j].resolveData.problemNum) {
                          // 문제 번호 101번 부터 시작

                          //문제 결과 카운트
                          if (resRatio.data.resolves[j].resolveData.result === 'success') {
                            // 성공
                            success += 1;
                          } else if (resRatio.data.resolves[j].resolveData.result === 'fail') {
                            // 실패
                            fail += 1;
                          }
                          count += 1;
                        }
                        j += 1;
                      }
                      // 결과 비율
                      ratio = success / count;
                      if (isNaN(ratio)) {
                        ratio = `${0} %`;
                      } else if (ratio === 0) {
                        ratio = `${0} %`;
                      } else if (ratio !== 0) {
                        ratio = `${parseInt(ratio * 100, 10)} %`;
                      }
                      // 데이터 추가
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
                    // 문제 개수만큼 높이 변경
                    this.lineheight = 45 * this.items.length;                    
                    this.entering = true;
                  })
                  .catch((err) => {
                    // 문제 기록 로드 실패
                    this.$swal({
                      // 실패 모달
                        title: '문제 기록 로드 실패',
                        text: err,
                        type: 'error',
                      })
                      .then(() => {
                        // 메인으로 이동
                        location.href = '/';
                      });
                  });
              })
              .catch((err) => {
                // 문제 로드 실패
                this.$swal({
                  // 실패 모달
                    title: '문제 로드 실패',
                    text: err,
                    type: 'error',
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
                title: '입장 실패',
                text: '유저 조회 실패',
                type: 'error',
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
          })
          .then(() => {
            // 메인으로 이동
            location.href = '/';
          });
      }
    },
    updated() {
      this.$nextTick(() => {
        // 데이터 갱신 완료시 프로그레스바, 로딩창 종료
        this.$store.commit('loadingOff');
        this.$Progress.finish();
      });
    },
    methods: {
      clickNormal() {
        // 일반문제 클릭
        if (!this.changeLoad) {
        this.normal_problem = true;
        this.contest_problem = false;
        this.random_problem = false;
        this.changeLoad = true;
        this.loadList(this.changeLoad);
        }
      },
      clickContest() {
        // 대회문제 클릭
        if (!this.changeLoad) {        
        this.normal_problem = false;
        this.contest_problem = true;
        this.random_problem = false;
        this.changeLoad = true;
        this.loadList(this.changeLoad);
        }
      },
      scrollUp() {
        // 상단으로 스크롤
        $('html, body').stop().animate({
          scrollTop: 0,
        }, 500);
      },
      shuffle() {
        // 문제 섞기
        this.normal_problem = false;
        this.contest_problem = false;
        this.random_problem = true;
        this.items = _.shuffle(this.items);
      },
      loadList(changeLoad) {
        // 문제 추가 로드
        if (changeLoad) {
          // 문제 종류가 바뀐 경우 처음부터 로드
          i = 0;
          end = 10;
          this.items = [];
          this.loadState = true;
        } else {
          // 같은 문제종류의 추가 로드인경우
          i = end;
          end += 10;
        }
        this.$http.defaults.headers.common.Authorization = this.userToken;
        if (this.contest_problem === true) {
          //대회 문제
          this.$http.get('problems/contest')
            .then((res) => {
              length = res.data.problems.length;
              if (i / 10 === parseInt(length / 10, 10)) {
              /**
                문제가 끝난경우 ex) i = 10, length = 18
                i / 10 = 1, paseInt(length / 10, 10) = 1
                end를 총 공지 갯수만큼 변경
               */
                end = length;
                this.loadState = false;
              } else if (end === length) {
                // 10의 배수로 끝난 경우
                this.loadState = false;
              }
              //문제 결과 로드
              this.$http.defaults.headers.common.Authorization = this.userToken;
              this.$http.get('solution')
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
                      if (i + 101 === resRatio.data.resolves[j].resolveData.problemNum) {
                        //문제 결과 카운트
                        if (resRatio.data.resolves[j].resolveData.result === 'success') {
                          // 성공
                          success += 1;
                        } else {
                          // 실패
                          fail += 1;
                        }
                        count += 1;
                      }
                      j += 1;
                    }
                    // 문제 비율
                    ratio = success / count;
                    if (isNaN(ratio)) {
                      ratio = `${0} %`;
                    } else if (ratio === 0) {
                      ratio = `${0} %`;
                    } else {
                      ratio = `${ratio.toString().substring(2, 4)} %`;
                    }
                    // 데이터 추가
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
                    // 문제 갯수 만큼 높이 변경
                    this.lineheight = 45 * this.items.length;                    
                  }
                  this.changeLoad = false;                  
                })
                .catch((err) => {
                  // 문제 기록 로드 실패
                  this.$swal({
                    // 실패 모달
                      title: '문제 기록 로드 실패',
                      text: err,
                      type: 'error',
                    })
                    .then(() => {
                      // 메인으로 이동
                      location.href = '/';
                    });
                });
            })
            .catch((err) => {
              // 대회문제 로드 실패
              if (err.response.data.message === '아직 오픈되지 않았습니다.') {
                // 대회기간이 아닌 경우
                err = '대회기간이 아닙니다.';
                this.$swal({
                  // 실패 모달
                    title: '문제 로드 실패',
                    text: err,
                    type: 'error',
                  })
                  .then(() => {
                    // 일반문제로 이동
                    this.clickNormal();
                    return;
                  });
              } else {
                this.$swal({
                  // 실패 모달
                    title: '문제 로드 실패',
                    text: err,
                    type: 'error',
                  })
                  .then(() => {
                    // 메인으로 이동
                    location.href = '/';
                  });
              }
            });
        } else {
          //일반 문제
          this.$http.get('problems')
            .then((res) => {
              if (i / 10 === parseInt(length / 10, 10)) {
                /**
                문제가 끝난경우 ex) i = 10, length = 18
                i / 10 = 1, paseInt(length / 10, 10) = 1
                end를 총 공지 갯수만큼 변경
               */
                end = length;
                this.loadState = false;
              } else if (end === length) {
                // 10의 배수로 끝난 경우
                this.loadState = false;
              }
              //문제 결과 로드
              this.$http.defaults.headers.common.Authorization = this.userToken;
              this.$http.get('solution')
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
                      if (i + 101 === resRatio.data.resolves[j].resolveData.problemNum) {
                        //문제 결과 카운트
                        if (resRatio.data.resolves[j].resolveData.result === 'success') {
                          // 성공
                          success += 1;
                        } else {
                          // 실패
                          fail += 1;
                        }
                        count += 1;
                      }
                      j += 1;
                    }
                    // 결과 비율
                    ratio = success / count;
                    if (isNaN(ratio)) {
                      ratio = `${0} %`;
                    } else if (ratio === 0) {
                      ratio = `${0} %`;
                    } else {
                      ratio = `${ratio.toString().substring(2, 4)} %`;
                    }
                    // 데이터 추가
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
                    // 문제 갯수만큼 높이 변경
                    this.lineheight = 45 * this.items.length;
                  }
                  this.changeLoad = false;
                })
                .catch((err) => {
                  // 문제 기록 로드 실패
                  this.$swal({
                    // 실패 모달
                      title: '문제 기록 로드 실패',
                      text: err,
                      type: 'error',
                    })
                    .then(() => {
                      // 메인으로 이동
                      location.href = '/';
                    });
                });
            })
            .catch((err) => {
              // 문제 로드 실패
              this.$swal({
                // 실패 모달
                  title: '문제 로드 실패',
                  text: err,
                  type: 'error',
                })
                .then(() => {
                  // 메인으로 이동
                  location.href = '/';
                });
            });
        }
      },
      result(num) {
        // 문제 입장
        this.$http.defaults.headers.common.Authorization = this.userToken;
        // 푼 문제인지 체크
        this.$http.get(`solution/findsuccess/${this.userid}/${num}`)
          .then((resresult) => {
            if (resresult.data.result === true) {
              // 이미 푼 문제인 경우
              this.$swal(
                '입장 실패',
                '이미 푼 문제입니다',
                'warning',
              );
            } else {
              // 아닌경우 -> 입장
              location.href = `https://algorithm.seoulit.kr/problems/${num}`;
            }
          })
          .catch((err) => {
            // 문제 결과 조회 실패
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