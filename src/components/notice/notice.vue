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
                  <transition-group name="noticeList">
                    <div class="ui items" v-for="notice in notices" v-bind:key="notices">
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
              <a href="#"><i class="huge chevron circle up icon"></i></a>
              <button class="ui button"><i class="large chevron down icon"></i></button>
          </div>
      </div>
  </div>
</template>
<script>
    import { mapActions } from 'vuex';

    export default {
      name: 'notice',
      data() {
        return {
          notices: [],
          entering: false,
        };
      },
      updated() {
        this.$store.dispatch('loadingOff');
        console.log(this.$store.state.loadingState);
        this.$Progress.finish();
      },
      created() {
        this.$http.get('notices')
          .then((res) => {
          let i = 0;
          while (i < res.data.notices.length) {
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
          alert(err);
        });
      },
      methods: {
        open(num) {
          this.$router.push({
            path: `notices/${num}`,
          });
        },
      },
    };
</script>
<style src="../../assets/css/notice.css" scoped></style>
<style scoped>
    *{
        margin:0;
        padding:0;
    }
    body{
      background-color: rgb(40,40,40) !important;
    }
</style>
<!-- <template>
    <div id="notice">
        <div class="ui bottom attached tab segment active" data-tab="first">
            <transition-group name="noticeList">
                <div class="ui items" v-for="notice in notices" v-bind:key="notices">
                    <div class="item">
                        <div class="content" v-on:click='open(notice.num)'>
                            <p class="header">
                                <span>{{notice.num}}</span>번 </p>
                            <a  class="ui disabled header">
                                이름 : <span>{{notice.noticename}}</span>
                                날짜 : <span>{{notice.date}}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </transition-group>
        </div>
    </div>
</template> -->
