<template>
    <div id="problems">
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
            </div>
            <transition name="sigoPage" mode="out-in">
            <div class="ui bottom attached tab segment active" data-tab="first">
                <div class="ui items" v-for="item in items">
                    <div class="item">
                        <div class="content">
                            <p class="header">
                                <span>{{item.num}}</span>번 문제</p>
                            <a :href="'problems/' + item.num" v-on:click="" class="ui disabled header">
                                이름 : <span>{{item.name}}</span>
                            </a>
                            <div class="description">
                                <p>소스 : <span>{{item.source}}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </transition>
            <div class="ui pagination menu">
                <a href="#" class="active item"><i class="angle left icon"></i></a>
                <a href="#" class="active item"> 1 </a>
                <a href="#" class="active item"> 2 </a>
                <a href="#" class="active item"> 3 </a>
                <a href="#" class="active item"> 4 </a>
                <a href="#" class="active item"><i class="angle right icon"></i></a>
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
</style>
