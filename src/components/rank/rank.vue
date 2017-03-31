<template>
  <div id="index" v-if="entering">
    <div class="ranksys">
      <div class="rank-main">
        <h2 class="ui center aligned header" id="rankhead"> 랭킹 시스템
          <div class="sub header">1등을 목표로 문제를 풀면서 친구들을 이겨보세요!</div>
        </h2>
        <div class="rank-top">
          <div class="rank1">
            <div class="rankge1">
              <img src="../../assets/img/bg.jpg">
            </div>
            <p class="rant1">2등</p>
            <hr>
            <p class="rant2" v-if="rank">{{ranker[1].name}}</p>
          </div>
          <div class="rank2">
            <div class="rankge2">
              <img src="../../assets/img/bg.jpg">
            </div>
            <p class="rant1">1등</p>
            <hr>
            <p class="rant2" v-if="rank">{{ranker[0].name}}</p>
          </div>
          <div class="rank3">
            <div class="rankge3">
              <img src="../../assets/img/bg.jpg">
            </div>
            <p class="rant1">3등</p>
            <hr>            
            <p class="rant2" v-if="rank">{{ranker[2].name}}</p>
          </div>
        </div>
        <div class="ui top attached tabular menu" id="topmn">
          <a class="item" data-tab="first" v-on:click="clickNormal" :class="{active: normal_rank}">순위</a>
          <a class="item" data-tab="first" v-on:click="clickContest" :class="{active: contest_rank}">대회 순위</a>
        </div>
        <div class="ui bottom attached tab segment active">
          <div class="ui items">
            <div class="item">
              <div class="content">
                <div class="ui top attached tabular menu" id="pob">
                  <div class="ui grid">
                    <div class="three wide column">
                      <p id="ltemone" class="item">등수</p>
                    </div>
                    <div class="six wide column">
                      <p id="ltemthr" class="item">이름</p>
                    </div>
                    <div class="seven wide column">
                      <p id="ltemfou" class="item">점수</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <transition-group name="flip-list, ranklist" tag="ul">
            <div class="propol" v-for="(user, rank) in users" v-bind:key="user">
              <div class="ui items">
                <div class="item">
                  <div class="content">
                    <p class="header" id="pollist"><span>{{rank + 1}}</span>등</p>
                    <p class="ui disabled header"><span>{{user.name}}</span></p>
                    <p class="sub header" id="subder"><span>{{user.score}}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
        <a href="#">
          <i class="huge chevron circle up icon" v-on:click="scrollUp"></i>
        </a>
        <button class="ui button" v-if="loadState" v-on:click="loadList(false)">
            <i class="large chevron down icon"></i>
          </button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  let i = 0;
  let end = 10;
  let length;
  export default {
    name: 'rank',
    data() {
      return {
        userToken: '',
        data: [],
        loadState: true,
        entering: false,
        ranker: [],
        users: [],
        normal_rank: true,
        contest_rank: false,
        rank: true,
      };
    },
    beforeCreate() {
      //          토큰 테스트
      this.userToken = this.$cookie.get('userToken');
      if (this.userToken != null) {
        this.userToken = this.$cookie.get('userToken');
        this.$http.defaults.headers.common.Authorization = this.userToken;
        // 유저 정보 조회
        this.$http.get('users/my-info')
          .then((resInfo) => {
            this.userid = resInfo.data.user.userId;
            this.$http.get('users')
              .then((res) => {
                i = 0;
                length = res.data.users.length;
                if (i / 10 === parseInt(length / 10, 10)) {
                  /**
                    유저가 끝난경우 ex) i = 10, length = 18
                    i / 10 = 1, paseInt(length / 10, 10) = 1
                    end를 총 공지 갯수만큼 변경
                   */
                  end = length;
                  this.loadState = false;
                } else if (end === length) {
                  // 10의 배수로 끝난 경우
                  this.loadState = false;
                }
                while (i < length) {
                  // 데이터 추가
                  this.data.push({
                    name: res.data.users[i].username,
                    score: res.data.users[i].score,
                    contestScore: res.data.users[i].contestScore,
                  });
                  i += 1;
                }
                // 랭크 정렬
                const sort = 'score';
                this.data.sort(function(a, b) {
                  return b[sort] - a[sort];
                });
                i = 0;
                while (i < end) {
                  // 유저데이터 추가
                  this.users.push({
                    name: this.data[i].name,
                    score: this.data[i].score,
                  });
                  i += 1;
                }
                i = 0;
                while (i < 3) {
                  // 랭킹 3위 추가
                  if (this.users[i] != null) {
                    this.ranker.push({
                      name: this.users[i].name,
                      score: 'sss',
                    });
                  } else {
                    this.ranker.push({
                      // 랭킹에 유저가 없는 경우
                      name: `${i + 1}등에 도전해보세요`,
                    });
                  }
                  i += 1;
                }
                this.entering = true;
              })
              .catch((err) => {
                this.$swal({
                    title: '유저 정보 조회 실패',
                    text: err,
                    type: 'error',
                                                                      allowOutsideClick: false,
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
                                                                  allowOutsideClick: false,
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
                                                              allowOutsideClick: false,
          })
          .then(() => {
            location.href = '/';
          });
      }
    },
    updated() {
      this.$nextTick(() => {
        this.$store.commit('loadingOff');
        this.$Progress.finish();
      });
    },
    methods: {
      clickNormal() {
        this.normal_rank = true;
        this.contest_rank = false;
        this.changeLoad = true;
        this.loadList(this.changeLoad);
      },
      clickContest() {
        this.normal_rank = false;
        this.contest_rank = true;
        this.changeLoad = true;
        this.loadList(this.changeLoad);
      },
      scrollUp() {
        $('html, body').stop().animate({
          scrollTop: 0,
        }, 500);
      },
      loadList(changeLoad) {
        if (changeLoad) {
          i = 0;
          end = 10;
          this.lineheight = 0;
          this.rank = false;
          this.ranker = [];
          this.users = [];
          this.loadState = true;
        } else {
          i = end;
          end += 10;
        }
        if (this.contest_rank === true) {
          // 대회 랭크
          this.$http.get('users')
            .then((res) => {
              if (i / 10 === parseInt(length / 10, 10)) {
                end = length;
                this.loadState = false;
              } else if (end === length) {
                this.loadState = false;
              }
              const sort = 'contestScore';
              this.data.sort(function(a, b) {
                return b[sort] - a[sort];
              });
              while (i < end) {
                let score = 0;
                if (this.data[i].contestScore === 0) {
                  score = 0;
                } else {
                  score = this.data[i].contestScore;
                }
                this.users.push({
                  name: this.data[i].name,
                  score,
                });
                i += 1;
              }
  
              i = 0;
              while (i < 3) {
                if (this.users[i] != null) {
                  this.ranker.push({
                    name: this.users[i].name,
                    score: 'sss',
                  });
                } else {
                  this.ranker.push({
                    name: `${i + 1}등에 도전해보세요`,
                  });
                }
                i += 1;
                if (i === 3) {
                  this.rank = true;
                }
              }
            })
            .catch((err) => {
              this.$swal({
                  title: '유저 로드 실패',
                  text: err,
                  type: 'error',
                                                                    allowOutsideClick: false,
                })
                .then(() => {
                  location.href = '/';
                });
            });
        } else {
          // 일반 랭크
          this.$http.get('users')
            .then((res) => {
              if (i / 10 === parseInt(length / 10, 10)) {
                end = length;
                this.loadState = false;
              } else if (end === length) {
                this.loadState = false;
              }
              const sort = 'score';
              this.data.sort(function(a, b) {
                return b[sort] - a[sort];
              });
              while (i < end) {
                this.users.push({
                  name: this.data[i].name,
                  score: this.data[i].score,
                });
                i += 1;
              }
  
              i = 0;
              while (i < 3) {
                if (this.users[i] != null) {
                  this.ranker.push({
                    name: this.users[i].name,
                    score: 'sss',
                  });
                } else {
                  this.ranker.push({
                    name: `${i + 1}등에 도전해보세요`,
                  });
                }
                i += 1;
                if (i === 3) {
                  this.rank = true;
                }
              }
            })
            .catch((err) => {
              this.$swal({
                  title: '유저 로드 실패',
                  text: err,
                  type: 'error',
                                                                    allowOutsideClick: false,
                })
                .then(() => {
                  location.href = '/';
                });
            });
        }
      },
    },
  };
</script>

<!--<style scoped>
  
</style>-->
<style src="../../assets/css/rank.css" scoped>
  
</style>
