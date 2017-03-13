<template>
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
</template>
<script>
    export default {
      name: 'notice',
      data() {
        return {
          notices: [],
        };
      },
      created() {
        this.$http.get('api/notices')
          .then((res) => {
            let i = 0;
            console.log(res);
            while (i < res.data.notices.length) {
              if (res.data.notices[i].type === 'notice') {
                this.notices.push({
                  num: res.data.notices[i].num,
                  noticename: res.data.notices[i].noticeName,
                  date: res.data.notices[i].date,
                });
              }
              i += 1;
            }
          })
          .catch((err) => {
            alert(err);
          });
      },
      methods: {
        open(num) {
          alert('open');
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
    .noticelist-enter-active {
        transition: all 2s ease;
    }
    .noticelist-leave-active {
        transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .noticelist-enter, .noticelist-leave-to
        /* .slide-fade-leave-active for <2.1.8 */
    {
        transform: translateX(-50px);
        opacity: 0;
    }
</style>
