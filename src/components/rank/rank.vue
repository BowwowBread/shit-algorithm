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
                          <div class="ui top attached tabular menu" id="pob">
                              <p id="ltemone" class="item">등수</p>
                              <p id="ltemtwo" class="item">이름</p>
                              <p id="ltemthr" class="item">점수</p>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="propol">
                  <div class="ui items">
                    <div class="item">
                      <div class="content">
                        <p class="header" id="pollist"><span>1</span>등</p>
                        <p class="ui disabled header"><span>아이티</span></p>
                          <p class="sub header" id="subder"><span>1,042</span></p>
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
.ranksys {
    /*background: rgb(167,42,222);*/
    margin-top: 170px;
    padding: 0px 130px 40px 130px;
}

.huge.chevron.circle.up.icon {
    color: rgb(179, 179, 179);
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 15px;
}

.huge.chevron.circle.up.icon:hover {
    color: rgb(255, 255, 255);
}


.rank-top {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-top: 100px;
    color: black;
    font-size: 30px;
}

.rank1 {
    text-align: center;
    width: 250px;
    height: 200px;
    margin-right: 20px;
    padding: 20px;
    background: rgb(143, 215, 179);
    display: flex;
}

.rank2 {
    text-align: center;
    width: 250px;
    height: 300px;
    margin-right: 20px;
    padding: 20px;
    background: rgb(143, 215, 179);
    display: flex;
}

.rank3 {
    text-align: center;
    width: 250px;
    height: 130px;
    padding: 20px;
    background: rgb(143, 215, 179);
    display: flex;
}
.onerank{
  align-self: flex-end;
  padding-left: 35px;
  padding-bottom: 20px;
  font-size: 25px;
  /*font-weight: 100*/

}
.tworank{
  align-self: flex-end;
  padding-left: 35px;
  padding-bottom: 20px;
  font-size: 25px;
  /*font-weight: 100*/

}
.thrrank{
  align-self: flex-end;
  padding-left: 35px;
  padding-bottom: 20px;
  font-size: 25px;
  /*font-weight: 100*/

}

.ui.button {
    width: 100%;
    height: 40px;
    background-color: rgb(242, 242, 242)
}

.ui.button:hover {
    background-color: rgb(224, 224, 224)
}

#rankhead {
    color: white;
    font-weight: 100
}

#rankhead .sub.header {
    color: white;
    margin-top: 10px;
}

.content {
    display: flex !important;
}
.propol{
}
#ltemone{
  padding-left: 17px;
  /*flex-grow: 1;*/
  flex: 2;
  justify-content: center;

}
#ltemtwo{
  /*flex-grow: 2;*/
  flex:3;
  justify-content: center;

}
#ltemthr{
  /*flex-grow: 2;*/
  flex:5;
  justify-content: center;
}
#pob p {
    margin: 0;
}

.ui.top.attached.tabular.menu{
  color: black !important
}
#pollist{
flex:2;
justify-content: center;
display: flex;
}
.ui.disabled.header{
  flex:3;
  justify-content: center;
  display: flex !important;
}
#subder{
  flex:5;
  justify-content: center;
  display: flex;
}
.ui.items * {
Padding: 0 !important;
}
</style>
