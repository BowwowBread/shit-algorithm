<template>
<div id="index">
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
            <p class="rant1">Seil</p>
            <hr>
            <p class="rant2">MASTER</p>
        </div>
        <div class="rank2">
            <div class="rankge2">
                <img src="image1.jpg">
            </div>
            <p class="rant1">Pices</p>
            <hr>
            <p class="rant2">KING</p>
        </div>
        <div class="rank3">
            <div class="rankge3">
                <img src="image1.jpg">
            </div>
            <p class="rant1">Center</p>
            <hr>
            <p class="rant2">HERO</p>
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
                              <p id="ltemone" class="item">등수</p>
                              <p id="ltemtwo" class="item">이름</p>
                              <p id="ltemthr" class="item">점수</p>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="propol" v-for="(user, rank) in users">
                  <div class="ui items">
                    <div class="item">
                      <div class="content" >
                        <p class="header" id="pollist"><span>{{rank}}</span>등</p>
                        <p class="ui disabled header"><span>{{user.name}}</span></p>
                          <p class="sub header" id="subder"><span>{{user.score}}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <a href="#"><i class="huge chevron circle up icon"></i></a>
            <button class="ui button"><i class="large chevron down icon"></i></button>
        </div>
    </div>
</div>
</div>
</template>

<script>
export default {
  name: 'rank',
  data() {
    return {
      userToken: '',
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
              console.log(res);
                const length = res.data.users.length;
                let i = 0;
                while (i < length) {
                  this.users.push({
                    name: res.data.users[i].username,
                    score: res.data.users[i].score,
                  });
                  i += 1;
                }
                  const sort = 'score';
                  this.users.sort(function (a, b) {
                    return b[sort] - a[sort];
                  });
              })
              .catch((err) => {
                console.log(err);
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
<!-- <style scoped></style> -->
<style src="../../assets/css/rank.css" scoped></style>
