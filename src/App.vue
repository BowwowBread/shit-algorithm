<template>
  <div id="app">
    <div id="menu" class="ui secondary menu" v-bind:class="{menu_show: scrollMenu }">
      <ul id="mainmn">
        <li>
          <router-link to="/" :class="{menu_show_font : scrolled > 200}">
            <img src="./assets/img/sigoing.png" alt="" style="width:10%; height:10%; padding-top:50px;">
          </router-link>
        </li>
      </ul>
      <ul id="submn">
        <li>
          <router-link to="/notice" :class="{menu_show_font : scrolled > 200}">공지사항</router-link>
        </li>
        <li>
          <a v-on:click="problemLoginCheck" :class="{menu_show_font : scrolled > 200}">문제</a>
        </li>
        <li>
          <a v-on:click="rankLoginCheck" :class="{menu_show_font : scrolled > 200}">랭킹</a>
        </li>
        <li v-if="loginState">
          <router-link v-if="userRating == 3" to="/admin" :class="{menu_show_font : scrolled > 200}">관리자페이지 - {{username}}님</router-link>
          <router-link v-else to="/mypage" :class="{menu_show_font : scrolled > 200}">{{username}}님</router-link>
          <a @click="logout" :class="{menu_show_font : scrolled > 200}">로그아웃</a>
        </li>
        <li v-if="loginState == false">
          <a @click="openModal" :class="{menu_show_font : scrolled > 200}">로그인</a>
        </li>
      </ul>
    </div>
    <div v-if="loginState == false" id="sign">
      <div class="ui modal">
        <div class="login_form" v-if="signState">
          <div class="description">
            <div class="ui two column centered grid">
              <div class="container">
                <div class="culnmn">
                  <div class="signhead">
                    <h1 class="ui grey header">로그인</h1>
                  </div>
                  <form class="ui large form">
                    <div class="field">
                      <div class="ui left icon input">
                        <i class="user icon"></i>
                        <input type="text" name="userid" placeholder="아이디" v-model="userid" v-on:keydown.enter="submit">
                      </div>
                    </div>
                    <div class="field">
                      <div class="ui left icon input">
                        <i class="lock icon"></i>
                        <input type="password" name="password" placeholder="비밀번호" v-model="password" v-on:keydown.enter="submit">
                      </div>
                    </div>
                    <button type="button" v-on:click="submit" class="ui fluid large teal submit button submitButton">
                        로그인
                      </button>
                  </form>
                  <button v-on:click="signState = false" class="ui button black signButton">
                      회원가입하기
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="register_form" v-else>
          <div class="description">
            <div class="ui two column centered grid">
              <div class="container">
                <div class="culnmn">
                  <div class="signhead">
                    <h1 class="ui grey header">회원가입</h1>
                  </div>
                  <form class="ui large form">
                    <div class="field">
                      <div class="ui left icon input">
                        <i class="user icon"></i>
                        <input type="text" name="userid" placeholder="아이디" v-model="userid" v-on:keydown.enter="submit">
                      </div>
                    </div>
                    <div class="field">
                      <div class="ui left icon input">
                        <i class="lock icon"></i>
                        <input type="password" name="password" placeholder="비밀번호" v-model="password" v-on:keydown.enter="submit">
                      </div>
                    </div>
                    <div class="field">
                      <div class="ui left icon input">
                        <i class="user icon"></i>
                        <input type="text" name="username" placeholder="이름" v-model="username" v-on:keydown.enter="submit">
                      </div>
                    </div>
                    <div class="field">
                      <div class="ui left icon input">
                        <i class="student icon"></i>
                        <input type="text" name="studentcode" placeholder="학번" v-model="studentcode" v-on:keydown.enter="submit" v-on:keypress="isNumber(event)">
                      </div>
                    </div>
                    <div class="field">
                      <div class="ul left icon input">
                        <div class="lock icon">
                          <vue-recaptcha sitekey="6LejvBgUAAAAAE_F7SjXLPzPiyroAqAdXvBhk7IG"></vue-recaptcha>
                        </div>
                      </div>
                    </div>
                    <div id="html_element"></div>
                    <div v-on:click="submit" v-on:keyup.enter="submit" class="ui fluid large teal submit button submitButton">
                      회원가입
                    </div>
                  </form>
                  <button v-on:click="signState = true" class="ui button black signButton">
                      로그인하기
                    </button>
                </div>
              </div>
            </div>
  
          </div>
  
        </div>
  
      </div>
    </div>
    <vue-progress-bar></vue-progress-bar>
    <transition name="spinner" mode="out-in">
      <div class="openSpinner" v-if="loadingState">
        <bounce-loader :loading="loading"></bounce-loader>
      </div>
    </transition>
    <transition name="sigoPage" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
  </div>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha';
  import BounceLoader from 'vue-spinner/src/BounceLoader.vue';
  import {
    mapActions,
    mapGetters,
    mapMutations,
  } from 'vuex';
  
  export default {
    components: {
      VueRecaptcha,
      BounceLoader,
    },
    props: {
      loading: {
        type: Boolean,
        default: true,
      },
      color: {
        type: String,
        default: '#5dc596',
      },
      size: {
        type: String,
        default: '15px',
      },
      margin: {
        type: String,
        default: '0 auto',
      },
      radius: {
        type: String,
        default: '100%',
      },
    },
    data() {
      return {
        loginState: false,
        signState: true,
        userid: '',
        password: '',
        username: '',
        studentcode: '',
        loginResult: '',
        userToken: '',
        userRating: '',
        linkInfo: '',
        scrolled: false,
        scrollMenu: false,
        solveMenu: false,
        on: false,
        infoSubmit: false,
        userCount: 0,
        opts: {
          sitekey: '6LejvBgUAAAAAE_F7SjXLPzPiyroAqAdXvBhk7IG',
        },
      };
    },
    computed: {
      ...mapGetters([
        'getterLoadingState',
      ]),
      //로딩 스피너 상태 값
      loadingState() {
        return this.$store.state.loadingState;
      },
    },
    beforeCreate() {
      //프로그레스바 시작
      this.$Progress.start();
      //메인은 로딩스피너가 생기지 않음
      if (this.$route.name !== 'index') {
        this.$store.commit('loadingOn');
      }
      //기본 URL 설정
      const ROOT_URL = 'https://algorithm.seoulit.kr/api';
      this.$http.defaults.baseURL = ROOT_URL;
      //쿠키에 저장되있는 토큰을 가져옴
      this.userToken = this.$cookie.get('userToken');
      //쿠키에 토큰이 저장되있는 경우
      if (this.userToken != null) {
        //헤더에 토큰을 추가
        this.$http.defaults.headers.common.Authorization = this.userToken;
        //쿠키에서 받은 토큰값으로 정보를 받아와 로그인 상태를 유지
        this.$http.get('users/my-info')
          .then((resInfo) => {
            this.userRating = resInfo.data.user.rating;
            this.username = resInfo.data.user.username;
            this.loginState = true;
          })
          .catch((error) => {
            this.$swal({
              title: '유저 조회 실패',
              text: error,
              type: 'error',
            });
          });
      }
      //라우팅 시 이동히가진 메소드 호출
      this.$router.beforeEach((to, from, next) => {
        next();
        if (to.name !== 'index') {
          // 로딩창 시작
          this.$store.commit('loadingOn');
        }
        // 프로그레스바 시작
        this.$Progress.start();
      });
      // 스코롤 이벤트 리스너 등록
      window.addEventListener('scroll', this.scrollFunction);
    },
    destroyed() {
      window.removeEventListener('scroll', this.scrollFunction);
    },
    methods: {
      ...mapActions([
        'loadingOn',
        'loadingOff',
      ]),
      scrollFunction() {
        // 스크롤 메뉴 변경
        this.scrolled = window.scrollY;
        if (this.scrolled > 200) {
          this.scrollMenu = true;
        } else {
          this.scrollMenu = false;
        }
      },
      problemLoginCheck() {
        // 문제리스트 입장 체크
        if (this.$cookie.get('userToken') == null) {
          this.$swal(
            '입장 불가',
            '로그인을 하셨나요?',
            'error',
          );
        } else {
          this.$router.push({
            name: 'problems',
          });
        }
      },
      rankLoginCheck() {
        // 랭킹 입장 체크
        if (this.$cookie.get('userToken') == null) {
          this.$swal(
            '입장 불가',
            '로그인을 하셨나요?',
            'error',
          );
        } else {
          this.$router.push({
            name: 'rank',
          });
        }
      },
      cookieDel() {
        // 쿠키 삭제
        this.$cookie.delete('userToken');
        this.$cookie.delete('userRating');
        this.$cookie.delete('userName');
      },
      isNumber(number) {
        // 회원가입 학번 숫자 체크
        const evt = (number) || window.event;
        const charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault();
          return false;
        }
        return true;
      },
      logout() {
        // 로그아웃
        this.$swal({
          title: '로그아웃합니다',
          text: '이 상자는 2초후에 사라집니다',
          timer: 2000,
        });
        this.cookieDel();
        // 쿠키삭제
        this.$router.push({
          // 메인으로 이동
          name: 'index',
        });
        this.loginState = false;
      },
      // 폼 모달
      openModal() {
        $('.ui.modal').modal('show');
      },
      closeModal() {
        $('.ui.modal').modal('hide');
      },
      // 켑챠 함수
      onloadCallback() {
        alert('grecaptcha is ready!');
      },
      onVerify(response) {
        console.log(`Verify:  + ${response}`);
      },
      onExpired() {
        console.log('Expired');
      },
      resetRecaptcha() {
        this.$refs.recaptcha.reset(); // Direct call reset method
      },
      // 폼 제출
      submit() {
        let errMsg;
        if (this.signState === true) {
          // 로그인
          this.$http.post('users/signin', {
              userid: this.userid,
              password: this.password,
            })
            .then((resSign) => {
              this.userToken = resSign.data.token;
              this.$http.defaults.headers.common.Authorization = this.userToken;
              // 헤더 토큰 등록
              this.$http.get('users/my-info')
                // 로그인 성공
                .then((resInfo) => {
                  if (resInfo.status === 200) {
                    this.loginState = true;
                    this.username = resInfo.data.user.username;
                    this.closeModal();
                    this.loginState = true;
                    this.userRating = resInfo.data.user.rating;
                    // Cookie : 이름 , 내용 , 만료기간 , 도메인
                    this.$cookie.set('userToken', this.userToken, 1);
                    // 로그인 성공 모달
                    this.$swal(
                      '로그인 성공',
                      '안녕하세요!',
                      'success',
                    );
                  }
                })
                // 토큰인증 실패
                .catch((err) => {
                  this.closeModal();
                  this.$swal({
                    title: '로그인 실패',
                    text: err,
                    type: 'error',
                  });
                });
            })
            .catch((err) => {
              // 에러시 모달 메세지
              if (err.response.data.message === 'account false') {
                errMsg = '관리자의 승인을 기다려주세요';
              } else if (err.response.data.message === 'login fail') {
                errMsg = '아이디 또는 비밀번호가 잘못되었습니다';
              } else if (err.response.data.message === 'validation error') {
                errMsg = '정보를 모두 입력해주세요';
              } else if (err.response.data.message === 'fail rating excess') {
                errMsg = '5회 이상 틀려 확인정보를 입력해 주세요';
                this.infoSubmit = true;
              }
              // 에러 모달
              this.$swal({
                  title: '로그인 실패',
                  text: errMsg,
                  type: 'error',
                })
                .then(() => {
                  if (this.infoSubmit === true) {
                    // 로그인 5회 실패시 회원 정보를 물어보는 모달
                    this.failReset();
                    this.infoSubmit = '';
                  }
                });
            });
        } else {
          // 회원가입
          this.$http.post('users/signup', {
              username: this.username,
              userid: this.userid,
              password: this.password,
              studentcode: this.studentcode,
            })
            .then((resRegister) => {
              // 회원가입 성공
              this.closeModal();
              const username = resRegister.data.username;
              this.$swal({
                // 회원가입 성공 모달
                title: '회원가입 성공',
                text: `안녕하세요 ${username}님`,
                type: 'success',
              });
            })
            .catch((error) => {
              this.closeModal();
              // 에러시 모달 메세지
              if (error.response.data.message === 'validation error') {
                errMsg = '정보를 제대로 기입해주세요';
              }
              // 에러 모달
              this.$swal({
                title: '회원가입 실패',
                text: errMsg,
                type: 'error',
              });
            });
        }
      },
      failReset() {
        // 로그인 5회 실패시 회원 정보를 물어보는 모달
        this.$swal.setDefaults({
          input: 'text',
          confirmButtonText: '다음',
          cancelButtonText: '취소',
          showCancelButton: true,
          animation: true,
          progressSteps: ['1', '2', '3'],
        });
        const steps = [
          '아이디를 입력해주세요',
          '이름을 입력해주세요',
          '학번을 입력해주세요',
        ];
        this.$swal.queue(steps).then((result) => {
          this.$swal.resetDefaults();
          this.$http.post('users/failReset', {
              userid: result[0],
              username: result[1],
              studentcode: result[2],
            })
            .then(() => {
              this.$swal({
                // 인증 성공
                title: '확인 완료되었습니다',
                text: '다시 로그인 해주세요',
                type: 'success',
              });
            })
            .catch(() => {
              this.$swal({
                  // 인증 실패
                  title: '확인 실패하였습니다',
                  text: '다시 시도해주세요',
                  type: 'error',
                })
                .then(() => {
                  // 다시 인증
                  this.failReset();
                });
            });
        });
      },
    },
  };
</script>

<style src="./assets/css/app.css" scoped>
  
</style>

<style>
  body {
    background-color: rgb(40, 40, 40) !important;
  }
  
  .dimmable:not(.body) {
    position: static !important;
  }
</style>
