<template>
  <div id="notice" v-if="entering">
    <div class="noticen">
      <div class="not-main">
        <h2 class="ui center aligned header" id="not-head"> 공지사항
          <div class="sub header">SIGO의 알림를 외칩니다!</div>
        </h2>
        <div class="ui top attached tabular menu">
          <p class="item active" data-tab="first" id="item">목록</p>
        </div>
        <div class="ui bottom attached tab segment active" data-tab="first">
          <div class="ui items">
            <div class="item">
              <div class="content">
                <div class="ui top attached tabular menu" id="pob">
                  <p id="ltemone" class="item">번호</p>
                  <p id="ltemtwo" class="item">제목</p>
                  <p id="ltemthr" class="item">날짜</p>
                </div>
              </div>
            </div>
          </div>
          <div class="notice_wrap">
          <transition-group name="noticeList" tag="div">
            <div class="ui items" v-for="notice in notices" v-bind:key="notice">
              <div class="item">
                <div class="content" v-on:click='open(notice.num)'>
                  <p class="header" id="pollist"><span>{{notice.num}}</span></p>
                  <a class="ui header" id="destent">
                    <span>{{notice.noticename}}</span>
                  </a>
                  <p class="notdate"><span>{{notice.date}}</span></p>
                </div>
              </div>
            </div>
          </transition-group>
          </div>
        </div>
        <a href="#">
          <i class="huge chevron circle up icon" v-on:click="scrollUp"></i>
        </a>
        <button class="ui button" v-if="loadState" v-on:click="loadList">
          <i class="large chevron down icon"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
  let i = 0;
  let end = 10;
  let length;
  export default {
    name: 'notice',
    data() {
      return {
        notices: [],
        entering: false,
        loadState: true,
      };
    },
    updated() {
      this.$nextTick(() => {
        this.$store.commit('loadingOff');
        this.$Progress.finish();
      });
    },
    created() {
      this.$http.get('notices')
        .then((res) => {
          i = 0;
          length = res.data.notices.length;
           if (i / 10 === parseInt(length / 10, 10)) {
              end = length;
              this.loadState = false;
            } else if (end === length) {
              this.loadState = false;
            }
          while (i < end) {
            let date = res.data.notices[i].date.replace('T', ', ');
            date = date.substring(0, date.length - 8);
            if (res.data.notices[i].type === 'notice') {
              this.notices.push({
                num: res.data.notices[i].num,
                noticename: res.data.notices[i].noticeName,
                date,
              });
            }
            i += 1;
          }
          this.entering = true;
        })
        .catch((err) => {
          this.$swal({
            title: '공지 로드 실패',
            text: err,
            type: 'error',
          })
            .then((res) => {
              location.href = '/';
            });
        });
    },
    methods: {
      scrollUp() {
        $('html, body').stop().animate({
          scrollTop: 0,
        }, 500);
      },
      open(num) {
        location.href = `https://algorithm.seoulit.kr/notice/${num}`;
//        this.$router.push({
//          path: `notices/${num}`,
//        });
      },
      loadList() {
        this.$http.get('notices')
          .then((res) => {
            i = end;
            end += 10;
            if (i / 10 === parseInt(length / 10, 10)) {
              end = length;
              this.loadState = false;
            } else if (end === length) {
              this.loadState = false;
            }
            while (i < end) {
              let date = res.data.notices[i].date.replace('T', ', ');
              date = date.substring(0, date.length - 8);
              this.notices.push({
                num: res.data.notices[i].num,
                noticename: res.data.notices[i].noticeName,
                date,
              });
              i += 1;
            }
          })
          .catch((err) => {
            this.$swal({
                title: '공지 로드 실패',
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
<style src="../../assets/css/notice.css" scoped></style>
<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  
  body {
    background-color: rgb(40, 40, 40) !important;
  }
</style>