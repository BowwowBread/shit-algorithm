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
              <img src="../../assets/img/oll1.png">
            </div>
            <p class="rant1">2등</p>
            <hr>
            <p class="rant2" v-if="rank">{{ranker[1].name}}</p>
          </div>
          <div class="rank2">
            <div class="rankge2">
              <img src="../../assets/img/oll2.png">
            </div>
            <p class="rant1">1등</p>
            <hr>
            <p class="rant2" v-if="rank">{{ranker[0].name}}</p>
          </div>
          <div class="rank3">
            <div class="rankge3">
              <img src="../../assets/img/oll3.png">
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
        this.$http.get('users/my-info')
          .then((resInfo) => {
            this.userid = resInfo.data.user.userId;
            this.$http.get('users')
              .then((res) => {
                i = 0;
                length = res.data.users.length;
                if (length < 10) {
                  end = length;
                }
                while (i < length) {
                  this.data.push({
                    name: res.data.users[i].username,
                    score: res.data.users[i].score,
                    contestScore: res.data.users[i].contestScore,
                  });
                  i += 1;
                }
                const sort = 'score';
                this.data.sort(function(a, b) {
                  return b[sort] - a[sort];
                });
                i = 0;
                while (i < end) {
                  this.users.push({
                    name: this.data[i].name,
                    score: this.data[i].score,
                  });
                  i += 1;
                }
                i = 0;
                while (i < 3) {
                  this.ranker.push({
                    name: this.users[i].name,
                    score: this.users[i].score,
                  });
                  i += 1;
                }
                this.entering = true;
              })
              .catch((err) => {
                this.$swal({
                    title: '유저 정보 조회 실패',
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
              console.log(this.data);
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
                this.ranker.push({
                  name: this.users[i].name,
                  score: this.users[i].score,
                });
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
                console.log(i);
                console.log(end);
                this.users.push({
                  name: this.data[i].name,
                  score: this.data[i].score,
                });
                i += 1;
              }

              i = 0;
              while (i < 3) {
                this.ranker.push({
                  name: this.users[i].name,
                  score: this.users[i].score,
                });
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
<!-- <style scoped></style> -->
<style src="../../assets/css/rank.css" scoped></style>
