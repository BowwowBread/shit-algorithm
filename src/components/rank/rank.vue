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
                            <img src="image1.jpg">
                        </div>
                        <p class="rant1">2등</p>
                        <hr>
                        <p class="rant2">{{ranker[1].name}}</p>
                        <p class="rant2">2st</p>
                    </div>
                    <div class="rank2">
                        <div class="rankge2">
                            <img src="image1.jpg">
                        </div>
                        <p class="rant1">1등</p>
                        <hr>
                        <p class="rant2">{{ranker[0].name}}</p>
                        <p class="rant2">1st</p>
                    </div>
                    <div class="rank3">
                        <div class="rankge3">
                            <img src="image1.jpg">
                        </div>
                        <p class="rant1">3등</p>
                        <hr>
                        <p class="rant2">{{ranker[2].name}}</p>
                        <p class="rant2">3st</p>
                    </div>
                </div>
                <div class="ui top attached tabular menu">
                    <a class="item active" data-tab="first" id="item">순위</a>
                </div>
                <div class="ui bottom attached tab segment active">
                    <div class="ui items">
                        <div class="item">
                            <div class="content">
                                <div class="ui top attached tabular menu" id="pob" >
                                    <div class="ui grid">
                                        <div class="two wide column">
                                            <p id="ltemone" class="item">등수</p>
                                        </div>
                                        <div class="four wide column">
                                            <p id="ltemtwo" class="item">학번</p>
                                        </div>
                                        <div class="five wide column">
                                            <p id="ltemthr" class="item">이름</p>
                                        </div>
                                        <div class="five wide column">
                                            <p id="ltemfou" class="item">점수</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="propol" v-for="(user, rank) in users">
                        <div class="ui items">
                            <div class="item">
                                <div class="content" >
                                    <p class="header" id="pollist"><span>{{rank + 1}}</span>등</p>
                                    <p class="ui disabled header"><span>{{user.name}}</span></p>
                                    <p class="sub header" id="subder"><span>{{user.score}}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="#"><i class="huge chevron circle up icon"></i></a>
                <button class="ui button" v-if="loadState" v-on:click="loadList"><i class="large chevron down icon"></i></button>
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
      };
    },
    created() {
      this.userToken = this.$cookie.get('userToken');
      if (this.userToken == null) {
        alert('로그인 해주세요');
        location.href = '/';
      }
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
                  });
                  i += 1;
                }
                const sort = 'score';
                this.data.sort(function (a, b) {
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
      this.$Progress.finish();
    },
    methods: {
      loadList() {
        this.$http.get('users')
          .then((res) => {
            i = end;
            end += 10;
            if (i / 10 === parseInt(length / 10, 10)) {
              end = length;
              this.loadState = false;
            } else if (end === length) {
              this.loadState = false;
            }
            console.log(i);
            console.log(end);
            while (i < end) {
              this.users.push({
                name: this.data[i].name,
                score: this.data[i].score,
              });
              i += 1;
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
      },
    },
  };
</script>
<!-- <style scoped></style> -->
<style src="../../assets/css/rank.css" scoped></style>