<template>
<div id="index">
  <div class="ranksys">
    <div class="rank-main">
      <h2 class="ui center aligned header" id="rankhead"> 랭킹 시스템
        <div class="sub header">1등을 목표로 문제를 풀면서 친구들을 이겨보세요!</div>
      </h2>
      <div class="rank-top">
        <div class="rank1">
          <div class="onerank">
            2등 : 아이티
          </div>
        </div>
        <div class="rank2">
          <div class="tworank">
            1등 : 솔루션
          </div>
        </div>
        <div class="rank3">
          <div class="thrrank">
            3등 : 시스템
          </div>
        </div>
      </div>
      <div class="ui top attached tabular menu">
        <a class="item active" data-tab="first" id="item">순위</a>
      </div>
      <div class="ui bottom attached tab segment active">
        <div class="ui items">
          <div class="item">
            <div class="content">
              <p class="header"><span>1</span>등</p>
              <p class="ui disabled header">이름 : <span>아이티</span></p>
              <div class="description">
                <p>점수 : <span>1,042</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span id="page-span">1/10</span>
      <a href="#"><i class="big reply icon"></i></a>
      <a href="#"><i class="big share icon"></i></a>
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
			  if (resInfo.status === 200) {
			  this.userid = resInfo.data.user.userId;
		  }
	  })
	  .catch((error) => {
			  alert(error);
	  });
	  } else {
		  this.$swal(
			  '입장 실패',
			  '로그인을 해주세요',
			  'error',
		  );
		  location.href = '/';
	  }
  },
};
</script>
<style scoped>
#page-span{
  position: absolute;
  left: 47%;
  font-size: 17px;
}
.ranksys {
  /*background: rgb(167,42,222);*/
  margin-top: 170px;
  padding: 0px 130px 40px 130px;
}

.big.reply.icon {
  color: rgb(179,179,179);
  position: absolute;
  left: 0;
}

.big.share.icon {
  color: rgb(179,179,179);
  position: absolute;
  right: 0;
}

.big.reply.icon:hover {
  color: rgb(255,255,255);
}

.big.share.icon:hover {
  color: rgb(255,255,255);
}
.rank-main{
  position: relative;
}
.rank-top {
  display: flex;
  margin-top: 100px;
  align-items: flex-end;
  margin-left: 18%;
  color: black;
  font-size: 30px;
}

.rank1 {
  width: 250px;
  background: rgb(143, 215, 179);
  height: 200px;
  margin-right: 20px;
  padding: 20px;
  text-align: center;
}

.rank2 {
  width: 250px;
  height: 300px;
  margin-right: 20px;
  background: rgb(143, 215, 179);
  padding: 20px;
  text-align: center;
}

.rank3 {
  width: 250px;
  height: 130px;
  background: rgb(143, 215, 179);
  padding: 20px;
  text-align: center;
}
#rankhead{
  color: white;
  font-weight: 100
}
#rankhead .sub.header{
  color: white;
  margin-top: 10px;
}
</style>
