<template>
    <div id="problems">
        <div class="container">
            <h2 class="ui center aligned header"> 문제풀기
                <div class="sub header">프로그래밍 문제를 풀고 맞추어 보는 곳입니다.</div>
            </h2>
            <div class="ui top attached tabular menu">
                <a class="item active" data-tab="first" id="item">문제</a>
                <a class="item" data-tab="second">출처</a>
                <a class="item" data-tab="third">단계</a>
                <a class="item" data-tab="four">최근 문제</a>
                <a class="item" data-tab="five">기타</a>
            </div>
            <transition name="sigoPage" mode="out-in">
            <div class="ui bottom attached tab segment active" data-tab="first">
              <div class="ui items">
                    <div class="item">
                        <div class="content">
                          <div class="ui top attached tabular menu" id="pob">
                              <p id="ltemone">번호</p>
                              <p id="ltemtwo">문제 이름</p>
                              <p id="ltemthr">푼 횟수</p>
                              <p id="ltemfou">정답자 수</p>
                              <p id="ltemfiv">틀린사람 수</p>
                              <p id="ltemsix">정답률</p>
                          </div>
                        </div>
                    </div>
                </div>
                <div class="ui items" v-for="item in items">
                    <div class="item">
                        <div class="content">
                            <p class="header"><span>{{item.num}}</span>번 문제</p>
                            <a :href="'problems/' + item.num" v-on:click="" class="ui disabled header">
                                이름 : <span>{{item.name}}</span>
                            </a>
                            <div class="description">
                                <p>소스 : <span>{{item.source}}</span></p>
                            </div>
                            <div class="description">
                                <p>소스 : <span>{{item.source}}</span></p>
                            </div>
                            <div class="description">
                                <p>소스 : <span>{{item.source}}</span></p>
                            </div>
                            <div class="description">
                                <p>소스 : <span>{{item.source}}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </transition>
            <!-- <div class="">
              <a href="#"><i class="huge chevron circle down icon"></i></a>
            </div> -->
            <button class="ui button"><i class="large chevron down icon"></i></button>
            <a href="#"><i class="huge chevron circle up icon"></i></a>
        </div>
    </div>
    </div>
</template>

<script>

export default {
  name: 'index',
  data() {
    return {
      test: 'test',
      items: [],
    };
  },
  beforeCreate() {
  	console.log('problem before');
	  const ROOT_URL = 'http://121.186.23.245:9999';
	  this.$http.defaults.baseURL = ROOT_URL;
	  this.$http.get('api/problems')
		  .then((res) => {
			  let i = 0;
			  while (i < res.data.problems.length) {
				  this.items.push({
					  num: res.data.problems[i].num,
					  name: res.data.problems[i].problemName,
					  source: res.data.problems[i].source,
				  });
				  i += 1;
			  }
			  console.log('list update');
		  });
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
      alert('로그인해주세요');
      location.href = '/';
    }
  },
};

</script>
<style src="../../assets/css/problems.css" scoped></style>
<style scoped>
	.sigoPage-enter-active {
		transition: all .3s ease;
	}
	.sigoPage-leave-active {
		transition: all 2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.sigoPage-enter, .sigoPage-leave-to
  /* .slide-fade-leave-active for <2.1.8 */
	{
		transform: translateY(50px);
		opacity: 0;
	}
  .ui.button{
    width: 100%;
    height: 40px;
    background-color: rgb(242,242,242);
    margin-bottom: 60px;
  }
  .ui.button:hover{
    background-color: rgb(224,224,224)

  }
  .huge.chevron.circle.up.icon{
    color: rgb(179,179,179);
    position: fixed;
    right: 0;
    bottom: 0;
    margin: 15px;
  }
  .huge.chevron.circle.down.icon{
    color: rgb(179,179,179);
    position: relative;
    bottom: 0;
    margin: 15px;
    margin-left: 47%;
  }
  .huge.chevron.circle.up.icon:hover{
    color: rgb(255,255,255);
  }
  .huge.chevron.circle.down.icon:hover{
    color: rgb(255,255,255);
  }
  .content {
    display: flex !important;
}

.header {
    flex-grow: 2;
}

.ui.disabled.header {
    flex-grow: 1;
}

.description {
    flex-grow: 1;
}

.ui.center.aligned.header {
    margin-bottom: 60px;
}
.ui.items{
  font-size: 13px;
}
.propol{
  padding: 20px;
  padding-top: 0px;
}
#ltemone{
  padding-left: 13px;
  flex-grow: 2.4;
}
#ltemtwo{
  flex-grow: 0.8;
  padding-right: 5px;
}
#ltemthr{
  flex-grow: 0.9;
  padding-left: 30px;
}
#ltemfou{
  flex-grow: 0.8;
}
#ltemfiv{
  flex-grow: 0.8;
}
#ltemsix{
  flex-grow: 1.1;
  margin-right: 24px;
}
#pob .item {
    margin: 0;
}
#pob{
  color: black;
}
</style>
