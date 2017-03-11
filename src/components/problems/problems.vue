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
                        <div class="content" v-on:click='result(item.num)'>
                            <p class="header">
                                <span>{{item.num}}</span>번 문제</p>
                            <a  class="ui disabled header">
                                이름 : <span>{{item.name}}</span>
                            </a>
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
    const ROOT_URL = 'http://121.186.23.245:9999';
    this.$http.defaults.baseURL = ROOT_URL;
    //토큰테스트
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
    //문제 로드
	  this.$http.defaults.headers.common.Authorization = this.userToken;
	  this.$http.get('api/problems')
        .then((res) => {
    	//문제 결과 로드
        this.$http.defaults.headers.common.Authorization = this.userToken;
        this.$http.get('api/solution')
	    .then((resRatio) => {
            let i = 0;
			    //문제 개수 반복
	        while (i < res.data.problems.length) {
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
  methods: {
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
