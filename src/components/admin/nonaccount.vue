<template>
  <div class="nonaccount" v-if="enteringNon">
    <ul>
      <li v-for="member in members">
        아이디: <span>{{member.userid}}</span><br> 이름: <span>{{member.username}}</span><br> 학번 : <span>{{member.studentcode}}</span><br> 등급 : <span>{{member.rating}}</span><br> 승인여부 : <span>{{member.account}}</span><br>
        <button v-on:click="account(member.userid, member)">승인하기</button>
        <button v-on:click="deletenonuser(member.userid, member)">유저삭제</button>
        <br>
      </li>
      <br>
  
    </ul>
  
  </div>
</template>

<script>
  export default {
    data() {
      return {
        members: [],
        enteringNon: false,
      };
    },
    created() {
      // 유저 정보 로드
      this.getMember();
    },
    updated() {
      this.$nextTick(() => {
        // 데이터 갱신 완료시 프로그레스바, 로딩창 종료
        this.$store.commit('loadingOff');
        this.$Progress.finish();
      });
    },
    methods: {
      account(userid, member) {
        // 유저 승인
        this.$http.defaults.headers.common.Authorization = this.userToken;
        this.$http.get(`users/account/${userid}`)
          .then((res) => {
            // 승인 성공
            this.$swal({
              // 성공 모달
              title: '승인 완료',
              text: `${userid}님을 승인하였습니다`,
              type: 'success',
            });
            // 리스트의 해당 인덱스의 유저 삭제
            this.members.splice(this.members.indexOf(member), 1);
          });
      },
      deletenonuser(userid, member) {
        // 유저 삭제
        this.$swal({
            // 확인 모달
            title: '유저 삭제',
            text: '정말로 삭제하시겠습니까?',
            type: 'question',
            showCancelButton: true,
            confirmButtonText: '삭제',
            cancelButtonText: '취소',
          })
          .then(() => {
            // 유저 삭제 확인
            this.$http.delete(`users/${userid}`)
              .then(() => {
                // 삭제 성공
                this.$swal({
                  // 성공 모달
                  title: '삭제 완료',
                  text: `${userid}님의 계정이 삭제되었습니다`,
                  type: 'success',
                });
                // 리스트의 해당 인덱스의 유저 삭제
                this.members.splice(this.members.indexOf(member), 1);
              })
              .catch((err) => {
                // 삭제 실패
                this.$swal({
                  // 실패 모달
                  title: '삭제 실패',
                  text: err,
                  type: 'error',
                });
              });
          })
          .catch(() => {
            // 삭제 실패
            this.$swal({
              // 실패 모달
              title: '삭제 실패',
              text: err,
              type: 'error',
            });
          });
      },
      getMember() {
        // 유저 정보 로드
        this.$http.defaults.headers.common.Authorization = this.userToken;
        // 승인되지 않은 유저 정보 로드
        this.$http.get('users/non-account')
          .then((res) => {
            let i = 0;
            while (i < res.data.users.length) {
              // 데이터 추가
              this.members.push({
                userid: res.data.users[i].userId,
                username: res.data.users[i].username,
                studentcode: res.data.users[i].studentCode,
                rating: res.data.users[i].rating,
                account: res.data.users[i].account,
              });
              i += 1;
            }
            this.enteringNon = true;
          });
      },
    },
  };
</script>

<style src="../../assets/css/nonaccount.css" scoped>
  
</style>

